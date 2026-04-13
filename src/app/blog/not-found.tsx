import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-6xl font-extrabold text-green-700 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Artículo no encontrado
        </h1>
        <p className="text-gray-600 mb-8">
          Este artículo de La Gaceta no existe, ha sido movido o aún no está
          publicado. Puedes explorar los últimos artículos desde el índice.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/blog"
            className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
          >
            Ir a La Gaceta
          </Link>
          <Link
            href="/"
            className="border border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-800 hover:text-white transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
