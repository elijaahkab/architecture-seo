/* =============================================================
   Architecture SEO — Cluster Santé TNS
   js/tree.js  —  Arborescence structurelle interactive
   ============================================================= */

/* ── RENDU DE L'ARBORESCENCE ─────────────────────────────── */
function renderTree() {
  const container = document.getElementById('tree-container');
  if (!container) return;

  // Récupère les overrides sauvegardés
  const overrides = getTreeOverrides();

  const hubLabel    = overrides.hub    || 'HUB GRAND-PÈRE';
  const mereLabel   = overrides.mere   || 'PAGE MÈRE CLUSTER';

  let html = `<div class="tree-root">`;

  /* ── HUB ── */
  html += `
    <div class="tree-node tree-level-hub">
      <span class="tree-badge tree-badge-hub"
            contenteditable="true" spellcheck="false"
            data-key="hub"
            onblur="saveTreeOverride('hub',this.textContent)">${hubLabel}</span>
    </div>
    <div class="tree-branch-v"></div>
    <div class="tree-connector-row">
      <div class="tree-branch-h-short"></div>
      <div class="tree-url" onclick="window.open('${data.hub.href}','_blank')">${data.hub.url}</div>
    </div>
    <div class="tree-branch-v"></div>`;

  /* ── MÈRE ── */
  html += `
    <div class="tree-connector-row">
      <div class="tree-branch-h-short"></div>
      <div class="tree-node tree-level-mere">
        <span class="tree-badge tree-badge-mere"
              contenteditable="true" spellcheck="false"
              data-key="mere"
              onblur="saveTreeOverride('mere',this.textContent)">${mereLabel}</span>
      </div>
    </div>
    <div class="tree-branch-v"></div>
    <div class="tree-connector-row">
      <div class="tree-branch-indent"></div>
      <div class="tree-branch-h-short"></div>
      <div class="tree-url" onclick="window.open('${data.mere.href}','_blank')">${data.mere.url}</div>
    </div>
    <div class="tree-branch-v-indent"></div>`;

  /* ── CLUSTERS ── */
  data.clusters.forEach((c, ci) => {
    const isLast      = ci === data.clusters.length - 1;
    const branchChar  = isLast ? '└──' : '├──';
    const vertLine    = isLast ? '&nbsp;&nbsp;&nbsp;&nbsp;' : '│&nbsp;&nbsp;&nbsp;';
    const clusterLabel= overrides['cluster-' + c.id] || `SOUS-CLUSTER ${c.name.toUpperCase()}`;

    html += `
    <div class="tree-cluster-row">
      <div class="tree-indent-deep"></div>
      <div class="tree-branch-char">${branchChar}</div>
      <div class="tree-node tree-level-cluster" style="border-color:${c.hex || 'var(--accent)'}20">
        <span class="tree-badge"
              style="background:${c.hex || 'var(--accent)'}20;color:${c.hex || 'var(--accent)'};border:1px solid ${c.hex || 'var(--accent)'}40;"
              contenteditable="true" spellcheck="false"
              data-key="cluster-${c.id}"
              onblur="saveTreeOverride('cluster-${c.id}',this.textContent)">${clusterLabel}</span>
        <span class="tree-pages-count">(${c.pages.length} page${c.pages.length > 1 ? 's' : ''})</span>
      </div>
    </div>`;

    /* Pages du cluster */
    c.pages.forEach((p, pi) => {
      const isLastPage  = pi === c.pages.length - 1;
      const pageChar    = isLastPage ? '└──' : '├──';

      html += `
    <div class="tree-page-row">
      <div class="tree-indent-deep"></div>
      <div class="tree-vline-char">${vertLine}</div>
      <div class="tree-branch-char-sm">${pageChar}</div>
      <a class="tree-url tree-url-page" href="${p.href}" target="_blank">${p.alias}</a>
    </div>`;
    });

    /* Espace entre clusters */
    if (!isLast) {
      html += `<div class="tree-cluster-spacer"><div class="tree-indent-deep"></div><div class="tree-vline-char">│</div></div>`;
    }
  });

  html += `</div>`;
  container.innerHTML = html;

  // Met à jour le label de la topbar avec le nom du thème actif
  const topbarLabel = document.getElementById('tree-topbar-label');
  if (topbarLabel) {
    const activeTheme = (typeof getActiveTheme === 'function') ? getActiveTheme() : null;
    const themeName   = activeTheme ? activeTheme.label : 'Cluster';
    topbarLabel.textContent = `Arborescence — ${themeName}`;
  }

  renderTreeLegend();
}

