import type { Metadata } from "next";
import Link from "next/link";
import LimpiezaForm from "@/components/forms/LimpiezaForm";
import CalculadoraMultas from "@/components/CalculadoraMultas";

export const metadata: Metadata = {
  title: "Multas por no limpiar fincas en Galicia — Ley de biomasa Xunta",
  description:
    "¿Te ha llegado una carta de la Xunta por la maleza? Multas de hasta 100.000 €. Te explicamos qué hacer, cuánto cuesta limpiar y cómo evitar la sanción.",
};

export default function LimpiezaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Limpieza de fincas y multas</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Multas por no limpiar tu finca en Galicia: qué hacer antes de que actúe la Xunta
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Si te ha llegado una carta de la Xunta de Galicia exigiéndote limpiar tu
        parcela, no estás solo. Miles de propietarios reciben cada año
        notificaciones de la administración. El problema es que si no actúas
        a tiempo, la Xunta puede ejecutar la limpieza de oficio, pasarte la
        factura <strong>y además multarte</strong>.
      </p>

      {/* Datos duros */}
      <section className="bg-red-50 border border-red-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-red-900 mb-3">
          Lo que está en juego
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 border border-red-100">
            <p className="text-2xl font-bold text-red-700">100.000 €</p>
            <p className="text-sm text-gray-600 mt-1">Multa máxima por incumplimiento grave</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-100">
            <p className="text-2xl font-bold text-red-700">50 metros</p>
            <p className="text-sm text-gray-600 mt-1">Franja obligatoria junto a viviendas</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-100">
            <p className="text-2xl font-bold text-red-700">31 mayo</p>
            <p className="text-sm text-gray-600 mt-1">Plazo habitual para tener limpio</p>
          </div>
        </div>
      </section>

      {/* Qué dice la ley */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué obliga la ley exactamente?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          La legislación gallega de prevención de incendios forestales (conocida
          como &ldquo;ley de biomasa&rdquo;) obliga a los propietarios de terrenos forestales
          a mantener limpias las <strong>franjas de protección</strong> alrededor de viviendas,
          núcleos de población, urbanizaciones e infraestructuras. Esto incluye:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
          <li>
            <strong>Franja de 50 metros</strong> alrededor de edificaciones y viviendas
            aisladas: eliminación total de matorral, maleza y vegetación seca.
          </li>
          <li>
            <strong>Franja de 100 metros</strong> en zonas colindantes con núcleos de
            población: gestión de combustible vegetal.
          </li>
          <li>
            <strong>Poda de ramas bajas</strong> de los árboles hasta una altura mínima
            de 2-3 metros para evitar que un fuego de suelo se convierta en
            fuego de copa.
          </li>
          <li>
            <strong>Eliminación de especies invasoras</strong> como acacias o ailantos
            en determinados supuestos.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          El plazo para tener la finca limpia suele ser el <strong>31 de mayo de cada
          año</strong>, aunque puede variar según las ordenanzas municipales. Si no
          cumples, el ayuntamiento o la Xunta pueden actuar de forma subsidiaria
          y cargarte los costes más la sanción.
        </p>
      </section>

      {/* Cuánto cuesta */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Cuánto cuesta limpiar una finca en Galicia?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          El coste depende de la superficie, tipo de vegetación, pendiente del terreno,
          accesibilidad para maquinaria y estado de abandono. Orientativamente:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Superficie (ferrados)</th>
                <th className="text-left p-3 font-semibold text-gray-700">Coste orientativo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="p-3">Menos de 1 ferrado (&lt; 500 m²)</td><td className="p-3">150 – 400 €</td></tr>
              <tr><td className="p-3">1 – 5 ferrados (500 – 2.500 m²)</td><td className="p-3">300 – 800 €</td></tr>
              <tr><td className="p-3">5 – 10 ferrados (2.500 – 5.000 m²)</td><td className="p-3">600 – 1.500 €</td></tr>
              <tr><td className="p-3">10 – 20 ferrados (hasta 1 ha)</td><td className="p-3">1.000 – 2.500 €</td></tr>
              <tr><td className="p-3">1 – 5 hectáreas</td><td className="p-3">2.000 – 5.000 €</td></tr>
              <tr><td className="p-3">Más de 5 hectáreas</td><td className="p-3">Presupuesto a medida</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          Un monte abandonado 15 años no cuesta lo mismo que una finca con matorral
          bajo. Si la Xunta actúa de oficio, el coste será significativamente mayor.
        </p>
      </section>

      {/* Qué pasa si no limpias */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué pasa si no limpias a tiempo?
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg">
            <span className="text-amber-600 mt-0.5 text-lg font-bold">1.</span>
            <div>
              <p className="font-semibold text-gray-900">La Xunta o el ayuntamiento te notifican</p>
              <p className="text-sm text-gray-600 mt-1">Te dan un plazo (15-30 días) para que limpies por tu cuenta.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg">
            <span className="text-amber-600 mt-0.5 text-lg font-bold">2.</span>
            <div>
              <p className="font-semibold text-gray-900">Si no limpias, actúan de oficio</p>
              <p className="text-sm text-gray-600 mt-1">Contratan a una empresa, hacen el trabajo y te pasan la factura íntegra. Sale mucho más caro que si lo contratas tú.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-lg">
            <span className="text-red-600 mt-0.5 text-lg font-bold">3.</span>
            <div>
              <p className="font-semibold text-gray-900">Te imponen una multa adicional</p>
              <p className="text-sm text-gray-600 mt-1">Desde 1.000 € para infracciones leves hasta 100.000 € para graves. Si tu terreno provoca un incendio, las consecuencias pueden ser penales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculadora de multas */}
      <section id="calculadora" className="mb-10">
        <CalculadoraMultas />
      </section>

      {/* Vivo fuera */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Vivo fuera de Galicia, ¿qué hago?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Es una de las situaciones más habituales. Heredaste una finca, vives en
          Madrid o en el extranjero, y te llega una carta. No conoces a nadie en
          la zona, no sabes dónde está exactamente la parcela y no puedes ir a
          supervisar los trabajos.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Una empresa de desbroce profesional puede encargarse de todo: localizar
          la parcela, evaluar el trabajo necesario, ejecutarlo y enviarte la
          documentación para justificar ante la administración que has cumplido.
          Tú no necesitas desplazarte.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Calcula cuánto te costará limpiar tu finca antes de que actúe la Xunta
        </h2>
        <p className="text-gray-600 mb-2">
          Rellena el formulario y una empresa de desbroce profesional de tu zona
          te contactará con un presupuesto. Sin compromiso.
        </p>
      </section>

      <section id="formulario">
        <LimpiezaForm origen="pilar-limpieza" />
      </section>
    </div>
  );
}
