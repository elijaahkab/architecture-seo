/* =============================================================
   Architecture SEO — Cluster Santé TNS
   js/editor.js  —  Panneau d'édition & CRUD clusters/pages
   ============================================================= */

/* ── PANNEAU CLUSTER ─────────────────────────────────────── */

function openClusterPanel(id) {
  const c = data.clusters.find(x => x.id === id);
  if (!c) return;

  document.getElementById('panel-cluster-name').textContent = c.name;

  const html = `
    <div class="form-group">
      <label class="form-label">Nom du sous-cluster</label>
      <input class="form-input" id="panel-cluster-name-input" value="${c.name}"
        oninput="updateClusterName('${id}', this.value)">
    </div>

    <div class="form-group">
      <label class="form-label">Pages (${c.pages.length})</label>
      ${c.pages.map((p, i) => `
        <div style="margin-bottom:10px">
          <div style="font-family:'IBM Plex Mono',monospace;font-size:9px;
              letter-spacing:.08em;text-transform:uppercase;color:var(--text-dim);
              margin-bottom:4px">Alias affiché</div>
          <div style="display:flex;gap:8px;margin-bottom:4px;align-items:center">
            <input class="form-input" value="${p.alias}" style="flex:1"
              onchange="updatePageAlias('${id}',${i},this.value)">
            <button onclick="deletePage('${id}','${p.alias}',event)"
              style="background:transparent;border:1px solid var(--border);
                     color:var(--text-dim);padding:8px 10px;border-radius:6px;
                     cursor:pointer;font-size:14px;transition:all .15s"
              onmouseenter="this.style.borderColor='var(--accent4)';this.style.color='var(--accent4)'"
              onmouseleave="this.style.borderColor='var(--border)';this.style.color='var(--text-dim)'">×</button>
          </div>
          <div style="font-family:'IBM Plex Mono',monospace;font-size:9px;
              letter-spacing:.08em;text-transform:uppercase;color:var(--text-dim);
              margin-bottom:4px">URL complète</div>
          <input class="form-input" value="${p.href}" style="width:100%"
            onchange="updatePageHref('${id}',${i},this.value)">
        </div>
      `).join('')}
      <button class="add-btn" onclick="addPage('${id}')">＋ Ajouter une page</button>
    </div>

    <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border)">
      <button class="btn btn-ghost"
        style="width:100%;color:var(--accent4);border-color:var(--accent4)"
        onclick="deleteCluster('${id}')">Supprimer ce cluster</button>
    </div>`;

  document.getElementById('panel-content').innerHTML = html;
  document.getElementById('edit-panel').classList.add('open');
}

function closePanel() {
  document.getElementById('edit-panel').classList.remove('open');
}

/* ── MISE À JOUR CLUSTER ─────────────────────────────────── */

function updateClusterName(id, val) {
  const c = data.clusters.find(x => x.id === id);
  if (c && val.trim()) {
    c.name = val.trim();
    document.getElementById('panel-cluster-name').textContent = c.name;
    renderSidebar();
    renderClusters();
    renderTable();
    updateStats();
    scheduleAutoSave();
  }
}

/* ── MISE À JOUR PAGE ────────────────────────────────────── */

function updatePageAlias(clusterId, pageIdx, newAlias) {
  const c = data.clusters.find(x => x.id === clusterId);
  if (c && newAlias.trim()) {
    c.pages[pageIdx].alias = newAlias.trim();
    renderSidebar();
    renderClusters();
    scheduleAutoSave();
    showToast('Alias mis à jour');
  }
}

function updatePageHref(clusterId, pageIdx, newHref) {
  const c = data.clusters.find(x => x.id === clusterId);
  if (c && newHref.trim()) {
    c.pages[pageIdx].href = newHref.trim();
    renderClusters();
    scheduleAutoSave();
    showToast('URL mise à jour');
  }
}

/* ── SUPPRESSION ─────────────────────────────────────────── */

function deletePage(clusterId, pageAlias, event) {
  if (event) event.stopPropagation();
  const c = data.clusters.find(x => x.id === clusterId);
  if (c) {
    c.pages = c.pages.filter(p => p.alias !== pageAlias);
    renderSidebar();
    renderClusters();
    renderTable();
    updateStats();
    scheduleAutoSave();
    if (document.getElementById('edit-panel').classList.contains('open')) {
      openClusterPanel(clusterId);
    }
    showToast('Page supprimée');
  }
}

