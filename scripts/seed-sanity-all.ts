import { createClient } from '@sanity/client';
import { BLOG_POSTS } from '../src/data/postsData.js';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_HOME_PAGE,
  DEFAULT_TESTIMONIALS,
  DEFAULT_FAQS,
} from '../src/lib/sanityClient.js';

const projectId = process.env.SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.log(`
⚠️ Variables Sanity manquantes dans .env :
Veuillez définir SANITY_PROJECT_ID / PUBLIC_SANITY_PROJECT_ID et SANITY_WRITE_TOKEN.
`);
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-02-01',
  useCdn: false,
});

/* ==========================================================================
   CONVERTISSEUR MARKDOWN VERS PORTABLE TEXT SANITY
   ========================================================================== */

function genKey(prefix = 'k'): string {
  return prefix + Math.random().toString(36).substring(2, 9);
}

interface Span {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
}

interface MarkDef {
  _type: 'link';
  _key: string;
  href: string;
}

function parseSpansAndMarks(rawText: string): { spans: Span[]; markDefs: MarkDef[] } {
  const spans: Span[] = [];
  const markDefs: MarkDef[] = [];
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(rawText)) !== null) {
    if (match.index > lastIndex) {
      const text = rawText.slice(lastIndex, match.index);
      if (text) spans.push({ _type: 'span', _key: genKey('s'), text, marks: [] });
    }

    const token = match[0];
    if (token.startsWith('[') && token.includes('](')) {
      const linkMatch = token.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        let text = linkMatch[1];
        const href = linkMatch[2];
        const linkKey = genKey('link');
        markDefs.push({ _type: 'link', _key: linkKey, href });
        const marks = [linkKey];
        if (text.startsWith('**') && text.endsWith('**')) {
          text = text.slice(2, -2);
          marks.push('strong');
        }
        spans.push({ _type: 'span', _key: genKey('s'), text, marks });
      }
    } else if (token.startsWith('**') && token.endsWith('**')) {
      let text = token.slice(2, -2);
      if (text.startsWith('[') && text.includes('](')) {
        const linkMatch = text.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          const innerText = linkMatch[1];
          const href = linkMatch[2];
          const linkKey = genKey('link');
          markDefs.push({ _type: 'link', _key: linkKey, href });
          spans.push({ _type: 'span', _key: genKey('s'), text: innerText, marks: ['strong', linkKey] });
        }
      } else {
        spans.push({ _type: 'span', _key: genKey('s'), text, marks: ['strong'] });
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < rawText.length) {
    const text = rawText.slice(lastIndex);
    if (text) spans.push({ _type: 'span', _key: genKey('s'), text, marks: [] });
  }

  if (spans.length === 0) {
    spans.push({ _type: 'span', _key: genKey('s'), text: rawText, marks: [] });
  }

  return { spans, markDefs };
}

function markdownToPortableText(markdown: string) {
  const rawBlocks = markdown.split(/\n\s*\n/);
  const blocks: any[] = [];

  for (const raw of rawBlocks) {
    const trimmed = raw.trim();
    if (!trimmed) continue;

    // H2 Heading
    if (trimmed.startsWith('## ')) {
      const text = trimmed.replace(/^##\s+/, '').trim();
      const { spans, markDefs } = parseSpansAndMarks(text);
      blocks.push({
        _type: 'block',
        _key: genKey('b'),
        style: 'h2',
        children: spans,
        markDefs,
      });
      continue;
    }

    // H3 Heading
    if (trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^###\s+/, '').trim();
      const { spans, markDefs } = parseSpansAndMarks(text);
      blocks.push({
        _type: 'block',
        _key: genKey('b'),
        style: 'h3',
        children: spans,
        markDefs,
      });
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const text = trimmed.replace(/^>\s*/gm, '').replace(/\n/g, ' ').trim();
      const { spans, markDefs } = parseSpansAndMarks(text);
      blocks.push({
        _type: 'block',
        _key: genKey('b'),
        style: 'blockquote',
        children: spans,
        markDefs,
      });
      continue;
    }

    // Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const lines = trimmed.split('\n');
      for (const line of lines) {
        const itemText = line.replace(/^[-*]\s+/, '').trim();
        if (!itemText) continue;
        const { spans, markDefs } = parseSpansAndMarks(itemText);
        blocks.push({
          _type: 'block',
          _key: genKey('b'),
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          children: spans,
          markDefs,
        });
      }
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const lines = trimmed.split('\n');
      for (const line of lines) {
        const itemText = line.replace(/^\d+\.\s+/, '').trim();
        if (!itemText) continue;
        const { spans, markDefs } = parseSpansAndMarks(itemText);
        blocks.push({
          _type: 'block',
          _key: genKey('b'),
          style: 'normal',
          listItem: 'number',
          level: 1,
          children: spans,
          markDefs,
        });
      }
      continue;
    }

    // Normal paragraph
    const text = trimmed.replace(/\n/g, ' ').trim();
    const { spans, markDefs } = parseSpansAndMarks(text);
    blocks.push({
      _type: 'block',
      _key: genKey('b'),
      style: 'normal',
      children: spans,
      markDefs,
    });
  }

  return blocks;
}

