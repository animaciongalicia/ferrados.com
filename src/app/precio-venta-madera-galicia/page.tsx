import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Precio y venta de madera en Galicia — Pinos y eucaliptos",
  description:
    "¿Quieres vender la madera de tu monte en Galicia? Pinos, eucaliptos, precios actuales, cuándo cortar y cómo conseguir el mejor precio. Te ayudamos.",
};

export default function MaderaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Venta de madera</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Vender madera en Galicia: pinos y eucaliptos
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Tienes un monte con pinos o eucaliptos y quieres saber cuánto vale la
        madera, cuándo es el mejor momento para cortar y cómo encontrar un buen
        comprador. Te orientamos en todo el proceso.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué debes saber antes de vender?
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>La edad y el diámetro de los árboles determinan el precio.</li>
          <li>Los precios de la madera varían según el mercado y la temporada.</li>
          <li>Necesitas permisos de corta (autorización de la Xunta).</li>
          <li>Es importante comparar ofertas de diferentes maderistas.</li>
          <li>Si vives fuera, puedes gestionarlo a distancia con ayuda profesional.</li>
        </ul>
      </section>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          ¿Quieres saber cuánto vale tu madera?
        </h2>
        <p className="text-gray-600 mb-4">
          Cuéntanos qué tienes y te orientamos sobre el proceso de venta.
        </p>
        <Link
          href="/empezar"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
        >
          Calcular mi situación
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
          Cuéntanos tu situación
        </h2>
        <LeadForm origen="madera" />
      </section>
    </div>
  );
}
