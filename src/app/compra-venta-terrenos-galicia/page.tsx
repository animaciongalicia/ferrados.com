import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compra-venta de terrenos en Galicia (próximamente)",
  description:
    "Servicio de asesoramiento para compra y venta de terrenos, fincas y montes en Galicia. Próximamente disponible.",
};

export default function CompraVentaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 text-center">
      <nav className="text-sm text-gray-500 mb-6 text-left">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Compra-venta de terrenos</span>
      </nav>

      <div className="py-16">
        <div className="text-5xl mb-6">🏡</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Compra-venta de terrenos en Galicia
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Estamos preparando esta sección. Pronto podrás encontrar aquí
          orientación para comprar o vender terrenos, fincas y montes en Galicia.
        </p>
        <Link
          href="/empezar"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
        >
          Mientras tanto, cuéntanos tu caso
        </Link>
      </div>
    </div>
  );
}
