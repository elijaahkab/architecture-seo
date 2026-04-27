/* =============================================================
   Architecture SEO — Cluster Santé TNS
   js/data.js  —  Modèle de données
   ============================================================= */

const BASE = 'https://www.malakoffhumanis.com';
const BASE_MUTUELLE = BASE + '/independants/mutuelle';

const data = {
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
  clusters: [
    {
      id: 'auto',
      name: 'Auto-entrepreneur',
      color: 'auto',
      colorVar: '--auto',
      hex: '#d48c0a',
      pages: [
        { alias: '/mutuelle-auto-entrepreneur/',             href: BASE_MUTUELLE + '/mutuelle-auto-entrepreneur/' },
        { alias: '/mutuelle-auto-entrepreneur-obligatoire/', href: BASE_MUTUELLE + '/mutuelle-auto-entrepreneur-obligatoire/' },
        { alias: '/mutuelle-auto-entrepreneur-comparatif/', href: BASE_MUTUELLE + '/mutuelle-auto-entrepreneur-comparatif/' },
        { alias: '/mutuelle-auto-entrepreneur-prix/',        href: BASE_MUTUELLE + '/mutuelle-auto-entrepreneur-prix/' }
      ]
    },
    {
      id: 'metier',
      name: 'Métier',
      color: 'metier',
      colorVar: '--metier',
      hex: '#9333ea',
      pages: [
        { alias: '/mutuelle-artisan/',                          href: BASE_MUTUELLE + '/mutuelle-artisan/' },
        { alias: '/mutuelle-commercant/',                       href: BASE_MUTUELLE + '/mutuelle-commercant/' },
        { alias: '/mutuelle-profession-liberale/',              href: BASE_MUTUELLE + '/mutuelle-profession-liberale/' },
        { alias: '/mutuelle-freelance/',                        href: BASE_MUTUELLE + '/mutuelle-freelance/' },
        { alias: '/mutuelle-notaire/',                          href: BASE_MUTUELLE + '/mutuelle-notaire/' },
        { alias: '/mutuelle-boulangerie/',                      href: BASE_MUTUELLE + '/mutuelle-boulangerie/' },
        { alias: '/mutuelle-naturopathe/',                      href: BASE_MUTUELLE + '/mutuelle-naturopathe/' },
        { alias: '/mutuelle-exploitants-agricoles-independants/', href: BASE_MUTUELLE + '/mutuelle-exploitants-agricoles-independants/' }
      ]
    },
    {
      id: 'statut',
      name: 'Statut / Structurel',
      color: 'statut',
      colorVar: '--statut',
      hex: '#0891b2',
      pages: [
        { alias: '/mutuelle-gerant-eurl/',                     href: BASE_MUTUELLE + '/mutuelle-gerant-eurl/' },
        { alias: '/comprendre-statut-conjoint-collaborateur/', href: BASE_MUTUELLE + '/comprendre-statut-conjoint-collaborateur/' },
        { alias: '/regime-tns/',                               href: BASE_MUTUELLE + '/regime-tns/' }
      ]
    },
    {
      id: 'commercial',
      name: 'Commercial / Offre',
      color: 'commercial',
      colorVar: '--commercial',
      hex: '#e84545',
      pages: [
        { alias: '/devis-mutuelle-tns/',     href: BASE_MUTUELLE + '/devis-mutuelle-tns/' },
        { alias: '/meilleure-mutuelle-tns/', href: BASE_MUTUELLE + '/meilleure-mutuelle-tns/' }
      ]
    },
    {
      id: 'tarif',
      name: 'Tarif / Pratique',
      color: 'tarif',
      colorVar: '--tarif',
      hex: '#ea6c10',
      pages: [
        { alias: '/mutuelle-tns-pas-chere/',  href: BASE_MUTUELLE + '/mutuelle-tns-pas-chere/' },
        { alias: '/mutuelle-artisan-tarif/',  href: BASE_MUTUELLE + '/mutuelle-artisan-tarif/' },
        { alias: '/mutuelle-professionnelle/', href: BASE_MUTUELLE + '/mutuelle-professionnelle/' },
        { alias: '/calcul-cotisations-tns/',  href: BASE_MUTUELLE + '/calcul-cotisations-tns/' }
      ]
    }
  ]
};
