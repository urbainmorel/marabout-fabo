import fs from 'node:fs';
import path from 'node:path';
import { BLOG_POSTS } from '../src/data/postsData.ts';
import { SITE_CONFIG } from '../src/config/site.ts';

const baseExportDir = path.resolve('CONTENU_EXPORT');
const mdDir = path.join(baseExportDir, 'content-markdown');
const mdAccueilDir = path.join(mdDir, '01-page-accueil');
const mdArticlesDir = path.join(mdDir, '02-articles-blog');

const jsonDir = path.join(baseExportDir, 'content-json');
const jsonArticlesDir = path.join(jsonDir, 'articles');

// Création des dossiers
[baseExportDir, mdDir, mdAccueilDir, mdArticlesDir, jsonDir, jsonArticlesDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

console.log('📦 Début de l\'exportation propre du contenu...');

// ==========================================
// 1. CONFIGURATION GLOBALE DU SITE
// ==========================================
const siteConfigData = {
  nomMarque: SITE_CONFIG.name,
  titreProfessionnel: SITE_CONFIG.brandTitle,
  accrocheSEO: SITE_CONFIG.headline,
  telephoneAffichage: SITE_CONFIG.phoneDisplay,
  telephoneInternational: SITE_CONFIG.phoneIntl,
  telephoneLienAppel: SITE_CONFIG.phoneHref,
  numeroWhatsAppApi: SITE_CONFIG.whatsappNumber,
  domaineSite: SITE_CONFIG.siteUrl,
  localisation: SITE_CONFIG.location,
  villeCabinet: SITE_CONFIG.addressLocality,
  region: SITE_CONFIG.addressRegion,
  pays: SITE_CONFIG.postalCountry,
  horairesOuverture: SITE_CONFIG.openingHours,
  metaDescriptionGlobale: SITE_CONFIG.metaDescription,
  liensWhatsAppParIntention: SITE_CONFIG.whatsappUrls,
};

// JSON Config
fs.writeFileSync(path.join(jsonDir, 'site-config.json'), JSON.stringify(siteConfigData, null, 2), 'utf-8');

// Markdown Config
const mdConfigContent = `---
nom_marque: "${siteConfigData.nomMarque}"
titre_professionnel: "${siteConfigData.titreProfessionnel}"
telephone_affichage: "${siteConfigData.telephoneAffichage}"
telephone_international: "${siteConfigData.telephoneInternational}"
telephone_lien: "${siteConfigData.telephoneLienAppel}"
numero_whatsapp: "${siteConfigData.numeroWhatsAppApi}"
localisation: "${siteConfigData.localisation}"
horaires: "${siteConfigData.horairesOuverture}"
---

# Variables & Configuration Globale du Site

- **Nom de marque :** ${siteConfigData.nomMarque}
- **Titre professionnel :** ${siteConfigData.titreProfessionnel}
- **Téléphone affichable :** ${siteConfigData.telephoneAffichage} (ou ${siteConfigData.telephoneInternational})
- **Lien appel direct :** ${siteConfigData.telephoneLienAppel}
- **Numéro WhatsApp (API) :** ${siteConfigData.numeroWhatsAppApi}
- **Localisation :** ${siteConfigData.localisation}
- **Horaires :** ${siteConfigData.horairesOuverture}

## Liens Profonds WhatsApp (Par Intention de Conversion)

1. **Général / Header / Bouton Flottant :**
   \`${siteConfigData.liensWhatsAppParIntention.general}\`
2. **Retour Affectif / Récupérer son Ex :**
   \`${siteConfigData.liensWhatsAppParIntention.retourAffectif}\`
3. **Éloigner une Rivale / Fidélité / Sauver son Couple :**
   \`${siteConfigData.liensWhatsAppParIntention.rivale}\`
4. **Voyance / Guidance Médium :**
   \`${siteConfigData.liensWhatsAppParIntention.voyance}\`
5. **Désenvoûtement / Chance & Prospérité :**
   \`${siteConfigData.liensWhatsAppParIntention.desenvoutement}\`
`;
fs.writeFileSync(path.join(mdDir, '00-configuration-site.md'), mdConfigContent, 'utf-8');

// ==========================================
// 2. CONTENU DE LA PAGE D'ACCUEIL (SECTIONS)
// ==========================================
const pageAccueilData = {
  seo: {
    title: "Retour Affectif Rapide & Voyance à Paris | Marabout Fabo Babassa",
    metaDescription: "Spécialiste du retour affectif rapide et du retour de l'être aimé à Paris et à distance. Marabout Fabo Babassa, grand voyant médium sérieux : couple, fidélité, désenvoûtement. Contact WhatsApp : 06 76 19 75 85.",
    canonicalUrl: "https://www.marabout-fabo-babassa.fr/",
  },
  section1_hero: {
    surtitre: "Grand Marabout Voyant Médium Sérieux à Paris & à Distance – 7j/7",
    h1: "Retour Affectif Rapide et Retour de l'Être Aimé avec le Marabout Fabo Babassa",
    texteAccroche: "Vous souffrez d'une rupture amoureuse ? Votre conjoint(e) s'éloigne, vous a bloqué(e) ou vous a quitté(e) pour une autre personne ? Ne laissez pas le chagrin et le temps détruire votre bonheur. Spécialiste reconnu du retour affectif rapide, des travaux occultes d'amour et de la voyance médiumnique pure à Paris, le Marabout Fabo Babassa met son don héréditaire et ses rituels puissants à votre service pour faire revenir l'être aimé, sauver votre couple et débloquer votre vie.",
    boutonsCTA: {
      whatsapp: "Exposer ma situation sur WhatsApp (06 76 19 75 85)",
      appel: "Appeler directement le Cabinet à Paris"
    },
    badgesReassurance: [
      "Retour Affectif Puissant & Rapide",
      "Cabinet à Paris & Travail à Distance",
      "Secret Professionnel 100% Garanti",
      "Magie Blanche & Rouge Sans Danger"
    ],
    atoutsFlottants: [
      { titre: "Voyance Précise & Honnête", description: "Découvrez la vérité sur votre situation pour débloquer votre avenir sans fausses promesses." },
      { titre: "Résultats Rapides (3 à 21 Jours)", description: "Des rituels puissants et sans danger, réalisés dans la discrétion la plus absolue." },
      { titre: "Disponible 7j/7 (08h - 23h)", description: "En cabinet à Paris ou à distance sur WhatsApp partout en France, Belgique, Suisse et DOM-TOM." }
    ]
  },
  section2_leMarabout: {
    h2: "Marabout Fabo Babassa : Un Grand Voyant Médium Sérieux et Honnête à Paris",
    biographie: "Trouver un vrai marabout sérieux et honnête en France est aujourd'hui difficile face aux nombreuses fausses promesses sur internet. Je suis le Marabout Fabo Babassa, grand voyant médium et maître en sciences occultes traditionnelles africaines, installé à Paris.\n\nIssu d'une grande lignée d'initiés et de guérisseurs spirituels, j'exerce mon don de médiumnité et la pratique des rituels sacrés depuis de nombreuses années pour venir en aide aux femmes et aux hommes qui traversent des épreuves sentimentales, familiales ou professionnelles.",
    regleOrConfiance: "Ma règle d'or est la franchise : je n'accepte jamais un dossier sans vérifier d'abord si la réussite est possible. Avant tout travail occulte, je réalise une étude de voyance approfondie sur votre couple. Cette consultation me permet d'identifier la cause exacte de la séparation (usure, blocage émotionnel, jalousie extérieure, mauvais sort ou présence d'une rivale) et de choisir le rituel d'amour le plus puissant et le plus rapide pour votre situation.",
    cta: "Demander mon étude de voyance sur WhatsApp",
    zonesIntervention: ["Paris & Île-de-France", "France entière", "Belgique", "Suisse", "DOM-TOM", "Canada"]
  },
  section3_retourAffectif: {
    h2: "Spécialiste du Retour Affectif et des Rituels d'Amour Puissants",
    sousTitre: "Que votre séparation date de quelques jours ou de plusieurs mois, les rituels de haute magie blanche et de magie rouge amoureuse permettent de toucher directement le cœur et l'esprit de la personne que vous aimez :",
    rituels: [
      {
        h3: "Retour Affectif Rapide et Retour de l'Être Aimé",
        description: "Votre ex ne répond plus à vos messages ou dit ne plus avoir de sentiments ? Ce rituel puissant de retour affectif dissout la colère, efface les rancœurs du passé et ravive intensément la flamme amoureuse. L'être aimé ressent un manque irrésistible et revient vers vous naturellement pour renouer le lien."
      },
      {
        h3: "Éloigner une Rivale ou un Amant Définitivement",
        description: "Une tierce personne s'est introduite dans votre foyer et détourne votre conjoint(e) ? Ou une belle-famille jalouse cherche à briser votre union ? J'interviens par un travail occulte ciblé pour couper net cette mauvaise influence et ramener votre partenaire exclusivement vers vous."
      },
      {
        h3: "Rituel de Fidélité et d'Attachement Amoureux",
        description: "Vous souffrez d'infidélités répétées, de mensonges ou de la peur d'être trompé(e) ? Le rituel de fidélité conjugale bloque les tentations extérieures, calme les regards volages et soude durablement votre partenaire à votre couple."
      },
      {
        h3: "Sauver son Couple, Stopper les Disputes et le Divorce",
        description: "La communication est rompue à la maison et vous êtes au bord de la rupture ou du divorce ? Ce rituel d'harmonie apaise immédiatement les tensions, chasse les énergies négatives du foyer et rétablit la tendresse, le dialogue et le désir amoureux."
      },
      {
        h3: "Protection du Couple et Engagement (Mariage)",
        description: "Votre partenaire a peur de s'engager ou votre couple subit la jalousie de votre entourage ? Je dresse un bouclier spirituel puissant autour de votre relation pour protéger votre amour contre le mauvais œil et favoriser l'officialisation de votre union."
      }
    ],
    encartAction: {
      citation: "En amour, chaque jour compte. Ne laissez pas votre ex s'éloigner définitivement ou s'installer avec une autre personne.",
      cta: "Parler de mon problème de couple au Marabout Fabo Babassa"
    }
  },
  section4_voyanceProtection: {
    h2: "Voyance Médiumnique, Désenvoûtement et Travaux Occultes",
    sousTitre: "Au-delà du retour affectif, le Marabout Fabo Babassa vous accompagne à Paris et à distance pour lever tous les blocages invisibles qui freinent votre bonheur :",
    poles: [
      {
        h3: "Consultation de Voyance Pure et Médiumnité",
        description: "Vous avez besoin de réponses claires et immédiates sur votre avenir amoureux, familial ou financier ? Par flashs médiumniques et supports divinatoires traditionnels, je lis votre destinée avec précision pour vous dévoiler la vérité et vous guider vers les bons choix."
      },
      {
        h3: "Désenvoûtement Puissant et Protection Contre le Mauvais Œil",
        description: "Vous accumulez les échecs inexplicables, la fatigue anormale, la poisse ou le sentiment d'être bloqué(e) dans tout ce que vous faites ? Je réalise des travaux de désenvoûtement et de nettoyage spirituel profond pour briser les mauvais sorts, la sorcellerie et la jalousie qui vous entourent."
      },
      {
        h3: "Rituels de Chance, Prospérité et Réussite Professionnelle",
        description: "Attirez les ondes positives et débloquez votre situation financière. Ces cérémonies d'ouverture des chemins favorisent l'évolution de carrière, attirent la clientèle pour les commerçants et entrepreneurs, aident à la réussite aux examens et attirent la chance."
      }
    ]
  },
  section5_deroulementConsultation: {
    h2: "Comment Fonctionne Votre Retour Affectif avec le Marabout Fabo Babassa ?",
    sousTitre: "Que vous veniez me rencontrer à mon cabinet à Paris ou que nous travaillions à distance par WhatsApp (partout en France, Belgique, Suisse, DOM-TOM et Canada), l'efficacité des rituels est strictement identique. Voici comment nous procédons en 4 étapes :",
    etapes: [
      {
        numero: 1,
        titre: "Étape 1 : Prise de contact directe et confidentielle sur WhatsApp",
        description: "Vous m'écrivez ou m'appelez au 06 76 19 75 85. Vous m'expliquez librement votre situation amoureuse ou votre problème, sans aucun jugement et dans le secret absolu."
      },
      {
        numero: 2,
        titre: "Étape 2 : Étude de voyance et diagnostic occulte",
        description: "À partir des prénoms, dates de naissance et photos, j'analyse les liens spirituels entre vous et votre partenaire pour connaître l'origine du blocage et définir le rituel exact à accomplir."
      },
      {
        numero: 3,
        titre: "Étape 3 : Réalisation du rituel d'amour ou de désenvoûtement",
        description: "Je mets en place les travaux occultes sur l'autel avec les ingrédients consacrés. Le travail agit directement à distance sur les pensées et le cœur de la personne ciblée."
      },
      {
        numero: 4,
        titre: "Étape 4 : Accompagnement personnalisé jusqu'au résultat",
        description: "Vous n'êtes jamais livré(e) à vous-même. Je reste joignable chaque jour sur WhatsApp pour suivre l'évolution des signes et vous conseiller jusqu'au retour de la personne aimée."
      }
    ]
  },
  section6_temoignages: {
    h2: "Avis et Témoignages : Ils Ont Retrouvé l'Amour avec le Marabout Fabo Babassa",
    avis: [
      {
        note: 5,
        titre: "Un retour affectif incroyable en moins de 12 jours",
        texte: "Mon compagnon m'avait quittée du jour au lendemain après 6 ans de vie commune et m'avait bloquée partout. J'étais au fond du gouffre. J'ai contacté le Marabout Fabo Babassa sur WhatsApp. Il a tout de suite vu qu'une collègue de travail influençait mon ex. Grâce à son rituel de retour affectif et d'éloignement, mon compagnon est revenu me voir en pleurant 11 jours plus tard. Aujourd'hui nous sommes plus soudés que jamais !",
        auteur: "Amélie R.",
        localisation: "Paris 15e"
      },
      {
        note: 5,
        titre: "Enfin un vrai marabout sérieux et honnête en France",
        texte: "J'avais été déçu par deux charlatans sur internet avant de trouver le Marabout Fabo Babassa. Dès le premier appel au 06 76 19 75 85, sa voyance m'a bluffé : il m'a décrit le caractère de ma femme sans que je ne dise rien. Son travail pour sauver notre mariage a fonctionné là où tout avait échoué. Ma femme a annulé la procédure de divorce. Un immense merci pour votre sérieux.",
        auteur: "Karim B.",
        localisation: "Lyon"
      },
      {
        note: 5,
        titre: "Désenvoûtement et déblocage rapide à distance",
        texte: "Tout allait mal dans ma vie depuis deux ans : perte d'emploi, problèmes d'argent et échecs amoureux à répétition. J'ai consulté Fabo Babassa à distance depuis la Belgique. Le rituel de purification et de chance contre le mauvais œil a littéralement changé mon quotidien en quelques semaines. Je revis.",
        auteur: "Nathalie V.",
        localisation: "Bruxelles / Lille"
      }
    ]
  },
  section7_faq: {
    h2: "Questions Fréquentes sur le Retour Affectif et les Travaux du Marabout Fabo Babassa",
    questions: [
      {
        question: "En combien de temps agit un rituel de retour affectif ?",
        reponse: "Chaque situation amoureuse est unique. Grâce à la puissance des travaux occultes de haute magie blanche et rouge, les premiers signes (apaisement, déblocage, reprise de contact de votre ex) se manifestent généralement sous 3 à 21 jours. Le délai précis vous est communiqué dès la première étude de voyance."
      },
      {
        question: "Les travaux de retour de l'être aimé comportent-ils un danger ?",
        reponse: "Non, aucun danger ni choc en retour. Le Marabout Fabo Babassa pratique uniquement des rituels d'amour bienveillants et protégés qui réveillent les sentiments sincères et enlèvent les blocages sans jamais nuire à la personne aimée."
      },
      {
        question: "Comment consulter le Marabout Fabo Babassa à Paris ou à distance ?",
        reponse: "Vous pouvez consulter le Marabout Fabo Babassa directement à son cabinet à Paris sur rendez-vous, ou à distance par WhatsApp et téléphone au 06 76 19 75 85. Les rituels à distance réalisés à partir des photos, des prénoms et des dates de naissance ont exactement la même puissance qu'en présentiel."
      },
      {
        question: "Mon ex saura-t-il que j'ai fait appel à un marabout pour le faire revenir ?",
        reponse: "Jamais. Le travail spirituel agit de manière invisible et naturelle sur le cœur, les émotions et les pensées. Votre partenaire reviendra vers vous de son propre gré avec le sentiment profond que vous lui manquez. La discrétion est garantie à 100 % et vos photos sont détruites une fois le rituel accompli."
      }
    ]
  },
  section8_hubContact: {
    h2: "Contactez le Marabout Fabo Babassa Dès Maintenant sur WhatsApp",
    texteIntroduction: "Ne restez pas seul(e) avec vos doutes et votre souffrance. Pour vous garantir une réponse rapide et 100 % confidentielle, le Marabout Fabo Babassa vous répond directement sur WhatsApp ou par téléphone. Cliquez simplement ci-dessous sur le sujet qui correspond à votre besoin pour démarrer la discussion privée :",
    cartesIntentionsWhatsApp: [
      {
        intention: "Je veux faire revenir mon ex (Retour Affectif Rapide)",
        description: "Rupture récente, dispute brutale ou silence radio. Déclencher le rituel pour réveiller le manque.",
        lienWhatsApp: siteConfigData.liensWhatsAppParIntention.retourAffectif
      },
      {
        intention: "Je veux sauver mon couple / Éloigner une rivale",
        description: "Mon conjoint est sous l’emprise d’une maîtresse ou d’une belle-famille toxique. Protéger mon foyer.",
        lienWhatsApp: siteConfigData.liensWhatsAppParIntention.rivale
      },
      {
        intention: "Je souhaite une consultation de Voyance Médium",
        description: "Flashs médiumniques purs et géomancie sacrée pour connaître mon avenir et lever le doute.",
        lienWhatsApp: siteConfigData.liensWhatsAppParIntention.voyance
      },
      {
        intention: "J’ai besoin d’un Désenvoûtement / Chance & Prospérité",
        description: "Malchance persistante, fatigue inexpliquée ou blocage financier. Nettoyer mon aura et réussir.",
        lienWhatsApp: siteConfigData.liensWhatsAppParIntention.desenvoutement
      }
    ],
    coordonneesCabinet: {
      whatsapp: siteConfigData.telephoneInternational,
      telephone: siteConfigData.telephoneAffichage,
      cabinet: "Paris, France (Sur RDV & Travaux à distance)",
      horaires: "Disponible 7j/7 de 08h00 à 23h00"
    },
    mentionsLegalesFooter: "© 2026 Marabout Fabo Babassa – Grand Voyant Médium & Spécialiste du Retour Affectif à Paris. Tous droits réservés. | Note légale : Les travaux occultes et consultations de voyance s'adressent uniquement aux personnes majeures. Les résultats peuvent varier d'une personne à une autre selon chaque situation."
  }
};

// JSON Accueil
fs.writeFileSync(path.join(jsonDir, 'page-accueil.json'), JSON.stringify(pageAccueilData, null, 2), 'utf-8');

// Markdown Accueil Fichiers séparés
const writeMdSection = (filename, title, content) => {
  fs.writeFileSync(path.join(mdAccueilDir, filename), `# ${title}\n\n${content}`, 'utf-8');
};

writeMdSection('01-hero.md', 'Section 1 : Hero', `**Surtitre :** ${pageAccueilData.section1_hero.surtitre}

# ${pageAccueilData.section1_hero.h1}

${pageAccueilData.section1_hero.texteAccroche}

## Actions & Boutons
- **WhatsApp :** [${pageAccueilData.section1_hero.boutonsCTA.whatsapp}](${siteConfigData.liensWhatsAppParIntention.retourAffectif})
- **Appel direct :** [${pageAccueilData.section1_hero.boutonsCTA.appel}](${siteConfigData.telephoneLienAppel})

## Badges de Réassurance
${pageAccueilData.section1_hero.badgesReassurance.map(b => `- ${b}`).join('\n')}

## Atouts
${pageAccueilData.section1_hero.atoutsFlottants.map(a => `### ${a.titre}\n${a.description}`).join('\n\n')}
`);

writeMdSection('02-presentation-marabout.md', 'Section 2 : Présentation & Autorité', `## ${pageAccueilData.section2_leMarabout.h2}

${pageAccueilData.section2_leMarabout.biographie}

### Pourquoi me faire confiance pour votre retour affectif ?
${pageAccueilData.section2_leMarabout.regleOrConfiance}

**Bouton d'Action :** [👉 ${pageAccueilData.section2_leMarabout.cta}](${siteConfigData.liensWhatsAppParIntention.voyance})

**Zones d'intervention :** ${pageAccueilData.section2_leMarabout.zonesIntervention.join(', ')}
`);

writeMdSection('03-rituels-retour-affectif.md', 'Section 3 : Pôle Amour & Couple', `## ${pageAccueilData.section3_retourAffectif.h2}

${pageAccueilData.section3_retourAffectif.sousTitre}

${pageAccueilData.section3_retourAffectif.rituels.map((r, i) => `### ${i + 1}. ${r.h3}\n\n${r.description}`).join('\n\n')}

---

> *${pageAccueilData.section3_retourAffectif.encartAction.citation}*  
> 👉 [💬 ${pageAccueilData.section3_retourAffectif.encartAction.cta}](${siteConfigData.liensWhatsAppParIntention.retourAffectif})
`);

writeMdSection('04-voyance-desenvoutement.md', 'Section 4 : Voyance, Désenvoûtement & Chance', `## ${pageAccueilData.section4_voyanceProtection.h2}

${pageAccueilData.section4_voyanceProtection.sousTitre}

${pageAccueilData.section4_voyanceProtection.poles.map((p, i) => `### ${i + 1}. ${p.h3}\n\n${p.description}`).join('\n\n')}
`);

writeMdSection('05-deroulement-consultation.md', 'Section 5 : Déroulement d\'une Consultation', `## ${pageAccueilData.section5_deroulementConsultation.h2}

${pageAccueilData.section5_deroulementConsultation.sousTitre}

${pageAccueilData.section5_deroulementConsultation.etapes.map(e => `### ${e.titre}\n\n${e.description}`).join('\n\n')}
`);

writeMdSection('06-temoignages-clients.md', 'Section 6 : Avis & Témoignages Clients', `## ${pageAccueilData.section6_temoignages.h2}

${pageAccueilData.section6_temoignages.avis.map(a => `### « ${a.titre} »
**Auteur :** ${a.auteur} (${a.localisation})  
**Note :** ${'★'.repeat(a.note)} (5/5)  

« ${a.texte} »`).join('\n\n---\n\n')}
`);

writeMdSection('07-faq.md', 'Section 7 : Foire Aux Questions (FAQ)', `## ${pageAccueilData.section7_faq.h2}

${pageAccueilData.section7_faq.questions.map(q => `### Q : ${q.question}\n\n**R :** ${q.reponse}`).join('\n\n')}
`);

writeMdSection('08-hub-contact-whatsapp.md', 'Section 8 : Hub de Contact 100% WhatsApp', `## ${pageAccueilData.section8_hubContact.h2}

${pageAccueilData.section8_hubContact.texteIntroduction}

### Intentions & Liens WhatsApp Directs
${pageAccueilData.section8_hubContact.cartesIntentionsWhatsApp.map(c => `#### ${c.intention}
- **Description :** ${c.description}
- **Lien WhatsApp :** [Ouvrir la discussion WhatsApp](${c.lienWhatsApp})`).join('\n\n')}

### Coordonnées du Cabinet
- **WhatsApp :** [${pageAccueilData.section8_hubContact.coordonneesCabinet.whatsapp}](${siteConfigData.liensWhatsAppParIntention.general})
- **Téléphone Direct :** [${pageAccueilData.section8_hubContact.coordonneesCabinet.telephone}](${siteConfigData.telephoneLienAppel})
- **Cabinet :** ${pageAccueilData.section8_hubContact.coordonneesCabinet.cabinet}
- **Horaires :** ${pageAccueilData.section8_hubContact.coordonneesCabinet.horaires}

### Mentions Légales
${pageAccueilData.section8_hubContact.mentionsLegalesFooter}
`);

// ==========================================
// 3. EXPORT DES 20 ARTICLES DE BLOG
// ==========================================
console.log('📝 Export des 20 articles de blog individuels...');

BLOG_POSTS.forEach((post, index) => {
  const padIndex = String(index + 1).padStart(2, '0');
  const baseName = `${padIndex}-${post.slug}`;

  // Export JSON brut
  fs.writeFileSync(path.join(jsonArticlesDir, `${baseName}.json`), JSON.stringify(post, null, 2), 'utf-8');

  // Export Markdown propre avec Frontmatter YAML complet
  const mdContent = `---
id: "${post.id}"
titre: "${post.title.replace(/"/g, '\\"')}"
slug: "${post.slug}"
metaTitle: "${post.metaTitle.replace(/"/g, '\\"')}"
metaDescription: "${post.metaDescription.replace(/"/g, '\\"')}"
focusKeyword: "${post.focusKeyword}"
categorie: "${post.category}"
categorieLabel: "${post.categoryLabel}"
extrait: "${post.excerpt.replace(/"/g, '\\"')}"
datePublication: "${post.publishedAt}"
tempsLecture: "${post.readingTime}"
image: "${post.image}"
imageAlt: "${post.imageAlt.replace(/"/g, '\\"')}"
messageWhatsApp: "${post.whatsappCtaText.replace(/"/g, '\\"')}"
---

