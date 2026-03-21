import type { Metadata } from "next";
import Link from "next/link";
import MaderaForm from "@/components/forms/MaderaForm";
import PilarJsonLd from "@/components/PilarJsonLd";
import PilarSidebar from "@/components/PilarSidebar";

export const metadata: Metadata = {
  title: "Precio y venta de madera en Galicia — Pinos, eucaliptos, aserraderos",
  description:
    "¿Quieres vender la madera de tu monte? Precios actuales de pino y eucalipto en Galicia, permisos de corta, cómo encontrar comprador y evitar que te engañen.",
  alternates: { canonical: "/precio-venta-madera-galicia" },
};

export default function MaderaPage() {
  return (
    <>
    <PilarJsonLd
      title="Precio y venta de madera en Galicia"
      description="Precios de pino y eucalipto, permisos de corta y cómo encontrar comprador en Galicia."
      slug="precio-venta-madera-galicia"
      breadcrumbLabel="Venta de madera"
    />
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">
        <div>
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Venta de madera</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Vender madera en Galicia: precios, permisos y cómo no dejarse engañar
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Galicia produce más del 50% de la madera de España. Si tienes un monte con
        pinos o eucaliptos, tienes un recurso con valor económico real. Pero vender
        madera no es tan simple como llamar al primer maderista que aparezca: el
        precio puede variar enormemente según la especie, la edad, el acceso al
        monte y el momento del mercado.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Cuánto vale la madera en Galicia?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Los precios de la madera en pie (sin cortar) fluctúan según la oferta
          y la demanda. Estos son rangos orientativos por tonelada:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Especie</th>
                <th className="text-left p-3 font-semibold text-gray-700">Precio por tonelada (en pie)</th>
                <th className="text-left p-3 font-semibold text-gray-700">Turno de corta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="p-3">Eucalipto globulus</td><td className="p-3 font-semibold">30 - 50 €/t</td><td className="p-3">12-15 años</td></tr>
              <tr><td className="p-3">Eucalipto nitens</td><td className="p-3 font-semibold">20 - 35 €/t</td><td className="p-3">15-20 años</td></tr>
              <tr><td className="p-3">Pino del país (pinaster)</td><td className="p-3 font-semibold">25 - 45 €/t</td><td className="p-3">25-35 años</td></tr>
              <tr><td className="p-3">Pino insigne (radiata)</td><td className="p-3 font-semibold">20 - 35 €/t</td><td className="p-3">20-30 años</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Los precios varían según el diámetro del tronco, la calidad, la
          accesibilidad del monte y la demanda de la industria. Un monte de
          5 hectáreas de eucalipto globulus maduro puede generar entre
          15.000 y 40.000 € netos para el propietario.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué necesitas para vender la madera?
        </h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "Ser propietario acreditado", desc: "Necesitas escrituras o título de propiedad. Si la finca está a nombre de un fallecido, primero hay que tramitar la herencia." },
            { step: "2", title: "Solicitar permiso de corta", desc: "Antes de talar, hay que solicitar una autorización a la Consellería de Medio Rural de la Xunta. Se tramita por la Sede Electrónica o con ayuda de un ingeniero de montes." },
            { step: "3", title: "Valorar la madera", desc: "Un perito forestal o el propio maderista puede inventariar el monte y estimar el volumen en toneladas. Es recomendable tener más de una valoración." },
            { step: "4", title: "Comparar ofertas", desc: "Nunca aceptes la primera oferta. Los precios varían mucho entre maderistas. Compara al menos 2-3 ofertas por escrito." },
            { step: "5", title: "Firmar el contrato de compraventa", desc: "Especificando el precio, el plazo de corta, quién se hace cargo de la retirada y la responsabilidad de dejar el monte limpio después." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 items-start">
              <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">{item.step}</div>
              <div>
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Los 4 errores más comunes al vender madera
        </h2>
        <div className="space-y-3">
          {[
            { error: "Vender sin comparar ofertas", desc: "El primer maderista que te contacta no siempre ofrece el mejor precio. La diferencia entre ofertas puede ser del 30-50%." },
            { error: "No exigir contrato por escrito", desc: "Sin contrato, no tienes garantía de cobro ni reclamación posible si el maderista incumple." },
            { error: "Cortar antes de tiempo", desc: "Un eucalipto de 10 años puede valer la mitad que uno de 15. Esperar al turno de corta óptimo multiplica el beneficio." },
            { error: "No verificar que el monte queda limpio", desc: "El maderista debe dejar el monte recogido. Si no lo exiges en el contrato, te quedas con los restos y la posible multa de limpieza." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <span className="text-amber-600 font-bold mt-0.5">{i + 1}.</span>
              <div>
                <p className="font-semibold text-gray-900">{item.error}</p>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿A quién le vendo la madera?
        </h2>
        <p className="text-gray-700 mb-3 leading-relaxed">
          Los compradores principales en Galicia son:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Aserraderos locales:</strong> compran pino y eucalipto para tabla, viga y tarima.</li>
          <li><strong>Industria de celulosa:</strong> grandes fábricas (ENCE, Altri/Greenalia) que compran madera de eucalipto para pasta de papel y biomasa.</li>
          <li><strong>Maderistas intermediarios:</strong> compran al propietario, cortan y revenden a la industria. Pueden ser una buena opción si no quieres gestionar la corta.</li>
          <li><strong>Comunidades de montes:</strong> si tu parcela está dentro de un monte comunal, pueden existir acuerdos colectivos de venta.</li>
        </ul>
      </section>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Pide una valoración de la madera de tu monte
        </h2>
        <p className="text-gray-600 mb-2">
          Cuéntanos qué tienes y un comprador profesional de tu zona te
          contactará con una oferta. Compara sin compromiso.
        </p>
      </section>

      <section id="formulario">
        <MaderaForm origen="pilar-madera" />
      </section>
        </div>
        <PilarSidebar pilar="madera" />
      </div>
    </div>
    </>
  );
}
