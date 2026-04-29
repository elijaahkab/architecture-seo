/* =============================================================
   Architecture SEO — Application Multi-Thématiques
   js/app.js  —  Gestion du thème actif & navigation
   ============================================================= */

const APP_THEME_KEY  = 'architecture-seo:active-theme';
const APP_THEMES_KEY = 'architecture-seo:themes-overrides';

/* ── THÈME ACTIF (proxy global `data`) ───────────────────── */
// Toutes les fonctions existantes lisent `data` → on le remplace
// dynamiquement à chaque switch de thème.
let _activeThemeId = 'tns';

function getActiveTheme() {
  return THEMES[_activeThemeId] || THEMES.tns;
}

// `data` est la variable globale lue partout dans render.js/tree.js/editor.js
// On la remplace par un getter dynamique via Object.defineProperty
function applyActiveTheme(themeId) {
  _activeThemeId = themeId;

  // Charge les overrides localStorage pour ce thème
  const overrides = getThemeOverrides(themeId);
  const theme     = THEMES[themeId];
  if (!theme) return;

  // Reconstruit `data` en fusionnant le thème + overrides
  window.data = buildDataFromTheme(theme, overrides);

  // Met à jour BASE_MUTUELLE (utilisé dans editor.js pour les nouveaux slugs)
  window.BASE_MUTUELLE = theme.mere.href.replace(/\/$/, '');

  // Persiste le choix
  try { localStorage.setItem(APP_THEME_KEY, themeId); } catch(e) {}

  // Met à jour le header
  updateThemeHeader(themeId);

  // Met à jour les textes éditables
  updateThemeTexts(theme, overrides);

  // Re-rend tout
  render();
}

/* ── CONSTRUCTION DE `data` DEPUIS UN THÈME ──────────────── */
function buildDataFromTheme(theme, overrides) {
  return {
    hub:  { ...theme.hub,  label: overrides.hubLabel  || theme.hub.label  },
    mere: { ...theme.mere, label: overrides.mereLabel || theme.mere.label },
    clusters: overrides.clusters
      ? JSON.parse(JSON.stringify(overrides.clusters))
      : JSON.parse(JSON.stringify(theme.clusters))
  };
}

/* ── MISE À JOUR DES TEXTES ÉDITABLES ────────────────────── */
function updateThemeTexts(theme, overrides) {
  const titleEl    = document.getElementById('doc-title');
  const overviewEl = document.getElementById('text-overview');
  const readingEl  = document.getElementById('text-reading');

  if (titleEl)    titleEl.innerText   = overrides.title    || `Architecture SEO — Cluster ${theme.label}`;
  if (overviewEl) overviewEl.innerHTML = overrides.overview || theme.overview;
  if (readingEl)  readingEl.innerHTML  = overrides.reading  || theme.reading;
}

/* ── HEADER : SÉLECTEUR DE THÈME ─────────────────────────── */
function buildThemeSelector() {
  const wrapper = document.getElementById('theme-selector-wrapper');
  if (!wrapper) return;

  const currentTheme = getActiveTheme();

  wrapper.innerHTML = `
    <div class="theme-selector" id="theme-selector">
      <button class="theme-selector-btn" onclick="toggleThemeDropdown(event)"
              id="theme-selector-current">
        <span class="theme-dot" style="background:${currentTheme.accentColor}"></span>
        <span id="theme-selector-label">${currentTheme.label}</span>
        <span class="theme-selector-chevron" id="theme-chevron">▾</span>
      </button>
      <div class="theme-dropdown" id="theme-dropdown">
        ${THEMES_ORDER.map(id => {
          const t = THEMES[id];
          return `
            <div class="theme-option ${id === _activeThemeId ? 'active' : ''}"
                 onclick="switchTheme('${id}')">
              <span class="theme-dot" style="background:${t.accentColor}"></span>
              <div class="theme-option-info">
                <span class="theme-option-label">${t.label}</span>
                <span class="theme-option-count">${2 + t.clusters.reduce((a,c)=>a+c.pages.length,0)} pages</span>
              </div>
              ${id === _activeThemeId ? '<span class="theme-option-check">✓</span>' : ''}
            </div>`;
        }).join('')}
        <div class="theme-option-add" onclick="addThemePlaceholder()">
          <span style="opacity:.5">＋</span>
          <span>Nouvelle thématique</span>
        </div>
      </div>
    </div>`;
}

function toggleThemeDropdown(e) {
  e.stopPropagation();
  const dd = document.getElementById('theme-dropdown');
  const ch = document.getElementById('theme-chevron');
  const open = dd.classList.toggle('open');
  if (ch) ch.textContent = open ? '▴' : '▾';
}

// Ferme le dropdown en cliquant ailleurs
document.addEventListener('click', () => {
  const dd = document.getElementById('theme-dropdown');
  const ch = document.getElementById('theme-chevron');
  if (dd && dd.classList.contains('open')) {
    dd.classList.remove('open');
    if (ch) ch.textContent = '▾';
  }
});

