import type { Metadata } from "next";
import Link from "next/link";
import PilarCard from "@/components/PilarCard";

export const metadata: Metadata = {
  title: "Ferrados.com — Montes, fincas y terrenos en Galicia",
  description:
    "¿Tienes un monte, una finca o un terreno en Galicia? Te ayudamos con herencias, madera, limpieza, lindes, proindivisos y más. Vivas donde vivas.",
};

const pilares = [
  {
    href: "/herencias-montes-galicia",
    title: "Herencias de montes y fincas",
    description:
      "Has heredado un monte o una finca en Galicia y no sabes por dónde empezar. Papeles, sucesiones, titularidad... Te ayudamos a resolverlo.",
    icon: "📜",
  },
  {
    href: "/localizar-medir-fincas-galicia",
    title: "Localizar y medir tu finca",
    description:
      "No sabes dónde está exactamente tu finca, necesitas medir los lindes o resolver un problema con el Catastro.",
    icon: "📍",
  },
  {
    href: "/precio-venta-madera-galicia",
    title: "Vender madera (pinos y eucaliptos)",
    description:
      "Tienes pinos o eucaliptos y quieres saber cuánto valen, cuándo cortarlos y cómo vender la madera al mejor precio.",
    icon: "🌲",
  },
  {
    href: "/limpieza-desbroce-multas-xunta",
    title: "Limpieza obligatoria y multas",
    description:
      "La Xunta te exige limpiar tu finca. No sabes si te afecta la ley de biomasa, cuánto cuesta o qué pasa si no limpias.",
    icon: "🧹",
  },
  {
    href: "/vender-parte-monte-proindiviso",
    title: "Minifundios y proindivisos",
    description:
      "Compartes un monte con otros propietarios y no os ponéis de acuerdo. Quieres vender tu parte o disolver el proindiviso.",
    icon: "🤝",
  },
  {
    href: "/compra-venta-terrenos-galicia",
    title: "Compra-venta de terrenos",
    description:
      "Quieres comprar o vender un terreno, una finca o un monte en Galicia. Te orientamos en el proceso.",
    icon: "🏡",
    comingSoon: true,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-green-800 to-green-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            ¿Tienes un monte o una finca en Galicia?
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Herencias, madera, limpieza, lindes, papeles... No importa si vives
            en Galicia, en Madrid o en el extranjero. Te ayudamos a resolver tu
            situación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/empezar"
              className="bg-white text-green-800 px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-50 transition-colors"
            >
              Empezar ahora
            </Link>
            <Link
              href="#servicios"
              className="border-2 border-white/40 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-white/10 transition-colors"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Para quién */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
            ¿Te suena alguna de estas situaciones?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            {[
              "Heredé un monte y no sé qué hacer con él",
              "Vivo fuera de Galicia y tengo fincas abandonadas",
              "Me llegó una carta de la Xunta para limpiar",
              "Quiero vender la madera pero no sé a quién",
              "Tengo un terreno compartido y es un lío",
              "No encuentro mi finca en el Catastro",
            ].map((text) => (
              <div
                key={text}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-green-600 mt-0.5 font-bold">→</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section id="servicios" className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
          ¿En qué te podemos ayudar?
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-xl mx-auto">
          Selecciona tu situación para saber cómo podemos echarte una mano.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pilares.map((pilar) => (
            <PilarCard key={pilar.href} {...pilar} />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-green-800 text-white">
        <div className="max-w-3xl mx-auto px-4 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿No sabes por dónde empezar? Cuéntanos tu caso
          </h2>
          <p className="text-green-100 mb-6 text-lg">
            Rellena un formulario rápido y te orientamos sin compromiso.
          </p>
          <Link
            href="/empezar"
            className="inline-block bg-white text-green-800 px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-50 transition-colors"
          >
            Quiero que me ayudéis
          </Link>
        </div>
      </section>
    </>
  );
}
