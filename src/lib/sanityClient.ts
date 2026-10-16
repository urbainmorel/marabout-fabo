import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { BLOG_POSTS, type BlogPost } from '../data/postsData';
import { SITE_CONFIG } from '../config/site';

const projectId =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_PROJECT_ID) ||
  (typeof process !== 'undefined' && (process.env?.PUBLIC_SANITY_PROJECT_ID || process.env?.SANITY_PROJECT_ID));
const dataset =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_DATASET) ||
  (typeof process !== 'undefined' && (process.env?.PUBLIC_SANITY_DATASET || process.env?.SANITY_DATASET)) ||
  'production';
const apiVersion = '2025-02-01';

export const isSanityConfigured = Boolean(
  projectId && projectId !== 'fabo2026' && projectId !== 'placeholder_project_id'
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null;

const builder = isSanityConfigured && sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (builder && source) {
    return builder.image(source);
  }
  return null;
}

/* ==========================================================================
   INTERFACES & FALLBACKS
   ========================================================================== */

export interface SiteSettings {
  brandTitle: string;
  phoneDisplay: string;
  phoneIntl: string;
  whatsappNumber: string;
  location: string;
  address?: string;
  openingHours: string;
  defaultMetaDescription: string;
  phoneHref?: string;
  siteUrl?: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandTitle: SITE_CONFIG.brandTitle,
  phoneDisplay: SITE_CONFIG.phoneDisplay,
  phoneIntl: SITE_CONFIG.phoneIntl,
  whatsappNumber: SITE_CONFIG.whatsappNumber,
  location: SITE_CONFIG.location,
  address: `${SITE_CONFIG.addressLocality}, ${SITE_CONFIG.addressRegion}`,
  openingHours: SITE_CONFIG.openingHours,
  defaultMetaDescription: SITE_CONFIG.metaDescription,
  phoneHref: SITE_CONFIG.phoneHref,
  siteUrl: SITE_CONFIG.siteUrl,
};

export interface HomePageData {
  heroBadge: string;
  heroTitle: string;
  heroLead: string;
  heroCtaWaText: string;
  aboutBadge: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  ritualsTitle: string;
  ritualsSubtitle: string;
  voyanceTitle: string;
  voyanceSubtitle: string;
  stepsTitle: string;
  stepsSubtitle: string;
  waHubTitle: string;
  waHubSubtitle: string;
}

export const DEFAULT_HOME_PAGE: HomePageData = {
  heroBadge: 'Grand Marabout Voyant Médium Sérieux à Paris & à Distance – 7j/7',
  heroTitle: "Retour Affectif Rapide et Retour de l'Être Aimé avec le Marabout Fabo Babassa",
  heroLead:
    "Vous souffrez d'une rupture amoureuse ? Votre conjoint(e) s'éloigne, vous a bloqué(e) ou vous a quitté(e) pour une autre personne ? Ne laissez pas le chagrin et le temps détruire votre bonheur. Spécialiste reconnu du retour affectif rapide, des travaux occultes d'amour et de la voyance médiumnique pure à Paris, le Marabout Fabo Babassa met son don héréditaire et ses rituels puissants à votre service pour faire revenir l'être aimé, sauver votre couple et débloquer votre vie.",
  heroCtaWaText: 'Exposer ma situation',
  aboutBadge: 'À Propos du Marabout Fabo',
  aboutTitle: 'Marabout Fabo Babassa : Un Grand Voyant Médium Sérieux et Honnête à Paris',
  aboutText1:
    "Trouver un vrai marabout sérieux et honnête en France est aujourd'hui difficile face aux nombreuses fausses promesses sur internet. Je suis le Marabout Fabo Babassa, grand voyant médium et maître en sciences occultes traditionnelles africaines, installé à Paris.",
  aboutText2:
    "Issu d'une grande lignée d'initiés et de guérisseurs spirituels, j'exerce mon don de médiumnité et la pratique des rituels sacrés depuis de nombreuses années pour venir en aide aux femmes et aux hommes qui traversent des épreuves sentimentales, familiales ou professionnelles.",
  ritualsTitle: "Spécialiste du Retour Affectif et des Rituels d'Amour Puissants",
  ritualsSubtitle:
    "Que votre séparation date de quelques jours ou de plusieurs mois, les rituels de haute magie blanche et de magie rouge amoureuse permettent de toucher directement le cœur et l'esprit de la personne que vous aimez pour sauver votre union :",
  voyanceTitle: 'Voyance Médiumnique, Désenvoûtement et Travaux Occultes',
  voyanceSubtitle:
    'Au-delà du retour affectif, le Marabout Fabo Babassa vous accompagne à Paris et à distance pour lever tous les blocages invisibles qui freinent votre bonheur :',
  stepsTitle: 'Comment Fonctionne Votre Retour Affectif avec le Marabout Fabo Babassa ?',
  stepsSubtitle:
    'Un protocole spirituel clair, rigoureux et transparent en 4 étapes pour rétablir l’amour et l’harmonie dans votre vie.',
  waHubTitle: 'Contactez le Marabout Fabo sur WhatsApp',
  waHubSubtitle:
    'Échangez directement et en toute confidentialité pour exposer votre situation sans jugement.',
};

