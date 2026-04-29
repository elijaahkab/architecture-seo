/* =============================================================
   Architecture SEO — Application Multi-Thématiques
   js/themes.js  —  Données de toutes les thématiques
   ============================================================= */

const BASE = 'https://www.malakoffhumanis.com';

/* ═══════════════════════════════════════════════════════════
   THÉMATIQUE 1 — SANTÉ TNS
   ═══════════════════════════════════════════════════════════ */
const BASE_TNS = BASE + '/independants/mutuelle';

const THEME_TNS = {
  id: 'tns',
  label: 'Santé TNS',
  shortLabel: 'Santé TNS',
  accentColor: '#3a5cf5',
  hub: {
    url: '/independants/',
    href: BASE + '/independants/',
    label: 'Hub grand-père'
  },
  mere: {
    url: '/independants/mutuelle/',
    href: BASE + '/independants/mutuelle/',
    label: 'Page mère cluster'
  },
  overview: "L'architecture du cluster Santé TNS s'organise autour d'un hub grand-père <code>/independants/</code>, d'une page mère cluster <code>/independants/mutuelle/</code>, puis de cinq sous-clusters thématiques structurés pour couvrir les intentions informationnelles, comparatives, commerciales et pratiques du sujet.",
  reading: "Le sous-cluster Métier constitue le cœur de couverture sémantique avec 8 pages. Les ensembles Commercial / Offre et Tarif / Pratique répondent davantage à des intentions de conversion, tandis que le bloc Statut / Structurel renforce la pédagogie SEO autour du cadre TNS.",
  clusters: [
    {
      id: 'auto', name: 'Auto-entrepreneur',
      color: 'auto', colorVar: '--auto', hex: '#d48c0a',
      pages: [
        { alias: '/mutuelle-auto-entrepreneur/',             href: BASE_TNS + '/mutuelle-auto-entrepreneur/' },
        { alias: '/mutuelle-auto-entrepreneur-obligatoire/', href: BASE_TNS + '/mutuelle-auto-entrepreneur-obligatoire/' },
        { alias: '/mutuelle-auto-entrepreneur-comparatif/', href: BASE_TNS + '/mutuelle-auto-entrepreneur-comparatif/' },
        { alias: '/mutuelle-auto-entrepreneur-prix/',        href: BASE_TNS + '/mutuelle-auto-entrepreneur-prix/' }
      ]
    },
    {
      id: 'metier', name: 'Métier',
      color: 'metier', colorVar: '--metier', hex: '#9333ea',
      pages: [
        { alias: '/mutuelle-artisan/',                          href: BASE_TNS + '/mutuelle-artisan/' },
        { alias: '/mutuelle-commercant/',                       href: BASE_TNS + '/mutuelle-commercant/' },
        { alias: '/mutuelle-profession-liberale/',              href: BASE_TNS + '/mutuelle-profession-liberale/' },
        { alias: '/mutuelle-freelance/',                        href: BASE_TNS + '/mutuelle-freelance/' },
        { alias: '/mutuelle-notaire/',                          href: BASE_TNS + '/mutuelle-notaire/' },
        { alias: '/mutuelle-boulangerie/',                      href: BASE_TNS + '/mutuelle-boulangerie/' },
        { alias: '/mutuelle-naturopathe/',                      href: BASE_TNS + '/mutuelle-naturopathe/' },
        { alias: '/mutuelle-exploitants-agricoles-independants/', href: BASE_TNS + '/mutuelle-exploitants-agricoles-independants/' }
      ]
    },
    {
      id: 'statut', name: 'Statut / Structurel',
      color: 'statut', colorVar: '--statut', hex: '#0891b2',
      pages: [
        { alias: '/mutuelle-gerant-eurl/',                     href: BASE_TNS + '/mutuelle-gerant-eurl/' },
        { alias: '/comprendre-statut-conjoint-collaborateur/', href: BASE_TNS + '/comprendre-statut-conjoint-collaborateur/' },
        { alias: '/regime-tns/',                               href: BASE_TNS + '/regime-tns/' }
      ]
    },
    {
      id: 'commercial', name: 'Commercial / Offre',
      color: 'commercial', colorVar: '--commercial', hex: '#e84545',
      pages: [
        { alias: '/devis-mutuelle-tns/',     href: BASE_TNS + '/devis-mutuelle-tns/' },
        { alias: '/meilleure-mutuelle-tns/', href: BASE_TNS + '/meilleure-mutuelle-tns/' }
      ]
    },
    {
      id: 'tarif', name: 'Tarif / Pratique',
      color: 'tarif', colorVar: '--tarif', hex: '#ea6c10',
      pages: [
        { alias: '/mutuelle-tns-pas-chere/',  href: BASE_TNS + '/mutuelle-tns-pas-chere/' },
        { alias: '/mutuelle-artisan-tarif/',  href: BASE_TNS + '/mutuelle-artisan-tarif/' },
        { alias: '/mutuelle-professionnelle/', href: BASE_TNS + '/mutuelle-professionnelle/' },
        { alias: '/calcul-cotisations-tns/',  href: BASE_TNS + '/calcul-cotisations-tns/' }
      ]
    }
  ]
};

