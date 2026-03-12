import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Limpieza de fincas y multas de la Xunta — Ley de biomasa Galicia",
  description:
    "¿Te exigen limpiar tu finca en Galicia? Ley de biomasa, franjas de protección, multas de la Xunta. Te explicamos qué hacer y cómo cumplir.",
};

export default function LimpiezaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Limpieza y multas</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Limpieza obligatoria de fincas y multas de la Xunta
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        La normativa gallega obliga a mantener limpias las fincas forestales,
        especialmente en las franjas de protección. Si no cumples, la Xunta
        puede sancionarte. Te explicamos qué hacer.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué es la ley de biomasa?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          La legislación gallega contra incendios forestales exige a los
          propietarios de parcelas forestales y agrícolas mantener limpias
          las franjas de protección alrededor de viviendas y núcleos de
          población. El incumplimiento puede acarrear multas importantes.
        </p>
      </section>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          ¿Te han notificado una obligación de limpieza?
        </h2>
        <p className="text-gray-600 mb-4">
          Cuéntanos tu situación y te orientamos sobre los pasos a seguir.
        </p>
        <Link
          href="/empezar"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
        >
          Quiero ayuda con mi finca
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
          Cuéntanos tu situación
        </h2>
        <LeadForm origen="limpieza" />
      </section>
    </div>
  );
}
