/* =============================================================
   Architecture SEO — Application Multi-Thématiques
   js/home.js  —  Page d'accueil & navigation entre vues
   ============================================================= */

/* ── DESCRIPTIONS DES THÉMATIQUES ───────────────────────── */
const THEME_META = {
  tns: {
    icon: '🏥',
    desc: 'Architecture SEO du cluster Mutuelle TNS — couverture des intentions informationnelles, comparatives et commerciales pour les travailleurs non-salariés.',
    hub: '/independants/',
  },
  ae: {
    icon: '🏠',
    desc: 'Architecture SEO du cluster Assurance Emprunteur — cadres légaux, profils emprunteurs, types de prêts, risques santé et gestion de contrat.',
    hub: '/particuliers/',
  }
};

/* ── RENDU DE LA PAGE D'ACCUEIL ──────────────────────────── */
function renderHome() {
  const homeView = document.getElementById('view-home');
  if (!homeView) return;

  const cards = THEMES_ORDER.map(id => {
    const theme = THEMES[id];
    const meta  = THEME_META[id] || { icon: '📁', desc: '' };
    const total = 2 + theme.clusters.reduce((a, c) => a + c.pages.length, 0);
    const r = parseInt(theme.accentColor.slice(1,3), 16);
    const g = parseInt(theme.accentColor.slice(3,5), 16);
    const b = parseInt(theme.accentColor.slice(5,7), 16);

    return `
      <div class="home-theme-card"
           style="--card-accent:${theme.accentColor};
                  --card-accent-bg:rgba(${r},${g},${b},.1);
                  --card-accent-border:rgba(${r},${g},${b},.22);"
           onclick="openTheme('${id}')"
           role="button" tabindex="0"
           onkeydown="if(event.key==='Enter')openTheme('${id}')">

        <div class="home-card-header">
          <div class="home-card-icon">${meta.icon}</div>
          <span class="home-card-arrow">↗</span>
        </div>

        <div class="home-card-name">${theme.label}</div>
        <div class="home-card-desc">${meta.desc}</div>

        <div class="home-card-footer">
          <div class="home-card-stat">
            <span class="home-card-stat-val">${total}</span>
            <span>pages</span>
          </div>
          <div class="home-card-stat-sep"></div>
          <div class="home-card-stat">
            <span class="home-card-stat-val">${theme.clusters.length}</span>
            <span>clusters</span>
          </div>
          <div class="home-card-stat-sep"></div>
          <div class="home-card-stat">
            <span class="home-card-stat-val">3</span>
            <span>niveaux</span>
          </div>
          <div class="home-card-cta">Ouvrir →</div>
        </div>
      </div>`;
  }).join('');

  homeView.innerHTML = `
    <!-- Hero -->
    <div class="home-hero">
      <div class="home-hero-inner">
        <div class="home-eyebrow">
          <span class="home-eyebrow-dot"></span>
          Malakoff Humanis · Plateforme SEO
        </div>
        <h1 class="home-title">
          Architecture<br>
          <span class="home-title-accent">SEO</span>
        </h1>
        <p class="home-subtitle">
          Pilotez, visualisez et optimisez l'architecture de vos clusters SEO.
          Maillage interne, arborescences et recommandations IA en un seul outil.
        </p>
        <div class="home-divider"></div>
      </div>
    </div>

    <!-- Thématiques -->
    <div class="home-themes-section">
      <div class="home-themes-label">Thématiques disponibles</div>
      <div class="home-themes-grid">
        ${cards}
      </div>
    </div>

    <!-- Footer -->
    <div class="home-footer">
      <span class="home-footer-brand">Architecture SEO</span>
      <span class="home-footer-info">${THEMES_ORDER.length} thématique${THEMES_ORDER.length > 1 ? 's' : ''} · ${THEMES_ORDER.reduce((a,id) => a + 2 + THEMES[id].clusters.reduce((b,c)=>b+c.pages.length,0), 0)} pages indexées</span>
    </div>
  `;
}

/* ── NAVIGATION ──────────────────────────────────────────── */
function showHome() {
  const homeView = document.getElementById('view-home');
  const dashView = document.getElementById('view-dashboard');
  const btnHome  = document.getElementById('btn-go-home');

  if (homeView) {
    homeView.style.display = 'flex';
    homeView.classList.add('view-fade-in');
  }
  if (dashView) dashView.style.display = 'none';

  // Classe sur body pour les overrides CSS
  document.body.classList.add('on-home');
  document.documentElement.classList.add('on-home');

  // Cache le bouton retour
  if (btnHome) btnHome.style.display = 'none';

  // Scroll en haut (le body scrolle sur l'accueil)
  window.scrollTo({ top: 0, behavior: 'instant' });

  document.title = 'Architecture SEO';
}

function openTheme(themeId) {
  const homeView = document.getElementById('view-home');
  const dashView = document.getElementById('view-dashboard');
  const btnHome  = document.getElementById('btn-go-home');

  // Cache accueil, montre dashboard
  if (homeView) homeView.style.display = 'none';
  if (dashView) {
    dashView.style.display = 'block';
    dashView.classList.remove('view-fade-in');
    void dashView.offsetWidth;
    dashView.classList.add('view-fade-in');
  }

  // Retire la classe on-home → le layout reprend son comportement normal
  document.body.classList.remove('on-home');
  document.documentElement.classList.remove('on-home');

  if (btnHome) btnHome.style.display = 'flex';

  // Switch thème si nécessaire
  if (themeId !== _activeThemeId) {
    switchTheme(themeId);
  } else {
    document.title = `Architecture SEO — ${THEMES[themeId].label}`;
    updateThemeHeader(themeId);
  }

  // Scroll en haut dans .main
  const main = document.querySelector('.main');
  if (main) main.scrollTo({ top: 0, behavior: 'instant' });
}

/* ── INIT HOME ───────────────────────────────────────────── */
function initHome() {
  // Ajoute le bouton "← Accueil" dans le header
  const headerLeft = document.querySelector('.header-left');
  if (headerLeft && !document.getElementById('btn-go-home')) {
    const btn = document.createElement('button');
    btn.id        = 'btn-go-home';
    btn.className = 'btn-go-home';
    btn.title     = 'Retour à l\'accueil';
    btn.innerHTML = '← Accueil';
    btn.onclick   = () => showHome();
    btn.style.display = 'none';
    headerLeft.insertBefore(btn, headerLeft.firstChild);
  }

  // Génère la page d'accueil
  renderHome();

  // Démarre sur l'accueil — classe body immédiate
  document.body.classList.add('on-home');
  document.documentElement.classList.add('on-home');
  showHome();
}
