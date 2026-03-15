"use client";

import { useState } from "react";
import type { BlogHeading } from "@/lib/blog";

interface MobileTOCProps {
  headings: BlogHeading[];
}

export default function MobileTOC({ headings }: MobileTOCProps) {
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, slug: string) {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${slug}`);
    }
  }

  return (
    <div className="lg:hidden mb-6 border border-gray-200 rounded-lg bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 text-left"
      >
        <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          Contenido del artículo
        </span>
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
        <ul className="px-4 pb-3 space-y-1 border-t border-gray-100 pt-2 max-h-[50vh] overflow-y-auto">
          {headings.map((h) => (
            <li key={h.slug}>
              <a
                href={`#${h.slug}`}
                onClick={(e) => handleClick(e, h.slug)}
                className={`block text-sm text-gray-600 hover:text-green-700 transition-colors leading-snug py-1 ${
                  h.level === 3 ? "pl-3 text-xs" : ""
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