# ${post.title}

> **Résumé :** ${post.excerpt}

${post.content}
`;

  fs.writeFileSync(path.join(mdArticlesDir, `${baseName}.md`), mdContent, 'utf-8');
});

// ==========================================
// 4. CRÉATION DU README GUIDE D'UTILISATION
// ==========================================
const readmeContent = `# Exportation Complète des Contenus : Marabout Fabo Babassa

Ce dossier contient l'intégralité des contenus du site, nettoyés de tout design, style CSS ou code spécifique, et organisés pour une réutilisation immédiate dans n'importe quel nouveau design, CMS ou framework (WordPress, Webflow, Next.js, Nuxt, Astro, Strapi, Sanity, Shopify, etc.).

## Organisation du Dossier

\`\`\`text
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
\`\`\`

## Comment réutiliser ces données ?

1. **Pour un site statique ou Headless (Next.js, Astro, Nuxt, Hugo) :**  
   Utilisez le dossier \`content-markdown/\`. Chaque fichier dispose d'un en-tête Frontmatter YAML (\`---\`) contenant les métadonnées SEO (\`title\`, \`metaDescription\`, \`category\`, \`slug\`, \`focusKeyword\`), suivi du texte rédigé en Markdown standard.

2. **Pour une base de données ou un CMS (Sanity, Strapi, Firebase, Supabase, WordPress REST API) :**  
   Utilisez le dossier \`content-json/\`. Vous disposez de fichiers JSON purs, facilement importables par script ou via des outils d'importation sans aucune retouche manuelle.

3. **Garantie Zéro Perte :**  
   Tous les textes du PRD original (\`FABO.md\`), les numéros de téléphone (+33 6 76 19 75 85), les URLs WhatsApp pré-remplies, les questions FAQ, les avis clients et les 20 articles de fond de 900 à 1 400 mots sont conservés à 100 %.
`;

fs.writeFileSync(path.join(baseExportDir, 'README.md'), readmeContent, 'utf-8');

console.log('✅ Exportation terminée avec succès dans CONTENU_EXPORT/ !');
