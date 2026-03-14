import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export interface BlogHeading {
  text: string;
  slug: string;
  level: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  pilar?: string;
  tags?: string[];
  readingTime: number; // minutes
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 150));
}

function extractHeadings(content: string): BlogHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: BlogHeading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    headings.push({
      text,
      slug,
      level: match[1].length,
    });
  }

  return headings;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      pilar: data.pilar,
      tags: data.tags,
      readingTime: calculateReadingTime(content),
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string) {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const cleanContent = content;

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      pilar: data.pilar,
      tags: data.tags,
      readingTime: calculateReadingTime(content),
    } as BlogPostMeta,
    content: cleanContent,
    headings: extractHeadings(cleanContent),
  };
}

export function getPrevNextPosts(currentSlug: string): { prev: BlogPostMeta | null; next: BlogPostMeta | null } {
  const posts = getAllPosts(); // sorted newest-first
  const idx = posts.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null, // older post
    next: idx > 0 ? posts[idx - 1] : null, // newer post
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Extract FAQ pairs from markdown content.
 * Looks for a "## Preguntas frecuentes" section and parses ### questions
 * with the text below each as the answer.
 */
export function extractFaqs(content: string): FaqItem[] {
  const faqSectionRegex = /## Preguntas frecuentes\s*\n([\s\S]*?)(?=\n## [^#]|$)/i;
  const match = faqSectionRegex.exec(content);
  if (!match) return [];

  const faqContent = match[1];
  const questionRegex = /### (.+)\n([\s\S]*?)(?=\n### |$)/g;
  const faqs: FaqItem[] = [];
  let qMatch;

  while ((qMatch = questionRegex.exec(faqContent)) !== null) {
    const question = qMatch[1].trim();
    const answer = qMatch[2].trim().replace(/\n+/g, " ");
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}

export function getRelatedPosts(currentSlug: string, pilar?: string, tags?: string[], limit = 3): BlogPostMeta[] {
  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug);

  if (!pilar && (!tags || tags.length === 0)) return allPosts.slice(0, limit);

  // Score posts by relevance
  const scored = allPosts.map((post) => {
    let score = 0;
    if (pilar && post.pilar === pilar) score += 3;
    if (tags && post.tags) {
      for (const tag of tags) {
        if (post.tags.includes(tag)) score += 1;
      }
    }
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
