import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Herencias de montes y fincas en Galicia",
  description:
    "¿Has heredado un monte o una finca en Galicia? Te ayudamos con los papeles, la sucesión, el Catastro y todo lo necesario para poner la titularidad en orden.",
};

export default function HerenciasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Herencias de montes y fincas</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Herencias de montes y fincas en Galicia
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Has heredado un monte, una finca o un terreno en Galicia y no sabes qué
        hacer. Quizá vives fuera, no conoces los papeles necesarios, o tienes
        dudas sobre la sucesión. Estamos aquí para ayudarte.
      </p>

      {/* Secciones de contenido */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Por qué es importante regularizar una herencia de un monte?
        </h2>
        <p className="text-gray-700 mb-3 leading-relaxed">
          En Galicia hay miles de fincas y montes que pasan de generación en
          generación sin que nadie actualice la titularidad. Esto genera
          problemas: no puedes vender la madera, no puedes solicitar ayudas, no
          sabes si te llega una multa por no limpiar, y a menudo ni siquiera
          sabes dónde está exactamente tu parcela.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Regularizar la herencia es el primer paso para poder tomar decisiones
          sobre tu monte: mantenerlo, venderlo o ponerlo a producir.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué papeles necesitas?
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Certificado de defunción y de últimas voluntades.</li>
          <li>Testamento (si lo hay) o declaración de herederos.</li>
          <li>Escritura de aceptación de herencia ante notario.</li>
          <li>Liquidación del impuesto de sucesiones en la Xunta.</li>
          <li>Inscripción en el Registro de la Propiedad y en el Catastro.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Vivo fuera de Galicia, ¿puedo hacerlo a distancia?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Sí. Muchos de los propietarios que nos consultan viven en Madrid, Barcelona,
          el resto de España o incluso en el extranjero. La mayoría de los
          trámites se pueden gestionar a distancia con los documentos adecuados
          y alguien de confianza sobre el terreno.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Problemas habituales con herencias de montes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Fincas sin escrituras ni registro",
            "Múltiples herederos que no se ponen de acuerdo",
            "Parcelas que no aparecen en el Catastro",
            "Herencias encadenadas (abuelo → padre → hijo) sin hacer",
            "No saber exactamente qué fincas se heredan",
            "Propiedades a nombre de personas fallecidas hace décadas",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg"
            >
              <span className="text-amber-600 mt-0.5">⚠</span>
              <span className="text-sm text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA intermedio */}
      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          ¿Necesitas ayuda con tu herencia?
        </h2>
        <p className="text-gray-600 mb-4">
          Cuéntanos tu situación y te orientamos sin compromiso.
        </p>
        <Link
          href="/empezar"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
        >
          Empezar ahora
        </Link>
      </section>

      {/* Formulario embebido */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
          O cuéntanos directamente aquí
        </h2>
        <LeadForm origen="herencias" />
      </section>
    </div>
  );
}
