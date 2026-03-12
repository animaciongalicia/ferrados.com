import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import LeadForm from "@/components/LeadForm";

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

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

        {/* Renderizado simple del contenido markdown como texto */}
        <div className="prose prose-gray max-w-none mb-12 whitespace-pre-line">
          {post.content}
        </div>
      </article>

      {/* CTA + formulario al final del post */}
      <section className="border-t border-gray-200 pt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
          ¿Necesitas ayuda con tu finca o monte?
        </h2>
        <LeadForm origen={`blog-${slug}`} />
      </section>
    </div>
  );
}