function addPage(clusterId) {
  const c = data.clusters.find(x => x.id === clusterId);
  if (c) {
    const slug = '/nouvelle-page-' + Date.now().toString().slice(-4) + '/';
    c.pages.push({ alias: slug, href: BASE_MUTUELLE + slug });
    renderSidebar();
    renderClusters();
    renderTable();
    updateStats();
    scheduleAutoSave();
    openClusterPanel(clusterId);
    showToast('Page ajoutée');
  }
}

function deleteCluster(id) {
  if (!confirm('Supprimer ce sous-cluster ?')) return;
  data.clusters = data.clusters.filter(c => c.id !== id);
  closePanel();
  render();
  scheduleAutoSave();
  showToast('Cluster supprimé');
}

/* ── CRÉATION D'UN NOUVEAU CLUSTER ──────────────────────── */

// Palette de couleurs tournante pour les nouveaux clusters
const CLUSTER_COLORS = [
  { color:'new-1', colorVar:'--new-1', hex:'#0ea5e9' },
  { color:'new-2', colorVar:'--new-2', hex:'#f59e0b' },
  { color:'new-3', colorVar:'--new-3', hex:'#10b981' },
  { color:'new-4', colorVar:'--new-4', hex:'#f43f5e' },
  { color:'new-5', colorVar:'--new-5', hex:'#8b5cf6' },
  { color:'new-6', colorVar:'--new-6', hex:'#06b6d4' },
];

function getNextColor() {
  const usedColors = data.clusters.map(c => c.colorVar);
  const available  = CLUSTER_COLORS.filter(c => !usedColors.includes(c.colorVar));
  const pick       = available.length > 0 ? available[0] : CLUSTER_COLORS[data.clusters.length % CLUSTER_COLORS.length];
  // Injecte la CSS variable si elle n'existe pas encore
  if (!getComputedStyle(document.documentElement).getPropertyValue(pick.colorVar).trim()) {
    document.documentElement.style.setProperty(pick.colorVar, pick.hex);
  }
  return pick;
}

function openNewClusterPanel() {
  const panel = document.getElementById('edit-panel');
  document.getElementById('panel-cluster-name').textContent = 'Nouveau sous-cluster';

  const html = `
    <div class="form-group">
      <label class="form-label">Nom du sous-cluster</label>
      <input class="form-input" id="new-cluster-name" placeholder="ex: Santé / Prévoyance"
        oninput="previewNewCluster(this.value)">
    </div>

    <div class="form-group" id="new-cluster-pages-section" style="display:none">
      <label class="form-label">Pages <span id="new-pages-count" style="color:var(--text-dim)">(0)</span></label>
      <div id="new-cluster-pages-list"></div>
      <button class="add-btn" onclick="addNewClusterPage()">＋ Ajouter une page</button>
    </div>

    <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:8px">
      <button class="btn btn-primary" onclick="createCluster()" id="btn-create-cluster" style="opacity:.4;pointer-events:none">
        ✓ Créer le sous-cluster
      </button>
      <button class="btn btn-ghost" onclick="closePanel()">Annuler</button>
    </div>
  `;

  document.getElementById('panel-content').innerHTML = html;
  panel.classList.add('open');

  // Reset des pages temporaires
  window._newClusterPages = [];
}

function previewNewCluster(val) {
  const btn     = document.getElementById('btn-create-cluster');
  const section = document.getElementById('new-cluster-pages-section');
  const hasName = val.trim().length > 0;
  if (btn) {
    btn.style.opacity          = hasName ? '1' : '.4';
    btn.style.pointerEvents    = hasName ? 'auto' : 'none';
  }
  if (section) section.style.display = hasName ? 'block' : 'none';
}

function addNewClusterPage() {
  if (!window._newClusterPages) window._newClusterPages = [];
  const idx  = window._newClusterPages.length;
  const slug = '/nouvelle-page-' + (Date.now().toString().slice(-4)) + '/';
  window._newClusterPages.push({ alias: slug, href: BASE_MUTUELLE + slug });
  refreshNewClusterPagesList();
}

