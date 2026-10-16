# PRD SENIOR & INSTRUCTIONS AGENT IA : SITE ASTRO + SANITY CMS + CLOUDFLARE PAGES
**Projet :** Site Web Monopage Haute Conversion + Blog SEO (Cocon Sémantique 20 Articles)  
**Client :** Marabout Fabo Babassa – Grand Marabout Voyant Médium Africain à Paris  
**Mot-clé Principal (P1) :** `Retour affectif` (et variantes : *retour affectif rapide, retour de l'être aimé, faire revenir son ex*)  
**Mot-clé Secondaire / Marque (P2) :** `Marabout Fabo Babassa` (et variantes : *marabout sérieux Paris, voyant médium africain*)  
**Règle de Conversion Stricte :** **ZÉRO FORMULAIRE DE CONTACT** — Conversion **100 % WhatsApp** (`+33 6 76 19 75 85`).

---

## 1. Étude Sémantique & Positionnement Marché Français (SEO & CRO)

En France, les internautes en détresse sentimentale ou spirituelle ne cherchent pas des termes ethnographiques complexes. Ils tapent des requêtes directes liées à **l'urgence de leur problème** et à **la fiabilité du praticien**. Tout le contenu de ce PRD est calibré sur les mots-clés transactionnels les plus recherchés sur Google.fr :

### Matrice des Mots-Clés Cibles (Marché France, Belgique, Suisse, DOM-TOM)

| Cluster Sémantique | Mot-Clé Pilier (Fort Volume / Haute Conversion) | Mots-Clés Secondaires & Longue Traîne (LSI) | Intention Utilisateur |
| :--- | :--- | :--- | :--- |
| **1. Amour & Couple (Priorité Absolue)** | **Retour affectif** | *retour affectif rapide, retour affectif immédiat, retour de l'être aimé, faire revenir son ex rapidement, rituel d'amour puissant, magie blanche amour, magie rouge retour affectif, récupérer son mari / sa femme* | Transactionnelle urgente (Rupture, crise, divorce) |
| **2. Autorité & Marque (Local & National)** | **Marabout Fabo Babassa** | *marabout sérieux Paris, vrai marabout honnête, grand marabout voyant médium africain, marabout retour affectif France, meilleur marabout île-de-france, travaux occultes sérieux* | Recherche de confiance et de preuve sociale |
| **3. Fidélité & Rivaux** | **Éloigner une rivale** | *rituel de fidélité, bloquer un amant ou une maîtresse, attachement amoureux, sauver son couple de la rupture, arrêter les disputes de couple* | Transactionnelle (Tromperie, jalousie, crise) |
| **4. Ésotérisme, Protection & Voyance** | **Désenvoûtement puissant** | *voyant médium pur, enlever le mauvais œil, protection contre la jalousie et sorcellerie, nettoyage énergétique, chance et déblocage financier, réussite professionnelle* | Solution à un blocage ou besoin de prédiction |

### Variables Globales du Projet (À configurer dans `src/config/site.ts`)
* **Nom de marque :** `Marabout Fabo Babassa`
* **Titre professionnel :** `Grand Marabout Voyant Médium Africain`
* **Téléphone affichable :** `+33 6 76 19 75 85` (ou `06 76 19 75 85`)
* **Numéro format API WhatsApp :** `33676197585`
* **Localisation :** `Paris, France (Consultations en cabinet à Paris et travaux à distance dans toute la France, DOM-TOM, Belgique, Suisse et Canada)`
* **URL WhatsApp par défaut :**
  `https://wa.me/33676197585?text=Bonjour%20Marabout%20Fabo%20Babassa%2C%20je%20vous%20contacte%20depuis%20votre%20site%20web%20pour%20une%20consultation%20confidentielle%20concernant...`

---

## 2. Architecture Technique Senior (Astro + Sanity Cloud + Cloudflare Pages)

### 2.1 Stack Technique & Performances Cibles
* **Framework Front-End :** **Astro v4/v5** en mode `static` (SSG) avec régénération via Webhook Sanity -> Cloudflare Deploy Hook pour obtenir un **TTFB < 40 ms** et **100/100 aux Core Web Vitals** (LCP, INP, CLS).
* **Styling :** **Tailwind CSS** (CSS inliné automatiquement dans Astro pour éliminer tout blocage de rendu).
* **CMS Headless :** **Sanity.io (Cloud v3)** pour gérer les articles de blog, le maillage interne, les FAQ et les témoignages.
* **Hébergement & CDN :** **Cloudflare Pages** (Edge Network mondial, HTTP/3, compression Brotli).
* **Zéro JS superflu :** Aucune librairie lourde côté client. Les accordéons FAQ utilisent les balises natives `<details>` et `<summary>`.

### 2.2 Arborescence du Projet

```text
/
├── public/
│   ├── _headers                   # Règles de sécurité et de cache Edge Cloudflare
│   ├── _redirects                 # Redirections SEO (www -> non-www, etc.)
│   ├── robots.txt                 # Directives d'indexation + lien Sitemap
│   └── images/                    # Assets statiques optimisés (.webp / .avif)
├── sanity/                        # Configuration Sanity Studio / Schémas
│   ├── schemas/
│   │   ├── post.ts                # Schéma complet des articles de blog SEO
│   │   ├── category.ts            # Catégories (Retour Affectif, Voyance, Protection)
│   │   └── index.ts
│   └── sanity.config.ts
├── src/
│   ├── config/
│   │   └── site.ts                # Variables globales (Marabout Fabo Babassa, +33676197585, liens WhatsApp)
│   ├── lib/
│   │   ├── sanityClient.ts        # Client Sanity + helper d'optimisation d'images (@sanity/image-url)
│   │   └── queries.ts             # Requêtes GROQ optimisées
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro       # Sticky Header avec navigation fluide + CTA WhatsApp
│   │   │   ├── Footer.astro       # Pied de page SEO local Paris + mentions légales
│   │   │   └── FloatingWhatsApp.astro # Bouton flottant WhatsApp officiel (Mobile & Desktop)
│   │   ├── sections/              # Sections de la Landing Page Monopage
│   │   │   ├── Hero.astro
│   │   │   ├── AboutMarabout.astro
│   │   │   ├── LoveRituals.astro
│   │   │   ├── VoyanceProtection.astro
│   │   │   ├── ProcessSteps.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── FaqAccordion.astro
│   │   │   ├── BlogPreview.astro
│   │   │   └── WhatsAppHub.astro  # Remplace tout formulaire par un sélecteur de besoin WhatsApp
│   │   └── seo/
│   │       ├── BaseHead.astro     # Meta tags, OpenGraph, Canonical
│   │       └── SchemaOrg.astro    # JSON-LD (@graph : LocalBusiness Paris + FAQPage + Article)
│   ├── layouts/
│   │   ├── MainLayout.astro
│   │   └── BlogPostLayout.astro   # Layout article avec CTA WhatsApp sticky dans la sidebar et en fin d'article
│   └── pages/
│       ├── index.astro            # Le Monopage principal
│       └── blog/
│           ├── index.astro        # Index de tous les articles du blog
│           └── [slug].astro       # Génération statique (getStaticPaths) des 20+ articles Sanity
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

### 2.3 Configuration `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

export default defineConfig({
  site: 'https://www.marabout-fabo-babassa.fr', // Remplacer par le domaine final
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    tailwind(),
    sitemap(),
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
      useCdn: true,
      apiVersion: '2025-02-01',
    }),
  ],
});
```

### 2.4 Schéma Sanity Senior (`sanity/schemas/post.ts`)

```typescript
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Article de Blog SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre H1 de l’article',
      type: 'string',
      validation: (Rule) => Rule.required().max(75),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL (ex: retour-affectif-rapide-comment-ca-marche)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title SEO (< 60 caractères)',
      type: 'string',
      validation: (Rule) => Rule.required().max(65),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description SEO (140-160 caractères)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(120).max(165),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Mot-clé principal ciblé',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Retour Affectif & Amour', value: 'retour-affectif' },
          { title: 'Voyance & Médiumnité', value: 'voyance-medium' },
          { title: 'Désenvoûtement, Protection & Chance', value: 'protection-chance' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait d’accroche (Affiché sur les cartes du blog)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale (WebP avec texte ALT SEO)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif (ALT SEO)',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'whatsappCtaText',
      title: 'Message WhatsApp pré-rempli spécifique à cet article',
      type: 'string',
      initialValue: 'Bonjour Marabout Fabo Babassa, je viens de lire votre article et j’aimerais votre aide pour ma situation...',
    }),
    defineField({
      name: 'body',
      title: 'Contenu de l’article (Portable Text)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
  ],
});
```

### 2.5 Configuration Edge Cloudflare (`public/_headers`)

```text
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## 3. Directives Design, UI/UX & Stratégie 100 % WhatsApp (Zéro Formulaire)

