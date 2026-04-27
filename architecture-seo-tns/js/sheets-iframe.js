/* =============================================================
   Architecture SEO — Cluster Santé TNS
   js/sheets-iframe.js  —  Intégration Google Sheets via iFrame
   ============================================================= */

const SHEETS_STORAGE_KEY = 'architecture-seo-tns:sheets-iframe';

/* ── CHARGEMENT DE LA CONFIG SAUVEGARDÉE ─────────────────── */
function initSheetsIframe() {
  try {
    const saved = JSON.parse(localStorage.getItem(SHEETS_STORAGE_KEY) || '{}');
    if (saved.url) {
      document.getElementById('sheets-iframe-url').value = saved.url;
      loadIframe(saved.url);
    }
    if (saved.title) {
      document.getElementById('sheets-title-text').textContent = saved.title;
    }
  } catch(e) {}
}

/* ── SAUVEGARDE CONFIG ───────────────────────────────────── */
function saveSheetsConfig() {
  try {
    const url   = document.getElementById('sheets-iframe-url')?.value || '';
    const title = document.getElementById('sheets-title-text')?.textContent || '';
    localStorage.setItem(SHEETS_STORAGE_KEY, JSON.stringify({ url, title }));
  } catch(e) {}
}

/* ── CHARGEMENT DE L'IFRAME ──────────────────────────────── */
function loadIframe(urlOverride) {
  const input = document.getElementById('sheets-iframe-url');
  const url   = urlOverride || (input ? input.value.trim() : '');

  if (!url) {
    showToast('⚠️ Renseigne une URL Google Sheets');
    return;
  }

  // Valide que c'est bien une URL Google Sheets
  if (!url.includes('docs.google.com/spreadsheets')) {
    showToast('⚠️ L\'URL doit pointer vers un Google Sheets publié');
    return;
  }

  const wrap = document.getElementById('sheets-iframe-wrap');
  const placeholder = document.getElementById('sheets-placeholder');
  const topbarLabel = document.getElementById('sheets-topbar-label');
  const openLink    = document.getElementById('sheets-open-link');
  const footerInfo  = document.getElementById('sheets-footer-info');
  const footerUp    = document.getElementById('sheets-footer-updated');

  // Affiche un loader pendant le chargement
  wrap.innerHTML = `
    <div class="sheets-state">
      <div class="sheets-spinner"></div>
      <div class="sheets-state-text">Chargement du tableau…</div>
    </div>`;

  // Crée l'iframe
  const iframe = document.createElement('iframe');
  iframe.className = 'sheets-iframe';
  iframe.src = url;
  iframe.title = 'Tableau Google Sheets';
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('allowfullscreen', '');

  iframe.onload = () => {
    topbarLabel.textContent = 'Google Sheets — Tableau de maillage';
    footerInfo.textContent  = 'Document chargé via publication Google Sheets';
    footerUp.textContent    = 'Mis à jour : ' + new Date().toLocaleString('fr-FR');

    if (openLink) {
      // Construit le lien d'édition depuis l'URL publiée
      const editUrl = url.replace('/pubhtml', '/edit').split('?')[0];
      openLink.href = editUrl;
      openLink.style.display = 'inline-flex';
    }
  };

  iframe.onerror = () => {
    wrap.innerHTML = `
      <div class="sheets-error">
        ✗ Impossible de charger le document.<br>
        Vérifiez que le document est bien publié sur le web (Fichier → Partager → Publier sur le Web).
      </div>`;
  };

  wrap.innerHTML = '';
  wrap.appendChild(iframe);
  saveSheetsConfig();
}

/* ── PLEIN ÉCRAN ─────────────────────────────────────────── */
function toggleFullscreen() {
  const container = document.getElementById('sheets-container');
  if (!document.fullscreenElement) {
    container.requestFullscreen?.().catch(() => {
      showToast('⚠️ Plein écran non supporté par ce navigateur');
    });
  } else {
    document.exitFullscreen?.();
  }
}
