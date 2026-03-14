import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Colaboradores profesionales — Ferrados.com",
  description:
    "Eres abogado, maderista, topógrafo o empresa de desbroce en Galicia? Recibe contactos de propietarios que necesitan tus servicios.",
};

export default function ColaboradoresPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-green-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Colaboradores</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Recibe contactos de propietarios que te necesitan
      </h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg">
          Si eres abogado, maderista, topógrafo, ingeniero forestal, empresa de
          desbroce o inmobiliaria rústica en Galicia, Ferrados.com te conecta
          con propietarios que ya han pedido ayuda.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Cómo funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl mb-3">1</div>
            <h3 className="font-bold text-gray-900 mb-2">El propietario pide ayuda</h3>
            <p className="text-sm text-gray-600">
              Un propietario de un monte o finca rellena un formulario en
              Ferrados.com describiendo su situación.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl mb-3">2</div>
            <h3 className="font-bold text-gray-900 mb-2">Te enviamos el contacto</h3>
            <p className="text-sm text-gray-600">
              Analizamos el caso y derivamos los datos al profesional de la zona
              que mejor encaje con la necesidad.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl mb-3">3</div>
            <h3 className="font-bold text-gray-900 mb-2">Tú cierras el trato</h3>
            <p className="text-sm text-gray-600">
              Contactas directamente con el propietario, le das presupuesto y
              gestionas el servicio.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          ¿Para qué tipo de profesionales?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
          {[
            "Abogados especialistas en herencias y proindivisos",
            "Maderistas y empresas de corta",
            "Topógrafos e ingenieros forestales",
            "Empresas de desbroce y limpieza forestal",
            "Inmobiliarias rústicas",
            "Gestorías y asesorías fiscales",
          ].map((tipo) => (
            <div key={tipo} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <span className="text-green-700 font-bold">&#10003;</span>
              <span className="text-sm text-gray-800">{tipo}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Condiciones
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
          <p className="text-gray-700 text-sm leading-relaxed">
            Ferrados.com genera y deriva contactos de usuarios que han
            solicitado ayuda de forma expresa. No garantizamos el cierre de
            ventas ni la contratación de servicios; el resultado final dependerá
            exclusivamente de la capacidad comercial y profesional del
            colaborador.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-green-800 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">
          ¿Quieres recibir contactos?
        </h2>
        <p className="text-green-100 mb-6">
          Escríbenos y te contamos cómo colaborar.
        </p>
        <a
          href="mailto:info@ferrados.com?subject=Quiero colaborar con Ferrados.com"
          className="inline-block bg-white text-green-800 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors"
        >
          Contactar por email
        </a>
      </div>
    </div>
  );
}
