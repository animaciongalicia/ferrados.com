import type { Metadata } from "next";
import Link from "next/link";
import PilarJsonLd from "@/components/PilarJsonLd";

export const metadata: Metadata = {
  title: "Fincas y montes en A Coruña — Herencias, madera, catastro y gestiones",
  description:
    "A Coruña es la provincia gallega con más minifundio y mayor densidad de parcelas. Gestionamos herencias, venta de madera, catastro, limpieza y compraventa de fincas en A Coruña.",
  alternates: { canonical: "/fincas-montes-coruna" },
};

const pilares = [
  { href: "/herencias-montes-galicia", icon: "📜", title: "Herencias de montes", desc: "La fragmentación extrema de A Coruña genera herencias con decenas de parcelas repartidas entre múltiples herederos. Regulariza antes de que se complique más." },
  { href: "/precio-venta-madera-galicia", icon: "🌲", title: "Venta de madera", desc: "Eucalipto y pino dominan la producción forestal. Parcelas pequeñas pero con buen acceso y cercanía a las industrias papeleras." },
  { href: "/localizar-medir-fincas-galicia", icon: "📐", title: "Fincas y catastro", desc: "Con la mayor densidad de parcelas de España, es habitual que lindes y superficies no coincidan con el Catastro. Mide y actualiza tus fincas." },
  { href: "/limpieza-desbroce-multas-xunta", icon: "🔥", title: "Limpieza y multas", desc: "Zona de alto riesgo de incendios. Las franjas de protección y la limpieza obligatoria son especialmente estrictas cerca de núcleos urbanos." },
  { href: "/compra-venta-terrenos-galicia", icon: "🤝", title: "Compraventa de terrenos", desc: "Demanda creciente de suelo rústico cerca del eje A Coruña-Santiago-Ferrol. Buenas oportunidades en el interior." },
  { href: "/vender-parte-monte-proindiviso", icon: "⚖️", title: "Proindivisos", desc: "El minifundio genera copropiedad masiva: montes compartidos entre primos, tíos y vecinos. Te ayudamos a resolver la situación." },
  { href: "/urbanismo-suelo-galicia", icon: "🏗️", title: "Urbanismo y suelo", desc: "Presión urbanística en la costa y el eje atlántico. ¿Puedes construir en tu finca? Consulta la clasificación de tu suelo." },
  { href: "/tramites-fincas-galicia", icon: "📋", title: "Trámites y papeleo", desc: "Escrituras, registros, segregaciones, agrupaciones... la burocracia del minifundio coruñés requiere profesionales que la conozcan." },
];

const comarcas = [
  { name: "A Coruña – Área metropolitana", desc: "Alta presión urbanística sobre suelo rústico. Arteixo, Culleredo, Oleiros, Cambre. Fincas con potencial de recalificación." },
  { name: "Santiago y comarca", desc: "Periferia de Santiago: equilibrio entre rural y urbano. Ames, Brión, Teo, Boqueixón. Demanda de parcelas para vivienda unifamiliar." },
  { name: "Bergantiños", desc: "Costa atlántica: Carballo, Malpica, Ponteceso. Eucalipto costero y minifundio extremo. Zona de alta siniestralidad forestal." },
  { name: "Ferrol – Eume – Ortegal", desc: "Norte de la provincia: Ferrol, Pontedeume, Cedeira, Cariño. Fragas del Eume (bosque atlántico protegido). Oportunidades de turismo rural." },
  { name: "Barbanza – Noia", desc: "Península del Barbanza: Ribeira, Boiro, Noia. Combinación de mar y monte. Eucalipto y pino cerca de la costa." },
  { name: "Interior (Ordes, Melide, Arzúa)", desc: "Zona ganadera e forestal del interior. Parcelas algo más grandes que en la costa. Ruta del Camino: Arzúa, Melide." },
];

