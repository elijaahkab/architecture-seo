/* =============================================================
   Architect-SEO — Plateforme SEO Malakoff Humanis
   js/home.js  —  Page d'accueil, À propos & navigation
   ============================================================= */


/* ── MENU DÉROULANT THÉMATIQUES ─────────────────────────── */
function toggleNavDropdown(e) {
  e.stopPropagation();
  const dd  = document.getElementById('nav-themes-dropdown');
  const btn = dd ? dd.querySelector('.home-navbar-dropdown-btn') : null;
  if (!dd) return;
  const isOpen = dd.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', String(isOpen));
}

function openThemeFromNav(themeId) {
  // Ferme le dropdown
  const dd = document.getElementById('nav-themes-dropdown');
  if (dd) dd.classList.remove('open');
  // Ouvre la thématique
  openTheme(themeId);
}

// Ferme le dropdown en cliquant ailleurs
document.addEventListener('click', function() {
  const dd = document.getElementById('nav-themes-dropdown');
  if (dd && dd.classList.contains('open')) {
    dd.classList.remove('open');
    const btn = dd.querySelector('.home-navbar-dropdown-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
});

/* ── SYNC DARK MODE ICON NAVBAR HOME ─────────────────────── */
function _syncHomeNavbarDark() {
  const isDark = document.body.classList.contains('dark');
  ['mode-icon-home', 'mode-icon-about'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = isDark ? '☀️' : '🌙';
  });
}

const _origToggleDark = window.toggleDark;
window.toggleDark = function() {
  if (typeof _origToggleDark === 'function') _origToggleDark();
  _syncHomeNavbarDark();
};

/* ── MÉTADONNÉES DES THÉMATIQUES ─────────────────────────── */
const THEME_META = {
  tns: {
    icon: '🏥',
    desc: 'Architecture SEO du cluster Mutuelle TNS — intentions informationnelles, comparatives et commerciales pour les travailleurs non-salariés.',
  },
  ae: {
    icon: '🏠',
    desc: 'Architecture SEO du cluster Assurance Emprunteur — cadres légaux, profils emprunteurs, types de prêts, risques santé et gestion de contrat.',
  }
};

/* ═══════════════════════════════════════════════════════════
   PAGE D'ACCUEIL
   ═══════════════════════════════════════════════════════════ */
function renderHome() {
  const homeView = document.getElementById('view-home');
  if (!homeView) return;

  const totalPages = THEMES_ORDER.reduce((a,id) => a + 2 + THEMES[id].clusters.reduce((b,c)=>b+c.pages.length,0), 0);

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
           onclick="openTheme('${id}')" role="button" tabindex="0"
           onkeydown="if(event.key==='Enter')openTheme('${id}')">
        <div class="home-card-header">
          <div class="home-card-icon">${meta.icon}</div>
          <span class="home-card-arrow">↗</span>
        </div>
        <div class="home-card-name">${theme.label}</div>
        <div class="home-card-desc">${meta.desc}</div>
        <div class="home-card-footer">
          <div class="home-card-stat"><span class="home-card-stat-val">${total}</span><span>pages</span></div>
          <div class="home-card-stat-sep"></div>
          <div class="home-card-stat"><span class="home-card-stat-val">${theme.clusters.length}</span><span>clusters</span></div>
          <div class="home-card-stat-sep"></div>
          <div class="home-card-stat"><span class="home-card-stat-val">3</span><span>niveaux</span></div>
          <div class="home-card-cta">Ouvrir →</div>
        </div>
      </div>`;
  }).join('');

  const footerThemeLinks = THEMES_ORDER.map(id =>
    `<button class="home-footer-link" onclick="openTheme('${id}')">${THEMES[id].label}</button>`
  ).join('');

  homeView.innerHTML = `
    <!-- Navbar sticky -->
    <nav class="home-navbar" role="navigation" aria-label="Navigation principale">
      <div class="home-navbar-brand">
        <span class="home-navbar-logo">Architect<span>-SEO</span></span>
      </div>
      <div class="home-navbar-nav">
        <span class="home-navbar-link active">Accueil</span>

        <!-- Menu déroulant Thématiques -->
        <div class="home-navbar-dropdown" id="nav-themes-dropdown">
          <button class="home-navbar-dropdown-btn"
                  onclick="toggleNavDropdown(event)"
                  aria-haspopup="true" aria-expanded="false">
            Thématiques
            <span class="home-navbar-dropdown-chevron">▾</span>
          </button>
          <div class="home-navbar-dropdown-menu" role="menu">
            ${THEMES_ORDER.map(id => {
              const t = THEMES[id];
              const meta = THEME_META[id] || { icon: '📁' };
              const total = 2 + t.clusters.reduce((a,c) => a + c.pages.length, 0);
              return `
            <button class="home-navbar-dropdown-item"
                    onclick="openThemeFromNav('${id}')" role="menuitem">
              <span class="home-navbar-dd-dot" style="background:${t.accentColor}"></span>
              <div class="home-navbar-dd-info">
                <span class="home-navbar-dd-name">${t.label}</span>
                <span class="home-navbar-dd-count">${total} pages · ${t.clusters.length} clusters</span>
              </div>
              <span class="home-navbar-dd-arrow">↗</span>
            </button>`;
            }).join('')}
          </div>
        </div>

        <button class="home-navbar-link" onclick="showAbout()">À propos</button>
      </div>
      <div class="home-navbar-actions">
        <button class="home-dark-btn" onclick="toggleDark()" title="Changer le thème">
          <span id="mode-icon-home">🌙</span>
        </button>
      </div>
    </nav>

    <!-- Hero -->
    <div class="home-hero">
      <div class="home-hero-inner">
        <div class="home-eyebrow"><span class="home-eyebrow-dot"></span>Malakoff Humanis · Plateforme SEO</div>
        <h1 class="home-title">Architecture<br><span class="home-title-accent">SEO</span></h1>
        <p class="home-subtitle">Pilotez, visualisez et optimisez l'architecture de vos clusters SEO. Maillage interne, arborescences et recommandations IA en un seul outil.</p>
        <div class="home-divider"></div>
      </div>
    </div>

    <!-- Thématiques -->
    <div class="home-themes-section">
      <div class="home-themes-label">
        Thématiques disponibles
        <span class="home-themes-label-count">${THEMES_ORDER.length} verticale${THEMES_ORDER.length > 1 ? 's' : ''} · ${totalPages} pages indexées</span>
      </div>
      <div class="home-themes-grid">${cards}</div>
    </div>`;

  // FAQ
  const faqSection = document.createElement('div');
  faqSection.className = 'home-faq-section';
  homeView.appendChild(faqSection);
  renderFAQ(faqSection);

  // Footer site
  const siteFooter = document.createElement('footer');
  siteFooter.className = 'home-site-footer';
  siteFooter.setAttribute('role', 'contentinfo');
  siteFooter.innerHTML = `
    <div class="home-site-footer-brand">
      <span class="home-site-footer-logo">Architect<span>-SEO</span></span>
      <div class="home-site-footer-sep"></div>
      <span class="home-site-footer-copy">© 2026 Malakoff Humanis</span>
    </div>
    <div class="home-site-footer-right">
      <div>
        <div class="home-footer-col-title">Verticales</div>
        <div class="home-footer-links">${footerThemeLinks}</div>
      </div>
    </div>`;
  homeView.appendChild(siteFooter);

  _syncHomeNavbarDark();
}

/* ═══════════════════════════════════════════════════════════
   PAGE À PROPOS
   ═══════════════════════════════════════════════════════════ */
function renderAbout() {
  let view = document.getElementById('view-about');
  if (!view) {
    view = document.createElement('div');
    view.id = 'view-about';
    document.body.insertBefore(view, document.getElementById('view-home').nextSibling);
  }

  view.innerHTML = `
    <nav class="about-navbar">
      <button class="about-back" onclick="showHome()">← Retour à l'accueil</button>
      <span class="home-navbar-logo" style="position:absolute;left:50%;transform:translateX(-50%)">Architect<span>-SEO</span></span>
      <button class="home-dark-btn" onclick="toggleDark()" title="Changer le thème">
        <span id="mode-icon-about">🌙</span>
      </button>
    </nav>

    <div class="about-hero">
      <div class="about-eyebrow">À propos de l'application</div>
      <h1 class="about-title">Une plateforme SEO pensée pour l'excellence digitale de Malakoff Humanis</h1>
      <p class="about-lead">
        Architect-SEO est un outil de pilotage interne qui centralise l'architecture éditoriale
        de <a href="https://www.malakoffhumanis.com" target="_blank" rel="noopener"><strong>malakoffhumanis.com</strong></a>, optimise le maillage interne et renforce
        les signaux de référencement naturel envoyés à Google.
      </p>
    </div>

    <div class="about-content">

      <div class="about-section">
        <div class="about-section-title"><span class="about-section-icon">🎯</span> Pourquoi cette application ?</div>
        <div class="about-section-body">
          <p>Le site <a href="https://www.malakoffhumanis.com" target="_blank" rel="noopener"><strong>malakoffhumanis.com</strong></a> couvre des dizaines de thématiques éditoriales complexes — mutuelle TNS, assurance emprunteur, prévoyance, épargne retraite, santé au travail — chacune composée de dizaines à plusieurs centaines de pages. Sans outil dédié, la gestion de cette architecture devient rapidement opaque : les équipes peinent à visualiser les relations entre les pages, les liens internes sont créés de façon non structurée, et les opportunités de maillage restent inexploitées.</p>
          <p>Architect-SEO répond à ce besoin en offrant une <strong>vision claire, exhaustive et actionnable</strong> de l'architecture de chaque cluster SEO du site, directement dans le navigateur, sans dépendance à un outil tiers.</p>
        </div>
      </div>

      <div class="about-highlight-grid">
        <div class="about-highlight-card">
          <div class="about-highlight-card-icon">🗺️</div>
          <div class="about-highlight-card-title">Visualisation de l'architecture</div>
          <div class="about-highlight-card-text">Arborescences interactives Hub → Mère → Clusters, tableau de répartition des pages, sidebar de navigation.</div>
        </div>

        <div class="about-highlight-card">
          <div class="about-highlight-card-icon">📊</div>
          <div class="about-highlight-card-title">Gestion multi-thématiques</div>
          <div class="about-highlight-card-text">Navigation fluide entre verticales, données sauvegardées par thème, export JSON de l'architecture complète.</div>
        </div>
        <div class="about-highlight-card">
          <div class="about-highlight-card-icon">🤖</div>
          <div class="about-highlight-card-title">Optimisation GEO</div>
          <div class="about-highlight-card-text">Données structurées Schema.org, signaux E-E-A-T renforcés, architecture lisible par les LLMs et moteurs génératifs.</div>
        </div>
      </div>

      <div class="about-section">
        <div class="about-section-title"><span class="about-section-icon">📈</span> Impact SEO concret</div>
        <div class="about-section-body">
          <p>L'architecture en <strong>cocon sémantique</strong> implémentée dans cette plateforme est l'une des stratégies SEO les plus efficaces pour renforcer l'autorité thématique d'un site. En organisant les pages en clusters hiérarchisés (Hub → Page mère → Sous-clusters), on envoie à Google des signaux clairs de <strong>profondeur d'expertise</strong> sur chaque sujet traité.</p>
          <p>Le maillage interne structuré améliore la <strong>distribution du PageRank</strong>, facilite le crawl des robots d'indexation et réduit le taux de pages orphelines — des facteurs directement corrélés aux positions dans les résultats de recherche.</p>
        </div>
      </div>

      <div class="about-section">
        <div class="about-section-title"><span class="about-section-icon">✨</span> Signaux E-E-A-T & GEO</div>
        <div class="about-section-body">
          <p><strong>E-E-A-T</strong> (Experience, Expertise, Authoritativeness, Trustworthiness) est le cadre d'évaluation de la qualité utilisé par Google. Cette plateforme y contribue en organisant le contenu par domaine de compétence précis, en connectant chaque page aux ressources légales et réglementaires pertinentes, et en assurant une cohérence thématique sur l'ensemble du site.</p>
          <p>Du côté de la <strong>GEO (Generative Engine Optimization)</strong>, l'application intègre des données structurées Schema.org qui aident les moteurs génératifs (ChatGPT, Perplexity, Google AI Overviews) à identifier et citer Malakoff Humanis comme source d'autorité sur ses thématiques cœur.</p>
        </div>
      </div>

      <div class="about-section">
        <div class="about-section-title"><span class="about-section-icon">🏗️</span> Architecture technique</div>
        <div class="about-section-body">
          <p>L'application est développée en <strong>HTML/CSS/JavaScript vanilla</strong>, sans framework, pour une portabilité maximale. Elle fonctionne entièrement en local (fichier <code>index.html</code>) ou peut être hébergée sur n'importe quel serveur statique. Les données sont persistées en <strong>localStorage</strong> par thématique.</p>
        </div>
      </div>

      <div class="about-divider"></div>
    </div>

    <footer class="home-site-footer" role="contentinfo">
      <div class="home-site-footer-brand">
        <span class="home-site-footer-logo">Architect<span>-SEO</span></span>
        <div class="home-site-footer-sep"></div>
        <span class="home-site-footer-copy">© 2026 Malakoff Humanis</span>
      </div>
      <div class="home-site-footer-right">
      </div>
    </footer>`;

  _syncHomeNavbarDark();
}

/* ── GESTION CENTRALISÉE DU BOUTON BACK-TO-TOP ───────────── */
// context : 'home' | 'about' | 'dashboard'
// scrollEl : élément scrollant (window ou .main)
let _btnTopScrollHandler = null;

function _setupBtnTop(context, mainEl) {
  const btnTop = document.getElementById('btn-top');
  if (!btnTop) return;

  // 1. Masque immédiatement
  btnTop.classList.remove('visible');

  // 2. Retire l'ancien listener s'il existe
  if (_btnTopScrollHandler) {
    window.removeEventListener('scroll', _btnTopScrollHandler);
    if (_btnTopScrollHandler._target) {
      _btnTopScrollHandler._target.removeEventListener('scroll', _btnTopScrollHandler);
    }
    _btnTopScrollHandler = null;
  }

  if (context === 'dashboard' && mainEl) {
    // Scroll sur .main
    btnTop.onclick = () => mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    _btnTopScrollHandler = function() {
      btnTop.classList.toggle('visible', mainEl.scrollTop > 300);
    };
    _btnTopScrollHandler._target = mainEl;
    mainEl.addEventListener('scroll', _btnTopScrollHandler);

  } else if (context === 'home' || context === 'about') {
    // Scroll sur window — requestAnimationFrame assure que html.on-home
    // est appliqué (overflow: auto) avant de brancher le listener
    btnTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    _btnTopScrollHandler = function() {
      btnTop.classList.toggle('visible', window.scrollY > 300);
    };
    requestAnimationFrame(() => {
      window.addEventListener('scroll', _btnTopScrollHandler);
      btnTop.classList.toggle('visible', window.scrollY > 300);
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════ */
function showHome() {
  const homeView  = document.getElementById('view-home');
  const dashView  = document.getElementById('view-dashboard');
  const aboutView = document.getElementById('view-about');
  const btnHome   = document.getElementById('btn-go-home');
  const btnTop    = document.getElementById('btn-top');

  if (homeView)  { homeView.style.display = 'flex'; homeView.classList.add('view-fade-in'); }
  if (dashView)    dashView.style.display = 'none';
  if (aboutView)   aboutView.style.display = 'none';

  document.body.classList.add('on-home');
  document.body.classList.remove('on-about');
  document.documentElement.classList.add('on-home');
  document.documentElement.classList.remove('on-about');

  if (btnHome) btnHome.style.display = 'none';

  try { localStorage.setItem('architecture-seo:active-view', 'home'); } catch(e) {}

  window.scrollTo({ top: 0, behavior: 'instant' });
  document.title = 'Architect-SEO — Plateforme SEO Malakoff Humanis';

  // btn-top : masque immédiatement, rebranché sur window.scroll
  _setupBtnTop('home');
}

function showAbout() {
  const homeView = document.getElementById('view-home');
  const dashView = document.getElementById('view-dashboard');

  if (homeView) homeView.style.display = 'none';
  if (dashView) dashView.style.display = 'none';

  // renderAbout() crée ou recrée le div#view-about
  renderAbout();

  // Récupère le div APRÈS sa création
  const aboutView = document.getElementById('view-about');
  if (aboutView) {
    aboutView.style.display = 'flex';
    void aboutView.offsetWidth;
    aboutView.classList.add('view-fade-in');
  }

  document.body.classList.add('on-home', 'on-about');
  document.documentElement.classList.add('on-home', 'on-about');

  window.scrollTo({ top: 0, behavior: 'instant' });
  document.title = 'À propos — Architect-SEO';
  _setupBtnTop('about');
  _syncHomeNavbarDark();
}

function openTheme(themeId) {
  const homeView  = document.getElementById('view-home');
  const dashView  = document.getElementById('view-dashboard');
  const aboutView = document.getElementById('view-about');
  const btnHome   = document.getElementById('btn-go-home');
  const btnTop    = document.getElementById('btn-top');
  const main      = document.querySelector('.main');

  if (homeView)  homeView.style.display  = 'none';
  if (aboutView) aboutView.style.display = 'none';
  if (dashView) {
    dashView.style.display = 'block';
    dashView.classList.remove('view-fade-in');
    void dashView.offsetWidth;
    dashView.classList.add('view-fade-in');
  }

  document.body.classList.remove('on-home', 'on-about');
  document.documentElement.classList.remove('on-home', 'on-about');

  if (btnHome) btnHome.style.display = 'flex';

  // btn-top rebranché sur .main, caché immédiatement
  _setupBtnTop('dashboard', main);

  if (themeId !== _activeThemeId) {
    switchTheme(themeId);
  } else {
    document.title = `Architecture SEO — ${THEMES[themeId].label}`;
    updateThemeHeader(themeId);
  }

  if (main) main.scrollTo({ top: 0, behavior: 'instant' });
}

/* ═══════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════ */
function initHome() {
  // Bouton ← Accueil dans le header dashboard
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

  renderHome();

  const savedView = window._savedView;
  const wasOnDashboard = savedView && savedView !== 'home' && THEMES[savedView];

  if (wasOnDashboard) {
    openTheme(savedView);
  } else {
    document.body.classList.add('on-home');
    document.documentElement.classList.add('on-home');
    showHome();
  }
}

/* ═══════════════════════════════════════════════════════════
   FAQ — Données, accordion & schema JSON-LD
   ═══════════════════════════════════════════════════════════ */
const FAQ_DATA = [
  {
    q: "À quoi sert cette application web ?",
    a: `Cette plateforme est un <strong>outil de pilotage SEO</strong> développé pour les équipes digitales de Malakoff Humanis. Elle centralise la gestion, la visualisation et l'optimisation de l'architecture de contenu du site <a href="https://www.malakoffhumanis.com" target="_blank" rel="noopener">malakoffhumanis.com</a>. Elle permet de superviser l'organisation des pages par thématique, de piloter le maillage interne et de générer des recommandations stratégiques grâce à une intelligence artificielle spécialisée en référencement naturel.`
  },
  {
    q: "Qu'est-ce qu'un cluster SEO et comment est-il structuré ici ?",
    a: `Un <strong>cluster SEO</strong> (ou cocon sémantique) est un ensemble de pages web organisées autour d'une thématique centrale, reliées entre elles par un maillage interne cohérent. Dans cette application, chaque cluster suit une hiérarchie précise en 3 niveaux : <strong>Hub grand-père</strong> (catégorie générale), <strong>Page mère cluster</strong> (page pilier de la thématique), et <strong>Sous-clusters</strong> (groupes de pages filles organisées par intention de recherche). Cette architecture envoie des signaux de pertinence thématique forts aux moteurs de recherche.`
  },
  {
    q: "Quelles thématiques éditoriales sont actuellement gérées ?",
    a: `L'application gère actuellement <strong>deux grandes thématiques</strong> : <strong>Santé TNS</strong> (23 pages, 5 sous-clusters couvrant les mutuelles pour travailleurs non-salariés) et <strong>Assurance Emprunteur</strong> (71 pages, 8 sous-clusters couvrant les cadres légaux, profils emprunteurs, types de prêts et gestion de contrat). D'autres verticales seront progressivement intégrées.`
  },
  {
    q: "Comment les sous-clusters sont-ils construits et nommés ?",
    a: `Chaque sous-cluster regroupe des pages partageant la <strong>même intention de recherche principale</strong>. Le nommage reflète l'univers thématique commun des slugs d'URL. Par exemple, <strong>"Profils Emprunteurs"</strong> rassemble les pages ciblant un segment spécifique (senior, jeune, fumeur, militaire…), tandis que <strong>"Cadres Légaux"</strong> regroupe les pages dédiées aux lois encadrant l'assurance emprunteur. Cette organisation permet à Google d'identifier les champs de compétence éditoriaux du site.`
  },
  {
    q: "Qu'est-ce que le maillage interne et pourquoi est-il important pour le SEO ?",
    a: `Le <strong>maillage interne</strong> désigne l'ensemble des liens hypertextes reliant les pages d'un même site. C'est l'un des leviers SEO on-page les plus puissants : il distribue le PageRank, aide Google à crawler et indexer toutes les pages, renforce la pertinence thématique et améliore l'expérience utilisateur en guidant vers des contenus connexes. Un maillage structuré en cocon sémantique est particulièrement efficace pour consolider les positions dans les résultats de recherche.`
  },
  {
    q: "Qu'est-ce que les signaux E-E-A-T et comment cette application y contribue-t-elle ?",
    a: `<strong>E-E-A-T</strong> (Experience, Expertise, Authoritativeness, Trustworthiness) est le cadre d'évaluation de qualité de Google. Cette plateforme y contribue en organisant les contenus par domaine de compétence précis, en construisant un maillage interne dense qui consolide le positionnement thématique, et en assurant que chaque page est connectée aux ressources légales et réglementaires pertinentes. Une architecture SEO solide est le socle de toute stratégie E-E-A-T efficace.`
  },
  {
    q: "L'application est-elle adaptée à la GEO (Generative Engine Optimization) ?",
    a: `Oui. La <strong>GEO</strong> désigne les pratiques visant à optimiser la visibilité dans les réponses générées par les IA (ChatGPT, Google AI Overviews, Perplexity…). Cette application y contribue via les <strong>données structurées FAQ</strong> Schema.org intégrées dans cette page, une architecture de cocon sémantique claire que les IA peuvent cartographier, et un maillage interne dense qui crée un graphe de connaissances cohérent interprétable comme source fiable.`
  },
  // FAQ_AGENT_START (masquée en v1)
  /*
  {
    q: "Comment fonctionne l'agent IA de recommandation de maillage ?",
    a: `L'<strong>agent de maillage interne</strong> est propulsé par Claude (Anthropic). Pour chaque page du cluster, il applique une méthodologie en 5 phases : analyse du contexte et de la topologie, calcul du volume d'opportunités, scoring de pertinence sur 5 niveaux, identification des gaps sémantiques, puis génération d'un rapport structuré. Il produit pour chaque page : son niveau dans le cocon, les ancres exactes à utiliser, les phrases d'insertion, les backlinks internes à créer et les sujets non couverts à développer.`
  },
  */
  // FAQ_AGENT_END
  // FAQ_THEMES_START (masquée en v1)
  /*
  {
    q: "Peut-on ajouter de nouvelles thématiques dans l'application ?",
    a: `Oui. L'application est conçue avec une <strong>architecture multi-thématiques extensible</strong>. Chaque nouvelle verticale peut être intégrée avec sa propre hiérarchie Hub → Page mère → Sous-clusters. Le menu de navigation s'enrichit automatiquement. Une fonctionnalité de création guidée avec import d'URLs en masse et suggestion automatique de clusters par IA est en cours de développement.`
  },
  */
  // FAQ_THEMES_END
];