/* ── RENDU DE LA LÉGENDE ─────────────────────────────────── */
function renderTreeLegend() {
  const legend = document.getElementById('tree-legend');
  if (!legend) return;

  const total = 2 + data.clusters.reduce((a, c) => a + c.pages.length, 0);
  const totalPages = data.clusters.reduce((a, c) => a + c.pages.length, 0);

  let html = `<div class="tree-legend-title">Légende</div>`;

  // Niveaux hiérarchiques
  html += `<div class="tree-legend-section">
    <div class="tree-legend-section-label">Niveaux</div>`;

  html += `
    <div class="tree-legend-item">
      <div class="tree-legend-dot" style="background:#3a5cf5"></div>
      <span class="tree-legend-badge" style="background:rgba(58,92,245,.1);color:#3a5cf5;border:1px solid rgba(58,92,245,.25);">Hub grand-père</span>
    </div>
    <div class="tree-legend-item">
      <div class="tree-legend-dot" style="background:#27ae72"></div>
      <span class="tree-legend-badge" style="background:rgba(39,174,114,.1);color:#27ae72;border:1px solid rgba(39,174,114,.25);">Page mère cluster</span>
    </div>
  </div>`;

  html += `<div class="tree-legend-divider"></div>`;

  // Sous-clusters
  html += `<div class="tree-legend-section">
    <div class="tree-legend-section-label">Sous-clusters</div>`;

  data.clusters.forEach(c => {
    const hex = c.hex || '#5a6080';
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    html += `
    <div class="tree-legend-item">
      <div class="tree-legend-dot" style="background:${hex}"></div>
      <span class="tree-legend-badge"
            style="background:rgba(${r},${g},${b},.1);color:${hex};border:1px solid rgba(${r},${g},${b},.25);"
            title="${c.name}">${c.name}</span>
    </div>`;
  });

  html += `</div>`;
  html += `<div class="tree-legend-divider"></div>`;

  // Stats rapides
  html += `
    <div class="tree-legend-stats">
      <div class="tree-legend-stat">
        <span class="tree-legend-stat-label">Niveaux</span>
        <span class="tree-legend-stat-value" style="color:var(--text)">3</span>
      </div>
      <div class="tree-legend-stat">
        <span class="tree-legend-stat-label">Clusters</span>
        <span class="tree-legend-stat-value" style="color:#27ae72">${data.clusters.length}</span>
      </div>
      <div class="tree-legend-stat">
        <span class="tree-legend-stat-label">Pages filles</span>
        <span class="tree-legend-stat-value" style="color:var(--text)">${totalPages}</span>
      </div>
      <div class="tree-legend-stat">
        <span class="tree-legend-stat-label">Total (hub+mère)</span>
        <span class="tree-legend-stat-value" style="color:var(--text-muted)">${total}</span>
      </div>
    </div>
    <div class="tree-legend-cta">
      <a class="tree-legend-cta-btn"
         href="https://b1envenue.sharepoint.com/:x:/r/sites/Team3D-Acquisitiondigitale/Documents%20partages/SEO/Contenu/Etudes%20s%C3%A9mantiques%20MH.xlsx?d=w9a4cf34a1fbd41529ce3109cb03ccc9d&csf=1&web=1&e=uOhjKk"
         target="_blank" rel="noopener noreferrer">
        <span class="cta-icon">📊</span>
        Études sémantiques
      </a>
    </div>`;

  legend.innerHTML = html;
}

const TREE_OVERRIDE_KEY = 'architecture-seo-tns:tree-overrides';

function getTreeOverrides() {
  try { return JSON.parse(localStorage.getItem(TREE_OVERRIDE_KEY) || '{}'); }
  catch(e) { return {}; }
}

function saveTreeOverride(key, value) {
  const overrides = getTreeOverrides();
  overrides[key] = value.trim();
  localStorage.setItem(TREE_OVERRIDE_KEY, JSON.stringify(overrides));
  scheduleAutoSave();
}

