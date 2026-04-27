# Architecture SEO — Cluster Santé TNS

Interface web interactive pour visualiser, éditer et analyser le maillage interne du cluster Mutuelle TNS.

---

## Structure du projet

```
architecture-seo-tns/
├── index.html          → Interface principale
├── proxy.js            → Proxy local Node.js (requis pour l'agent IA)
├── start.sh            → Démarrage rapide Mac/Linux
├── start.bat           → Démarrage rapide Windows
├── README.md
├── css/
│   ├── styles.css      → Styles généraux + dark mode
│   └── agent.css       → Styles de la section Agent de Maillage
└── js/
    ├── data.js         → Modèle de données (URLs, clusters, pages)
    ├── render.js       → Rendu DOM (sidebar, cards, tableau, stats)
    ├── editor.js       → CRUD clusters/pages + édition texte
    ├── utils.js        → Dark mode, localStorage, export/import JSON
    └── agent.js        → Agent de maillage IA (Claude API)
```

---

## Démarrage

### Prérequis
- **Node.js** v14 ou supérieur → https://nodejs.org
- Une **clé API Anthropic** → https://console.anthropic.com

### Lancement (2 étapes)

**Mac / Linux**
```bash
# Dans le dossier du projet :
bash start.sh sk-ant-VOTRE_CLE_API
```

**Windows**
```bat
# Double-cliquer sur start.bat
# ou dans un terminal :
start.bat sk-ant-VOTRE_CLE_API
```

**Manuel**
```bash
node proxy.js sk-ant-VOTRE_CLE_API
```

Puis ouvrir **http://localhost:3000** dans le navigateur.

> ⚠️ Ne jamais ouvrir `index.html` directement en double-cliquant.
> Le proxy est obligatoire pour que l'agent IA fonctionne.

---

## Fonctionnalités

### Interface SEO
- Arborescence Hub → Mère → Clusters avec liens cliquables
- Stats en temps réel (pages, clusters, profondeur)
- Édition des textes "Vue d'ensemble" et "Lecture stratégique"
- Édition des clusters : nom, alias URLs, URLs complètes, ajout/suppression
- Dark mode instantané
- Sauvegarde automatique (localStorage) + export/import JSON

### Agent de Maillage Interne IA
Cliquer sur **✦ Lancer l'analyse de maillage** pour analyser toutes les pages.

Pour chaque page, l'agent produit :
- **Niveau de cocon** : Mère / Fille / Petite-Fille avec justification
- **Focus keyword** identifié
- **Liens sortants** (score 4/5 ou 5/5) avec ancre exacte et phrase d'insertion
- **Backlinks internes** suggérés (pages à modifier)
- **Gap Analysis** : pages manquantes avec priorité et slug suggéré

Les résultats sont sauvegardés localement et rechargés automatiquement.

---

## Architecture SEO couverte

| Niveau | Ensemble | Pages |
|--------|----------|-------|
| Niveau 1 | Hub `/independants/` | 1 |
| Niveau 2 | Mère `/independants/mutuelle/` | 1 |
| Niveau 3 | Auto-entrepreneur | 4 |
| Niveau 3 | Métier | 8 |
| Niveau 3 | Statut / Structurel | 3 |
| Niveau 3 | Commercial / Offre | 2 |
| Niveau 3 | Tarif / Pratique | 4 |
| **Total** | | **23** |

Domaine : `https://www.malakoffhumanis.com/independants/mutuelle/`
