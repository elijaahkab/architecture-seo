/* =============================================================
   Architecture SEO — Cluster Santé TNS
   js/utils.js  —  Dark mode · localStorage · Export/Import JSON · Toast
   ============================================================= */

const STORAGE_KEY = 'architecture-seo-tns';

/* ── DARK MODE ───────────────────────────────────────────── */

function toggleDark() {
  const isDark = document.body.classList.toggle('dark');
  document.getElementById('mode-icon').textContent = isDark ? '☀️' : '🌙';
  document.getElementById('btn-dark').title = isDark
    ? 'Passer en mode clair'
    : 'Passer en mode sombre';
  localStorage.setItem(STORAGE_KEY + ':theme', isDark ? 'dark' : 'light');
}

/* ── COLLECTE DE L'ÉTAT COMPLET ──────────────────────────── */

function collectState() {
  return {
    title:    document.getElementById('doc-title').innerText.trim(),
    overview: document.getElementById('text-overview').innerHTML,
    reading:  document.getElementById('text-reading').innerHTML,
    hub:      data.hub,
    mere:     data.mere,
    base:     BASE_MUTUELLE,
    clusters: data.clusters
  };
}

/* ── LOCALSTORAGE : SAUVEGARDE ───────────────────────────── */

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectState()));
    updateSaveIndicator(true);
  } catch (e) {
    console.warn('localStorage indisponible :', e);
  }
}

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

/* ── LOCALSTORAGE : CHARGEMENT AU DÉMARRAGE ──────────────── */

function loadFromStorage() {
  // Thème
  const theme = localStorage.getItem(STORAGE_KEY + ':theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
    document.getElementById('mode-icon').textContent = '☀️';
    document.getElementById('btn-dark').title = 'Passer en mode clair';
  }

  // Données
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;

  try {
    const saved = JSON.parse(raw);
    if (saved.title)    document.getElementById('doc-title').innerText   = saved.title;
    if (saved.overview) document.getElementById('text-overview').innerHTML = saved.overview;
    if (saved.reading)  document.getElementById('text-reading').innerHTML  = saved.reading;
    if (saved.hub)      Object.assign(data.hub,  saved.hub);
    if (saved.mere)     Object.assign(data.mere, saved.mere);
    if (saved.clusters && Array.isArray(saved.clusters)) data.clusters = saved.clusters;
    return true;
  } catch (e) {
    console.warn('Erreur chargement localStorage :', e);
    return false;
  }
}

/* ── LOCALSTORAGE : RÉINITIALISATION ─────────────────────── */

function resetStorage() {
  if (!confirm('Réinitialiser vers les données d\'origine ?\nToutes les modifications locales seront perdues.')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

/* ── EXPORT JSON ─────────────────────────────────────────── */

function exportJSON() {
  const blob = new Blob(
    [JSON.stringify(collectState(), null, 2)],
    { type: 'application/json' }
  );
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'architecture-seo-tns.json';
  a.click();
  showToast('✓ Export JSON téléchargé');
}

/* ── IMPORT JSON ─────────────────────────────────────────── */

function importJSON() {
  const input = document.createElement('input');
  input.type   = 'file';
  input.accept = '.json,application/json';

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imp = JSON.parse(ev.target.result);

        if (imp.title)    document.getElementById('doc-title').innerText     = imp.title;
        if (imp.overview) document.getElementById('text-overview').innerHTML = imp.overview;
        if (imp.reading)  document.getElementById('text-reading').innerHTML  = imp.reading;
        if (imp.hub)      Object.assign(data.hub,  imp.hub);
        if (imp.mere)     Object.assign(data.mere, imp.mere);
        if (imp.clusters && Array.isArray(imp.clusters)) data.clusters = imp.clusters;

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

/* ── SAUVEGARDE MANUELLE (bouton) ────────────────────────── */

function saveManual() {
  saveToStorage();
  showToast('✓ Modifications sauvegardées');
}

/* ── AUTO-SAVE ───────────────────────────────────────────── */
// Déclenché 800 ms après la dernière modification pour éviter
// les écritures trop fréquentes pendant une saisie.

let _autoSaveTimer = null;

function scheduleAutoSave() {
  updateSaveIndicator(false);
  clearTimeout(_autoSaveTimer);
  _autoSaveTimer = setTimeout(saveToStorage, 800);
}

/* ── TOAST ───────────────────────────────────────────────── */

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
