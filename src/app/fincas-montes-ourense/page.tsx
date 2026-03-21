import type { Metadata } from "next";
import Link from "next/link";
import PilarJsonLd from "@/components/PilarJsonLd";

export const metadata: Metadata = {
  title: "Fincas y montes en Ourense — Herencias, madera, catastro y gestiones",
  description:
    "Ourense es la provincia gallega con más monte abandonado y las mejores oportunidades de inversión rural. Gestionamos herencias, venta de madera, catastro, limpieza y compraventa de fincas en Ourense.",
  alternates: { canonical: "/fincas-montes-ourense" },
};

const pilares = [
  { href: "/herencias-montes-galicia", icon: "📜", title: "Herencias de montes", desc: "Miles de fincas sin titular por la despoblación. Herederos en Buenos Aires, Caracas o Ginebra que no saben que tienen propiedades en Ourense." },
  { href: "/precio-venta-madera-galicia", icon: "🌲", title: "Venta de madera", desc: "Castaño, roble y pino son las especies clave. Ourense tiene los mejores soutos de castaños de Galicia, con madera de alto valor." },
  { href: "/localizar-medir-fincas-galicia", icon: "📐", title: "Fincas y catastro", desc: "La concentración parcelaria está más avanzada que en otras provincias, pero siguen existiendo miles de parcelas con datos catastrales obsoletos." },
  { href: "/limpieza-desbroce-multas-xunta", icon: "🔥", title: "Limpieza y multas", desc: "Los incendios del interior son devastadores. La Xunta exige limpieza incluso en fincas sin dueño conocido y persigue a los herederos." },
  { href: "/compra-venta-terrenos-galicia", icon: "🤝", title: "Compraventa de terrenos", desc: "Los precios más bajos de Galicia atraen a inversores y proyectos de turismo rural, energías renovables y viticultura." },
  { href: "/vender-parte-monte-proindiviso", icon: "⚖️", title: "Proindivisos", desc: "La emigración masiva dejó montes en copropiedad entre herederos dispersos por el mundo. Te ayudamos a resolverlo." },
  { href: "/urbanismo-suelo-galicia", icon: "🏗️", title: "Urbanismo y suelo", desc: "Normativa más permisiva para construcción en núcleo rural. Oportunidades para rehabilitación de aldeas y turismo." },
  { href: "/tramites-fincas-galicia", icon: "📋", title: "Trámites y papeleo", desc: "Escrituras, registros, expedientes de dominio... el papeleo necesario para dar vida a fincas que llevan décadas paradas." },
];

const comarcas = [
  { name: "Ourense y comarca", desc: "Capital termal y su entorno. San Cibrao, Barbadás, Pereiro de Aguiar. Suelo periurbano con crecimiento moderado." },
  { name: "Valdeorras", desc: "La puerta de Galicia: pizarra, vino mencía y castaños. O Barco, A Rúa, Vilamartín. Denominación de Origen Valdeorras." },
  { name: "Ribeira Sacra (sur)", desc: "Viñedos heroicos en los cañones del Sil. Parada de Sil, Castro Caldelas, Montederramo. Candidata a Patrimonio de la Humanidad." },
  { name: "Verín – Monterrei", desc: "Frontera con Portugal: viñedos de Monterrei, aguas termales y fincas agrícolas. Oímbra, Castrelo de Miño." },
  { name: "Allariz – Maceda", desc: "Interior rural bien conservado. Allariz (villa modelo), Maceda, Xunqueira de Ambía. Turismo rural y rehabilitación de aldeas." },
  { name: "O Carballiño – O Ribeiro", desc: "Zona vinícola del Ribeiro y aguas termales. Ribadavia, Carballiño, Leiro. Denominación de Origen Ribeiro." },
  { name: "A Limia", desc: "Llanura agrícola de Ourense: patata de A Limia (IGP), ganadería. Xinzo, Sandiás, Vilar de Barrio. Fincas de mayor tamaño." },
];

