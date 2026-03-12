import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Proindivisos y minifundios en Galicia — Vender tu parte del monte",
  description:
    "¿Compartes un monte con otros propietarios? ¿Quieres vender tu parte o disolver el proindiviso? Te ayudamos a resolver la situación.",
};

export default function ProindivisoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Proindivisos y minifundios</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Minifundios y proindivisos en Galicia
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        En Galicia es muy habitual que un monte o una finca pertenezca a varios
        propietarios (proindiviso), a veces sin que todos se conozcan o estén de
        acuerdo. Esto complica cualquier decisión: vender madera, limpiar, vender
        la parcela... Te ayudamos a encontrar una salida.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Situaciones habituales
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Quieres vender tu parte pero los otros copropietarios no quieren.</li>
          <li>No sabes quiénes son todos los copropietarios.</li>
          <li>La finca es tan pequeña que no resulta rentable dividirla.</li>
          <li>Necesitas disolver el proindiviso legalmente.</li>
        </ul>
      </section>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          ¿Tienes un proindiviso que quieres resolver?
        </h2>
        <p className="text-gray-600 mb-4">
          Cuéntanos los detalles y te orientamos sin compromiso.
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
        <LeadForm origen="proindiviso" />
      </section>
    </div>
  );
}
