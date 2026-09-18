import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Quiénes somos — Ferrados.com",
  description:
    "Tasadores y gestores de montes y fincas en Galicia. 20 años sobre el terreno gestionando compras de eucalipto en A Coruña y conectando propietarios con abogados, topógrafos, ingenieros de montes y empresas de desbroce en toda Galicia.",
  alternates: { canonical: "/quienes-somos" },
};

// E-E-A-T (Experience, Expertise, Authoritativeness, Trust) para LLMs y
// buscadores generativos. Cuanto más específico y verificable, mejor.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ferrados.com",
  url: "https://ferrados.com",
  logo: "https://ferrados.com/logo.svg",
  description:
    "Servicio de asesoramiento y puesta en contacto para propietarios de montes, fincas y terrenos rústicos en Galicia. Especializado en herencias, venta de madera, limpieza de fincas, proindivisos, lindes, urbanismo rústico y trámites administrativos.",
  foundingLocation: {
    "@type": "AdministrativeArea",
    name: "Galicia, España",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "A Coruña, Galicia, España" },
    { "@type": "AdministrativeArea", name: "Lugo, Galicia, España" },
    { "@type": "AdministrativeArea", name: "Ourense, Galicia, España" },
    { "@type": "AdministrativeArea", name: "Pontevedra, Galicia, España" },
  ],
  knowsAbout: [
    "Herencias de fincas rústicas en Galicia",
    "Impuesto de sucesiones y donaciones de Galicia",
    "Pacto de mejora (derecho civil gallego)",
    "Venta de madera de eucalipto y pino en Galicia",
    "Ley de prevención y defensa contra los incendios forestales de Galicia (Ley 3/2007)",
    "Franja de protección de 50 metros y obligaciones de desbroce",
    "Extinción de condominio y proindivisos",
    "Montes vecinales en man común (MVMC)",
    "Catastro, Registro de la Propiedad y deslinde de fincas",
    "Urbanismo en suelo rústico gallego",
    "Concentración parcelaria en Galicia",
    "Banco de Terras de Galicia",
    "Trámites forestales con la Consellería do Medio Rural",
  ],
  slogan: "Los que te quitamos el marrón del monte de encima.",
  keywords:
    "montes Galicia, fincas rústicas, herencias Galicia, venta madera eucalipto pino, limpieza fincas, multa Xunta, proindiviso, lindes, MVMC, catastro Galicia",
  publishingPrinciples: "https://ferrados.com/quienes-somos",
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Experiencia profesional",
      name: "Más de 20 años pateando montes en Galicia y gestionando operaciones de madera",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Red de colaboradores",
      name: "Red activa de ingenieros de montes, abogados, topógrafos, maderistas y empresas de desbroce en las 4 provincias gallegas",
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://ferrados.com" },
    { "@type": "ListItem", position: 2, name: "Quiénes somos", item: "https://ferrados.com/quienes-somos" },
  ],
};

// AboutPage con speakable para el bloque "TL;DR" citable
const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://ferrados.com/quienes-somos",
  name: "Quiénes somos — Ferrados.com",
  inLanguage: "es-ES",
  mainEntity: { "@id": "https://ferrados.com#organization" },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["[data-speakable='true']"],
  },
};

