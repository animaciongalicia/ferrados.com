import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-extrabold text-green-700 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Página no encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          La página que buscas no existe o ha sido movida. Puede que el enlace
          esté roto o que hayas escrito mal la dirección.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
          >
            Ir al inicio
          </Link>
          <Link
            href="/blog"
            className="border border-green-700 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-800 hover:text-white transition-colors"
          >
            Ver La Gaceta
          </Link>
        </div>
      </div>
    </div>
  );
}
