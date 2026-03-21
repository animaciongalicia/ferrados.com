import type { Metadata } from "next";
import Link from "next/link";
import PilarJsonLd from "@/components/PilarJsonLd";

export const metadata: Metadata = {
  title: "Fincas y montes en Lugo — Herencias, madera, catastro y gestiones",
  description:
    "La provincia de Lugo concentra la mayor superficie forestal de Galicia. Gestionamos herencias, venta de madera, catastro, limpieza y compraventa de fincas en Lugo.",
  alternates: { canonical: "/fincas-montes-lugo" },
};

const pilares = [
  { href: "/herencias-montes-galicia", icon: "📜", title: "Herencias de montes", desc: "Lugo tiene miles de fincas a nombre de emigrantes y fallecidos. Regulariza la titularidad para no perder derechos ni dinero." },
  { href: "/precio-venta-madera-galicia", icon: "🌲", title: "Venta de madera", desc: "Con más de 550.000 ha de monte arbolado, Lugo es la provincia líder en producción maderera. Eucalipto, pino y castaño a los mejores precios." },
  { href: "/localizar-medir-fincas-galicia", icon: "📐", title: "Fincas y catastro", desc: "Localiza, mide y actualiza tus parcelas en el Catastro. En Lugo es frecuente encontrar fincas sin delimitar o con superficies incorrectas." },
  { href: "/limpieza-desbroce-multas-xunta", icon: "🔥", title: "Limpieza y multas", desc: "La Xunta exige franjas de seguridad y limpieza obligatoria. Multas de 1.000 a 100.000 € si no cumples los plazos." },
  { href: "/compra-venta-terrenos-galicia", icon: "🤝", title: "Compraventa de terrenos", desc: "Compra o vende fincas rústicas en la provincia con más superficie disponible. Desde A Mariña hasta O Courel." },
  { href: "/vender-parte-monte-proindiviso", icon: "⚖️", title: "Proindivisos", desc: "¿Compartes monte con hermanos, primos o desconocidos? Te ayudamos a resolver la copropiedad." },
  { href: "/urbanismo-suelo-galicia", icon: "🏗️", title: "Urbanismo y suelo", desc: "¿Quieres construir en suelo rústico en Lugo? Consulta la clasificación de tu parcela y las posibilidades reales." },
  { href: "/tramites-fincas-galicia", icon: "📋", title: "Trámites y papeleo", desc: "Escrituras, registros, cambios catastrales, certificados... gestionamos todo el papeleo de tus fincas en Lugo." },
];

const comarcas = [
  { name: "A Mariña", desc: "Litoral norte: eucalipto, ganadería y minifundio costero. Viveiro, Mondoñedo, Foz, Burela." },
  { name: "Terra Chá", desc: "La mayor llanura de Galicia: grandes explotaciones ganaderas y forestales. Vilalba, Guitiriz, Cospeito." },
  { name: "Sarria – O Camino", desc: "Última etapa del Camino de Santiago: revalorización del suelo rústico por turismo rural. Sarria, Portomarín, Paradela." },
  { name: "Monforte – Ribeira Sacra", desc: "Viñedos en bancales y castaños centenarios. Alto valor paisajístico y denominación de origen. Monforte, Pantón, Sober." },
  { name: "Os Ancares – O Courel", desc: "Montaña oriental: bosques autóctonos, robledales y soutos de castaños. Zona protegida con restricciones de uso." },
  { name: "Terra de Lemos", desc: "Interior agrícola y ganadero. Fincas más grandes que la media gallega. Chantada, Taboada." },
];

export default function FincasMontesLugoPage() {
  return (
    <>
    <PilarJsonLd
      title="Fincas y montes en Lugo"
      description="Gestión integral de fincas y montes en la provincia de Lugo: herencias, madera, catastro, limpieza y compraventa."
      slug="fincas-montes-lugo"
      breadcrumbLabel="Fincas y montes en Lugo"
    />
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Fincas y montes en Lugo</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Fincas y montes en la provincia de Lugo: la mayor masa forestal de Galicia
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Lugo es la provincia más extensa de Galicia y la que concentra más superficie forestal:
        más de <strong>550.000 hectáreas de monte arbolado</strong>. Si tienes una finca o un monte
        en Lugo — heredado, comprado o simplemente &quot;de la familia&quot; — aquí te explicamos
        qué puedes hacer con él y cómo te ayudamos.
      </p>

      {/* Datos clave */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-emerald-900 mb-3">Lugo en cifras</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-emerald-800">9.856 km²</p>
            <p className="text-sm text-gray-600">Superficie total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-800">+550.000 ha</p>
            <p className="text-sm text-gray-600">Monte arbolado</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-800">67 municipios</p>
            <p className="text-sm text-gray-600">Concellos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-800">~326.000 hab.</p>
            <p className="text-sm text-gray-600">Población (2025)</p>
          </div>
        </div>
      </section>

      {/* Medidas tradicionales */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          El ferrado en Lugo: ¿cuántos metros cuadrados tiene?
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          El <strong>ferrado</strong> es la medida tradicional gallega por excelencia, y su
          valor varía según la zona. En la provincia de Lugo conviven varias equivalencias:
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
              <tr><td className="p-3">A Mariña / Costa</td><td className="p-3 font-semibold">629 m²</td><td className="p-3 text-gray-500">Medida más habitual en Lugo</td></tr>
              <tr><td className="p-3">Interior / Terra Chá</td><td className="p-3 font-semibold">629 m²</td><td className="p-3 text-gray-500">Uniforme en la mayoría de la provincia</td></tr>
              <tr><td className="p-3">Zona sur (Monforte, Chantada)</td><td className="p-3 font-semibold">436 – 629 m²</td><td className="p-3 text-gray-500">Varía por parroquia; verificar siempre</td></tr>
              <tr><td className="p-3">Os Ancares / montaña</td><td className="p-3 font-semibold">~629 m²</td><td className="p-3 text-gray-500">Menos relevante; parcelas medidas en hectáreas</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500">
          Estas equivalencias son orientativas. Para operaciones de compraventa o herencia, siempre
          recomendamos medir con topógrafo y consultar el Catastro.
        </p>
      </section>

      {/* Particularidades de Lugo */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          ¿Qué hace especial a la provincia de Lugo para propietarios de fincas?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Provincia líder en madera", desc: "Lugo produce más madera que cualquier otra provincia española. El eucalipto y el pino radiata dominan las plantaciones, y la demanda de las industrias pasteras (ENCE, Altri) mantiene los precios." },
            { title: "Fincas de mayor tamaño", desc: "El minifundio es menos extremo que en A Coruña o Pontevedra. Es más habitual encontrar parcelas de 1-5 hectáreas, lo que facilita su gestión y venta." },
            { title: "Despoblación y oportunidad", desc: "Muchos municipios del interior pierden población. Esto genera oportunidades para inversores y compradores, pero también riesgo de abandono y multas por falta de limpieza." },
            { title: "Ribeira Sacra y turismo rural", desc: "La candidatura a Patrimonio de la Humanidad y el enoturismo están revalorizando las fincas en las riberas del Sil y del Miño. Viñedos y castaños con alto valor paisajístico." },
          ].map((item) => (
            <div key={item.title} className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comarcas */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Principales comarcas y municipios de Lugo
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Trabajamos con propietarios de fincas en toda la provincia. Estas son las
          principales zonas y sus características:
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
          ¿Qué necesitas para tu finca en Lugo?
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
          ¿Tienes una finca o un monte en Lugo?
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