export default function QuienesSomosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <Script
        id="quienes-somos-org-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Script
        id="quienes-somos-breadcrumb-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="quienes-somos-aboutpage-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />

      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-green-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Quiénes somos</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        No somos una ONG forestal. Somos los que te quitamos el marrón de
        encima.
      </h1>

      {/* Bloque TL;DR citable — pensado para extracción por LLMs y voice
          assistants. Cuando ChatGPT/Perplexity/Claude cite esta página,
          este es el párrafo que se llevarán tal cual. */}
      <aside
        aria-label="Resumen"
        data-speakable="true"
        className="bg-green-50 border-l-4 border-green-700 rounded-r-lg p-5 my-6"
      >
        <p className="text-xs font-bold uppercase tracking-wide text-green-800 mb-2">
          En resumen
        </p>
        <p className="text-base text-gray-800 leading-relaxed">
          <strong>Ferrados.com</strong> es un servicio gallego de asesoramiento
          y puesta en contacto para propietarios de montes y fincas en Galicia.
          Llevamos más de 20 años sobre el terreno, gestionamos directamente
          compras de eucalipto y pino en A Coruña, y en el resto de Galicia
          conectamos al propietario con el profesional adecuado (ingeniero de
          montes, abogado, topógrafo, maderista o empresa de desbroce) de su
          zona. Ayudamos igual a quien vive en Galicia que a los gallegos de
          la diáspora en Madrid, Barcelona, Suiza, Argentina o Uruguay.
        </p>
      </aside>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg">
          Si tienes un monte o una finca en Galicia que te quita el sueño, estás
          en el sitio correcto.
        </p>

        <p>
          Detrás de Ferrados.com hay gente con barro en las botas. Llevamos
          más de 20 años pateando montes por toda Galicia, y conocemos el
          terreno palmo a palmo. Hemos visto la misma historia cientos de
          veces: herederos que no saben dónde están sus fincas, propietarios
          pagando multas de la Xunta por no desbrozar, y familias peleándose
          por vender la madera de un proindiviso mientras el maderista de
          turno les ofrece un precio ridículo.
        </p>

        <p>
          El sector maderero en Galicia mueve miles de millones de euros al año,
          pero si no sabes cómo moverte, vas a perder dinero. Nosotros vimos
          cómo la burocracia, los intermediarios y la falta de información le
          costaba miles de euros a gente que solo quería vender y estar
          tranquila. Por eso montamos Ferrados.com.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
          <h2 className="text-xl font-bold text-green-800 mb-3">
            Gente de monte, no de despacho
          </h2>
          <p className="text-gray-700">
            Te voy a decir la verdad: no somos unos oficinistas que han montado
            una web. Somos gente que conoce el terreno. Sabemos medir una
            finca, sabemos calcular la madera que tienes y sabemos a cuánto se
            paga hoy la tonelada de eucalipto o pino en Galicia. Llevamos 20
            años pisando monte para que tú no tengas que hacerlo.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Nuestra experiencia
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Más de 20 años</strong> sobre el terreno en montes gallegos
            de las cuatro provincias.
          </li>
          <li>
            <strong>Gestión directa</strong> de compras de eucalipto globulus,
            eucalipto nitens y pino pinaster en la provincia de A Coruña.
          </li>
          <li>
            <strong>Red activa</strong> de ingenieros de montes, abogados
            especializados en derecho civil gallego, topógrafos colegiados,
            maderistas y empresas de desbroce en A Coruña, Lugo, Ourense y
            Pontevedra.
          </li>
          <li>
            <strong>Conocimiento actualizado</strong> de la Ley 3/2007 de
            prevención de incendios, la Ley 7/2012 de montes de Galicia, el
            derecho sucesorio gallego (pacto de mejora, apartación) y la
            normativa urbanística rural (Ley 2/2016 do solo de Galicia).
          </li>
          <li>
            <strong>Trato específico con la diáspora</strong>: llevamos años
            resolviendo casos de gallegos en Madrid, Barcelona, País Vasco,
            Suiza, Alemania, Reino Unido, Argentina, Uruguay y Venezuela sin
            que tengan que viajar.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Dónde operamos
        </h2>
        <p>
          Galicia es enorme y tiene cientos de miles de fincas repartidas entre
          minifundios, montes comunales y plantaciones de todo tipo. Ningún
          equipo puede abarcarlo todo solo. Por eso trabajamos codo con codo con
          una red de excelentes profesionales gallegos: ingenieros de montes,
          abogados, topógrafos, maderistas y empresas de desbroce repartidos por
          las cuatro provincias.
        </p>

        <p>
          Nosotros gestionamos directamente las operaciones de madera en la
          provincia de A Coruña, y para el resto de Galicia conectamos a cada
          propietario con el profesional de su zona que mejor encaja con su
          caso. Repartimos clientes entre los mejores, porque el objetivo es que
          tú resuelvas tu problema rápido y bien, no que nosotros acaparemos
          todo.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Cómo funciona
        </h2>
        <p>
          Tú no tienes que buscar a nadie, ni comparar presupuestos, ni
          pelearte con la administración. Tú nos cuentas tu caso, lo analizamos
          y te ponemos en contacto directo con el profesional adecuado para
          resolverlo rápido y sin rodeos.
        </p>

        <p>
          Si estás preparado para dejar de perder tiempo y convertir ese monte
          en tranquilidad (o en dinero), elige tu problema en el menú y
          empezamos.
        </p>

        <hr className="my-10 border-gray-200" />

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Nuestra misión
        </h2>
        <p>
          <strong>Ferrados.com</strong> nace de una realidad que conocemos de
          primera mano: miles de gallegos —y miles más que viven fuera de
          Galicia— tienen montes, fincas o terrenos heredados y no saben qué
          hacer con ellos.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
          <p className="text-gray-700">
            Conectar a propietarios de montes y fincas en Galicia con los
            profesionales adecuados para resolver su situación: abogados,
            topógrafos, empresas de desbroce, maderistas y gestores forestales.
            Sin importar dónde vivas.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          El problema que resolvemos
        </h2>
        <p>
          Galicia tiene más de 600.000 propietarios forestales. Muchos heredaron
          sus fincas sin documentación clara, no saben dónde están exactamente
          sus lindes, reciben cartas de la Xunta exigiendo limpieza o tienen
          montes compartidos en proindiviso con familiares con los que hace años
          que no hablan.
        </p>
        <p>
          A esto se suma que una gran parte de estos propietarios ya no vive en
          Galicia. Están en Madrid, Barcelona, el País Vasco o incluso en el
          extranjero. Para ellos, gestionar una finca a distancia es una pesadilla
          burocrática.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Cómo lo hacemos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl mb-3">1</div>
            <h3 className="font-bold text-gray-900 mb-2">Escuchamos</h3>
            <p className="text-sm text-gray-600">
              Nos cuentas tu situación a través de un formulario sencillo
              adaptado a tu caso.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl mb-3">2</div>
            <h3 className="font-bold text-gray-900 mb-2">Conectamos</h3>
            <p className="text-sm text-gray-600">
              Buscamos al profesional de tu zona que mejor encaja con lo que
              necesitas.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl mb-3">3</div>
            <h3 className="font-bold text-gray-900 mb-2">Resolvemos</h3>
            <p className="text-sm text-gray-600">
              El profesional se encarga de todo. Tú no necesitas desplazarte a
              Galicia.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Nuestros principios editoriales
        </h2>
        <p>
          Todo el contenido de Ferrados.com se elabora bajo estos criterios:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Fuentes primarias</strong>: citamos y enlazamos a la
            normativa oficial (DOG, BOE, Xunta de Galicia, Consellería do Medio
            Rural, catastro).
          </li>
          <li>
            <strong>Actualización continua</strong>: revisamos precios de madera
            y cifras cada campaña; los artículos llevan campo <code>lastUpdated</code>.
          </li>
          <li>
            <strong>Sin humo</strong>: no prometemos plazos ni cifras que no
            sean realistas. Preferimos decir «depende» que dar un número
            inventado.
          </li>
          <li>
            <strong>No es asesoramiento vinculante</strong>: cada situación es
            distinta. Nuestro contenido orienta; el profesional al que te
            conectamos resuelve.
          </li>
          <li>
            <strong>Sin conflictos de interés ocultos</strong>: cuando
            recomendamos un tipo de gestión, no es porque nos pague nadie por
            hacerlo.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          ¿Por qué &quot;Ferrados&quot;?
        </h2>
        <p>
          El <strong>ferrado</strong> es la unidad de medida tradicional de la
          tierra en Galicia. Aunque oficialmente se usan hectáreas y metros
          cuadrados, en el día a día de los propietarios gallegos se sigue
          hablando en ferrados. Es nuestra forma de decir que hablamos tu idioma
          y entendemos tu realidad.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Nuestros valores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <span className="text-green-700 font-bold text-lg mt-0.5">
              01
            </span>
            <div>
              <h3 className="font-bold text-gray-900">Cercanía</h3>
              <p className="text-sm text-gray-600 mt-1">
                Hablamos claro, sin tecnicismos legales ni forestales. Queremos
                que entiendas tu situación.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <span className="text-green-700 font-bold text-lg mt-0.5">
              02
            </span>
            <div>
              <h3 className="font-bold text-gray-900">Transparencia</h3>
              <p className="text-sm text-gray-600 mt-1">
                Sin costes ocultos para ti. Te orientamos y los profesionales
                te dan presupuesto antes de empezar.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <span className="text-green-700 font-bold text-lg mt-0.5">
              03
            </span>
            <div>
              <h3 className="font-bold text-gray-900">Especialización</h3>
              <p className="text-sm text-gray-600 mt-1">
                Solo trabajamos con montes y fincas en Galicia. Eso nos permite
                conocer la normativa, el terreno y los profesionales como nadie.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <span className="text-green-700 font-bold text-lg mt-0.5">
              04
            </span>
            <div>
              <h3 className="font-bold text-gray-900">Accesibilidad</h3>
              <p className="text-sm text-gray-600 mt-1">
                Da igual que estés en Vigo, en Madrid o en Buenos Aires. Te
                ayudamos a gestionar tu finca sin necesidad de desplazarte.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-green-800 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">
          ¿Tienes un monte o finca en Galicia?
        </h2>
        <p className="text-green-100 mb-6">
          Cuéntanos tu caso y te orientamos sin compromiso.
        </p>
        <Link
          href="/empezar"
          className="inline-block bg-white text-green-800 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors"
        >
          Empezar ahora
        </Link>
      </div>
    </div>
  );
}
