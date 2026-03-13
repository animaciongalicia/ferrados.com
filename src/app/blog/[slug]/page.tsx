import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { getCategoryForPilar } from "@/lib/gaceta-categories";
import CajaSecuestro from "@/components/CajaSecuestro";
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

  return {
    title: post.meta.title,
    description: post.meta.description,
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
  const [firstHalf, secondHalf] = splitContentAtMiddle(post.content);

  return (
    <>
      <AdSenseScript />

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
              <span
                className={`inline-block border rounded-full text-xs px-2 py-0.5 mb-4 ${category.pillClasses}`}
              >
                {category.label}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              {post.meta.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
              <time>{post.meta.date}</time>
              <span aria-hidden="true">·</span>
              <span>{post.meta.readingTime} min de lectura</span>
            </div>

            {/* First half of markdown */}
            <div className="prose prose-lg prose-gray max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {firstHalf}
              </ReactMarkdown>
            </div>

            {/* CajaSecuestro — interrupts reading mid-article */}
            <CajaSecuestro pilar={post.meta.pilar} />

            {/* Second half of markdown */}
            <div className="prose prose-lg prose-gray max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {secondHalf}
              </ReactMarkdown>
            </div>

            {/* End-of-post CTA */}
            <section className="border-t border-gray-200 pt-10 mt-12">
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
              {/* AdSense slot */}
              <AdSenseSlot slot="sidebar-post" />

              {/* Related posts */}
              {related.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                    Artículos relacionados
                  </h3>
                  <ul className="space-y-3">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/blog/${r.slug}`}
                          className="text-sm text-gray-700 hover:text-green-800 transition-colors leading-snug font-medium block"
                        >
                          {r.title}
                        </Link>
                      </li>
                    ))}
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