### 3.1 Règle Absolue : Aucun Formulaire (`<form>`)
* **Interdiction stricte** de créer une balise `<form>`, `<input>`, `<textarea>` ou `<select>` d'envoi d'e-mail.
* En France, les personnes cherchant un **retour affectif** ou un **marabout** veulent une réponse immédiate, vocale ou écrite, en toute discrétion sur leur téléphone.
* **Toute action de conversion passe par WhatsApp** ou par **appel téléphonique direct** (`tel:+33676197585`).

### 3.2 Liens Profonds WhatsApp Pré-remplis (Selon l'Intention)
Utilise ces URLs exactes sur les boutons correspondants pour maximiser le taux d'envoi du premier message :

1. **CTA Général / Header / Bouton Flottant :**
   `https://wa.me/33676197585?text=Bonjour%20Marabout%20Fabo%20Babassa%2C%20je%20vous%20contacte%20depuis%20votre%20site%20internet%20car%20j%27ai%20besoin%20d%27une%20consultation%20confidentielle.`
2. **CTA Retour Affectif / Récupérer son Ex :**
   `https://wa.me/33676197585?text=Bonjour%20Marabout%20Fabo%20Babassa%2C%20je%20souhaite%20votre%20aide%20pour%20un%20retour%20affectif%20rapide%20et%20faire%20revenir%20la%20personne%20que%20j%27aime.`
3. **CTA Éloigner une Rivale / Fidélité / Sauver son Couple :**
   `https://wa.me/33676197585?text=Bonjour%20Marabout%20Fabo%20Babassa%2C%20mon%20couple%20est%20en%20crise%20et%20j%27ai%20besoin%20d%27un%20rituel%20pour%20prot%C3%A9ger%20mon%20foyer%20et%20%C3%A9loigner%20les%20mauvaises%20influences.`
4. **CTA Voyance / Désenvoûtement / Chance :**
   `https://wa.me/33676197585?text=Bonjour%20Marabout%20Fabo%20Babassa%2C%20je%20voudrais%20faire%20une%20consultation%20de%20voyance%20et%20de%20d%C3%A9blocage%20spirituel.`

### 3.3 Direction Artistique (Confiance, Spiritualité Noble & Prestige Parisien)
* **Interdiction :** Pas de crânes, pas de fond noir/rouge agressif, pas de clichés effrayants. Le site doit inspirer le **sérieux d'un grand cabinet de voyance et de haute spiritualité à Paris**.
* **Palette de couleurs :**
  * Fond principal : Ivoire chaud / Parchemin doux (`#FAF7F2`)
  * Fond secondaire (Cartes / Sections alternées) : Beige cachemire (`#F3ECE1`)
  * Couleur Primaire (Titres & Autorité) : Brun Acajou / Terre d'Ambre (`#5C2C16`) ou Vert Impérial profond (`#143628`)
  * Accents nobles : Or Doré (`#C59B27`)
  * Boutons de conversion WhatsApp : Vert WhatsApp Officiel (`#25D366` avec hover `#1DA851`) + texte blanc gras
* **Typographie :**
  * Titres (`<h1>`, `<h2>`, `<h3>`) : Police Serif élégante et rassurante (*Cormorant Garamond* ou *Playfair Display*).
  * Texte courant : Police Sans-Serif ultra-lisible sur mobile (*Plus Jakarta Sans* ou *Inter*, taille `16px` minimum sur mobile).

---

## 4. Balises Meta SEO & Données Structurées JSON-LD (`<head>`)

### 4.1 Balises Meta de la Page Principale (`index.astro`)

```html
<title>Retour Affectif Rapide & Voyance à Paris | Marabout Fabo Babassa</title>
<meta name="description" content="Spécialiste du retour affectif rapide et du retour de l'être aimé à Paris et à distance. Marabout Fabo Babassa, grand voyant médium sérieux : couple, fidélité, désenvoûtement. Contact WhatsApp : 06 76 19 75 85." />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
<link rel="canonical" href="https://www.marabout-fabo-babassa.fr/" />
```