export interface SanityTestimonial {
  _id?: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  serviceType: string;
  date: string;
  verified?: boolean;
  title?: string;
}

export const DEFAULT_TESTIMONIALS: SanityTestimonial[] = [
  {
    _id: 'testimonial-1',
    author: 'Céline M.',
    location: 'Paris 16e',
    rating: 5,
    text: "Le Marabout Fabo a changé ma vie. En moins de 10 jours, mon mari qui avait quitté le domicile a coupé tout contact avec sa maîtresse pour revenir à la maison.",
    serviceType: 'Retour Affectif',
    date: '10 Janvier 2026',
    verified: true,
    title: 'Retour Affectif & Foyer',
  },
  {
    _id: 'testimonial-2',
    author: 'Marc D.',
    location: 'Lyon',
    rating: 5,
    text: "Mon ex m'avait bloqué partout depuis 4 mois. Après la voyance et le rituel, elle m'a envoyé un message d'elle-même. Nous sommes à nouveau ensemble.",
    serviceType: 'Retour Affectif',
    date: '14 Janvier 2026',
    verified: true,
    title: 'Un retour inespéré !',
  },
  {
    _id: 'testimonial-3',
    author: 'Fatou S.',
    location: 'Marseille',
    rating: 5,
    text: "J'étais sceptique au début mais sa franchise m'a rassuré. Dès la première consultation, il a vu la rivale qui manipulait mon conjoint. Le rituel a été radical.",
    serviceType: 'Retour Affectif',
    date: '22 Janvier 2026',
    verified: true,
    title: 'Éloignement de Rivale',
  },
  {
    _id: 'testimonial-4',
    author: 'Laurent T.',
    location: 'Bordeaux',
    rating: 5,
    text: "Notre couple était détruit par les disputes incessantes. Grâce au travail d'harmonie du maître Fabo, ma femme a renoncé au divorce. Un grand merci.",
    serviceType: 'Retour Affectif',
    date: '28 Janvier 2026',
    verified: true,
    title: 'Procédure de divorce annulée',
  },
  {
    _id: 'testimonial-5',
    author: 'Nathalie V.',
    location: 'Bruxelles (Belgique)',
    rating: 5,
    text: "Une précision de voyance déconcertante. Il a décrit mon passé et ma situation amoureuse sans poser la moindre question. Ses conseils m'ont évité le pire.",
    serviceType: 'Voyance & Médiumnité',
    date: '04 Février 2026',
    verified: true,
    title: 'Voyance Médiumnique Pure',
  },
  {
    _id: 'testimonial-6',
    author: 'Alexandre P.',
    location: 'Nantes',
    rating: 5,
    text: "Mon partenaire avait des comportements volages. Depuis le rituel du cadenas, il est totalement dévoué à notre relation et très attentionné.",
    serviceType: 'Retour Affectif',
    date: '09 Février 2026',
    verified: true,
    title: 'Fidélité retrouvée',
  },
  {
    _id: 'testimonial-7',
    author: 'Stéphane G.',
    location: 'Lille',
    rating: 5,
    text: "Deux ans de malchance inexpliquée balayés en 3 semaines. Le désenvoûtement et la purification m'ont libéré d'un poids immense. Je revis enfin.",
    serviceType: 'Désenvoûtement & Protection',
    date: '17 Février 2026',
    verified: true,
    title: 'Désenvoûtement & Protection',
  },
  {
    _id: 'testimonial-8',
    author: 'Yasmina K.',
    location: 'Toulouse',
    rating: 5,
    text: "Alors qu'il refusait de me parler, mon fiancé est venu sonner à ma porte en larmes pour demander pardon. Ce maître possède un véritable don héréditaire.",
    serviceType: 'Retour Affectif',
    date: '22 Février 2026',
    verified: true,
    title: 'Rapprochement en 7 jours',
  },
  {
    _id: 'testimonial-9',
    author: 'Marie-Line B.',
    location: 'Fort-de-France (DOM-TOM)',
    rating: 5,
    text: "Consulté à distance depuis la Martinique. Malgré les milliers de kilomètres, le rituel a fonctionné avec une force incroyable. Mon foyer est enfin apaisé.",
    serviceType: 'Retour Affectif',
    date: '01 Mars 2026',
    verified: true,
    title: 'Travail Occulte à Distance',
  },
  {
    _id: 'testimonial-10',
    author: 'David R.',
    location: 'Genève (Suisse)',
    rating: 5,
    text: "Mon commerce était au bord de la faillite. Le rituel d'ouverture de chemins a relancé ma clientèle au-delà de mes espérances. Reconnaissance infinie.",
    serviceType: 'Désenvoûtement & Protection',
    date: '05 Mars 2026',
    verified: true,
    title: 'Déblocage et succès financier',
  },
  {
    _id: 'testimonial-11',
    author: 'Inès L.',
    location: 'Strasbourg',
    rating: 5,
    text: "Un marabout honnête et disponible qui répond personnellement sur WhatsApp. Pas de fausses promesses, un accompagnement rigoureux du début à la fin.",
    serviceType: 'Voyance & Médiumnité',
    date: '12 Mars 2026',
    verified: true,
    title: 'Accompagnement & Suivi',
  },
  {
    _id: 'testimonial-12',
    author: 'Patrick M.',
    location: 'Nice',
    rating: 5,
    text: "Notre famille subissait la jalousie de voisins malveillants. Depuis la pose du bouclier spirituel, nous avons retrouvé le sommeil et la sérénité.",
    serviceType: 'Désenvoûtement & Protection',
    date: '18 Mars 2026',
    verified: true,
    title: 'Protection contre le mauvais œil',
  },
];

export interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
  order?: number;
  category?: string;
}

export const DEFAULT_FAQS: FaqItem[] = [
  {
    _id: 'faq-1',
    order: 1,
    category: 'Retour Affectif',
    question: 'En combien de temps agit un rituel de retour affectif ?',
    answer:
      'Chaque situation amoureuse est unique. Grâce à la puissance des travaux occultes de haute magie blanche et rouge, les premiers signes (apaisement, déblocage, reprise de contact de votre ex) se manifestent généralement sous 3 à 21 jours. Le délai précis vous est communiqué dès la première étude de voyance.',
  },
  {
    _id: 'faq-2',
    order: 2,
    category: 'Retour Affectif',
    question: "Les travaux de retour de l'être aimé comportent-ils un danger ?",
    answer:
      "Non, aucun danger ni choc en retour. Le Marabout Fabo Babassa pratique uniquement des rituels d'amour bienveillants et protégés qui réveillent les sentiments sincères et enlèvent les blocages sans jamais nuire à la personne aimée.",
  },
  {
    _id: 'faq-3',
    order: 3,
    category: 'Général',
    question: 'Comment consulter le Marabout Fabo Babassa à Paris ou à distance ?',
    answer:
      "Vous pouvez consulter le Marabout Fabo Babassa directement à son cabinet à Paris sur rendez-vous, ou à distance par WhatsApp et téléphone au 06 76 19 75 85. Les rituels à distance réalisés à partir des photos, des prénoms et des dates de naissance ont exactement la même puissance qu'en présentiel.",
  },
  {
    _id: 'faq-4',
    order: 4,
    category: 'Retour Affectif',
    question: "Mon ex saura-t-il que j'ai fait appel à un marabout pour le faire revenir ?",
    answer:
      'Jamais. Le travail spirituel agit de manière invisible et naturelle sur le cœur, les émotions et les pensées. Votre partenaire reviendra vers vous de son propre gré avec le sentiment profond que vous lui manquez. La discrétion est garantie à 100 % et vos photos sont détruites une fois le rituel accompli.',
  },
];

/* ==========================================================================
   SANITY FETCHING FUNCTIONS
   ========================================================================== */

