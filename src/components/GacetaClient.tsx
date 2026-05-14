"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { AdSenseSlot } from "@/components/AdSense";
import {
  GACETA_CATEGORIES,
  getCategoryForPilar,
  type GacetaCategory,
} from "@/lib/gaceta-categories";
import { GACETA_TAGS, getTagById } from "@/lib/gaceta-tags";

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
function PostCard({ post, onTagClick }: { post: BlogPostMeta; onTagClick: (tagId: string) => void }) {
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
      <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
        {post.description}
      </p>
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 3).map((tagId) => {
            const tag = getTagById(tagId);
            if (!tag) return null;
            return (
              <span
                key={tagId}
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onTagClick(tagId);
                }}
                className={`inline-block border rounded-full text-[10px] px-1.5 py-0 hover:ring-1 hover:ring-current transition-all cursor-pointer ${tag.chipClasses}`}
              >
                {tag.label}
              </span>
            );
          })}
        </div>
      )}
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
  const activeCategory = useMemo(() => {
    const cat = searchParams.get("cat");
    return cat && GACETA_CATEGORIES.some((c) => c.id === cat) ? cat : null;
  }, [searchParams]);

  const activeTag = useMemo(() => {
    const tag = searchParams.get("tag");
    return tag && GACETA_TAGS.some((t) => t.id === tag) ? tag : null;
  }, [searchParams]);

  function buildUrl(catId: string | null, tagId: string | null) {
    const params = new URLSearchParams();
    if (catId) params.set("cat", catId);
    if (tagId) params.set("tag", tagId);
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  }

  function handleCategoryChange(catId: string | null) {
    router.replace(buildUrl(catId, activeTag), { scroll: false });
  }

  function handleTagChange(tagId: string | null) {
    router.replace(buildUrl(activeCategory, tagId), { scroll: false });
  }

  function handleClearFilters() {
    router.replace("/blog", { scroll: false });
  }

  const filteredPosts = posts.filter((post) => {
    if (activeCategory) {
      const cat = GACETA_CATEGORIES.find((c) => c.id === activeCategory);
      if (!cat || !post.pilar || !cat.pilares.includes(post.pilar)) return false;
    }
    if (activeTag) {
      if (!post.tags || !post.tags.includes(activeTag)) return false;
    }
    return true;
  });

  // Active filter labels for empty state messaging
  const activeCatLabel = activeCategory
    ? GACETA_CATEGORIES.find((c) => c.id === activeCategory)?.label
    : null;
  const activeTagLabel = activeTag
    ? GACETA_TAGS.find((t) => t.id === activeTag)?.label
    : null;

  return (
    <>
      {/* ─── Filtros (sticky) ─── */}
      <div className="sticky top-0 z-30 bg-white shadow-sm">
        {/* ─── Menú de Triaje ─── */}
        <div className="border-b border-gray-200">
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

        {/* ─── Etiquetas transversales ─── */}
        <div className="border-b border-gray-100 bg-gray-50/50">
          <div className="max-w-6xl mx-auto px-4 py-2">
            <div className="flex gap-1.5 overflow-x-auto lg:justify-center scrollbar-hide items-center">
              <span className="shrink-0 text-xs text-gray-400 mr-1">Etiquetas:</span>
              {GACETA_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() =>
                    handleTagChange(activeTag === tag.id ? null : tag.id)
                  }
                  className={`shrink-0 border rounded-full text-xs px-2.5 py-0.5 transition-all cursor-pointer ${
                    activeTag === tag.id
                      ? `${tag.chipClasses} ring-1 ring-current font-semibold`
                      : `${tag.chipClasses} opacity-70 hover:opacity-100`
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
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
                <p className="text-gray-500 mb-2">
                  No hay artículos
                  {activeCatLabel && activeTagLabel
                    ? ` en «${activeCatLabel}» con la etiqueta «${activeTagLabel}»`
                    : activeCatLabel
                      ? ` en «${activeCatLabel}»`
                      : activeTagLabel
                        ? ` con la etiqueta «${activeTagLabel}»`
                        : ""
                  } todavía.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  {activeTag && activeCategory && (
                    <button
                      onClick={() => handleTagChange(null)}
                      className="text-sm text-green-700 hover:text-green-900 underline underline-offset-2 cursor-pointer"
                    >
                      Quitar etiqueta
                    </button>
                  )}
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-green-700 hover:text-green-900 underline underline-offset-2 cursor-pointer"
                  >
                    Ver todos los artículos
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} onTagClick={handleTagChange} />
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