### 4.2 Script JSON-LD Complet (`SchemaOrg.astro` : `ProfessionalService` + `FAQPage`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://www.marabout-fabo-babassa.fr/#marabout",
      "name": "Marabout Fabo Babassa - Retour Affectif & Voyance Médium Paris",
      "description": "Grand marabout voyant médium africain sérieux à Paris. Spécialiste du retour affectif rapide, du retour de l'être aimé, de la fidélité conjugale, du désenvoûtement et des travaux occultes à distance.",
      "url": "https://www.marabout-fabo-babassa.fr/",
      "telephone": "+33676197585",
      "priceRange": "€€",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Paris",
        "addressRegion": "Île-de-France",
        "addressCountry": "FR"
      },
      "areaServed": [
        { "@type": "Country", "name": "France" },
        { "@type": "Country", "name": "Belgique" },
        { "@type": "Country", "name": "Suisse" },
        { "@type": "Country", "name": "Canada" }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "23:00"
      },
      "sameAs": [
        "https://wa.me/33676197585"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.marabout-fabo-babassa.fr/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "En combien de temps agit un rituel de retour affectif ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Chaque situation amoureuse est unique. Grâce à la puissance des travaux occultes de haute magie blanche et rouge, les premiers signes (apaisement, déblocage, reprise de contact de votre ex) se manifestent généralement sous 3 à 21 jours. Le délai précis vous est communiqué dès la première étude de voyance."
          }
        },
        {
          "@type": "Question",
          "name": "Les travaux de retour de l'être aimé comportent-ils un danger ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Non, aucun danger ni choc en retour. Le Marabout Fabo Babassa pratique uniquement des rituels d'amour bienveillants et protégés qui réveillent les sentiments sincères et enlèvent les blocages sans jamais nuire à la personne aimée."
          }
        },
        {
          "@type": "Question",
          "name": "Comment consulter le Marabout Fabo Babassa à Paris ou à distance ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vous pouvez consulter le Marabout Fabo Babassa directement à son cabinet à Paris sur rendez-vous, ou à distance par WhatsApp et téléphone au 06 76 19 75 85. Les rituels à distance sur photos, prénoms et dates de naissance ont exactement la même efficacité."
          }
        },
        {
          "@type": "Question",
          "name": "Mon ex saura-t-il que j'ai fait appel à un marabout pour le faire revenir ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Jamais. Le travail spirituel agit de manière invisible et naturelle sur le cœur et les pensées. Votre partenaire reviendra vers vous de son propre gré avec le sentiment que vous lui manquez profondément. La discrétion est garantie à 100 %."
          }
        }
      ]
    }
  ]
}
</script>
```

---

## 5. Éléments Fixes (Header & Dispositif WhatsApp Permanent)

### A. Menu de Navigation (Sticky Header)
* **Marque / Logo :** **Marabout Fabo Babassa** *(Sous-titre discret : Voyant Médium & Retour Affectif – Paris)*
* **Liens d'ancrage (Smooth Scroll) :**
  * Accueil (`#accueil`)
  * Le Marabout (`#le-marabout`)
  * Retour Affectif (`#retour-affectif`)
  * Voyance & Protection (`#voyance-desenvoutement`)
  * Déroulement (`#fonctionnement`)
  * Avis (`#avis`)
  * FAQ (`#faq`)
  * Blog (`#blog`)
  * Contact WhatsApp (`#contact`)
* **Bouton CTA Header :** `WhatsApp : 06 76 19 75 85` (Lien direct WhatsApp)

### B. Barre Mobile Fixe + Bouton Flottant WhatsApp (`z-index: 9999`)
* **Sur Desktop :** Bouton flottant en bas à droite avec icône WhatsApp et badge : *"Urgence Amoureuse ? Discuter sur WhatsApp (06 76 19 75 85)"*.
* **Sur Mobile (< 768px) :** Barre fixe collée en bas de l'écran contenant 2 boutons côte à côte :
  1. **Bouton Appel Direct (35% largeur) :** `📞 Appeler` (`tel:+33676197585`)
  2. **Bouton WhatsApp (65% largeur, vert vif) :** `💬 Discuter sur WhatsApp` (Lien WhatsApp pré-rempli)

---

## 6. Contenu Complet du Site Monopage (Textes Intégraux à Intégrer)

> **RÈGLE STRICTE POUR L'AGENT IA :** Ne modifie pas ces textes et respecte scrupuleusement les balises `<h1>`, `<h2>`, `<h3>`. Il ne doit y avoir qu'**un seul `<h1>`** sur toute la page.

---

### SECTION 1 : HERO (Au-dessus de la ligne de flottaison)
* **ID de section :** `id="accueil"`

**Surtitre (Badge de confiance) :**
Grand Marabout Voyant Médium Sérieux à Paris & à Distance – 7j/7

**Titre Principal (`<h1>`) :**
Retour Affectif Rapide et Retour de l'Être Aimé avec le Marabout Fabo Babassa

**Texte d'accroche (`<p>`) :**
Vous souffrez d'une rupture amoureuse ? Votre conjoint(e) s'éloigne, vous a bloqué(e) ou vous a quitté(e) pour une autre personne ? Ne laissez pas le chagrin et le temps détruire votre bonheur. 
Spécialiste reconnu du **retour affectif rapide**, des **travaux occultes d'amour** et de la **voyance médiumnique pure** à Paris, le **Marabout Fabo Babassa** met son don héréditaire et ses rituels puissants à votre service pour faire revenir l'être aimé, sauver votre couple et débloquer votre vie.

**Boutons d'Action (CTA) :**
* **Bouton Principal (Vert WhatsApp) :** 💬 Exposer ma situation sur WhatsApp (06 76 19 75 85)
* **Bouton Secondaire (Appel Direct) :** 📞 Appeler directement le Cabinet à Paris

**Bandeau de réassurance (4 badges sous les boutons) :**
* ⚡ **Retour Affectif Puissant & Rapide**
* 📍 **Cabinet à Paris & Travail à Distance**
* 🔒 **Secret Professionnel 100% Garanti**
* 🛡️ **Magie Blanche & Rouge Sans Danger**

---

### SECTION 2 : PRÉSENTATION & AUTORITÉ (Le Marabout)
* **ID de section :** `id="le-marabout"`

**Titre de section (`<h2>`) :**
Marabout Fabo Babassa : Un Grand Voyant Médium Sérieux et Honnête à Paris

**Corps du texte :**
Trouver un **vrai marabout sérieux et honnête en France** est aujourd'hui difficile face aux nombreuses fausses promesses sur internet. Je suis le **Marabout Fabo Babassa**, grand voyant médium et maître en sciences occultes traditionnelles africaines, installé à **Paris**. 

Issu d'une grande lignée d'initiés et de guérisseurs spirituels, j'exerce mon don de médiumnité et la pratique des rituels sacrés depuis de nombreuses années pour venir en aide aux femmes et aux hommes qui traversent des épreuves sentimentales, familiales ou professionnelles.

