import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Montes, fincas y terrenos en Galicia",
  description:
    "Artículos sobre montes, fincas, herencias, madera, limpieza y más en Galicia. Información práctica para propietarios.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Blog</h1>
      <p className="text-gray-600 mb-8">
        Artículos prácticos sobre montes, fincas y terrenos en Galicia.
      </p>

      {posts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-500">
            Todavía no hay artículos publicados. ¡Vuelve pronto!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-green-300 transition-all"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <p className="text-sm text-gray-600">{post.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
