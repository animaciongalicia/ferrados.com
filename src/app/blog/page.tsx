import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import GacetaClient from "@/components/GacetaClient";

export const metadata: Metadata = {
  title: "La Gaceta — Montes, fincas y terrenos en Galicia",
  description:
    "Artículos prácticos sobre multas, limpieza, madera, herencias y catastro de fincas en Galicia. Soluciones reales para propietarios preocupados.",
};

export default function GacetaPage() {
  const posts = getAllPosts();
  const topPosts = posts.slice(0, 3);

  return (
    <div>
      {/* Header de la Gaceta */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            La Gaceta
          </h1>
          <p className="text-gray-600 mt-1">
            Soluciones para propietarios de montes y fincas en Galicia.
          </p>
        </div>
      </div>

      <GacetaClient posts={posts} topPosts={topPosts} />
    </div>
  );
}
