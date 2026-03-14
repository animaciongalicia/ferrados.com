import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quiénes somos — Ferrados.com",
  description:
    "Somos tasadores de montes y fincas en Galicia. Gestionamos compras de eucalipto en A Coruña y conectamos propietarios con profesionales en toda Galicia.",
};

export default function QuienesSomosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
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

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg">
          Si tienes un monte o una finca en Galicia que te quita el sueño, estás
          en el sitio correcto.
        </p>

        <p>
          Mi hermano Alejandro y yo llevamos años viendo la misma historia:
          herederos que no saben dónde están sus fincas, propietarios pagando
          multas de la Xunta por no desbrozar, y familias peleándose por vender
          la madera de un proindiviso mientras el maderista de turno les ofrece
          un precio ridículo.
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
            Somos tasadores, no oficinistas
          </h2>
          <p className="text-gray-700">
            Te voy a decir la verdad: no somos unos oficinistas que han montado
            una web. Somos tasadores. Sabemos medir una finca, sabemos calcular
            la madera que tienes y sabemos a cuánto se paga hoy la tonelada de
            eucalipto o pino en Galicia. Pisamos el monte para que tú no tengas
            que hacerlo.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Dónde operamos
        </h2>
        <p>
          Ahora bien, no podemos estar en toda Galicia a la vez. Nosotros
          gestionamos directamente las compras de eucalipto de gran tamaño en la
          provincia de A Coruña, donde controlamos el mercado y aseguramos el
          mejor margen para el propietario.
        </p>

        <p>
          Para todo lo demás (tasar un pino en Lugo, partir una herencia en
          Ourense, desbrozar en Pontevedra o pelear un linde), trabajamos con
          una red de abogados, ingenieros, topógrafos y empresas de desbroce que
          seleccionamos nosotros.
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
      </div>

      {/* CTA */}
      <div className="mt-12 bg-green-800 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">
          ¿Preparado para dejar de perder tiempo?
        </h2>
        <p className="text-green-100 mb-6">
          Convierte ese monte en tranquilidad (o en dinero). Elige tu problema
          y empezamos.
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
