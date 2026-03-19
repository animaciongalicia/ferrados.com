import Link from "next/link";
import { getAllPosts, type BlogPostMeta } from "@/lib/blog";
import { getCategoryForPilar } from "@/lib/gaceta-categories";
import { AdSenseSlot } from "@/components/AdSense";

interface PilarSidebarProps {
  /** The pilar key used in blog post frontmatter (e.g. "herencias", "limpieza") */
  pilar: string;
  /** Max number of posts to show */
  limit?: number;
}

/**
 * Sticky sidebar for pillar pages.
 * Shows related blog posts, an AdSense slot, and a CTA.
 * Hidden on mobile — content-first on small screens.
 */
export default function PilarSidebar({ pilar, limit = 6 }: PilarSidebarProps) {
  const posts: BlogPostMeta[] = getAllPosts()
    .filter((p) => p.pilar === pilar)
    .slice(0, limit);

  const category = getCategoryForPilar(pilar);

  if (posts.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 space-y-6">
        {/* Related blog posts */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
            {category ? `Artículos sobre ${category.label}` : "Artículos relacionados"}
          </h3>
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <span className="text-sm text-gray-700 group-hover:text-green-800 transition-colors leading-snug font-medium block">
                    {post.title}
                  </span>
                  <span className="text-xs text-gray-400">{post.readingTime} min</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={category ? `/blog?cat=${category.id}` : "/blog"}
            className="block text-sm text-green-700 font-semibold mt-4 hover:text-green-800 transition-colors"
          >
            Ver todos los artículos →
          </Link>
        </div>

        {/* AdSense slot */}
        <AdSenseSlot slot="4104181630" />

        {/* CTA */}
        <Link
          href="#formulario"
          className="block w-full bg-green-700 hover:bg-green-800 text-white text-center px-4 py-4 rounded-lg font-semibold transition-colors text-sm"
        >
          Solicitar asesoramiento gratuito
        </Link>
      </div>
    </aside>
  );
}
