import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getAllPosts, getPostBySlug, getRelatedPosts, getPrevNextPosts, extractFaqs } from "@/lib/blog";
import { getCategoryForPilar, GACETA_CATEGORIES } from "@/lib/gaceta-categories";
import CajaSecuestro from "@/components/CajaSecuestro";
import TableOfContents from "@/components/TableOfContents";
import MobileTOC from "@/components/MobileTOC";
import ReadingProgress from "@/components/ReadingProgress";
import { AdSenseScript, AdSenseSlot } from "@/components/AdSense";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post no encontrado" };

  const category = getCategoryForPilar(post.meta.pilar);

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      section: category?.label,
      tags: post.meta.tags,
    },
  };
}

const pilarLinks: Record<string, { href: string; label: string }> = {
  herencias: { href: "/herencias-montes-galicia", label: "Consulta tu herencia" },
  limpieza: { href: "/limpieza-desbroce-multas-xunta", label: "Calcula el coste de limpieza" },
  lindes: { href: "/localizar-medir-fincas-galicia", label: "Solicita una medición" },
  madera: { href: "/precio-venta-madera-galicia", label: "Pide valoración de tu madera" },
  proindiviso: { href: "/vender-parte-monte-proindiviso", label: "Consulta tu proindiviso" },
  compraventa: { href: "/compra-venta-terrenos-galicia", label: "Consulta tu compra-venta" },
};

/**
 * Split markdown content roughly in half by paragraphs
 * so CajaSecuestro can be injected mid-article.
 */
