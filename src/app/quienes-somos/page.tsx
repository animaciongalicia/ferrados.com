import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quiénes somos — Ferrados.com",
  description:
    "Somos Ferrados.com, una plataforma gallega que conecta propietarios de montes y fincas con profesionales locales. Conoce nuestra historia y misión.",
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
        Quiénes somos
      </h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg">
          <strong>Ferrados.com</strong> nace de una realidad que conocemos de
          primera mano: miles de gallegos —y miles más que viven fuera de
          Galicia— tienen montes, fincas o terrenos heredados y no saben qué
          hacer con ellos.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
          <h2 className="text-xl font-bold text-green-800 mb-3">
            Nuestra misión
          </h2>
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
                Sin costes ocultos para ti. Nuestra consulta inicial es gratuita
                y los profesionales te dan presupuesto antes de empezar.
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
