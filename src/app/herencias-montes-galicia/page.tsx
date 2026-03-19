import type { Metadata } from "next";
import Link from "next/link";
import HerenciasForm from "@/components/forms/HerenciasForm";
import PilarJsonLd from "@/components/PilarJsonLd";

export const metadata: Metadata = {
  title: "Herencias de montes y fincas en Galicia — Guía completa",
  description:
    "¿Has heredado un monte en Galicia y no sabes qué hacer? Sucesiones, papeles, Catastro, impuestos. Guía para herederos en Galicia y desde el extranjero.",
  alternates: { canonical: "/herencias-montes-galicia" },
};

export default function HerenciasPage() {
  return (
    <>
    <PilarJsonLd
      title="Herencias de montes y fincas en Galicia"
      description="Asesoramiento para herederos de montes y fincas en Galicia. Sucesiones, papeles, Catastro, impuestos."
      slug="herencias-montes-galicia"
      breadcrumbLabel="Herencias de montes y fincas"
    />
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Herencias de montes y fincas</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Heredar un monte o una finca en Galicia: guía completa para no perder dinero ni derechos
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        En Galicia hay cientos de miles de parcelas forestales sin titularidad actualizada.
        Fincas a nombre de abuelos fallecidos hace décadas, herencias encadenadas sin
        hacer, propiedades sin escrituras. Si estás en esta situación, cada día que pasa
        te cuesta dinero: no puedes vender la madera, no puedes pedir ayudas, y si la
        Xunta te reclama una limpieza, ni siquiera puedes demostrar que no es tuya.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Por qué es urgente regularizar la herencia?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            { title: "No puedes vender madera", desc: "Sin titularidad clara, ningún maderista comprará la madera de tu monte. Pierdes miles de euros cada año que pasa." },
            { title: "No puedes acceder a ayudas", desc: "Las ayudas de la Xunta para limpieza, reforestación o gestión forestal exigen acreditar la propiedad." },
            { title: "Te pueden multar igual", desc: "Aunque no hayas aceptado la herencia, la Xunta puede exigirte la limpieza y multarte como heredero." },
            { title: "Se complica con el tiempo", desc: "Cada generación sin escriturar multiplica el número de herederos y encarece exponencialmente el proceso." },
          ].map((item) => (
            <div key={item.title} className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Cómo se hereda un monte en Galicia? Paso a paso
        </h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "Reunir la documentación del fallecido", desc: "Certificado de defunción, certificado de últimas voluntades (Registro General de Actos de Última Voluntad) y, si existe, el testamento. Sin testamento, se necesita una declaración de herederos ab intestato ante notario." },
            { step: "2", title: "Identificar los bienes (qué fincas hay)", desc: "Consultar el Catastro, el Registro de la Propiedad y la documentación familiar. En Galicia es habitual que las fincas no estén registradas o tengan datos desactualizados." },
            { step: "3", title: "Escritura de aceptación de herencia", desc: "Ante notario, los herederos firman la aceptación y el reparto. Si hay desacuerdo, puede ser necesaria mediación o un proceso judicial de partición." },
            { step: "4", title: "Pagar el Impuesto de Sucesiones", desc: "En Galicia hay reducciones importantes para herederos directos. Para montes de escaso valor, la cuota puede ser mínima o cero. Plazo: 6 meses desde el fallecimiento (ampliable a 12)." },
            { step: "5", title: "Inscribir en el Registro y actualizar el Catastro", desc: "Con la escritura de herencia se inscribe la nueva titularidad. Paso imprescindible para poder vender, hipotecar o gestionar la finca." },
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
          Heredar desde Argentina, Venezuela, Suiza, Alemania...
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          La emigración gallega dejó cientos de miles de descendientes en Argentina,
          Uruguay, Venezuela, Cuba, Brasil, Suiza, Alemania, Francia y el Reino Unido
          con derechos sobre fincas en Galicia. El proceso es más complejo pero viable:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Apostilla de La Haya:</strong> los documentos del país de residencia deben estar apostillados para tener validez en España.</li>
          <li><strong>Poder notarial:</strong> puedes otorgar un poder a un abogado en Galicia para que actúe en tu nombre sin viajar.</li>
          <li><strong>Doble tributación:</strong> hay convenios entre España y muchos países para evitar pagar impuestos dos veces.</li>
          <li><strong>Plazos extendidos:</strong> en herencias internacionales algunos plazos pueden ser más flexibles, pero no conviene demorarse.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Cuánto cuesta tramitar una herencia de montes?
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Concepto</th>
                <th className="text-left p-3 font-semibold text-gray-700">Coste orientativo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="p-3">Honorarios de abogado</td><td className="p-3">1.000 - 4.000 €</td></tr>
              <tr><td className="p-3">Notaría (escritura de herencia)</td><td className="p-3">300 - 1.500 €</td></tr>
              <tr><td className="p-3">Registro de la Propiedad</td><td className="p-3">100 - 500 €</td></tr>
              <tr><td className="p-3">Impuesto de Sucesiones (Galicia)</td><td className="p-3">Variable (con reducciones puede ser 0 €)</td></tr>
              <tr><td className="p-3">Declaración de herederos (sin testamento)</td><td className="p-3">300 - 800 € adicionales</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Los 5 errores más caros al heredar un monte
        </h2>
        <div className="space-y-3">
          {[
            { error: "Dejar pasar el plazo del Impuesto de Sucesiones", consecuencia: "Recargos del 5% al 20% más intereses de demora. En herencias encadenadas, los recargos se multiplican." },
            { error: "No inscribir en el Registro de la Propiedad", consecuencia: "No puedes vender nada: ni la madera ni el terreno." },
            { error: "Ignorar las obligaciones de limpieza", consecuencia: "La administración puede localizarte como heredero y multarte." },
            { error: "No identificar todas las fincas heredadas", consecuencia: "Es habitual que haya más parcelas de las que la familia conoce." },
            { error: "Hacerlo sin abogado especializado", consecuencia: "El derecho civil de Galicia tiene particularidades que un generalista puede desconocer." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-lg">
              <span className="text-red-600 font-bold mt-0.5">{i + 1}.</span>
              <div>
                <p className="font-semibold text-gray-900">{item.error}</p>
                <p className="text-sm text-gray-600 mt-1">{item.consecuencia}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 mb-10 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Consulta tu herencia con un abogado especializado
        </h2>
        <p className="text-gray-600 mb-2">
          Cuéntanos tu situación y un despacho especializado en sucesiones
          en Galicia te contactará. Sin compromiso.
        </p>
      </section>

      <section id="formulario">
        <HerenciasForm origen="pilar-herencias" />
      </section>
    </div>
    </>
  );
}