export default function FincasMontesCorunaPage() {
  return (
    <>
    <PilarJsonLd
      title="Fincas y montes en A Coruña"
      description="Gestión integral de fincas y montes en la provincia de A Coruña: herencias, madera, catastro, limpieza y compraventa."
      slug="fincas-montes-coruna"
      breadcrumbLabel="Fincas y montes en A Coruña"
    />
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Fincas y montes en A Coruña</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Fincas y montes en A Coruña: el minifundio más fragmentado de España
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        A Coruña es la provincia gallega con <strong>mayor número de parcelas por kilómetro cuadrado</strong>.
        El minifundio histórico, la emigración y las herencias sin regularizar han creado un mosaico
        de miles de fincas diminutas, muchas sin titular claro. Si tienes una finca en A Coruña
        — o crees que la tienes — aquí te ayudamos a resolver tu situación.
      </p>

      {/* Datos clave */}
      <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-blue-900 mb-3">A Coruña en cifras</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-800">7.950 km²</p>
            <p className="text-sm text-gray-600">Superficie total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-800">+1.1 M hab.</p>
            <p className="text-sm text-gray-600">Población (2025)</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-800">93 municipios</p>
            <p className="text-sm text-gray-600">Concellos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-800">Máx. densidad</p>
            <p className="text-sm text-gray-600">Parcelas por km²</p>
          </div>
        </div>
      </section>

      {/* Medidas tradicionales */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          El ferrado en A Coruña: ¿cuántos metros cuadrados tiene?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          En A Coruña el ferrado tiene una equivalencia diferente a Lugo o al sur de Galicia.
          Es una de las fuentes de confusión más habituales en herencias y compraventas:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Zona</th>
                <th className="text-left p-3 font-semibold text-gray-700">1 ferrado =</th>
                <th className="text-left p-3 font-semibold text-gray-700">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="p-3">Área de A Coruña / costa norte</td><td className="p-3 font-semibold">629 m²</td><td className="p-3 text-gray-500">Medida más extendida en la provincia</td></tr>
              <tr><td className="p-3">Zona de Santiago / interior</td><td className="p-3 font-semibold">629 m²</td><td className="p-3 text-gray-500">Coincide con la medida lucense</td></tr>
              <tr><td className="p-3">Sur (Noia, Barbanza)</td><td className="p-3 font-semibold">436 – 629 m²</td><td className="p-3 text-gray-500">Transición hacia la medida pontevedresa</td></tr>
              <tr><td className="p-3">Bergantiños / Costa da Morte</td><td className="p-3 font-semibold">629 m²</td><td className="p-3 text-gray-500">Uniforme con el norte provincial</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          Nunca compres ni vendas &quot;por ferrados&quot; sin confirmar la equivalencia exacta en tu parroquia.
          Una diferencia de 200 m² por ferrado puede suponer miles de euros en una operación.
        </p>
      </section>

      {/* Particularidades */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué hace especial a la provincia de A Coruña para propietarios de fincas?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Minifundio extremo", desc: "Miles de parcelas de menos de 500 m². Muchas sin acceso directo, sin deslindar y compartidas entre herederos que ni se conocen. La concentración parcelaria avanza lentamente." },
            { title: "Presión urbanística en el eje atlántico", desc: "El corredor A Coruña – Santiago – Ferrol concentra la mayor demanda de suelo de Galicia. Fincas rústicas cercanas a núcleos pueden tener un valor muy superior al catastral." },
            { title: "Alto riesgo de incendios forestales", desc: "Bergantiños, Costa da Morte y el interior son zonas de alta siniestralidad. La Xunta aplica las obligaciones de limpieza con especial rigor." },
            { title: "Emigración y herencias bloqueadas", desc: "Generaciones de emigración a América y Europa dejaron fincas sin titular actualizado. Es la provincia con más herencias encadenadas sin resolver." },
          ].map((item) => (
            <div key={item.title} className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comarcas */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Principales comarcas y municipios de A Coruña
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Trabajamos con propietarios en toda la provincia. Cada zona tiene sus particularidades:
        </p>
        <div className="space-y-3">
          {comarcas.map((c) => (
            <div key={c.name} className="flex gap-4 items-start p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{c.name}</p>
                <p className="text-sm text-gray-600 mt-1">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Servicios */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué necesitas para tu finca en A Coruña?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Sea cual sea tu situación, te conectamos con el profesional adecuado en tu zona:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pilares.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{p.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-green-800 transition-colors">{p.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          ¿Tienes una finca o un monte en A Coruña?
        </h2>
        <p className="text-gray-600 mb-4">
          Cuéntanos tu caso y te conectamos con un profesional de tu zona.
          Sin compromiso ni coste por nuestra parte.
        </p>
        <Link
          href="/empezar"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
        >
          Empezar ahora
        </Link>
      </section>

    </div>
    </>
  );
}