function refreshNewClusterPagesList() {
  const list  = document.getElementById('new-cluster-pages-list');
  const count = document.getElementById('new-pages-count');
  if (!list) return;
  const pages = window._newClusterPages || [];
  if (count) count.textContent = `(${pages.length})`;

  list.innerHTML = pages.map((p, i) => `
    <div style="margin-bottom:10px">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.08em;
          text-transform:uppercase;color:var(--text-dim);margin-bottom:4px">Alias</div>
      <div style="display:flex;gap:8px;margin-bottom:4px;align-items:center">
        <input class="form-input" value="${p.alias}" style="flex:1"
          onchange="updateNewPageAlias(${i},this.value)">
        <button onclick="removeNewPage(${i})"
          style="background:transparent;border:1px solid var(--border);color:var(--text-dim);
                 padding:8px 10px;border-radius:6px;cursor:pointer;font-size:14px;transition:all .15s"
          onmouseenter="this.style.borderColor='var(--accent4)';this.style.color='var(--accent4)'"
          onmouseleave="this.style.borderColor='var(--border)';this.style.color='var(--text-dim)'">×</button>
      </div>
      <div style="font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.08em;
          text-transform:uppercase;color:var(--text-dim);margin-bottom:4px">URL complète</div>
      <input class="form-input" value="${p.href}" style="width:100%"
        onchange="updateNewPageHref(${i},this.value)">
    </div>
  `).join('');
}

function updateNewPageAlias(idx, val) {
  if (window._newClusterPages && val.trim()) {
    window._newClusterPages[idx].alias = val.trim();
  }
}

function updateNewPageHref(idx, val) {
  if (window._newClusterPages && val.trim()) {
    window._newClusterPages[idx].href = val.trim();
  }
}

function removeNewPage(idx) {
  if (window._newClusterPages) {
    window._newClusterPages.splice(idx, 1);
    refreshNewClusterPagesList();
  }
}

function createCluster() {
  const nameInput = document.getElementById('new-cluster-name');
  const name      = nameInput ? nameInput.value.trim() : '';
  if (!name) { showToast('⚠️ Donne un nom au sous-cluster'); return; }

  const colorPick = getNextColor();
  const newId     = 'cluster-' + Date.now();

  data.clusters.push({
    id:       newId,
    name:     name,
    color:    colorPick.color,
    colorVar: colorPick.colorVar,
    hex:      colorPick.hex,
    pages:    window._newClusterPages ? [...window._newClusterPages] : []
  });

  window._newClusterPages = [];
  closePanel();
  render();
  scheduleAutoSave();
  showToast(`✓ Sous-cluster "${name}" créé`);

  // Ouvre immédiatement le panneau du nouveau cluster pour continuer l'édition
  setTimeout(() => openClusterPanel(newId), 200);
}


/* ── ÉDITION DES BLOCS TEXTE ─────────────────────────────── */

function toggleEdit(id) {
  const el = document.getElementById(id);
  const isEditing = el.getAttribute('contenteditable') === 'true';

  if (isEditing) {
    el.setAttribute('contenteditable', 'false');
    scheduleAutoSave();
    showToast('✓ Modifications enregistrées');
  } else {
    el.setAttribute('contenteditable', 'true');
    el.focus();
    try {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } catch (e) {}
    showToast('Mode édition activé — cliquez sur ✎ Terminer pour valider');
  }

  const btn = document.querySelector(`[onclick="toggleEdit('${id}')"]`);
  if (btn) btn.textContent = isEditing ? '✎ Éditer' : '✎ Terminer';
}

// Fermeture automatique en cliquant ailleurs + auto-save
document.addEventListener('click', (e) => {
  if (e.target.getAttribute && e.target.getAttribute('onclick') &&
      e.target.getAttribute('onclick').includes('toggleEdit')) return;

  ['text-overview', 'text-reading'].forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getAttribute('contenteditable') === 'true' && !el.contains(e.target)) {
      el.setAttribute('contenteditable', 'false');
      const btn = document.querySelector(`[onclick="toggleEdit('${id}')"]`);
      if (btn) btn.textContent = '✎ Éditer';
      scheduleAutoSave();
    }
  });
});

// Auto-save pendant la frappe dans les blocs texte
['text-overview', 'text-reading'].forEach(id => {
  document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', scheduleAutoSave);
  });
});
