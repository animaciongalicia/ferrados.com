"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { BlogHeading } from "@/lib/blog";

interface TOCProps {
  headings: BlogHeading[];
}

export default function TableOfContents({ headings }: TOCProps) {
  const [open, setOpen] = useState(true);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingEls = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  // Find the topmost visible heading
  const updateActive = useCallback(() => {
    const entries = Array.from(headingEls.current.values());
    const visible = entries.filter((e) => e.isIntersecting);
    if (visible.length > 0) {
      // Pick the one closest to the top
      visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      setActiveSlug(visible[0].target.id);
    }
  }, []);

  useEffect(() => {
    // Disconnect previous observer
    observerRef.current?.disconnect();

    // rootMargin: offset top by header height (80px), trigger when heading enters top 30% of viewport
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          headingEls.current.set(entry.target.id, entry);
        }
        updateActive();
      },
      {
        rootMargin: "-80px 0px -66% 0px",
      }
    );

    // Observe all heading elements that exist in the DOM
    const slugs = headings.map((h) => h.slug);
    for (const slug of slugs) {
      const el = document.getElementById(slug);
      if (el) observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings, updateActive]);

  if (headings.length === 0) return null;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, slug: string) {
    e.preventDefault();
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL hash without jump
      window.history.replaceState(null, "", `#${slug}`);
      setActiveSlug(slug);
    }
  }

  return (
    <nav className="bg-white border border-gray-200 rounded-lg p-4" aria-label="Tabla de contenidos">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          En este artículo
        </h3>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul className="mt-3 space-y-1 max-h-[60vh] overflow-y-auto">
          {headings.map((h) => {
            const isActive = activeSlug === h.slug;
            return (
              <li key={h.slug}>
                <a
                  href={`#${h.slug}`}
                  onClick={(e) => handleClick(e, h.slug)}
                  className={`block text-sm leading-snug py-1 transition-colors border-l-2 ${
                    h.level === 3 ? "pl-4 text-xs" : "pl-3"
                  } ${
                    isActive
                      ? "border-green-600 text-green-800 font-semibold"
                      : "border-transparent text-gray-500 hover:text-green-700 hover:border-gray-300"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
