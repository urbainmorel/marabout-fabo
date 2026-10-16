import groq from 'groq';

export const ALL_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    focusKeyword,
    category,
    excerpt,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    whatsappCtaText
  }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    focusKeyword,
    category,
    excerpt,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    whatsappCtaText,
    body
  }
`;

export const RECENT_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc)[0...6] {
    "id": _id,
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    category,
    excerpt,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "imageAlt": mainImage.alt
  }
`;
