import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Localizar y medir fincas en Galicia — Catastro y lindes",
  description:
    "¿No sabes dónde está tu finca? ¿Tienes problemas con el Catastro o los lindes? Te ayudamos a localizar, medir y regularizar tu parcela en Galicia.",
};

export default function FincasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Localizar y medir fincas</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Localizar y medir tu finca en Galicia
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        En Galicia hay cientos de miles de parcelas con problemas de
        delimitación, fincas que no aparecen en el Catastro o que tienen
        superficies incorrectas. Si necesitas localizar, medir o regularizar
        tu parcela, podemos orientarte.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Problemas habituales</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>La finca no aparece en el Catastro o tiene datos incorrectos.</li>
          <li>No sabes dónde están los lindes exactos de tu parcela.</li>
          <li>Conflictos con vecinos por los límites del terreno.</li>
          <li>La superficie catastral no coincide con la real.</li>
          <li>Necesitas un informe técnico para una venta o herencia.</li>
        </ul>
      </section>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          ¿Necesitas localizar o medir tu finca?
        </h2>
        <p className="text-gray-600 mb-4">
          Cuéntanos tu caso y te orientamos sobre los pasos a seguir.
        </p>
        <Link
          href="/empezar"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
        >
          Empezar ahora
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
          Cuéntanos tu situación
        </h2>
        <LeadForm origen="lindes" />
      </section>
    </div>
  );
}