function resetTree() {
  if (!confirm('Réinitialiser l\'arborescence vers les données d\'origine ?')) return;
  localStorage.removeItem(TREE_OVERRIDE_KEY);
  renderTree();
  showToast('↺ Arborescence réinitialisée');
}

/* ── EXPORT PDF (via impression navigateur) ──────────────── */
function exportTreePDF() {
  // Injecte un style d'impression temporaire
  const style = document.createElement('style');
  style.id = 'tree-print-style';
  style.textContent = `
    @media print {
      body > * { display: none !important; }
      #tree-print-wrapper { display: block !important; }
    }
    #tree-print-wrapper {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: white;
      z-index: 99999;
      padding: 40px;
      box-sizing: border-box;
      font-family: 'Courier New', monospace;
      overflow: auto;
    }
  `;
  document.head.appendChild(style);

  // Construit le HTML d'impression
  const printDiv = document.createElement('div');
  printDiv.id = 'tree-print-wrapper';
  printDiv.innerHTML = `
    <div style="margin-bottom:24px;border-bottom:2px solid #333;padding-bottom:16px;">
      <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#666;margin-bottom:6px;">Architecture SEO</div>
      <div style="font-family:Arial,sans-serif;font-size:20px;font-weight:800;color:#111;">Arborescence structurelle — Cluster Santé TNS</div>
      <div style="font-family:Arial,sans-serif;font-size:11px;color:#999;margin-top:4px;">Généré le ${new Date().toLocaleDateString('fr-FR', {day:'2-digit',month:'long',year:'numeric'})}</div>
    </div>
    <pre style="font-family:'Courier New',monospace;font-size:12px;line-height:1.8;color:#111;white-space:pre;">${buildTreeText()}</pre>
  `;
  document.body.appendChild(printDiv);

  setTimeout(() => {
    window.print();
    setTimeout(() => {
      document.body.removeChild(printDiv);
      document.head.removeChild(style);
    }, 500);
  }, 200);

  showToast('↓ Fenêtre d\'impression ouverte — choisissez "Enregistrer en PDF"');
}

