"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root error boundary:", error);
  }, [error]);

  return (
    <html lang="es">
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-lg">
            <p className="text-6xl font-extrabold text-green-700 mb-4">Ups…</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Algo ha ido mal
            </h1>
            <p className="text-gray-600 mb-8">
              Ha ocurrido un error inesperado. Puedes intentarlo de nuevo o
              volver al inicio.
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
              <a
                href="/"
                className="border border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-800 hover:text-white transition-colors"
              >
                Ir al inicio
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
