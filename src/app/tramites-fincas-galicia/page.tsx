import type { Metadata } from "next";
import Link from "next/link";
import TramitesForm from "@/components/forms/TramitesForm";
import PilarJsonLd from "@/components/PilarJsonLd";
import PilarSidebar from "@/components/PilarSidebar";

export const metadata: Metadata = {
  title: "Trámites para fincas en Galicia — Escrituras, registro, impuestos y más",
  description:
    "¿Necesitas escriturar una finca, inscribirla en el Registro, inmatricular o saber qué impuestos pagas? Guía completa de trámites para fincas rústicas en Galicia.",
  alternates: { canonical: "/tramites-fincas-galicia" },
};

export default function TramitesPage() {
  return (
    <>
    <PilarJsonLd
      title="Trámites para fincas en Galicia"
      description="Escrituras, Registro de la Propiedad, inmatriculación, impuestos y papeleo para fincas en Galicia."
      slug="tramites-fincas-galicia"
      breadcrumbLabel="Trámites para fincas"
    />
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
        <div>
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Trámites para fincas</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Trámites para fincas en Galicia: todo el papeleo que necesitas resolver
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Escrituras, Registro de la Propiedad, Catastro, impuestos, notaría...
        El papeleo de las fincas en Galicia es un laberinto burocrático donde cada
        paso depende del anterior. Aquí te explicamos qué necesitas, en qué orden
        y cuánto cuesta. Y si prefieres que lo haga un profesional, te conectamos.
      </p>

      {/* Datos clave */}
      <section className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-indigo-900 mb-3">
          Lo que necesitas saber sobre el papeleo en Galicia
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <p className="text-2xl font-bold text-indigo-700">70%</p>
            <p className="text-sm text-gray-600 mt-1">Fincas sin inscripción registral actualizada</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <p className="text-2xl font-bold text-indigo-700">300 – 1.000 €</p>
            <p className="text-sm text-gray-600 mt-1">Coste habitual de notaría para escriturar</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <p className="text-2xl font-bold text-indigo-700">8%</p>
            <p className="text-sm text-gray-600 mt-1">ITP en compraventa de rústicos en Galicia</p>
          </div>
        </div>
      </section>

      {/* Escrituras */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué son las escrituras y por qué las necesitas?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          La escritura pública es el documento notarial que acredita que eres el
          propietario de una finca. Sin escritura, no puedes vender, hipotecar ni
          inscribir la finca en el Registro de la Propiedad.
        </p>
        <p className="text-gray-700 leading-relaxed mb-3">
          En Galicia, miles de fincas se han transmitido durante generaciones sin
          pasar jamás por un notario. El resultado: fincas a nombre de bisabuelos
          fallecidos, sin escritura alguna, que solo figuran en el Catastro (y a
          veces ni eso).
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>¿Cuánto cuesta escriturar una finca rústica?</strong> Entre 300 y 1.000 €
            de notaría, dependiendo del valor declarado. Si hay que hacer acta de
            notoriedad (porque no hay título previo), el coste puede subir a 1.500 – 2.500 €.
          </p>
        </div>
      </section>

      {/* Registro vs Catastro */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Registro de la Propiedad vs Catastro: no son lo mismo
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Esta confusión es la fuente del 80% de los problemas con fincas en Galicia.
          Son dos organismos distintos con funciones distintas:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="font-semibold text-blue-900 mb-2">Registro de la Propiedad</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Acredita quién es el <strong>dueño legal</strong></li>
              <li>• Inscripción <strong>voluntaria</strong> (pero muy recomendable)</li>
              <li>• Protege frente a terceros (fe pública registral)</li>
              <li>• Sin inscripción, no puedes vender con seguridad jurídica</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="font-semibold text-amber-900 mb-2">Catastro</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Es un registro <strong>fiscal</strong> (para cobrar el IBI)</li>
              <li>• Inscripción <strong>obligatoria</strong></li>
              <li>• Describe la ubicación y superficie de la parcela</li>
              <li>• No acredita propiedad, solo titularidad catastral</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Lo ideal es que ambos coincidan: misma persona, misma superficie, misma
          descripción. En la práctica, en Galicia rara vez coinciden.
        </p>
      </section>

      {/* Inmatriculación */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Inmatriculación: la primera inscripción en el Registro
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Si tu finca nunca ha estado inscrita en el Registro de la Propiedad (algo
          muy habitual en Galicia), necesitas inmatricularla. Es el trámite más complejo
          y largo de todos.
        </p>
        <div className="space-y-4">
          {[
            { step: "1", title: "Obtener título público", desc: "Necesitas una escritura de propiedad. Si no la tienes, un acta de notoriedad o un expediente de dominio ante el Juzgado o el notario." },
            { step: "2", title: "Certificación catastral descriptiva y gráfica", desc: "El Catastro debe tener la finca identificada con su referencia catastral y coordenadas georreferenciadas." },
            { step: "3", title: "Doble título", desc: "El Registro exige acreditar la adquisición mediante dos títulos sucesivos (por ejemplo, la herencia del padre + la herencia del abuelo) o bien un expediente de dominio." },
            { step: "4", title: "Presentación y publicación de edictos", desc: "El Registro publica la solicitud durante 2 meses para que posibles interesados puedan oponerse. Si nadie se opone, se inscribe." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 items-start">
              <div className="bg-indigo-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
              <div>
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impuestos */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Impuestos que afectan a las fincas en Galicia
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Impuesto</th>
                <th className="text-left p-3 font-semibold text-gray-700">Cuándo se paga</th>
                <th className="text-left p-3 font-semibold text-gray-700">Cuánto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="p-3">IBI (Impuesto de Bienes Inmuebles)</td><td className="p-3">Cada año</td><td className="p-3">20 – 200 €/año (rústico)</td></tr>
              <tr><td className="p-3">ITP (Impuesto Transmisiones Patrimoniales)</td><td className="p-3">Al comprar</td><td className="p-3">8% del precio escriturado</td></tr>
              <tr><td className="p-3">Plusvalía municipal</td><td className="p-3">Al vender</td><td className="p-3">Variable según municipio</td></tr>
              <tr><td className="p-3">IRPF (ganancia patrimonial)</td><td className="p-3">Al vender (si hay beneficio)</td><td className="p-3">19 – 26% sobre la ganancia</td></tr>
              <tr><td className="p-3">Impuesto de Sucesiones</td><td className="p-3">Al heredar</td><td className="p-3">Bonificación del 99% entre familiares directos en Galicia</td></tr>
              <tr><td className="p-3">AJD (Actos Jurídicos Documentados)</td><td className="p-3">Al escriturar</td><td className="p-3">1,5% en Galicia</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          La bonificación del 99% en Sucesiones para familiares directos (cónyuge, hijos,
          padres) es una de las mayores ventajas fiscales de Galicia. Pero ojo: hay que
          liquidar el impuesto igualmente dentro de los 6 meses siguientes al fallecimiento.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          ¿Necesitas resolver un trámite con tu finca?
        </h2>
        <p className="text-gray-600 mb-2">
          Cuéntanos tu caso y un abogado o gestor especializado en fincas
          en Galicia te contactará. Sin compromiso.
        </p>
      </section>

      <section id="formulario">
        <TramitesForm origen="pilar-tramites" />
      </section>
        </div>
        <PilarSidebar pilar="tramites" />
      </div>
    </div>
    </>
  );
}
