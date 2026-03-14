import type { Metadata } from "next";
import Link from "next/link";
import ColaboradorForm from "@/components/forms/ColaboradorForm";

export const metadata: Metadata = {
  title: "Compra leads reales de montes y fincas — Ferrados.com",
  description:
    "No vendemos visitas. Te ponemos en la mesa clientes que necesitan firmar hoy. Exclusividad provincial para abogados, maderistas, topógrafos y empresas de desbroce en Galicia.",
};

export default function ColaboradoresPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Profesionales</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        No vendemos visitas. Te ponemos en la mesa clientes que necesitan firmar
        hoy.
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Miles de gallegos —tanto aquí como en el extranjero— entran a
        Ferrados.com cada semana buscando resolver herencias, multas y
        tasaciones. Nosotros no podemos atenderlos a todos.{" "}
        <strong>
          Buscamos UN SOLO SOCIO en exclusiva por provincia.
        </strong>
      </p>

      {/* Simulación de leads entrando */}
      <section className="bg-gray-900 text-green-400 rounded-xl p-6 mb-10 font-mono text-sm overflow-hidden">
        <p className="text-gray-500 mb-3 text-xs">
          ferrados.com — panel de leads en tiempo real
        </p>
        <div className="space-y-2">
          <p>&#9679; [NUEVO LEAD] Multa desbroce Lugo — Finca 2,3 ha junto a viviendas</p>
          <p>&#9679; [NUEVO LEAD] Herencia proindiviso Ourense — 4 herederos, 12 ha monte</p>
          <p>&#9679; [NUEVO LEAD] Tasación eucalipto A Coruña — Plantación 18 años, 5 ha</p>
          <p>&#9679; [NUEVO LEAD] Venta terreno rústico Pontevedra — 8.000 m² con acceso</p>
          <p>&#9679; [NUEVO LEAD] Limpieza urgente Lugo — Carta Xunta, plazo 15 días</p>
          <p>&#9679; [NUEVO LEAD] Herencia monte A Coruña — Propietario vive en Madrid</p>
          <p>&#9679; [NUEVO LEAD] Proindiviso Ourense — Quiere vender su parte, 3 copropietarios</p>
          <p>&#9679; [NUEVO LEAD] Desbroce Pontevedra — 1,5 ha matorral alto, sin acceso camión</p>
          <p className="text-gray-600">&#9679; [NUEVO LEAD] Cargando...</p>
        </div>
      </section>

      {/* Lo que ofrecemos */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Esto no es un directorio. Es tu máquina de captar clientes.
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          El propietario ya ha rellenado un formulario contándote su problema,
          su provincia, su superficie y sus datos de contacto. No tienes que
          convencerle de nada: <strong>ya te necesita</strong>. Tú solo tienes
          que coger el teléfono y cerrar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-white border-2 border-green-200 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-green-700 mb-2">Leads calientes</p>
            <p className="text-sm text-gray-600">
              Personas que han pedido ayuda activamente. No tráfico frío ni
              formularios basura.
            </p>
          </div>
          <div className="bg-white border-2 border-green-200 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-green-700 mb-2">Exclusividad</p>
            <p className="text-sm text-gray-600">
              Un solo socio por provincia y especialidad. Sin competencia. El
              lead es solo tuyo.
            </p>
          </div>
          <div className="bg-white border-2 border-green-200 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-green-700 mb-2">Sin riesgo</p>
            <p className="text-sm text-gray-600">
              Pagas por lead recibido, no por resultado. Tú pones el precio y
              cierras el trato.
            </p>
          </div>
        </div>
      </section>

      {/* Para quién */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿A quién buscamos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
          {[
            "Abogados de herencias y proindivisos",
            "Maderistas y empresas de corta",
            "Topógrafos e ingenieros forestales",
            "Empresas de desbroce y limpieza",
            "Inmobiliarias de fincas rústicas",
            "Gestorías y asesorías fiscales",
          ].map((tipo) => (
            <div
              key={tipo}
              className="flex items-center gap-2 p-3 bg-green-50 rounded-lg"
            >
              <span className="text-green-700 font-bold">&#10003;</span>
              <span className="text-sm text-gray-800 font-medium">{tipo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Cómo funciona
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <span className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              1
            </span>
            <div>
              <p className="font-bold text-gray-900">
                El propietario entra y cuenta su problema
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Rellena un formulario con todos los detalles: tipo de problema,
                provincia, superficie, datos de contacto. Con consentimiento
                RGPD para que le contactes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <span className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              2
            </span>
            <div>
              <p className="font-bold text-gray-900">
                Te enviamos el lead al momento
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Recibes un email o WhatsApp con todos los datos: nombre,
                teléfono, email, tipo de finca, provincia, y descripción del
                problema. Listo para llamar.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <span className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
              3
            </span>
            <div>
              <p className="font-bold text-gray-900">
                Tú cierras el trato
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Le llamas, le das presupuesto y gestionas el servicio. El
                margen es 100% tuyo. Nosotros ya hemos hecho nuestro trabajo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* La escasez */}
      <section className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 md:p-8 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Solo hay 4 plazas en toda Galicia
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Una por provincia. Si tu zona ya está ocupada, irás a lista de espera.
          Preferimos trabajar con pocos socios que se coman el mercado, a tener
          diez compitiendo por el mismo lead. Si te interesa, aplica ahora.
          Cuando la plaza se cubra, se cierra.
        </p>
      </section>

      {/* Formulario de aplicación */}
      <section id="aplicar" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Solicitar exclusividad provincial
        </h2>
        <p className="text-gray-600 mb-6">
          Rellena el formulario y nos ponemos en contacto contigo en menos de
          24 horas.
        </p>
        <ColaboradorForm />
      </section>

      {/* Condiciones legales */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-sm text-gray-500 leading-relaxed">
        <p className="font-semibold text-gray-700 mb-2">Condiciones</p>
        <p>
          Ferrados.com genera y deriva contactos de usuarios que han solicitado
          ayuda de forma expresa. No garantizamos el cierre de ventas ni la
          contratación de servicios; el resultado final dependerá exclusivamente
          de la capacidad comercial y profesional del colaborador.
        </p>
      </div>
    </div>
  );
}