/**
 * Récupère tous les articles de blog.
 * Priorité absolue au body Portable Text venant de Sanity s'il existe et n'est pas vide.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured || !sanityClient) {
    return BLOG_POSTS;
  }

  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      metaTitle,
      metaDescription,
      focusKeyword,
      category,
      "categoryLabel": select(
        category == "retour-affectif" => "Retour Affectif & Amour",
        category == "voyance-medium" => "Voyance & Médiumnité",
        "Désenvoûtement, Protection & Chance"
      ),
      excerpt,
      publishedAt,
      "readingTime": "7 min",
      "image": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      whatsappCtaText,
      body
    }`;
    const posts = await sanityClient.fetch(query);
    if (posts && posts.length > 0) {
      return posts.map((post: any) => {
        const local = BLOG_POSTS.find((p) => p.slug === post.slug);
        const hasSanityBody = Array.isArray(post.body) && post.body.length > 0;
        return {
          ...local,
          ...post,
          body: hasSanityBody ? post.body : undefined,
          content: hasSanityBody ? '' : (local?.content || ''),
          image: post.image || local?.image || '/images/og-banner-marabout-fabo-babassa.webp',
          imageAlt: post.imageAlt || local?.imageAlt || post.title,
        };
      });
    }
  } catch (error) {
    console.warn('[Sanity] Requête getAllPosts échouée, bascule vers les données de secours locales.', error);
  }

  return BLOG_POSTS;
}

/**
 * Récupère un article par son slug.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}

/**
 * Récupère la configuration globale du site depuis Sanity avec fallback SITE_CONFIG.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured || !sanityClient) {
    return DEFAULT_SITE_SETTINGS;
  }

  try {
    const data = await sanityClient.fetch(`*[_type == "siteSettings"][0]`);
    if (data) {
      const cleanEntries = Object.entries(data).filter(([k, v]) => !k.startsWith('_') && v != null && v !== '');
      return {
        ...DEFAULT_SITE_SETTINGS,
        ...Object.fromEntries(cleanEntries),
      };
    }
  } catch (error) {
    console.warn('[Sanity] getSiteSettings échoué, bascule vers les valeurs de secours.', error);
  }

  return DEFAULT_SITE_SETTINGS;
}

/**
 * Récupère les textes de la page d'accueil depuis Sanity avec fallback complet.
 */
export async function getHomePage(): Promise<HomePageData> {
  if (!isSanityConfigured || !sanityClient) {
    return DEFAULT_HOME_PAGE;
  }

  try {
    const data = await sanityClient.fetch(`*[_type == "homePage"][0]`);
    if (data) {
      const cleanEntries = Object.entries(data).filter(([k, v]) => !k.startsWith('_') && v != null && v !== '');
      return {
        ...DEFAULT_HOME_PAGE,
        ...Object.fromEntries(cleanEntries),
      };
    }
  } catch (error) {
    console.warn('[Sanity] getHomePage échoué, bascule vers les valeurs de secours.', error);
  }

  return DEFAULT_HOME_PAGE;
}

/**
 * Récupère les avis & témoignages depuis Sanity avec fallback sur les 12 témoignages.
 */
export async function getTestimonials(): Promise<SanityTestimonial[]> {
  if (!isSanityConfigured || !sanityClient) {
    return DEFAULT_TESTIMONIALS;
  }

  try {
    const data = await sanityClient.fetch(`*[_type == "testimonial"] | order(date desc) {
      _id,
      author,
      location,
      rating,
      text,
      serviceType,
      date,
      verified
    }`);
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (error) {
    console.warn('[Sanity] getTestimonials échoué, bascule vers les valeurs de secours.', error);
  }

  return DEFAULT_TESTIMONIALS;
}

/**
 * Récupère les questions fréquentes depuis Sanity avec fallback sur les 4 questions.
 */
export async function getFaqItems(): Promise<FaqItem[]> {
  if (!isSanityConfigured || !sanityClient) {
    return DEFAULT_FAQS;
  }

  try {
    const data = await sanityClient.fetch(`*[_type == "faqItem"] | order(order asc) {
      _id,
      question,
      answer,
      order,
      category
    }`);
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (error) {
    console.warn('[Sanity] getFaqItems échoué, bascule vers les valeurs de secours.', error);
  }

  return DEFAULT_FAQS;
}
