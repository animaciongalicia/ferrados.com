import type { Metadata } from "next";
import Link from "next/link";
import PilarJsonLd from "@/components/PilarJsonLd";

export const metadata: Metadata = {
  title: "Fincas y montes en Pontevedra — Herencias, madera, catastro y gestiones",
  description:
    "Pontevedra combina presión urbanística costera con gran tradición forestal. Gestionamos herencias, venta de madera, catastro, limpieza y compraventa de fincas en Pontevedra.",
  alternates: { canonical: "/fincas-montes-pontevedra" },
};

const pilares = [
  { href: "/herencias-montes-galicia", icon: "📜", title: "Herencias de montes", desc: "El minifundio pontevedrés genera herencias con decenas de parcelas diminutas. La emigración a América dejó miles sin regularizar." },
  { href: "/precio-venta-madera-galicia", icon: "🌲", title: "Venta de madera", desc: "Eucalipto y pino son las especies dominantes. Cercanía a la industria de Ence en Pontevedra y buena red de pistas forestales." },
  { href: "/localizar-medir-fincas-galicia", icon: "📐", title: "Fincas y catastro", desc: "Parcelas muy pequeñas con límites difusos. Es imprescindible medir y actualizar el Catastro antes de cualquier operación." },
  { href: "/limpieza-desbroce-multas-xunta", icon: "🔥", title: "Limpieza y multas", desc: "Zona de altísimo riesgo de incendios. Las franjas de seguridad y la limpieza obligatoria son especialmente rigurosas." },
  { href: "/compra-venta-terrenos-galicia", icon: "🤝", title: "Compraventa de terrenos", desc: "Alta demanda en la franja costera y el eje Vigo-Pontevedra. Precios superiores a la media gallega para suelo rústico con potencial." },
  { href: "/vender-parte-monte-proindiviso", icon: "⚖️", title: "Proindivisos", desc: "Montes compartidos entre herederos que viven en distintos países. Te ayudamos a desbloquear la copropiedad." },
  { href: "/urbanismo-suelo-galicia", icon: "🏗️", title: "Urbanismo y suelo", desc: "La mayor presión urbanística de Galicia: ¿tu finca es rústica, urbanizable o de núcleo rural? Puede valer 10 veces más de lo que crees." },
  { href: "/tramites-fincas-galicia", icon: "📋", title: "Trámites y papeleo", desc: "Segregaciones, agrupaciones, cambios catastrales, escrituras... gestión integral de la burocracia de tus fincas." },
];

const comarcas = [
  { name: "Vigo y área metropolitana", desc: "Mayor concentración urbana de Galicia. Altísima presión sobre suelo rústico periurbano. Vigo, Nigrán, Gondomar, Redondela, Cangas." },
  { name: "Pontevedra y comarca", desc: "Capital provincial con entorno rural de alto valor. Marín, Poio, Sanxenxo. Turismo y demanda de parcelas costeras." },
  { name: "O Salnés", desc: "Corazón de las Rías Baixas: Cambados, O Grove, Vilagarcía, Vilanova. Albariño, turismo y suelo costero cotizado." },
  { name: "O Condado – A Paradanta", desc: "Frontera con Portugal: Tui, Salvaterra, Mondariz, A Cañiza. Viñedos de Condado do Tea y fincas de mayor extensión." },
  { name: "Deza – Tabeirós", desc: "Interior pontevedrés: Lalín, Silleda, Forcarei. Ganadería, monte y parcelas más accesibles que en la costa." },
  { name: "O Morrazo", desc: "Península entre la ría de Vigo y la de Pontevedra: Bueu, Moaña, Cangas. Suelo escaso y demanda alta." },
];