/* ═══════════════════════════════════════════════════════════
   THÉMATIQUE 2 — ASSURANCE EMPRUNTEUR
   ═══════════════════════════════════════════════════════════
   70 URLs analysées et structurées en 7 sous-clusters :
   1. Offre & Devis          (5)  — intentions commerciales directes
   2. Cadres légaux          (9)  — lois, droits, obligations
   3. Profils emprunteurs    (9)  — segments cibles (senior, jeune, etc.)
   4. Prêt immobilier        (11) — types de prêts et cas pratiques
   5. Risques & Santé        (9)  — pathologies, risques aggravés
   6. Tarifs & Calcul        (9)  — coût, taux, simulation
   7. Gestion du contrat     (9)  — résiliation, délégation, changement
   ═══════════════════════════════════════════════════════════ */
const BASE_AE = BASE + '/particuliers/assurance-emprunteur';

const THEME_AE = {
  id: 'ae',
  label: 'Assurance Emprunteur',
  shortLabel: 'Assurance Emprunteur',
  accentColor: '#0ea5e9',
  hub: {
    url: '/particuliers/',
    href: BASE + '/particuliers/',
    label: 'Hub grand-père'
  },
  mere: {
    url: '/particuliers/assurance-emprunteur/',
    href: BASE + '/particuliers/assurance-emprunteur/',
    label: 'Page mère cluster'
  },
  overview: "L'architecture du cluster Assurance Emprunteur s'organise autour d'un hub grand-père <code>/particuliers/</code>, d'une page mère cluster <code>/particuliers/assurance-emprunteur/</code>, puis de sept sous-clusters thématiques couvrant l'offre commerciale, les cadres légaux, les profils emprunteurs, les types de prêts, les risques de santé, les aspects tarifaires et la gestion du contrat.",
  reading: "Le sous-cluster Risques & Santé et le sous-cluster Cadres Légaux constituent le cœur éditorial avec une forte dimension E-E-A-T. Les blocs Offre & Devis et Tarifs & Calcul répondent aux intentions de conversion, tandis que Gestion du Contrat et Profils Emprunteurs renforcent l'autorité thématique sur des requêtes longue traîne à forte valeur.",
  clusters: [
    {
      id: 'ae-offre', name: 'Offre & Devis',
      color: 'ae-offre', colorVar: '--ae-offre', hex: '#0ea5e9',
      pages: [
        { alias: '/assurance-emprunteur-devis-en-ligne/',  href: BASE_AE + '/assurance-emprunteur-devis-en-ligne/' },
        { alias: '/assurance-emprunteur-devis/',           href: BASE_AE + '/assurance-emprunteur-devis/' },
        { alias: '/meilleure-assurance-emprunteur/',       href: BASE_AE + '/meilleure-assurance-emprunteur/' },
        { alias: '/souscrire-assurance-emprunteur-en-ligne/', href: BASE_AE + '/souscrire-assurance-emprunteur-en-ligne/' },
        { alias: '/trouver-assurance-emprunteur/',         href: BASE_AE + '/trouver-assurance-emprunteur/' },
        { alias: '/assurance-emprunteur-comparatif/',      href: BASE_AE + '/assurance-emprunteur-comparatif/' }
      ]
    },
    {
      id: 'ae-legal', name: 'Cadres Légaux',
      color: 'ae-legal', colorVar: '--ae-legal', hex: '#7c3aed',
      pages: [
        { alias: '/assurance-emprunteur-loi-lagarde/',         href: BASE_AE + '/assurance-emprunteur-loi-lagarde/' },
        { alias: '/assurance-emprunteur-loi-bourquin/',        href: BASE_AE + '/assurance-emprunteur-loi-bourquin/' },
        { alias: '/assurance-pret-immobilier-loi-hamon/',      href: BASE_AE + '/assurance-pret-immobilier-loi-hamon/' },
        { alias: '/loi-lemoine-assurance-emprunteur/',         href: BASE_AE + '/loi-lemoine-assurance-emprunteur/' },
        { alias: '/lois-assurance-emprunteur/',                href: BASE_AE + '/lois-assurance-emprunteur/' },
        { alias: '/assurance-pret-immobilier-nouvelle-loi/',   href: BASE_AE + '/assurance-pret-immobilier-nouvelle-loi/' },
        { alias: '/assurance-pret-immobilier-obligatoire/',    href: BASE_AE + '/assurance-pret-immobilier-obligatoire/' },
        { alias: '/droit-a-l-oubli-assurance/',                href: BASE_AE + '/droit-a-l-oubli-assurance/' },
        { alias: '/obligation-assureur-envers-assure/',        href: BASE_AE + '/obligation-assureur-envers-assure/' }
      ]
    },
    {
      id: 'ae-profils', name: 'Profils Emprunteurs',
      color: 'ae-profils', colorVar: '--ae-profils', hex: '#f59e0b',
      pages: [
        { alias: '/assurance-emprunteur-senior-pas-cher/', href: BASE_AE + '/assurance-emprunteur-senior-pas-cher/' },
        { alias: '/assurance-pret-immobilier-senior/',     href: BASE_AE + '/assurance-pret-immobilier-senior/' },
        { alias: '/assurance-emprunteur-jeune/',           href: BASE_AE + '/assurance-emprunteur-jeune/' },
        { alias: '/assurance-emprunteur-fumeur/',          href: BASE_AE + '/assurance-emprunteur-fumeur/' },
        { alias: '/assurance-emprunteur-fonctionnaire/',   href: BASE_AE + '/assurance-emprunteur-fonctionnaire/' },
        { alias: '/assurance-emprunteur-militaire/',       href: BASE_AE + '/assurance-emprunteur-militaire/' },
        { alias: '/assurance-emprunteur-policier/',        href: BASE_AE + '/assurance-emprunteur-policier/' },
        { alias: '/assurance-emprunteur-couple/',          href: BASE_AE + '/assurance-emprunteur-couple/' },
        { alias: '/assurance-co-emprunteur/',              href: BASE_AE + '/assurance-co-emprunteur/' }
      ]
    },
    {
      id: 'ae-pret', name: 'Types de Prêt',
      color: 'ae-pret', colorVar: '--ae-pret', hex: '#10b981',
      pages: [
        { alias: '/assurance-individuelle-pret-immobilier/', href: BASE_AE + '/assurance-individuelle-pret-immobilier/' },
        { alias: '/assurance-pret-immobilier-locatif/',      href: BASE_AE + '/assurance-pret-immobilier-locatif/' },
        { alias: '/assurance-pret-in-fine/',                 href: BASE_AE + '/assurance-pret-in-fine/' },
        { alias: '/assurance-pret-relais/',                  href: BASE_AE + '/assurance-pret-relais/' },
        { alias: '/assurance-pret-relais-senior/',           href: BASE_AE + '/assurance-pret-relais-senior/' },
        { alias: '/assurance-pret-taux-zero-obligatoire/',   href: BASE_AE + '/assurance-pret-taux-zero-obligatoire/' },
        { alias: '/assurance-emprunteur-SCI/',               href: BASE_AE + '/assurance-emprunteur-SCI/' },
        { alias: '/assurance-pret-immobilier-deces-conjoint/', href: BASE_AE + '/assurance-pret-immobilier-deces-conjoint/' },
        { alias: '/fin-pret-immobilier-remboursement-assurance/', href: BASE_AE + '/fin-pret-immobilier-remboursement-assurance/' },
        { alias: '/remboursement-pret-immobilier-deces/',    href: BASE_AE + '/remboursement-pret-immobilier-deces/' },
        { alias: '/assurance-pret-immobilier-remboursement/', href: BASE_AE + '/assurance-pret-immobilier-remboursement/' }
      ]
    },
    {
      id: 'ae-risques', name: 'Risques & Santé',
      color: 'ae-risques', colorVar: '--ae-risques', hex: '#ef4444',
      pages: [
        { alias: '/assurance-pret-immobilier-cancer/',          href: BASE_AE + '/assurance-pret-immobilier-cancer/' },
        { alias: '/assurance-pret-immobilier-handicap/',        href: BASE_AE + '/assurance-pret-immobilier-handicap/' },
        { alias: '/assurance-pret-immobilier-maladie/',         href: BASE_AE + '/assurance-pret-immobilier-maladie/' },
        { alias: '/assurance-pret-immobilier-risques-aggraves/', href: BASE_AE + '/assurance-pret-immobilier-risques-aggraves/' },
        { alias: '/assurance-pret-immobilier-maladie-longue-duree/', href: BASE_AE + '/assurance-pret-immobilier-maladie-longue-duree/' },
        { alias: '/assurance-pret-immobilier-aeras/',           href: BASE_AE + '/assurance-pret-immobilier-aeras/' },
        { alias: '/assurance-de-pret-patient-cardiaque/',       href: BASE_AE + '/assurance-de-pret-patient-cardiaque/' },
        { alias: '/assurance-emprunteur-sante/',                href: BASE_AE + '/assurance-emprunteur-sante/' },
        { alias: '/prise-en-charge-pret-immobilier-arret-maladie/', href: BASE_AE + '/prise-en-charge-pret-immobilier-arret-maladie/' }
      ]
    },
    {
      id: 'ae-tarifs', name: 'Tarifs & Calcul',
      color: 'ae-tarifs', colorVar: '--ae-tarifs', hex: '#f97316',
      pages: [
        { alias: '/assurance-emprunteur-prix/',               href: BASE_AE + '/assurance-emprunteur-prix/' },
        { alias: '/assurance-emprunteur-pas-cher/',           href: BASE_AE + '/assurance-emprunteur-pas-cher/' },
        { alias: '/prime-assurance-emprunteur/',              href: BASE_AE + '/prime-assurance-emprunteur/' },
        { alias: '/taux-assurance-pret-immobilier/',          href: BASE_AE + '/taux-assurance-pret-immobilier/' },
        { alias: '/taux-assurance-pret-immobilier-apres-60-ans/', href: BASE_AE + '/taux-assurance-pret-immobilier-apres-60-ans/' },
        { alias: '/calcul-assurance-pret-immobilier/',        href: BASE_AE + '/calcul-assurance-pret-immobilier/' },
        { alias: '/simulation-assurance-pret-immobilier/',    href: BASE_AE + '/simulation-assurance-pret-immobilier/' },
        { alias: '/assurance-pret-immobilier-prix-moyen/',    href: BASE_AE + '/assurance-pret-immobilier-prix-moyen/' },
        { alias: '/comprendre-cout-assurance-pret-immobilier/', href: BASE_AE + '/comprendre-cout-assurance-pret-immobilier/' },
        { alias: '/taea-calcul/',                             href: BASE_AE + '/taea-calcul/' }
      ]
    },
    {
      id: 'ae-gestion', name: 'Gestion du Contrat',
      color: 'ae-gestion', colorVar: '--ae-gestion', hex: '#06b6d4',
      pages: [
        { alias: '/resiliation-assurance-pret-immobilier/',   href: BASE_AE + '/resiliation-assurance-pret-immobilier/' },
        { alias: '/changement-assurance-pret-immobilier/',    href: BASE_AE + '/changement-assurance-pret-immobilier/' },
        { alias: '/delegation-assurance-pret-immobilier/',    href: BASE_AE + '/delegation-assurance-pret-immobilier/' },
        { alias: '/renegocier-assurance-pret/',               href: BASE_AE + '/renegocier-assurance-pret/' },
        { alias: '/subrogation-assurance-pret-immobilier/',   href: BASE_AE + '/subrogation-assurance-pret-immobilier/' },
        { alias: '/assurance-emprunteur-garanties/',          href: BASE_AE + '/assurance-emprunteur-garanties/' },
        { alias: '/assurance-pret-immobilier-invalidite/',    href: BASE_AE + '/assurance-pret-immobilier-invalidite/' },
        { alias: '/assurance-deces-pret-immobilier/',         href: BASE_AE + '/assurance-deces-pret-immobilier/' },
        { alias: '/assurance-emprunteur-sans-questionnaire-medical/', href: BASE_AE + '/assurance-emprunteur-sans-questionnaire-medical/' }
      ]
    },
    {
      id: 'ae-concepts', name: 'Concepts & Définitions',
      color: 'ae-concepts', colorVar: '--ae-concepts', hex: '#8b5cf6',
      pages: [
        { alias: '/assurance-emprunteur-pacs/',               href: BASE_AE + '/assurance-emprunteur-pacs/' },
        { alias: '/assurance-emprunteur-impot/',              href: BASE_AE + '/assurance-emprunteur-impot/' },
        { alias: '/quotite-assurance-pret-immobilier/',       href: BASE_AE + '/quotite-assurance-pret-immobilier/' },
        { alias: '/ipp-assurance-emprunteur/',                href: BASE_AE + '/ipp-assurance-emprunteur/' },
        { alias: '/exclusion-assurance-emprunteur/',          href: BASE_AE + '/exclusion-assurance-emprunteur/' },
        { alias: '/delai-de-carence-assurance-emprunteur/',   href: BASE_AE + '/delai-de-carence-assurance-emprunteur/' },
        { alias: '/delai-franchise-assurance-emprunteur/',    href: BASE_AE + '/delai-franchise-assurance-emprunteur/' },
        { alias: '/fiche-standardisee-d-information-assurance-emprunteur/', href: BASE_AE + '/fiche-standardisee-d-information-assurance-emprunteur/' }
      ]
    }
  ]
};

/* ═══════════════════════════════════════════════════════════
   REGISTRE DES THÉMATIQUES
   ═══════════════════════════════════════════════════════════ */
const THEMES = {
  tns: THEME_TNS,
  ae:  THEME_AE
};

const THEMES_ORDER = ['tns', 'ae'];
