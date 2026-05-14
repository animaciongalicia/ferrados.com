"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-6xl font-extrabold text-green-700 mb-4">Ups…</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          No hemos podido cargar La Gaceta
        </h1>
        <p className="text-gray-600 mb-8">
          Ha ocurrido un error al cargar este artículo. Puedes reintentarlo o
          volver al índice de La Gaceta.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 mb-6">
            Código de referencia: <code>{error.digest}</code>
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
          >
            Reintentar
          </button>
          <Link
            href="/blog"
            className="border border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-800 hover:text-white transition-colors"
          >
            Ir a La Gaceta
          </Link>
        </div>
      </div>
    </div>
  );
}