function splitContentAtMiddle(content: string): [string, string] {
  const paragraphs = content.split(/\n\n+/);
  const midpoint = Math.ceil(paragraphs.length / 2);
  return [
    paragraphs.slice(0, midpoint).join("\n\n"),
    paragraphs.slice(midpoint).join("\n\n"),
  ];
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const pilarCta = post.meta.pilar ? pilarLinks[post.meta.pilar] : null;
  const category = getCategoryForPilar(post.meta.pilar);
  const related = getRelatedPosts(slug, post.meta.pilar, post.meta.tags, 3);
  const { prev, next } = getPrevNextPosts(slug, post.meta.pilar);
  const [firstHalf, secondHalf] = splitContentAtMiddle(post.content);
  const faqs = extractFaqs(post.content);

  // Find category ID for linking to filtered blog
  const categoryId = GACETA_CATEGORIES.find((c) =>
    post.meta.pilar && c.pilares.includes(post.meta.pilar)
  )?.id;

  // JSON-LD Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: {
      "@type": "Organization",
      name: "Ferrados.com",
      url: "https://ferrados.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Ferrados.com",
      url: "https://ferrados.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ferrados.com/blog/${slug}`,
    },
    ...(category && { articleSection: category.label }),
    ...(post.meta.tags && { keywords: post.meta.tags.join(", ") }),
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://ferrados.com" },
      { "@type": "ListItem", position: 2, name: "La Gaceta", item: "https://ferrados.com/blog" },
      { "@type": "ListItem", position: 3, name: post.meta.title, item: `https://ferrados.com/blog/${slug}` },
    ],
  };

  return (
    <>
      <ReadingProgress />
      <AdSenseScript />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* FAQ Schema */}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-green-700">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-green-700">La Gaceta</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 line-clamp-1">{post.meta.title}</span>
        </nav>
      </div>

      {/* Two-column layout */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
          {/* ─── Main content column ─── */}
          <article className="max-w-3xl">
            {category && (
              <Link
                href={categoryId ? `/blog?cat=${categoryId}` : "/blog"}
                className={`inline-block border rounded-full text-xs px-2 py-0.5 mb-4 hover:opacity-80 transition-opacity ${category.pillClasses}`}
              >
                {category.label}
              </Link>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              {post.meta.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
              <time>{post.meta.date}</time>
              <span aria-hidden="true">·</span>
              <span>{post.meta.readingTime} min de lectura</span>
            </div>

            {/* Mobile TOC — visible only on mobile/tablet */}
            {post.headings.length > 0 && (
              <MobileTOC headings={post.headings} />
            )}

            {/* First half of markdown */}
            <div className="prose prose-lg prose-gray max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                {firstHalf}
              </ReactMarkdown>
            </div>

            {/* CajaSecuestro — interrupts reading mid-article */}
            <CajaSecuestro pilar={post.meta.pilar} />

            {/* Second half of markdown */}
            <div className="prose prose-lg prose-gray max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                {secondHalf}
              </ReactMarkdown>
            </div>

            {/* Prev / Next navigation (within same topic) */}
            {(prev || next) && (
              <nav className="border-t border-gray-200 pt-8 mt-12">
                {category && (
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                    Más sobre {category.label}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prev ? (
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="group flex flex-col p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all"
                    >
                      <span className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        ← Anterior
                      </span>
                      <span className="text-sm font-semibold text-gray-800 group-hover:text-green-800 transition-colors leading-snug">
                        {prev.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next && (
                    <Link
                      href={`/blog/${next.slug}`}
                      className="group flex flex-col p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all sm:text-right"
                    >
                      <span className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        Siguiente →
                      </span>
                      <span className="text-sm font-semibold text-gray-800 group-hover:text-green-800 transition-colors leading-snug">
                        {next.title}
                      </span>
                    </Link>
                  )}
                </div>
              </nav>
            )}

            {/* End-of-post CTA */}
            <section className="pt-10 mt-8">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  ¿Necesitas ayuda con tu finca o monte?
                </h2>
                <p className="text-gray-600 mb-4">
                  Un profesional de tu zona puede orientarte sin compromiso.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {pilarCta && (
                    <Link
                      href={pilarCta.href}
                      className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                    >
                      {pilarCta.label}
                    </Link>
                  )}
                  <Link
                    href="/empezar"
                    className={`${pilarCta ? "border border-green-700 text-green-700" : "bg-green-700 text-white"} px-6 py-3 rounded-lg font-semibold hover:bg-green-800 hover:text-white transition-colors`}
                  >
                    Empezar ahora
                  </Link>
                </div>
              </div>
            </section>
          </article>

          {/* ─── Sticky sidebar (desktop only) ─── */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              {/* Topic navigation menu */}
              <nav className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  Explorar temas
                </h3>
                <div className="flex flex-col gap-1.5">
                  <Link
                    href="/blog"
                    className="text-sm text-gray-500 hover:text-green-700 transition-colors py-1 px-2 rounded"
                  >
                    ← Todos los artículos
                  </Link>
                  {GACETA_CATEGORIES.map((cat) => {
                    const isCurrentTopic = category?.id === cat.id;
                    return (
                      <Link
                        key={cat.id}
                        href={`/blog?cat=${cat.id}`}
                        className={`text-sm py-1.5 px-2 rounded transition-colors ${
                          isCurrentTopic
                            ? `${cat.pillActiveClasses} font-semibold`
                            : `${cat.pillClasses} hover:opacity-80`
                        }`}
                      >
                        {cat.label}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Table of Contents */}
              {post.headings.length > 0 && (
                <TableOfContents headings={post.headings} />
              )}

              {/* AdSense slot */}
              <AdSenseSlot slot="sidebar-post" />

              {/* Related posts */}
              {related.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                    Artículos relacionados
                  </h3>
                  <ul className="space-y-3">
                    {related.map((r) => {
                      const rCat = getCategoryForPilar(r.pilar);
                      return (
                        <li key={r.slug}>
                          <Link
                            href={`/blog/${r.slug}`}
                            className="block group"
                          >
                            {rCat && (
                              <span className={`inline-block border rounded-full text-[10px] px-1.5 py-0 mb-1 ${rCat.pillClasses}`}>
                                {rCat.label}
                              </span>
                            )}
                            <span className="text-sm text-gray-700 group-hover:text-green-800 transition-colors leading-snug font-medium block">
                              {r.title}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <Link
                href="/empezar"
                className="block w-full bg-green-700 hover:bg-green-800 text-white text-center px-4 py-4 rounded-lg font-semibold transition-colors text-sm"
              >
                ¿Necesitas ayuda? Empezar ahora
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
