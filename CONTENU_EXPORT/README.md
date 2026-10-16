# Exportation Complète des Contenus : Marabout Fabo Babassa

Ce dossier contient l'intégralité des contenus du site, nettoyés de tout design, style CSS ou code spécifique, et organisés pour une réutilisation immédiate dans n'importe quel nouveau design, CMS ou framework (WordPress, Webflow, Next.js, Nuxt, Astro, Strapi, Sanity, Shopify, etc.).

## Organisation du Dossier

```text
CONTENU_EXPORT/
├── content-markdown/                   # Fichiers Markdown (.md) avec Frontmatter YAML
│   ├── 00-configuration-site.md       # Coordonnées, variables globales, numéros et liens WhatsApp
│   ├── 01-page-accueil/               # Contenu de la Landing Page découpé section par section
│   │   ├── 01-hero.md
│   │   ├── 02-presentation-marabout.md
│   │   ├── 03-rituels-retour-affectif.md
│   │   ├── 04-voyance-desenvoutement.md
│   │   ├── 05-deroulement-consultation.md
│   │   ├── 06-temoignages-clients.md
│   │   ├── 07-faq.md
│   │   └── 08-hub-contact-whatsapp.md
│   └── 02-articles-blog/              # Les 20 articles complets (900-1400 mots) en .md
│       ├── 01-retour-affectif-rapide-comment-ca-marche.md
│       ├── 02-retour-de-l-etre-aime-signes-rituel-agit.md
│       ├── ...
│       └── 20-travaux-occultes-serieux-secret-reussite-rituel.md
│
└── content-json/                      # Fichiers JSON bruts structurés
    ├── site-config.json               # Configuration générale et URLs WhatsApp
    ├── page-accueil.json              # Toutes les sections de la landing page en JSON hiérarchique
    └── articles/                      # 20 fichiers JSON individuels pour chaque article
        ├── 01-retour-affectif-rapide-comment-ca-marche.json
        ├── ...
        └── 20-travaux-occultes-serieux-secret-reussite-rituel.json
```

## Comment réutiliser ces données ?

1. **Pour un site statique ou Headless (Next.js, Astro, Nuxt, Hugo) :**  
   Utilisez le dossier `content-markdown/`. Chaque fichier dispose d'un en-tête Frontmatter YAML (`---`) contenant les métadonnées SEO (`title`, `metaDescription`, `category`, `slug`, `focusKeyword`), suivi du texte rédigé en Markdown standard.

2. **Pour une base de données ou un CMS (Sanity, Strapi, Firebase, Supabase, WordPress REST API) :**  
   Utilisez le dossier `content-json/`. Vous disposez de fichiers JSON purs, facilement importables par script ou via des outils d'importation sans aucune retouche manuelle.

3. **Garantie Zéro Perte :**  
   Tous les textes du PRD original (`FABO.md`), les numéros de téléphone (+33 6 76 19 75 85), les URLs WhatsApp pré-remplies, les questions FAQ, les avis clients et les 20 articles de fond de 900 à 1 400 mots sont conservés à 100 %.
