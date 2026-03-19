import type { Metadata } from "next";
import Link from "next/link";
import LindesForm from "@/components/forms/LindesForm";
import PilarJsonLd from "@/components/PilarJsonLd";
import PilarSidebar from "@/components/PilarSidebar";

export const metadata: Metadata = {
  title: "Localizar y medir fincas en Galicia — Catastro, lindes, topografía",
  description:
    "¿No sabes dónde está tu finca? ¿El Catastro tiene datos incorrectos? ¿Conflicto de lindes? Un topógrafo puede resolverlo.",
  alternates: { canonical: "/localizar-medir-fincas-galicia" },
};

export default function FincasPage() {
  return (
    <>
    <PilarJsonLd
      title="Localizar y medir fincas en Galicia"
      description="Topografía, lindes, Catastro y georreferenciación de fincas en Galicia."
      slug="localizar-medir-fincas-galicia"
      breadcrumbLabel="Localizar y medir fincas"
    />
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
        <div>
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Localizar y medir fincas</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Localizar y medir tu finca en Galicia: Catastro, lindes y topografía
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Galicia tiene más de <strong>11 millones de parcelas catastrales rústicas</strong>,
        la cifra más alta de España. Muchas proceden del minifundio histórico: fincas
        pequeñas divididas por herencias durante generaciones. El resultado es un
        puzzle catastral con errores de ubicación, superficies incorrectas y lindes
        sin definir.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Por qué es un problema tan extendido?
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>La cartografía catastral tiene errores de ubicación y superficie.</li>
          <li>Los lindes se marcaban con muros de piedra o árboles que ya no existen.</li>
          <li>Hay parcelas &ldquo;comidas&rdquo; entre vecinos hace décadas sin actualizar el Catastro.</li>
          <li>Fincas registradas en &ldquo;ferrados&rdquo; (medida gallega) sin convertir a metros cuadrados.</li>
          <li>Propietarios que viven fuera y nunca pisaron la parcela.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Cuándo necesitas un topógrafo?
        </h2>
        <div className="space-y-3">
          {[
            { situacion: "Quieres vender una finca", motivo: "El comprador (o su banco) exigirá que la superficie escriturada coincida con la real." },
            { situacion: "Estás tramitando una herencia", motivo: "Para inscribir las fincas heredadas en el Registro con datos actualizados." },
            { situacion: "Conflicto de lindes con un vecino", motivo: "Un informe topográfico pericial es la prueba que un juez necesita." },
            { situacion: "Quieres vender la madera", motivo: "Sin superficie real no puedes estimar volumen ni negociar un precio justo." },
            { situacion: "Te exigen limpiar la finca", motivo: "Necesitas saber qué superficie te corresponde realmente." },
            { situacion: "Georreferenciar para el Registro", motivo: "Desde 2015, inscribir fincas requiere aportar coordenadas georreferenciadas." },
          ].map((item) => (
            <div key={item.situacion} className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <span className="text-blue-600 mt-0.5 font-bold">→</span>
              <div>
                <p className="font-semibold text-gray-900">{item.situacion}</p>
                <p className="text-sm text-gray-600 mt-1">{item.motivo}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué trabajo hace un topógrafo?
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Levantamiento topográfico:</strong> mide la parcela con GPS de alta precisión y genera un plano con coordenadas exactas.</li>
          <li><strong>Georreferenciación:</strong> coordenadas de los vértices en el sistema oficial (ETRS89), necesario para el Registro.</li>
          <li><strong>Informe de cabida y linderos:</strong> documento técnico válido para notaría, registro y juzgados.</li>
          <li><strong>Coordinación con el Catastro:</strong> tramitación de la corrección de datos erróneos ante la Sede Electrónica.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Cuánto cuesta?
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Trabajo</th>
                <th className="text-left p-3 font-semibold text-gray-700">Coste orientativo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="p-3">Medición de parcela (hasta 1 ha)</td><td className="p-3">300 - 600 €</td></tr>
              <tr><td className="p-3">Georreferenciación para Registro</td><td className="p-3">400 - 800 €</td></tr>
              <tr><td className="p-3">Informe pericial para juicio de lindes</td><td className="p-3">800 - 2.000 €</td></tr>
              <tr><td className="p-3">Corrección de datos catastrales</td><td className="p-3">200 - 500 €</td></tr>
              <tr><td className="p-3">Fincas grandes (&gt;5 ha)</td><td className="p-3">Presupuesto a medida</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Solicita una medición de tu finca
        </h2>
        <p className="text-gray-600 mb-2">
          Un topógrafo o ingeniero técnico de tu zona te contactará con un presupuesto.
        </p>
      </section>

      <section id="formulario">
        <LindesForm origen="pilar-lindes" />
      </section>
        </div>
        <PilarSidebar pilar="lindes" />
      </div>
    </div>
    </>
  );
}
