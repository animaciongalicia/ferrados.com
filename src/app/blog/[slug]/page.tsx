import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

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

// Map pilar names to their URLs for CTA at end of post
const pilarLinks: Record<string, { href: string; label: string }> = {
  herencias: { href: "/herencias-montes-galicia", label: "Consulta tu herencia" },
  limpieza: { href: "/limpieza-desbroce-multas-xunta", label: "Calcula el coste de limpieza" },
  lindes: { href: "/localizar-medir-fincas-galicia", label: "Solicita una medición" },
  madera: { href: "/precio-venta-madera-galicia", label: "Pide valoración de tu madera" },
  proindiviso: { href: "/vender-parte-monte-proindiviso", label: "Consulta tu proindiviso" },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const pilarCta = post.meta.pilar ? pilarLinks[post.meta.pilar] : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-green-700">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{post.meta.title}</span>
      </nav>

      <article>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
          {post.meta.title}
        </h1>
        <p className="text-sm text-gray-500 mb-8">{post.meta.date}</p>

        <div className="prose prose-gray max-w-none mb-12 whitespace-pre-line">
          {post.content}
        </div>
      </article>

      {/* CTA al final del post — enlaza al pilar correspondiente */}
      <section className="border-t border-gray-200 pt-10">
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
    </div>
  );
}