export default function FincasMontesPontevedraPage() {
  return (
    <>
    <PilarJsonLd
      title="Fincas y montes en Pontevedra"
      description="Gestión integral de fincas y montes en la provincia de Pontevedra: herencias, madera, catastro, limpieza y compraventa."
      slug="fincas-montes-pontevedra"
      breadcrumbLabel="Fincas y montes en Pontevedra"
    />
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Fincas y montes en Pontevedra</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Fincas y montes en Pontevedra: donde el rural y lo urbano chocan
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Pontevedra es la provincia gallega donde <strong>la presión urbanística sobre el suelo rústico
        es más intensa</strong>. El eje Vigo-Pontevedra, las Rías Baixas y el turismo generan una
        demanda de suelo que convive con miles de fincas abandonadas, herencias sin resolver y
        montes sin gestionar. Si tienes una finca en Pontevedra, probablemente vale más de lo que piensas.
      </p>

      {/* Datos clave */}
      <section className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-purple-900 mb-3">Pontevedra en cifras</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-purple-800">4.495 km²</p>
            <p className="text-sm text-gray-600">Superficie total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-800">~942.000 hab.</p>
            <p className="text-sm text-gray-600">Población (2025)</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-800">61 municipios</p>
            <p className="text-sm text-gray-600">Concellos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-800">Máx. densidad</p>
            <p className="text-sm text-gray-600">Habitantes por km²</p>
          </div>
        </div>
      </section>

      {/* Medidas tradicionales */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          El ferrado en Pontevedra: ¿cuántos metros cuadrados tiene?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          En Pontevedra el ferrado es significativamente <strong>más pequeño</strong> que en Lugo o
          A Coruña. Esta diferencia es fuente constante de malentendidos en compraventas entre
          personas de distintas provincias:
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
              <tr><td className="p-3">Pontevedra / zona costera</td><td className="p-3 font-semibold">436 m²</td><td className="p-3 text-gray-500">Medida más habitual en la provincia</td></tr>
              <tr><td className="p-3">Vigo y alrededores</td><td className="p-3 font-semibold">436 m²</td><td className="p-3 text-gray-500">Uniforme en el área metropolitana</td></tr>
              <tr><td className="p-3">O Salnés / Rías Baixas</td><td className="p-3 font-semibold">436 m²</td><td className="p-3 text-gray-500">Coincide con la medida costera general</td></tr>
              <tr><td className="p-3">Interior (Lalín, Silleda)</td><td className="p-3 font-semibold">436 – 629 m²</td><td className="p-3 text-gray-500">Zona de transición hacia la medida lucense</td></tr>
              <tr><td className="p-3">O Condado (frontera Portugal)</td><td className="p-3 font-semibold">436 m²</td><td className="p-3 text-gray-500">Uniforme con la costa</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          Un ferrado en Pontevedra (436 m²) es casi un 30% más pequeño que en Lugo (629 m²).
          Si alguien te vende &quot;10 ferrados&quot;, asegúrate de saber qué medida usa.
        </p>
      </section>

      {/* Particularidades */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué hace especial a la provincia de Pontevedra para propietarios de fincas?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Mayor presión urbanística de Galicia", desc: "Es la provincia más densamente poblada. Fincas rústicas cerca de Vigo, Pontevedra o las Rías Baixas pueden tener valores muy superiores a su referencia catastral, especialmente si lindan con suelo urbano." },
            { title: "Turismo y Rías Baixas", desc: "El boom del turismo y el albariño ha revalorizado fincas en O Salnés, O Grove y Sanxenxo. Parcelas para turismo rural, bodegas o apartamentos tienen una demanda creciente." },
            { title: "Incendios forestales: zona crítica", desc: "Pontevedra sufre la mayor concentración de incendios de Galicia. Las multas por no limpiar son frecuentes y la Xunta actúa con especial contundencia en la zona periurbana." },
            { title: "Frontera con Portugal", desc: "El sur de la provincia limita con Portugal. Compradores portugueses buscan fincas en O Condado y Val Miñor. El Miño y el comercio transfronterizo generan oportunidades únicas." },
          ].map((item) => (
            <div key={item.title} className="bg-purple-50 border border-purple-100 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comarcas */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Principales comarcas y municipios de Pontevedra
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
          ¿Qué necesitas para tu finca en Pontevedra?
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
          ¿Tienes una finca o un monte en Pontevedra?
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
