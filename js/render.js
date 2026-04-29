/* =============================================================
   Architecture SEO — Cluster Santé TNS
   js/render.js  —  Fonctions de rendu DOM
   ============================================================= */

/**
 * Point d'entrée principal — appelle tous les rendus
 */
function render() {
  renderSidebar();
  renderClusters();
  renderTable();
  updateStats();
  renderTree();
}

/* ── SIDEBAR ─────────────────────────────────────────────── */
function renderSidebar() {
  const tree = document.getElementById('sidebar-tree');
  let html = `<div class="sidebar-section-title">Arborescence</div>`;

  // Hub
  html += `
    <div class="node" onclick="window.open('${data.hub.href}','_blank')">
      <div class="node-dot" style="background:var(--hub)"></div>
      <a class="node-link" href="${data.hub.href}" target="_blank"
         onclick="event.stopPropagation()">${data.hub.url}</a>
      <span class="node-label" style="background:var(--hub)">Hub</span>
    </div>`;

  // Mère
  html += `
    <div class="node indent-1" onclick="window.open('${data.mere.href}','_blank')">
      <div class="node-dot" style="background:var(--mere)"></div>
      <a class="node-link" href="${data.mere.href}" target="_blank"
         onclick="event.stopPropagation()">${data.mere.url}</a>
      <span class="node-label" style="background:var(--mere)">Mère</span>
    </div>`;

  // Clusters
  data.clusters.forEach(c => {
    html += `<div class="sidebar-section-title">${c.name} (${c.pages.length})</div>`;
    c.pages.forEach(p => {
      html += `
        <div class="node indent-2" onclick="openClusterPanel('${c.id}')">
          <div class="node-dot" style="background:var(${c.colorVar})"></div>
          <span class="node-url">${p.alias}</span>
        </div>`;
    });
  });

  tree.innerHTML = html;
}

/* ── CLUSTER CARDS ───────────────────────────────────────── */
function renderClusters() {
  const grid = document.getElementById('clusters-grid');

  const clusterCards = data.clusters.map(c => `
    <div class="cluster-card" data-color="${c.color}" onclick="openClusterPanel('${c.id}')">
      <div class="cluster-name" style="color:var(${c.colorVar})">${c.name}</div>
      <div class="cluster-count">${c.pages.length} page${c.pages.length > 1 ? 's' : ''}</div>
      <div class="cluster-pages">
        ${c.pages.map(p => `
          <div class="cluster-page" onclick="event.stopPropagation()">
            <span class="cluster-page-icon" style="color:var(${c.colorVar})">⌗</span>
            <a href="${p.href}" target="_blank">${p.alias}</a>
            <span class="del-btn" onclick="deletePage('${c.id}','${p.alias}',event)"
                  title="Supprimer">×</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  const addCard = `
    <div class="cluster-card cluster-add-card" onclick="openNewClusterPanel()">
      <div class="cluster-add-inner">
        <div class="cluster-add-circle">
          <span class="cluster-add-plus">+</span>
        </div>
        <div class="cluster-add-label">Ajouter un sous-cluster</div>
      </div>
    </div>
  `;

  grid.innerHTML = clusterCards + addCard;
}

/* ── TABLEAU ─────────────────────────────────────────────── */
function renderTable() {
  const tbody = document.getElementById('table-body');

  // Helper : convertit un hex en rgba avec opacité
  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  let rows = `
    <tr>
      <td style="font-weight:600;color:var(--hub);">Niveau 1</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="width:8px;height:8px;border-radius:50%;background:var(--hub);flex-shrink:0;display:inline-block;"></span>
          <span class="editable-cell" contenteditable="true" spellcheck="false">${data.hub.label}</span>
        </div>
      </td>
      <td>
        <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:700;
          background:rgba(58,92,245,.1);color:var(--hub);padding:2px 8px;
          border-radius:10px;border:1px solid rgba(58,92,245,.3);">1</span>
      </td>
    </tr>
    <tr>
      <td style="font-weight:600;color:var(--mere);">Niveau 2</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="width:8px;height:8px;border-radius:50%;background:var(--mere);flex-shrink:0;display:inline-block;"></span>
          <span class="editable-cell" contenteditable="true" spellcheck="false">${data.mere.label}</span>
        </div>
      </td>
      <td>
        <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:700;
          background:rgba(39,174,114,.1);color:var(--mere);padding:2px 8px;
          border-radius:10px;border:1px solid rgba(39,174,114,.3);">1</span>
      </td>
    </tr>`;

  data.clusters.forEach(c => {
    const hex   = c.hex || '#5a6080';
    const bg    = hexToRgba(hex, 0.10);
    const bgHov = hexToRgba(hex, 0.18);
    const border= hexToRgba(hex, 0.35);
    rows += `
      <tr class="cluster-row"
          style="background:${bg};border-left:3px solid ${border};"
          onmouseenter="this.style.background='${bgHov}'"
          onmouseleave="this.style.background='${bg}'">
        <td style="color:${hex};font-weight:600;">Niveau 3</td>
        <td>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="width:8px;height:8px;border-radius:50%;background:${hex};flex-shrink:0;display:inline-block;"></span>
            <span class="editable-cell" contenteditable="true" spellcheck="false"
                data-cluster-name="${c.id}">Sous-cluster ${c.name}</span>
          </div>
        </td>
        <td>
          <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:700;
            background:${hexToRgba(hex, 0.15)};color:${hex};padding:2px 8px;
            border-radius:10px;border:1px solid ${border};"
            id="count-${c.id}">${c.pages.length}</span>
        </td>
      </tr>`;
  });

  const total = 2 + data.clusters.reduce((a, c) => a + c.pages.length, 0);
  rows += `
    <tr class="total-row">
      <td colspan="2" style="font-family:'IBM Plex Mono',monospace;font-size:11px;
          letter-spacing:.06em">TOTAL — Pages du dispositif présenté</td>
      <td id="total-count">${total}</td>
    </tr>`;

  tbody.innerHTML = rows;

  // Synchronisation des noms de clusters depuis le tableau
  tbody.querySelectorAll('[data-cluster-name]').forEach(el => {
    el.addEventListener('blur', () => {
      const cid = el.getAttribute('data-cluster-name');
      const cluster = data.clusters.find(c => c.id === cid);
      if (cluster) {
        const text = el.textContent.replace(/^Sous-cluster\s*/i, '');
        if (text) cluster.name = text;
        renderSidebar();
      }
    });
  });
}

/* ── STATS ───────────────────────────────────────────────── */
function updateStats() {
  const total = 2 + data.clusters.reduce((a, c) => a + c.pages.length, 0);
  const maxCluster = Math.max(...data.clusters.map(c => c.pages.length));
  const maxClusterObj = data.clusters.find(c => c.pages.length === maxCluster);

  document.getElementById('stat-total').textContent    = total;
  document.getElementById('stat-clusters').textContent = data.clusters.length;
  document.getElementById('stat-max').textContent      = maxCluster;

  // Couleur dynamique du plus grand cluster
  if (maxClusterObj) {
    const el = document.getElementById('stat-max');
    if (el) el.style.color = maxClusterObj.hex || 'var(--metier)';
  }
}
