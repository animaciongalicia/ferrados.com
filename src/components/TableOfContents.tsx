"use client";

import { useState } from "react";
import type { BlogHeading } from "@/lib/blog";

interface TOCProps {
  headings: BlogHeading[];
}

export default function TableOfContents({ headings }: TOCProps) {
  const [open, setOpen] = useState(true);

  if (headings.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
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
        <ul className="mt-3 space-y-2">
          {headings.map((h) => (
            <li key={h.slug}>
              <a
                href={`#${h.slug}`}
                className={`block text-sm text-gray-600 hover:text-green-700 transition-colors leading-snug ${
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
