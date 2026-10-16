import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { BLOG_POSTS, type BlogPost } from '../data/postsData';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2025-02-01';

export const isSanityConfigured = Boolean(projectId && projectId !== 'fabo2026' && projectId !== 'placeholder_project_id');

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
        return {
          ...post,
          content:
            local?.content ||
            (Array.isArray(post.body)
              ? post.body
                  .map((b: any) => b.children?.map((c: any) => c.text).join('') || '')
                  .join('\n\n')
              : ''),
          image: post.image || local?.image || '/images/og-banner-marabout-fabo-babassa.webp',
          imageAlt: post.imageAlt || local?.imageAlt || post.title,
        };
      });
    }
  } catch (error) {
    console.warn('[Sanity] Requête échouée, bascule vers les données de secours locales.', error);
  }

  return BLOG_POSTS;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}