function renderFAQ(container) {
  const itemsHtml = FAQ_DATA.map((item, i) => `
    <div class="faq-item" id="faq-item-${i}" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <button class="faq-question" onclick="toggleFAQ(${i})" aria-expanded="false" aria-controls="faq-ans-${i}">
        <div class="faq-q-icon">+</div>
        <span class="faq-q-text" itemprop="name">${item.q}</span>
        <span class="faq-chevron" aria-hidden="true">▾</span>
      </button>
      <div class="faq-answer" id="faq-ans-${i}" role="region">
        <div class="faq-answer-inner" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <span itemprop="text">${item.a}</span>
        </div>
      </div>
    </div>`).join('');

  container.innerHTML = `
    <div class="home-faq-label">Questions fréquentes</div>
    <p class="home-faq-intro">Tout ce que vous devez savoir sur cette plateforme de pilotage SEO, l'architecture de contenu et les stratégies de maillage interne.</p>
    <div class="faq-list" itemscope itemtype="https://schema.org/FAQPage">${itemsHtml}</div>`;

  injectFAQSchema();
}

function toggleFAQ(index) {
  const item   = document.getElementById(`faq-item-${index}`);
  const btn    = item.querySelector('.faq-question');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => {
    if (el !== item) {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    }
  });
  item.classList.toggle('open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
}

function injectFAQSchema() {
  const existing = document.getElementById('faq-jsonld');
  if (existing) existing.remove();
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Architect-SEO — Plateforme de pilotage SEO Malakoff Humanis",
    "description": "Questions fréquentes sur la plateforme de gestion de l'architecture SEO de malakoffhumanis.com.",
    "url": "https://www.malakoffhumanis.com",
    "publisher": { "@type": "Organization", "name": "Malakoff Humanis", "url": "https://www.malakoffhumanis.com" },
    "mainEntity": FAQ_DATA.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() }
    }))
  };
  const script = document.createElement('script');
  script.id = 'faq-jsonld';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}