/* ==========================================================================
   SEED TOUTES LES DONNÉES
   ========================================================================== */

async function seedAll() {
  console.log(`🚀 Démarrage du seed complet Sanity (${projectId}/${dataset})...\n`);

  // 1. Site Settings
  console.log('📌 1/5 - Injection de siteSettings...');
  const siteSettingsDoc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    brandTitle: DEFAULT_SITE_SETTINGS.brandTitle,
    phoneDisplay: DEFAULT_SITE_SETTINGS.phoneDisplay,
    phoneIntl: DEFAULT_SITE_SETTINGS.phoneIntl,
    whatsappNumber: DEFAULT_SITE_SETTINGS.whatsappNumber,
    location: DEFAULT_SITE_SETTINGS.location,
    address: DEFAULT_SITE_SETTINGS.address,
    openingHours: DEFAULT_SITE_SETTINGS.openingHours,
    defaultMetaDescription: DEFAULT_SITE_SETTINGS.defaultMetaDescription,
  };
  await client.createOrReplace(siteSettingsDoc);
  console.log('   ✓ siteSettings configuré avec succès.');

  // 2. Home Page
  console.log('📌 2/5 - Injection de homePage...');
  const homePageDoc = {
    _id: 'homePage',
    _type: 'homePage',
    ...DEFAULT_HOME_PAGE,
  };
  await client.createOrReplace(homePageDoc);
  console.log('   ✓ homePage configuré avec succès.');

  // 3. Testimonials (12 avis)
  console.log('📌 3/5 - Injection des 12 avis clients (testimonials)...');
  for (const t of DEFAULT_TESTIMONIALS) {
    const testimonialDoc = {
      _id: t._id || `testimonial-${genKey()}`,
      _type: 'testimonial',
      author: t.author,
      location: t.location,
      rating: t.rating,
      text: t.text,
      serviceType: t.serviceType,
      date: t.date,
      verified: t.verified ?? true,
    };
    await client.createOrReplace(testimonialDoc);
  }
  console.log('   ✓ 12 témoignages injectés.');

  // 4. FAQ Items (4 questions)
  console.log('📌 4/5 - Injection des 4 questions/réponses (faqItem)...');
  for (const f of DEFAULT_FAQS) {
    const faqDoc = {
      _id: f._id || `faq-${genKey()}`,
      _type: 'faqItem',
      order: f.order ?? 1,
      category: f.category ?? 'Général',
      question: f.question,
      answer: f.answer,
    };
    await client.createOrReplace(faqDoc);
  }
  console.log('   ✓ 4 FAQ items injectés.');

  // 5. Blog Posts (20 articles avec Portable Text structuré)
  console.log('📌 5/5 - Injection des 20 articles avec conversion en Portable Text enrichi...');
  let postCount = 0;
  for (const post of BLOG_POSTS) {
    const portableTextBody = markdownToPortableText(post.content);

    const postDoc = {
      _id: `post-${post.slug}`,
      _type: 'post',
      title: post.title,
      slug: {
        _type: 'slug',
        current: post.slug,
      },
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      focusKeyword: post.focusKeyword,
      category: post.category,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      whatsappCtaText: post.whatsappCtaText,
      body: portableTextBody,
    };

    await client.createOrReplace(postDoc);
    postCount++;
    console.log(`   ✓ [${postCount}/20] Article structuré : ${post.title.substring(0, 55)}...`);
  }

  console.log('\n🎉 SUCCÈS TOTAL : Toutes les données sont injectées dans Sanity CMS !');
  console.log('   - 1 configuration globale du site (siteSettings)');
  console.log("   - 1 page d'accueil modifiable (homePage)");
  console.log('   - 12 avis clients vérifiés (testimonial)');
  console.log('   - 4 questions fréquentes (faqItem)');
  console.log('   - 20 articles de blog SEO avec Portable Text propre (post)');
}

seedAll().catch((err) => {
  console.error('❌ Erreur lors du seed Sanity :', err);
  process.exit(1);
});