function updateThemeHeader(themeId) {
  const theme      = THEMES[themeId];
  const labelEl    = document.getElementById('theme-selector-label');
  const dotEl      = document.querySelector('#theme-selector-current .theme-dot');
  const chevron    = document.getElementById('theme-chevron');
  if (labelEl) labelEl.textContent = theme.label;
  if (dotEl)   dotEl.style.background = theme.accentColor;

  // Ferme le dropdown
  const dd = document.getElementById('theme-dropdown');
  if (dd) dd.classList.remove('open');
  if (chevron) chevron.textContent = '▾';

  // Met à jour les options actives
  document.querySelectorAll('.theme-option').forEach(opt => {
    const id = opt.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
    opt.classList.toggle('active', id === themeId);
    const check = opt.querySelector('.theme-option-check');
    if (id === themeId && !check) {
      opt.insertAdjacentHTML('beforeend', '<span class="theme-option-check">✓</span>');
    } else if (id !== themeId && check) {
      check.remove();
    }
  });

  // Actualise le badge dans le header
  const badge = document.getElementById('theme-accent-badge');
  if (badge) {
    badge.style.background = `${theme.accentColor}18`;
    badge.style.color = theme.accentColor;
    badge.style.borderColor = `${theme.accentColor}35`;
  }
}

/* ── SWITCH DE THÈME (avec animation) ────────────────────── */
function switchTheme(themeId) {
  if (themeId === _activeThemeId) {
    const dd = document.getElementById('theme-dropdown');
    if (dd) dd.classList.remove('open');
    return;
  }

  // Sauvegarde l'état actuel avant switch
  saveCurrentThemeState();

  // Animation de transition
  const main = document.querySelector('.main');
  if (main) {
    main.style.opacity = '0';
    main.style.transform = 'translateY(8px)';
    main.style.transition = 'opacity .2s ease, transform .2s ease';
  }

  setTimeout(() => {
    applyActiveTheme(themeId);
    if (main) {
      main.style.opacity = '1';
      main.style.transform = 'translateY(0)';
      setTimeout(() => {
        main.style.transition = '';
        main.style.opacity = '';
        main.style.transform = '';
      }, 250);
    }
    showToast(`✓ Thématique "${THEMES[themeId].label}" chargée`);
  }, 180);
}

function addThemePlaceholder() {
  const dd = document.getElementById('theme-dropdown');
  if (dd) dd.classList.remove('open');
  showToast('💡 Fonctionnalité à venir — création de thématique personnalisée');
}

/* ── PERSISTANCE PAR THÈME ───────────────────────────────── */
function getThemeOverrides(themeId) {
  try {
    const all = JSON.parse(localStorage.getItem(APP_THEMES_KEY) || '{}');
    return all[themeId] || {};
  } catch(e) { return {}; }
}

function saveThemeOverrides(themeId, overrides) {
  try {
    const all = JSON.parse(localStorage.getItem(APP_THEMES_KEY) || '{}');
    all[themeId] = overrides;
    localStorage.setItem(APP_THEMES_KEY, JSON.stringify(all));
  } catch(e) {}
}

function saveCurrentThemeState() {
  const titleEl    = document.getElementById('doc-title');
  const overviewEl = document.getElementById('text-overview');
  const readingEl  = document.getElementById('text-reading');

  const overrides = getThemeOverrides(_activeThemeId);
  if (titleEl)    overrides.title    = titleEl.innerText.trim();
  if (overviewEl) overrides.overview = overviewEl.innerHTML;
  if (readingEl)  overrides.reading  = readingEl.innerHTML;
  overrides.clusters   = JSON.parse(JSON.stringify(window.data.clusters));
  overrides.hubLabel   = window.data.hub.label;
  overrides.mereLabel  = window.data.mere.label;

  saveThemeOverrides(_activeThemeId, overrides);
}

/* Patch scheduleAutoSave pour aussi sauvegarder par thème */
function scheduleAutoSaveWithTheme() {
  saveCurrentThemeState();
  if (typeof scheduleAutoSave === 'function') scheduleAutoSave();
}

/* ── INITIALISATION ──────────────────────────────────────── */
function initApp() {
  // Charge le dernier thème utilisé
  let savedTheme = 'tns';
  try { savedTheme = localStorage.getItem(APP_THEME_KEY) || 'tns'; } catch(e) {}
  if (!THEMES[savedTheme]) savedTheme = 'tns';

  // Construit le sélecteur dans le header
  buildThemeSelector();

  // Active le thème
  applyActiveTheme(savedTheme);

  // Patch auto-save pour qu'il sauvegarde aussi par thème
  document.getElementById('text-overview')?.addEventListener('input', saveCurrentThemeState);
  document.getElementById('text-reading')?.addEventListener('input',  saveCurrentThemeState);
  document.getElementById('doc-title')?.addEventListener('input',     saveCurrentThemeState);
}