**Pourquoi me faire confiance pour votre retour affectif ?**
Ma règle d'or est la franchise : **je n'accepte jamais un dossier sans vérifier d'abord si la réussite est possible**. Avant tout travail occulte, je réalise une étude de voyance approfondie sur votre couple. Cette consultation me permet d'identifier la cause exacte de la séparation (usure, blocage émotionnel, jalousie extérieure, mauvais sort ou présence d'une rivale) et de choisir le rituel d'amour le plus puissant et le plus rapide pour votre situation.

**Bouton CTA de section :**
👉 Demander mon étude de voyance sur WhatsApp

---

### SECTION 3 : PÔLE AMOUR & COUPLE (Cœur de cible SEO : Retour Affectif)
* **ID de section :** `id="retour-affectif"`

**Titre de section (`<h2>`) :**
Spécialiste du Retour Affectif et des Rituels d'Amour Puissants

**Sous-titre (`<p>`) :**
Que votre séparation date de quelques jours ou de plusieurs mois, les rituels de haute magie blanche et de magie rouge amoureuse permettent de toucher directement le cœur et l'esprit de la personne que vous aimez :

**Carte 1 :**
* **`<h3>` :** Retour Affectif Rapide et Retour de l'Être Aimé
* **`<p>` :** Votre ex ne répond plus à vos messages ou dit ne plus avoir de sentiments ? Ce rituel puissant de **retour affectif** dissout la colère, efface les rancœurs du passé et ravive intensément la flamme amoureuse. L'être aimé ressent un manque irrésistible et revient vers vous naturellement pour renouer le lien.

**Carte 2 :**
* **`<h3>` :** Éloigner une Rivale ou un Amant Définitivement
* **`<p>` :** Une tierce personne s'est introduite dans votre foyer et détourne votre conjoint(e) ? Ou une belle-famille jalouse cherche à briser votre union ? J'interviens par un travail occulte ciblé pour couper net cette mauvaise influence et ramener votre partenaire exclusivement vers vous.

**Carte 3 :**
* **`<h3>` :** Rituel de Fidélité et d'Attachement Amoureux
* **`<p>` :** Vous souffrez d'infidélités répétées, de mensonges ou de la peur d'être trompé(e) ? Le rituel de fidélité conjugale bloque les tentations extérieures, calme les regards volages et soude durablement votre partenaire à votre couple.

**Carte 4 :**
* **`<h3>` :** Sauver son Couple, Stopper les Disputes et le Divorce
* **`<p>` :** La communication est rompue à la maison et vous êtes au bord de la rupture ou du divorce ? Ce rituel d'harmonie apaise immédiatement les tensions, chasse les énergies négatives du foyer et rétablit la tendresse, le dialogue et le désir amoureux.

**Carte 5 :**
* **`<h3>` :** Protection du Couple et Engagement (Mariage)
* **`<p>` :** Votre partenaire a peur de s'engager ou votre couple subit la jalousie de votre entourage ? Je dresse un bouclier spirituel puissant autour de votre relation pour protéger votre amour contre le mauvais œil et favoriser l'officialisation de votre union.

**Encart d'Appel à l'Action (En bas de la section Amour) :**
* **Texte :** *En amour, chaque jour compte. Ne laissez pas votre ex s'éloigner définitivement ou s'installer avec une autre personne.*
* **Bouton CTA (Lien WhatsApp Retour Affectif) :** 💬 Parler de mon problème de couple au Marabout Fabo Babassa

---

### SECTION 4 : VOYANCE, DÉSENVOÛTEMENT & CHANCE
* **ID de section :** `id="voyance-desenvoutement"`

**Titre de section (`<h2>`) :**
Voyance Médiumnique, Désenvoûtement et Travaux Occultes

**Sous-titre (`<p>`) :**
Au-delà du retour affectif, le **Marabout Fabo Babassa** vous accompagne à Paris et à distance pour lever tous les blocages invisibles qui freinent votre bonheur :

**Carte 1 :**
* **`<h3>` :** Consultation de Voyance Pure et Médiumnité
* **`<p>` :** Vous avez besoin de réponses claires et immédiates sur votre avenir amoureux, familial ou financier ? Par flashs médiumniques et supports divinatoires traditionnels, je lis votre destinée avec précision pour vous dévoiler la vérité et vous guider vers les bons choix.

**Carte 2 :**
* **`<h3>` :** Désenvoûtement Puissant et Protection Contre le Mauvais Œil
* **`<p>` :** Vous accumulez les échecs inexplicables, la fatigue anormale, la poisse ou le sentiment d'être bloqué(e) dans tout ce que vous faites ? Je réalise des travaux de **désenvoûtement** et de nettoyage spirituel profond pour briser les mauvais sorts, la sorcellerie et la jalousie qui vous entourent.

**Carte 3 :**
* **`<h3>` :** Rituels de Chance, Prospérité et Réussite Professionnelle
* **`<p>` :** Attirez les ondes positives et débloquez votre situation financière. Ces cérémonies d'ouverture des chemins favorisent l'évolution de carrière, attirent la clientèle pour les commerçants et entrepreneurs, aident à la réussite aux examens et attirent la chance.

---

### SECTION 5 : LE DÉROULEMENT D'UNE CONSULTATION (PARIS & À DISTANCE)
* **ID de section :** `id="fonctionnement"`

**Titre de section (`<h2>`) :**
Comment Fonctionne Votre Retour Affectif avec le Marabout Fabo Babassa ?

**Sous-titre (`<p>`) :**
Que vous veniez me rencontrer à mon **cabinet à Paris** ou que nous travaillions **à distance par WhatsApp** (partout en France, Belgique, Suisse, DOM-TOM et Canada), l'efficacité des rituels est strictement identique. Voici comment nous procédons en 4 étapes :

* **Étape 1 : Prise de contact directe et confidentielle sur WhatsApp**
  Vous m'écrivez ou m'appelez au **06 76 19 75 85**. Vous m'expliquez librement votre situation amoureuse ou votre problème, sans aucun jugement et dans le secret absolu.
* **Étape 2 : Étude de voyance et diagnostic occulte**
  À partir des prénoms, dates de naissance et photos, j'analyse les liens spirituels entre vous et votre partenaire pour connaître l'origine du blocage et définir le rituel exact à accomplir.
* **Étape 3 : Réalisation du rituel d'amour ou de désenvoûtement**
  Je mets en place les travaux occultes sur l'autel avec les ingrédients consacrés. Le travail agit directement à distance sur les pensées et le cœur de la personne ciblée.
* **Étape 4 : Accompagnement personnalisé jusqu'au résultat**
  Vous n'êtes jamais livré(e) à vous-même. Je reste joignable chaque jour sur WhatsApp pour suivre l'évolution des signes et vous conseiller jusqu'au retour de la personne aimée.

---

### SECTION 6 : TÉMOIGNAGES CLIENTS (Preuve Sociale France)
* **ID de section :** `id="avis"`

**Titre de section (`<h2>`) :**
Avis et Témoignages : Ils Ont Retrouvé l'Amour avec le Marabout Fabo Babassa

**Témoignage 1 :**
* **Note :** ★★★★★ (5/5)
* **Titre de l'avis :** « Un retour affectif incroyable en moins de 12 jours »
* **Texte :** « Mon compagnon m'avait quittée du jour au lendemain après 6 ans de vie commune et m'avait bloquée partout. J'étais au fond du gouffre. J'ai contacté le Marabout Fabo Babassa sur WhatsApp. Il a tout de suite vu qu'une collègue de travail influençait mon ex. Grâce à son rituel de retour affectif et d'éloignement, mon compagnon est revenu me voir en pleurant 11 jours plus tard. Aujourd'hui nous sommes plus soudés que jamais ! »
* **Auteur :** Amélie R. (Paris 15e)

**Témoignage 2 :**
* **Note :** ★★★★★ (5/5)
* **Titre de l'avis :** « Enfin un vrai marabout sérieux et honnête en France »
* **Texte :** « J'avais été déçu par deux charlatans sur internet avant de trouver le Marabout Fabo Babassa. Dès le premier appel au 06 76 19 75 85, sa voyance m'a bluffé : il m'a décrit le caractère de ma femme sans que je ne dise rien. Son travail pour sauver notre mariage a fonctionné là où tout avait échoué. Ma femme a annulé la procédure de divorce. Un immense merci pour votre sérieux. »
* **Auteur :** Karim B. (Lyon)

**Témoignage 3 :**
* **Note :** ★★★★★ (5/5)
* **Titre de l'avis :** « Désenvoûtement et déblocage rapide à distance »
* **Texte :** « Tout allait mal dans ma vie depuis deux ans : perte d'emploi, problèmes d'argent et échecs amoureux à répétition. J'ai consulté Fabo Babassa à distance depuis la Belgique. Le rituel de purification et de chance contre le mauvais œil a littéralement changé mon quotidien en quelques semaines. Je revis. »
* **Auteur :** Nathalie V. (Bruxelles / Lille)

---

### SECTION 7 : FOIRE AUX QUESTIONS (Accordéon FAQ SEO)
* **ID de section :** `id="faq"`

**Titre de section (`<h2>`) :**
Questions Fréquentes sur le Retour Affectif et les Travaux du Marabout Fabo Babassa

**Question 1 (`<h3>`) :** En combien de temps agit un rituel de retour affectif ?
**Réponse (`<p>`) :** Chaque situation amoureuse est unique. Grâce à la puissance des travaux occultes de haute magie blanche et rouge, les premiers signes (apaisement, déblocage, reprise de contact de votre ex) se manifestent généralement sous **3 à 21 jours**. Le délai précis vous est communiqué dès la première étude de voyance.

**Question 2 (`<h3>`) :** Les travaux de retour de l'être aimé comportent-ils un danger ?
**Réponse (`<p>`) :** Non, aucun danger ni choc en retour. Le **Marabout Fabo Babassa** pratique uniquement des rituels d'amour bienveillants et protégés qui réveillent les sentiments sincères et enlèvent les blocages sans jamais nuire à la personne aimée.

**Question 3 (`<h3>`) :** Comment consulter le Marabout Fabo Babassa à Paris ou à distance ?
**Réponse (`<p>`) :** Vous pouvez consulter le Marabout Fabo Babassa directement à son **cabinet à Paris** sur rendez-vous, ou **à distance par WhatsApp et téléphone au 06 76 19 75 85**. Les rituels à distance réalisés à partir des photos, des prénoms et des dates de naissance ont exactement la même puissance qu'en présentiel.

**Question 4 (`<h3>`) :** Mon ex saura-t-il que j'ai fait appel à un marabout pour le faire revenir ?
**Réponse (`<p>`) :** Jamais. Le travail spirituel agit de manière invisible et naturelle sur le cœur, les émotions et les pensées. Votre partenaire reviendra vers vous de son propre gré avec le sentiment profond que vous lui manquez. La discrétion est garantie à 100 % et vos photos sont détruites une fois le rituel accompli.

---

### SECTION 8 : APERÇU DU BLOG SEO (Alimenté par Sanity CMS)
* **ID de section :** `id="blog"`

**Titre de section (`<h2>`) :**
Guides et Conseils : Tout Savoir sur le Retour Affectif et la Voyance

**Sous-titre (`<p>`) :**
Consultez les articles rédigés par le **Marabout Fabo Babassa** pour comprendre comment fonctionnent les rituels d'amour, comment récupérer son ex et comment se protéger des énergies négatives.

*(Instruction pour l'Agent IA : Afficher ici les 6 derniers articles issus de Sanity CMS avec image, badge de catégorie, titre `<h3>`, extrait et lien vers `/blog/[slug]`, ainsi qu'un bouton « Voir tous nos articles sur le retour affectif » pointant vers `/blog`).*

---

### SECTION 9 : HUB DE CONTACT 100 % WHATSAPP & PIED DE PAGE (Zéro Formulaire)
* **ID de section :** `id="contact"`

**Titre de section (`<h2>`) :**
Contactez le Marabout Fabo Babassa Dès Maintenant sur WhatsApp

**Texte d'introduction (`<p>`) :**
Ne restez pas seul(e) avec vos doutes et votre souffrance. Pour vous garantir une **réponse rapide et 100 % confidentielle**, le Marabout Fabo Babassa vous répond directement sur **WhatsApp** ou par téléphone. Cliquez simplement ci-dessous sur le sujet qui correspond à votre besoin pour démarrer la discussion privée :

**Composant Interactif `WhatsAppHub.astro` (4 Gros Boutons Cartes Cliquables — AUCUN FORMULAIRE) :**
1. ❤️ **Je veux faire revenir mon ex (Retour Affectif Rapide)** → *Ouvre WhatsApp avec le message Retour Affectif*
2. 💍 **Je veux sauver mon couple / Éloigner une rivale** → *Ouvre WhatsApp avec le message Protection Couple*
3. 🔮 **Je souhaite une consultation de Voyance Médium** → *Ouvre WhatsApp avec le message Voyance*
4. 🛡️ **J'ai besoin d'un Désenvoûtement / Chance & Prospérité** → *Ouvre WhatsApp avec le message Désenvoûtement*

**Encart Coordonnées Directes du Cabinet :**
* 💬 **WhatsApp Direct (Réponse Rapide 7j/7) :** **+33 6 76 19 75 85** *(Cliquable vers `https://wa.me/33676197585`)*
* 📞 **Ligne Téléphonique France :** **06 76 19 75 85** *(Cliquable vers `tel:+33676197585`)*
* 📍 **Cabinet :** **Paris, France** *(Consultations sur rendez-vous à Paris & Travaux à distance dans toute la France, DOM-TOM, Belgique, Suisse, Canada)*
* 🕒 **Horaires :** Disponible 7j/7 de 08h00 à 23h00 pour les urgences sentimentales et occultes.

**Pied de page (Footer) :**
`© 2026 Marabout Fabo Babassa – Grand Voyant Médium & Spécialiste du Retour Affectif à Paris. Tous droits réservés. | Mentions légales | Politique de confidentialité.`  
*Note légale : Les travaux occultes et consultations de voyance s'adressent uniquement aux personnes majeures. Les résultats peuvent varier d'une personne à une autre selon chaque situation.*

---

## 7. Plan Éditorial SEO Senior : Les 20 Articles de Blog (Cocon Sémantique Sanity)

> **Instruction pour l'Agent IA :** Crée un script de *seed* (`scripts/seed-sanity-posts.ts`) ou un fichier de données permettant d'injecter ces **20 articles de blog optimisés SEO** dans Sanity CMS. Chaque article doit faire entre **900 et 1 400 mots**, inclure un encart CTA WhatsApp au milieu et à la fin de l'article (`+33 6 76 19 75 85`), et faire un lien interne vers la page d'accueil (`/`) sur l'ancre **retour affectif** ou **Marabout Fabo Babassa**.

### Cluster 1 : Retour Affectif & Récupérer son Ex (Articles 1 à 10 – Cœur du Trafic)

1. **Article 1 (Article Pilier) :**
   * **Titre H1 :** Retour affectif rapide : comment fonctionne vraiment le rituel pour faire revenir son ex ?
   * **Slug :** `retour-affectif-rapide-comment-ca-marche`
   * **Mot-clé principal :** `retour affectif rapide`
   * **Meta Title :** Retour Affectif Rapide : Comment Faire Revenir son Ex ? | Fabo Babassa
   * **Meta Description :** Découvrez comment fonctionne un vrai retour affectif rapide pour récupérer votre ex. Étapes, délais et conseils du Marabout Fabo Babassa à Paris (06 76 19 75 85).
   * **Plan H2 :** 1. Qu'est-ce que le retour affectif en haute magie amoureuse ? / 2. Dans quels cas un rituel de retour affectif fonctionne-t-il ? / 3. Les 3 étapes du travail occulte du Marabout Fabo Babassa / 4. En combien de temps voit-on les premiers signes ?

2. **Article 2 :**
   * **Titre H1 :** Retour de l'être aimé : les 5 signes qui montrent que le rituel agit sur votre ex
   * **Slug :** `retour-de-l-etre-aime-signes-rituel-agit`
   * **Mot-clé principal :** `retour de l'être aimé`
   * **Meta Title :** Retour de l'Être Aimé : 5 Signes que le Rituel Fonctionne
   * **Meta Description :** Comment savoir si votre rituel de retour de l'être aimé agit ? Rêves, déblocage WhatsApp, prise de contact : les signes expliqués par le Marabout Fabo Babassa.
   * **Plan H2 :** 1. Comment l'énergie du rituel touche les pensées de votre ex / 2. Les 5 signes concrets d'un retour affectif en cours / 3. Quelle attitude adopter quand votre ex reprend contact ?

3. **Article 3 :**
   * **Titre H1 :** Mon ex m'a bloqué(e) partout : comment provoquer un retour affectif à distance ?
   * **Slug :** `mon-ex-m-a-bloque-retour-affectif-a-distance`
   * **Mot-clé principal :** `retour affectif à distance`
   * **Meta Title :** Mon Ex m'a Bloqué : Comment Faire un Retour Affectif à Distance ?
   * **Meta Description :** Votre ex vous a bloqué sur WhatsApp et refuse tout dialogue ? Découvrez comment le retour affectif à distance brise le silence radio et rétablit le contact.
   * **Plan H2 :** 1. Pourquoi votre ex coupe-t-il brutalement les ponts ? / 2. Comment agit la télépathie spirituelle et le travail sur photo / 3. Débloquer la communication sans harceler son ex.

4. **Article 4 :**
   * **Titre H1 :** Magie blanche ou magie rouge : quel rituel choisir pour un retour amoureux puissant ?
   * **Slug :** `magie-blanche-ou-magie-rouge-retour-amoureux`
   * **Mot-clé principal :** `magie rouge retour affectif`
   * **Meta Title :** Magie Blanche ou Magie Rouge pour un Retour Affectif Puissant ?
   * **Meta Description :** Quelle est la différence entre magie blanche et magie rouge pour récupérer son ex ? Le Marabout Fabo Babassa vous guide vers le rituel d'amour adapté et sans danger.
   * **Plan H2 :** 1. La magie blanche d'amour : douceur et réconciliation / 2. La magie rouge : réveiller la passion et les sentiments profonds / 3. Pourquoi nos rituels sont 100 % sans choc en retour.

5. **Article 5 :**
   * **Titre H1 :** Comment éloigner une rivale ou une maîtresse et récupérer son mari rapidement ?
   * **Slug :** `eloigner-une-rivale-recuperer-son-mari`
   * **Mot-clé principal :** `éloigner une rivale`
   * **Meta Title :** Comment Éloigner une Rivale et Récupérer son Conjoint ?
   * **Meta Description :** Votre mari ou compagnon est sous l'emprise d'une autre femme ? Découvrez le rituel d'éloignement de rivale et de retour affectif du Marabout Fabo Babassa.
   * **Plan H2 :** 1. Reconnaître l'emprise d'une tierce personne sur votre conjoint / 2. Le rituel de séparation des amants et de retour au foyer / 3. Protéger durablement son couple après le retour.

6. **Article 6 :**
   * **Titre H1 :** Envoûtement amoureux et attachement affectif : vérité, efficacité et précautions
   * **Slug :** `envoutement-amoureux-attachement-affectif`
   * **Mot-clé principal :** `envoûtement amoureux`
   * **Meta Title :** Envoûtement Amoureux & Attachement Affectif : Tout Comprendre
   * **Meta Description :** Tout savoir sur l'envoûtement amoureux et le rituel d'attachement affectif sérieux. Comment raviver l'amour sans danger avec le Marabout Fabo Babassa à Paris.
   * **Plan H2 :** 1. Ce qu'est réellement un envoûtement amoureux positif / 2. Peut-on faire revenir quelqu'un quand il reste une étincelle ? / 3. L'importance de l'étude de voyance préalable.

7. **Article 7 :**
   * **Titre H1 :** Sauver son couple du divorce : comment les travaux occultes restaurent la paix du foyer
   * **Slug :** `sauver-son-couple-du-divorce-travaux-occultes`
   * **Mot-clé principal :** `sauver son couple`
   * **Meta Title :** Sauver son Couple du Divorce : Rituels d'Harmonie et d'Amour
   * **Meta Description :** Au bord de la rupture ou du divorce ? Découvrez comment les rituels d'apaisement et de retour affectif du Marabout Fabo Babassa sauvent votre mariage.
   * **Plan H2 :** 1. Pourquoi les crises de couple dégénèrent-elles parfois sans raison ? / 2. Le rituel d'harmonie conjugale pour stopper une séparation / 3. Témoignages de couples réconciliés.

8. **Article 8 :**
   * **Titre H1 :** Rituel de fidélité : comment empêcher son partenaire de tromper et consolider son couple ?
   * **Slug :** `rituel-de-fidelite-empecher-infidelite-couple`
   * **Mot-clé principal :** `rituel de fidélité`
   * **Meta Title :** Rituel de Fidélité Puissant : Rendre son Partenaire Fidèle
   * **Meta Description :** Peur de l'infidélité ou conjoint volage ? Découvrez comment le rituel de fidélité amoureuse du Marabout Fabo Babassa protège votre couple contre les tentations.
   * **Plan H2 :** 1. Les causes spirituelles et émotionnelles de l'infidélité / 2. Comment fonctionne le cadenas spirituel de fidélité / 3. Retrouver la confiance après une trahison.

9. **Article 9 :**
   * **Titre H1 :** Combien de temps faut-il attendre pour un retour affectif réussi ?
   * **Slug :** `combien-de-temps-pour-un-retour-affectif`
   * **Mot-clé principal :** `délai retour affectif`
   * **Meta Title :** Délai d'un Retour Affectif : En Combien de Jours Mon Ex Revient ?
   * **Meta Description :** Retour affectif en 3 jours, 7 jours ou 21 jours ? Le Marabout Fabo Babassa vous dit toute la vérité sur les délais réels d'un rituel de retour de l'être aimé.
   * **Plan H2 :** 1. La vérité sur les délais des rituels d'amour / 2. Les facteurs qui accélèrent ou ralentissent le retour de votre ex / 3. Les erreurs à ne surtout pas commettre pendant le rituel.

10. **Article 10 :**
    * **Titre H1 :** Retour affectif sur photo et prénom : pourquoi est-ce aussi puissant qu'en cabinet ?
    * **Slug :** `retour-affectif-sur-photo-et-prenom-efficacite`
    * **Mot-clé principal :** `retour affectif sur photo`
    * **Meta Title :** Retour Affectif sur Photo : Comment Fonctionne le Rituel à Distance ?
    * **Meta Description :** Pourquoi les marabouts travaillent-ils avec des photos et dates de naissance ? Découvrez l'efficacité du retour affectif à distance avec Fabo Babassa.
    * **Plan H2 :** 1. Le rôle vibratoire de la photo, du prénom et de la date de naissance / 2. Comment se déroule la cérémonie sur l'autel à Paris / 3. Confidentialité et respect de votre vie privée.

### Cluster 2 : Autorité Marabout Sérieux, Paris & Voyance Médium (Articles 11 à 15)

11. **Article 11 (Article Pilier Autorité) :**
    * **Titre H1 :** Comment reconnaître un vrai marabout sérieux et honnête à Paris et en France ?
    * **Slug :** `comment-reconnaitre-un-vrai-marabout-serieux-paris-france`
    * **Mot-clé principal :** `marabout sérieux Paris`
    * **Meta Title :** Comment Trouver un Vrai Marabout Sérieux et Honnête à Paris ?
    * **Meta Description :** Évitez les pièges ! Voici les 6 critères indispensables pour reconnaître un vrai marabout voyant sérieux en France. Conseils du Marabout Fabo Babassa à Paris.
    * **Plan H2 :** 1. Les signes qui prouvent l'authenticité d'un grand marabout africain / 2. Pourquoi une étude de voyance préalable est obligatoire / 3. L'engagement d'honnêteté et de suivi du Marabout Fabo Babassa.

12. **Article 12 :**
    * **Titre H1 :** Marabout Fabo Babassa à Paris : l'alliance de la voyance médiumnique et des rituels ancestraux
    * **Slug :** `marabout-fabo-babassa-paris-voyant-medium-retour-affectif`
    * **Mot-clé principal :** `Marabout Fabo Babassa`
    * **Meta Title :** Marabout Fabo Babassa à Paris : Voyant Médium & Retour Affectif
    * **Meta Description :** Découvrez le parcours, les dons de voyance médiumnique et les spécialités en retour affectif du Marabout Fabo Babassa à Paris. Contact direct : 06 76 19 75 85.
    * **Plan H2 :** 1. Un héritage spirituel transmis de génération en génération / 2. Le cabinet de consultation à Paris et l'accompagnement sur WhatsApp / 3. Nos domaines d'intervention : amour, protection et réussite.

13. **Article 13 :**
    * **Titre H1 :** Voyant médium africain : comment se passe une consultation de voyance par téléphone ou WhatsApp ?
    * **Slug :** `voyant-medium-africain-consultation-telephone-whatsapp`
    * **Mot-clé principal :** `voyant médium africain`
    * **Meta Title :** Voyant Médium Africain : Consultation par Téléphone & WhatsApp
    * **Meta Description :** Comment un voyant médium africain lit-il votre avenir à distance ? Déroulement d'une séance de voyance précise avec le Marabout Fabo Babassa (06 76 19 75 85).
    * **Plan H2 :** 1. La voyance pure et les supports divinatoires traditionnels / 2. Quelles questions poser lors de votre consultation amoureuse ou professionnelle ? / 3. Préparer sa séance sur WhatsApp.

14. **Article 14 :**
    * **Titre H1 :** Pourquoi mes tentatives pour récupérer mon ex ont échoué ? L'explication spirituelle
    * **Slug :** `pourquoi-je-n-arrive-pas-a-recuperer-mon-ex-blocage-spirituel`
    * **Mot-clé principal :** `récupérer son ex`
    * **Meta Title :** Pourquoi Vous n'Arrivez Pas à Récupérer Votre Ex ? L'Analyse Spirituelle
    * **Meta Description :** Lettres, silence radio, discussions... rien ne marche pour récupérer votre ex ? Découvrez pourquoi un blocage énergétique ou occulte nécessite un retour affectif.
    * **Plan H2 :** 1. Les limites des méthodes psychologiques classiques après une rupture / 2. Quand la jalousie ou un blocage invisible empêche le retour / 3. Comment débloquer le cœur de votre ex par l'action spirituelle.

15. **Article 15 :**
    * **Titre H1 :** Consultation de marabout en Île-de-France et à distance (DOM-TOM, Belgique, Suisse) : comment procéder ?
    * **Slug :** `consultation-marabout-paris-ile-de-france-dom-tom-belgique-suisse`
    * **Mot-clé principal :** `marabout île-de-france`
    * **Meta Title :** Marabout à Paris, Île-de-France et à Distance | Fabo Babassa
    * **Meta Description :** Besoin d'un marabout sérieux à Paris, en Île-de-France, aux Antilles, en Belgique ou en Suisse ? Consultez le Marabout Fabo Babassa en cabinet ou sur WhatsApp.
    * **Plan H2 :** 1. Prendre rendez-vous en cabinet à Paris / 2. L'accompagnement rapide par WhatsApp partout en Europe et Outre-Mer / 3. Garanties de discrétion et suivi.

### Cluster 3 : Désenvoûtement, Mauvais Œil, Protection & Chance (Articles 16 à 20)

16. **Article 16 (Article Pilier Protection) :**
    * **Titre H1 :** 7 signes que votre couple est victime de jalousie, du mauvais œil ou d'un mauvais sort
    * **Slug :** `7-signes-couple-victime-jalousie-mauvais-oeil-mauvais-sort`
    * **Mot-clé principal :** `mauvais sort couple`
    * **Meta Title :** 7 Signes que Votre Couple est Victime d'un Mauvais Sort ou Jalousie
    * **Meta Description :** Disputes soudaines, éloignement brutal, froideur inexpliquée ? Découvrez les 7 signes d'une attaque occulte ou de jalousie sur votre couple et comment vous protéger.
    * **Plan H2 :** 1. Pourquoi certains couples heureux se détruisent-ils du jour au lendemain ? / 2. Les 7 symptômes d'un envoûtement de séparation / 3. Le rituel de désenvoûtement et de protection du foyer.

17. **Article 17 :**
    * **Titre H1 :** Désenvoûtement puissant : comment se libérer de la malchance et des blocages à répétition ?
    * **Slug :** `desenvoutement-puissant-se-liberer-malchance-blocages`
    * **Mot-clé principal :** `désenvoûtement puissant`
    * **Meta Title :** Désenvoûtement Puissant : Briser la Malchance et les Mauvais Sorts
    * **Meta Description :** Vous subissez une série d'échecs, de fatigue et de poisse ? Découvrez comment un désenvoûtement puissant avec le Marabout Fabo Babassa nettoie votre vie.
    * **Plan H2 :** 1. Comment savoir si l'on est victime d'un envoûtement ou du mauvais œil ? / 2. Le déroulement d'un nettoyage spirituel profond / 3. Le bouclier de protection durable.

18. **Article 18 :**
    * **Titre H1 :** Comment protéger sa famille et sa maison contre les énergies négatives et la sorcellerie ?
    * **Slug :** `proteger-sa-famille-et-sa-maison-energies-negatives`
    * **Mot-clé principal :** `protection contre les énergies négatives`
    * **Meta Title :** Protéger sa Maison et son Couple des Énergies Négatives | Fabo Babassa
    * **Meta Description :** Tensions à la maison, mauvais sommeil, jalousie de l'entourage ? Apprenez comment purifier votre foyer et bénéficier de la protection du Marabout Fabo Babassa.
    * **Plan H2 :** 1. Les signes qu'une maison est chargée d'ondes négatives / 2. Les rituels de purification et de blindage spirituel / 3. Retrouver la sérénité familiale.

19. **Article 19 :**
    * **Titre H1 :** Rituels de chance, d'argent et de réussite professionnelle : comment débloquer son destin financier ?
    * **Slug :** `rituel-de-chance-argent-reussite-professionnelle-deblocage`
    * **Mot-clé principal :** `rituel de chance et réussite`
    * **Meta Title :** Rituel de Chance, Prospérité & Déblocage Financier | Fabo Babassa
    * **Meta Description :** Projet bloqué, commerce en difficulté ou manque de chance ? Découvrez les travaux occultes d'ouverture des chemins et de prospérité du Marabout Fabo Babassa.
    * **Plan H2 :** 1. Pourquoi certaines personnes travaillent dur sans jamais récolter les fruits ? / 2. Les cérémonies d'ouverture de chance pour le travail et le commerce / 3. Stabiliser sa réussite.

20. **Article 20 :**
    * **Titre H1 :** Travaux occultes sérieux : pourquoi la foi, la discrétion et le suivi font toute la différence
    * **Slug :** `travaux-occultes-serieux-secret-reussite-rituel`
    * **Mot-clé principal :** `travaux occultes sérieux`
    * **Meta Title :** Travaux Occultes Sérieux : Les Clés de la Réussite de Votre Rituel
    * **Meta Description :** Comment maximiser la réussite de vos travaux occultes (retour affectif, protection, chance) ? Les conseils essentiels du Marabout Fabo Babassa à Paris.
    * **Plan H2 :** 1. La loi du secret : pourquoi ne faut-il parler de son rituel à personne ? / 2. L'importance de la confiance entre vous et le marabout / 3. Contacter le Marabout Fabo Babassa sur WhatsApp.

---

## 8. Checklist Finale d'Exécution pour l'Agent IA

Avant de valider le build final (`npm run build`), l'agent IA doit vérifier les 8 points suivants :
- [ ] **Zéro Formulaire :** Aucune balise `<form>` n'est présente sur le site. Tous les appels à l'action redirigent vers WhatsApp (`https://wa.me/33676197585?...`) ou l'appel téléphonique (`tel:+33676197585`).
- [ ] **Hiérarchie Hn & SEO :** Un seul `<h1>` par page. Sur la page d'accueil, le `<h1>` contient exactement **"Retour Affectif Rapide"** et **"Marabout Fabo Babassa"**.
- [ ] **Positionnement France :** Aucune mention trop spécifique ou ethnographique incomprise du public français ; le vocabulaire est 100 % aligné sur **Retour affectif, Retour de l'être aimé, Grand Marabout Voyant Médium Sérieux à Paris, Travaux occultes, Désenvoûtement**.
- [ ] **Bouton WhatsApp Permanent :** Le dispositif flottant Desktop et la barre d'action fixe Mobile sont visibles sur toutes les pages (`index.astro` et `/blog/[slug]`).
- [ ] **Intégration Sanity CMS :** Les 20 articles du plan éditorial sont configurés avec leurs `slug`, `metaTitle`, `metaDescription`, et un bouton CTA WhatsApp intégré dans le layout d'article.
- [ ] **JSON-LD Valide :** Les schémas `ProfessionalService` (Paris, `+33676197585`) et `FAQPage` sont injectés proprement dans le `<head>`.
- [ ] **Compatibilité Cloudflare Pages :** Le build statique Astro génère le dossier `dist/` avec `_headers`, `robots.txt` et `sitemap-index.xml`.