/* ── EXPORT WORD (.docx) via Blob ────────────────────────── */
async function exportTreeDOCX() {
  const btn = document.getElementById('btn-export-docx');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Génération…'; }

  try {
    const overrides = getTreeOverrides();
    const hubLabel  = overrides.hub  || 'HUB GRAND-PÈRE';
    const mereLabel = overrides.mere || 'PAGE MÈRE CLUSTER';

    // Construit le contenu XML Word (format WordprocessingML simplifié)
    const lines = buildTreeLines(overrides);

    // Génère le XML du document Word
    const docXml = buildWordXML(hubLabel, mereLabel, lines);

    // Crée le fichier DOCX (ZIP)
    const blob = await buildDOCXBlob(docXml);
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'arborescence-seo-tns.docx';
    a.click();
    URL.revokeObjectURL(url);
    showToast('✓ Fichier Word téléchargé');
  } catch(e) {
    console.error(e);
    showToast('✗ Erreur lors de la génération Word : ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '↓ Word (.docx)'; }
  }
}

/* ── CONSTRUCTION DU TEXTE ASCII ─────────────────────────── */
function buildTreeText() {
  const overrides = getTreeOverrides();
  const lines = [];

  lines.push(`${overrides.hub || 'HUB GRAND-PÈRE'}`);
  lines.push(`└── ${data.hub.url}`);
  lines.push(`    │`);
  lines.push(`    └── ${overrides.mere || 'PAGE MÈRE CLUSTER'}`);
  lines.push(`        └── ${data.mere.url}`);

  data.clusters.forEach((c, ci) => {
    const isLast  = ci === data.clusters.length - 1;
    const prefix  = isLast ? '└──' : '├──';
    const vline   = isLast ? ' ' : '│';
    const label   = overrides['cluster-' + c.id] || `SOUS-CLUSTER ${c.name.toUpperCase()}`;

    lines.push(`        │`);
    lines.push(`        ${prefix} ${label} (${c.pages.length} page${c.pages.length > 1 ? 's' : ''})`);

    c.pages.forEach((p, pi) => {
      const isLastPage = pi === c.pages.length - 1;
      const pagePrefix = isLastPage ? '└──' : '├──';
      lines.push(`        ${vline}   ${pagePrefix} ${p.alias}`);
    });
  });

  return lines.join('\n');
}

function buildTreeLines(overrides) {
  const lines = [];
  lines.push({ text: overrides.hub || 'HUB GRAND-PÈRE', type: 'hub', indent: 0 });
  lines.push({ text: `└── ${data.hub.url}`, type: 'url', indent: 0 });
  lines.push({ text: '    │', type: 'branch', indent: 0 });
  lines.push({ text: `    └── ${overrides.mere || 'PAGE MÈRE CLUSTER'}`, type: 'mere', indent: 1 });
  lines.push({ text: `        └── ${data.mere.url}`, type: 'url', indent: 1 });

  data.clusters.forEach((c, ci) => {
    const isLast = ci === data.clusters.length - 1;
    const prefix = isLast ? '└──' : '├──';
    const vline  = isLast ? ' ' : '│';
    const label  = overrides['cluster-' + c.id] || `SOUS-CLUSTER ${c.name.toUpperCase()}`;

    lines.push({ text: '        │', type: 'branch', indent: 2 });
    lines.push({ text: `        ${prefix} ${label} (${c.pages.length} page${c.pages.length > 1 ? 's' : ''})`, type: 'cluster', indent: 2, color: c.hex });

    c.pages.forEach((p, pi) => {
      const isLastPage = pi === c.pages.length - 1;
      const pagePrefix = isLastPage ? '└──' : '├──';
      lines.push({ text: `        ${vline}   ${pagePrefix} ${p.alias}`, type: 'page', indent: 3 });
    });
  });

  return lines;
}

/* ── GÉNÉRATION XML WORD ─────────────────────────────────── */
function buildWordXML(hubLabel, mereLabel, lines) {
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  const paragraphs = lines.map(line => {
    let color = '111111';
    let bold  = 'false';
    let size  = '20'; // 10pt

    if (line.type === 'hub') {
      color = 'D48C0A'; bold = 'true'; size = '22';
    } else if (line.type === 'mere') {
      color = '9333EA'; bold = 'true'; size = '22';
    } else if (line.type === 'cluster') {
      color = (line.color || '#5a6080').replace('#','');
      bold  = 'true'; size = '20';
    }

    return `
    <w:p>
      <w:pPr>
        <w:spacing w:line="320" w:lineRule="auto"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/>
          <w:sz w:val="${size}"/>
          ${bold === 'true' ? '<w:b/>' : ''}
          <w:color w:val="${color}"/>
        </w:rPr>
        <w:t xml:space="preserve">${esc(line.text)}</w:t>
      </w:r>
    </w:p>`;
  }).join('');

  const date = new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric' });

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
  xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    <w:p>
      <w:pPr><w:spacing w:after="80"/></w:pPr>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Arial" w:hAnsi="Arial"/>
          <w:sz w:val="16"/>
          <w:color w:val="999999"/>
        </w:rPr>
        <w:t>Architecture SEO — Cluster Santé TNS</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="40"/></w:pPr>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Arial" w:hAnsi="Arial"/>
          <w:sz w:val="36"/>
          <w:b/>
          <w:color w:val="111827"/>
        </w:rPr>
        <w:t>Arborescence structurelle</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:pPr>
        <w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="E2E8F0"/></w:pBdr>
        <w:spacing w:after="240"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Arial" w:hAnsi="Arial"/>
          <w:sz w:val="16"/>
          <w:color w:val="9CA3AF"/>
        </w:rPr>
        <w:t>Généré le ${esc(date)}</w:t>
      </w:r>
    </w:p>
    ${paragraphs}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/>
    </w:sectPr>
  </w:body>
</w:document>`;
}

/* ── CONSTRUCTION DU BLOB DOCX (ZIP minimal) ─────────────── */
async function buildDOCXBlob(docXml) {
  // Utilise JSZip si disponible, sinon fallback vers Blob texte
  if (typeof JSZip !== 'undefined') {
    const zip = new JSZip();

    zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);

    zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

    zip.file('word/document.xml', docXml);

    zip.file('word/_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`);

    return await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  }

  // Fallback : exporte en .txt si JSZip indisponible
  showToast('⚠️ Export Word non disponible — téléchargement en .txt');
  return new Blob([buildTreeText()], { type: 'text/plain;charset=utf-8' });
}
