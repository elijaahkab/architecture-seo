/* =============================================================
   Architecture SEO — Application Multi-Thématiques
   js/utils.js  —  Dark mode · Save · Export/Import · Toast
   ============================================================= */

/* ── DARK MODE ───────────────────────────────────────────── */

function toggleDark() {
  const isDark = document.body.classList.toggle('dark');
  document.getElementById('mode-icon').textContent = isDark ? '☀️' : '🌙';
  document.getElementById('btn-dark').title = isDark
    ? 'Passer en mode clair'
    : 'Passer en mode sombre';
  try { localStorage.setItem('architecture-seo:theme', isDark ? 'dark' : 'light'); } catch(e) {}
}

function loadDarkMode() {
  try {
    const theme = localStorage.getItem('architecture-seo:theme');
    if (theme === 'dark') {
      document.body.classList.add('dark');
      const icon = document.getElementById('mode-icon');
      const btn  = document.getElementById('btn-dark');
      if (icon) icon.textContent = '☀️';
      if (btn)  btn.title = 'Passer en mode clair';
    }
  } catch(e) {}
}

/* ── INDICATEUR DE SAUVEGARDE ────────────────────────────── */

function updateSaveIndicator(saved) {
  const el = document.getElementById('save-indicator');
  if (!el) return;
  if (saved) {
    el.textContent = '● Sauvegardé';
    el.style.color = 'var(--accent2)';
  } else {
    el.textContent = '○ Modifications non sauvegardées';
    el.style.color = 'var(--accent3)';
  }
}

/* ── SAUVEGARDE (délègue à app.js) ───────────────────────── */

function saveToStorage() {
  // Sauvegarde via le système multi-thématiques de app.js
  if (typeof saveCurrentThemeState === 'function') {
    saveCurrentThemeState();
  }
  updateSaveIndicator(true);
}

function saveManual() {
  saveToStorage();
  showToast('✓ Modifications sauvegardées');
}

/* ── AUTO-SAVE ───────────────────────────────────────────── */

let _autoSaveTimer = null;

function scheduleAutoSave() {
  updateSaveIndicator(false);
  clearTimeout(_autoSaveTimer);
  _autoSaveTimer = setTimeout(() => {
    saveToStorage();
  }, 800);
}

/* ── RÉINITIALISATION ────────────────────────────────────── */

function resetStorage() {
  if (!confirm('Réinitialiser cette thématique vers les données d\'origine ?\nToutes les modifications seront perdues.')) return;

  // Efface uniquement les overrides du thème actif
  if (typeof _activeThemeId !== 'undefined' && typeof saveThemeOverrides === 'function') {
    saveThemeOverrides(_activeThemeId, {});
    // Efface aussi la vue sauvegardée pour revenir à l'accueil
    try { localStorage.removeItem('architecture-seo:active-view'); } catch(e) {}
    location.reload();
  } else {
    location.reload();
  }
}

/* ── EXPORT JSON ─────────────────────────────────────────── */

function exportJSON() {
  try {
    // Collecte l'état actuel du thème actif
    const theme = (typeof getActiveTheme === 'function') ? getActiveTheme() : null;
    const themeId = (typeof _activeThemeId !== 'undefined') ? _activeThemeId : 'unknown';

    const overviewEl = document.getElementById('text-overview');
    const readingEl  = document.getElementById('text-reading');

    const exportData = {
      _version:   '2.0',
      _themeId:   themeId,
      _exported:  new Date().toISOString(),
      title:      theme ? `Architecture SEO — Cluster ${theme.label}` : 'Architecture SEO',
      overview:   overviewEl ? overviewEl.innerHTML : '',
      reading:    readingEl  ? readingEl.innerHTML  : '',
      hub:        window.data ? window.data.hub    : {},
      mere:       window.data ? window.data.mere   : {},
      clusters:   window.data ? window.data.clusters : []
    };

    const filename = theme
      ? `architecture-seo-${themeId}-${new Date().toISOString().slice(0,10)}.json`
      : 'architecture-seo-export.json';

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);

    showToast('✓ Export JSON téléchargé');
  } catch(err) {
    console.error('Export error:', err);
    showToast('✗ Erreur lors de l\'export : ' + err.message);
  }
}

/* ── IMPORT JSON ─────────────────────────────────────────── */

function importJSON() {
  const input  = document.createElement('input');
  input.type   = 'file';
  input.accept = '.json,application/json';

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imp = JSON.parse(ev.target.result);

        // Applique sur le thème actif
        if (imp.overview && document.getElementById('text-overview'))
          document.getElementById('text-overview').innerHTML = imp.overview;
        if (imp.reading && document.getElementById('text-reading'))
          document.getElementById('text-reading').innerHTML = imp.reading;

        if (window.data) {
          if (imp.hub)      Object.assign(window.data.hub,  imp.hub);
          if (imp.mere)     Object.assign(window.data.mere, imp.mere);
          if (imp.clusters && Array.isArray(imp.clusters))
            window.data.clusters = imp.clusters;
        }

        render();
        saveToStorage();
        showToast('✓ Import réussi — données chargées et sauvegardées');
      } catch (err) {
        showToast('✗ Fichier JSON invalide');
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  input.click();
}

/* ── TOAST ───────────────────────────────────────────────── */

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── INIT UTILS ──────────────────────────────────────────── */
// Chargement du dark mode dès que utils.js est parsé
loadDarkMode();
