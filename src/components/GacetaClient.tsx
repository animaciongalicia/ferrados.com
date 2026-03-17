"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { AdSenseSlot } from "@/components/AdSense";
import {
  GACETA_CATEGORIES,
  getCategoryForPilar,
  type GacetaCategory,
} from "@/lib/gaceta-categories";

interface GacetaClientProps {
  posts: BlogPostMeta[];
  topPosts: BlogPostMeta[];
  recentPosts: BlogPostMeta[];
}

/* ─── Category Pill ─── */
function CategoryPill({
  category,
  small,
}: {
  category: GacetaCategory;
  small?: boolean;
}) {
  return (
    <span
      className={`inline-block border rounded-full whitespace-nowrap ${
        small ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"
      } ${category.pillClasses}`}
    >
      {category.label}
    </span>
  );
}

/* ─── Post Card ─── */
function PostCard({ post }: { post: BlogPostMeta }) {
  const category = getCategoryForPilar(post.pilar);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-gray-300 transition-all group"
    >
      {category && (
        <div className="mb-3">
          <CategoryPill category={category} small />
        </div>
      )}
      <h2 className="text-lg font-extrabold text-gray-900 mb-2 leading-snug group-hover:text-green-800 transition-colors">
        {post.title}
      </h2>
      <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
        {post.description}
      </p>
      <span className="text-sm text-green-700 font-bold mt-auto">
        Leer solución →
      </span>
    </Link>
  );
}

/* ─── Sidebar ─── */
function Sidebar({ topPosts, recentPosts }: { topPosts: BlogPostMeta[]; recentPosts: BlogPostMeta[] }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 space-y-6">
        {/* CTA Principal */}
        <Link
          href="/precio-venta-madera-galicia"
          className="block w-full bg-green-700 hover:bg-green-800 text-white text-center px-4 py-4 rounded-lg font-semibold transition-colors text-sm leading-snug"
        >
          ¿Eucalipto en A Coruña?
          <br />
          Lo tasamos hoy.
        </Link>

        {/* Top Dolores — 4 items */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Lo más consultado
          </h3>
          <ul className="space-y-3">
            {topPosts.map((post, i) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex gap-3 group"
                >
                  <span className="text-lg font-extrabold text-gray-300 group-hover:text-green-600 transition-colors leading-none mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 group-hover:text-green-800 transition-colors leading-snug font-medium">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Más recientes — 4 items */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Más recientes
          </h3>
          <ul className="space-y-3">
            {recentPosts.map((post) => {
              const cat = getCategoryForPilar(post.pilar);
              return (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="block group">
                    {cat && (
                      <span className={`inline-block border rounded-full text-[10px] px-1.5 py-0 mb-1 ${cat.pillClasses}`}>
                        {cat.label}
                      </span>
                    )}
                    <span className="text-sm text-gray-700 group-hover:text-green-800 transition-colors leading-snug font-medium block">
                      {post.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* AdSense */}
        <AdSenseSlot slot="4060083059" />
      </div>
    </aside>
  );
}

/* ─── Main Component ─── */
export default function GacetaClient({ posts, topPosts, recentPosts }: GacetaClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const catParam = searchParams.get("cat");

  const [activeCategory, setActiveCategory] = useState<string | null>(
    catParam && GACETA_CATEGORIES.some((c) => c.id === catParam) ? catParam : null
  );

  // Sync with URL when searchParams change
  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && GACETA_CATEGORIES.some((c) => c.id === cat)) {
      setActiveCategory(cat);
    } else {
      setActiveCategory(null);
    }
  }, [searchParams]);

  function handleCategoryChange(catId: string | null) {
    setActiveCategory(catId);
    if (catId) {
      router.replace(`/blog?cat=${catId}`, { scroll: false });
    } else {
      router.replace("/blog", { scroll: false });
    }
  }

  const filteredPosts = activeCategory
    ? posts.filter((post) => {
        const cat = GACETA_CATEGORIES.find((c) => c.id === activeCategory);
        return cat && post.pilar && cat.pilares.includes(post.pilar);
      })
    : posts;

  return (
    <>
      {/* ─── Menú de Triaje ─── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto lg:justify-center scrollbar-hide">
            {/* "Todos" chip */}
            <button
              onClick={() => handleCategoryChange(null)}
              className={`shrink-0 border rounded-full text-sm px-3 py-1 transition-all cursor-pointer ${
                activeCategory === null
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Todos
            </button>
            {GACETA_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  handleCategoryChange(activeCategory === cat.id ? null : cat.id)
                }
                className={`shrink-0 border rounded-full text-sm px-3 py-1 transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? cat.pillActiveClasses
                    : `${cat.pillClasses} hover:opacity-80`
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Layout Principal ─── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          {/* Escaparate */}
          <div>
            {filteredPosts.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500">
                  No hay artículos en esta categoría todavía.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar topPosts={topPosts} recentPosts={recentPosts} />
        </div>
      </div>
    </>
  );
}
