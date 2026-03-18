import Link from "next/link";

const popularTopics = [
  { href: "/herencias-montes-galicia", label: "Herencias de montes" },
  { href: "/limpieza-desbroce-multas-xunta", label: "Limpieza y multas" },
  { href: "/precio-venta-madera-galicia", label: "Venta de madera" },
  { href: "/localizar-medir-fincas-galicia", label: "Fincas y Catastro" },
  { href: "/compra-venta-terrenos-galicia", label: "Compra-venta" },
  { href: "/vender-parte-monte-proindiviso", label: "Proindivisos" },
];

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-6xl font-extrabold text-green-700 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Página no encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          La página que buscas no existe o ha sido movida. Puede que el enlace
          esté roto o que hayas escrito mal la dirección.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
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
        <div className="text-left bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Quizás buscabas alguno de estos temas:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {popularTopics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="text-sm text-green-700 hover:text-green-900 hover:underline py-1"
              >
                {topic.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