export default function FincasMontesOurensePage() {
  return (
    <>
    <PilarJsonLd
      title="Fincas y montes en Ourense"
      description="Gestión integral de fincas y montes en la provincia de Ourense: herencias, madera, catastro, limpieza y compraventa."
      slug="fincas-montes-ourense"
      breadcrumbLabel="Fincas y montes en Ourense"
    />
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Fincas y montes en Ourense</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Fincas y montes en Ourense: la provincia olvidada con más oportunidades
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Ourense es la provincia gallega con <strong>más despoblación y más monte sin gestionar</strong>.
        Pero también es la que ofrece las mejores oportunidades: precios de suelo más bajos,
        fincas de mayor extensión, denominaciones de origen en auge y una apuesta creciente
        por el turismo rural y las energías renovables. Si tienes una finca en Ourense — o
        quieres comprar una — este es el momento.
      </p>

      {/* Datos clave */}
      <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-amber-900 mb-3">Ourense en cifras</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-amber-800">7.273 km²</p>
            <p className="text-sm text-gray-600">Superficie total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-800">~306.000 hab.</p>
            <p className="text-sm text-gray-600">Población (2025)</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-800">92 municipios</p>
            <p className="text-sm text-gray-600">Concellos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-800">Menor densidad</p>
            <p className="text-sm text-gray-600">De Galicia</p>
          </div>
        </div>
      </section>

      {/* Medidas tradicionales */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          El ferrado en Ourense: ¿cuántos metros cuadrados tiene?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          En Ourense conviven varias equivalencias del ferrado, con diferencias importantes
          entre el norte (más cercano a Lugo) y el sur (medida propia ourensana):
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
              <tr><td className="p-3">Ourense ciudad y alrededores</td><td className="p-3 font-semibold">436 m²</td><td className="p-3 text-gray-500">Coincide con la medida pontevedresa</td></tr>
              <tr><td className="p-3">Valdeorras / este</td><td className="p-3 font-semibold">436 – 629 m²</td><td className="p-3 text-gray-500">Varía por parroquia; zona de transición</td></tr>
              <tr><td className="p-3">O Ribeiro / Carballiño</td><td className="p-3 font-semibold">436 m²</td><td className="p-3 text-gray-500">Medida estándar del suroeste</td></tr>
              <tr><td className="p-3">Verín / sur</td><td className="p-3 font-semibold">436 m²</td><td className="p-3 text-gray-500">Uniforme en la zona fronteriza</td></tr>
              <tr><td className="p-3">A Limia</td><td className="p-3 font-semibold">436 m²</td><td className="p-3 text-gray-500">Llanura agrícola: parcelas grandes, medida estándar</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          En Ourense es habitual que las fincas grandes se midan directamente en hectáreas,
          pero el ferrado sigue vivo en las transacciones locales. Confirma siempre la equivalencia.
        </p>
      </section>

      {/* Particularidades */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué hace especial a la provincia de Ourense para propietarios de fincas?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Precios más bajos de Galicia", desc: "El metro cuadrado rústico en Ourense es el más asequible. Fincas de 1-5 hectáreas a precios que no existen en la costa. Ideal para inversión a medio plazo, turismo rural o proyectos agrícolas." },
            { title: "Denominaciones de origen en auge", desc: "Ribeira Sacra, Valdeorras, Monterrei y Ribeiro: cuatro D.O. de vino en una sola provincia. Los viñedos y las fincas vitícolas se están revalorizando con fuerza." },
            { title: "Concentración parcelaria más avanzada", desc: "Ourense ha completado más procesos de concentración parcelaria que otras provincias. Esto significa parcelas más grandes, mejor delimitadas y con acceso por pista." },
            { title: "Despoblación = aldeas enteras disponibles", desc: "Hay aldeas abandonadas con fincas, casas y monte por rehabilitar. Proyectos de turismo, cohousing y teletrabajo rural encuentran aquí su oportunidad." },
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
          Principales comarcas y municipios de Ourense
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
          ¿Qué necesitas para tu finca en Ourense?
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
          ¿Tienes una finca o un monte en Ourense?
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
