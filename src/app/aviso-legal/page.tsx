import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal — Ferrados.com",
  description:
    "Aviso legal de Ferrados.com. Información del titular del sitio web, condiciones de uso y legislación aplicable.",
};

export default function AvisoLegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-green-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Aviso Legal</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Aviso Legal
      </h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
          Servicios de la Sociedad de la Información y de Comercio Electrónico
          (LSSI-CE), se pone a disposición de los usuarios la siguiente
          información:
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Datos del titular
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Titular:</strong> Consultoría Método de Coruña</li>
          <li><strong>Domicilio:</strong> Ronda de Montealto 4, 15002 A Coruña</li>
          <li><strong>Email:</strong> info@ferrados.com</li>
          <li><strong>Sitio web:</strong> https://ferrados.com</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Objeto del sitio web
        </h2>
        <p>
          Ferrados.com es una plataforma que conecta a propietarios de montes y
          fincas en Galicia con profesionales del sector (abogados, ingenieros,
          tasadores, maderistas, empresas de desbroce, inmobiliarias rústicas,
          etc.) mediante la captación y cesión de datos de contacto con el
          consentimiento expreso del usuario.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Condiciones de uso
        </h2>
        <p>
          El acceso y uso de este sitio web atribuye la condición de usuario y
          la aceptación plena de las condiciones aquí establecidas. El usuario se
          compromete a hacer un uso adecuado de los contenidos y servicios que
          Ferrados.com ofrece.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Propiedad intelectual e industrial
        </h2>
        <p>
          Los contenidos de este sitio web (textos, imágenes, diseño gráfico,
          código fuente, logotipos, marcas, etc.) son propiedad de Ferrados.com o
          de sus legítimos titulares y están protegidos por la normativa vigente
          en materia de propiedad intelectual e industrial.
        </p>
        <p>
          Queda prohibida su reproducción, distribución, comunicación pública o
          transformación sin la autorización expresa de sus titulares.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Exclusión de responsabilidad
        </h2>
        <p>
          Ferrados.com genera y deriva contactos de usuarios que han solicitado
          ayuda de forma expresa. No garantizamos el cierre de ventas ni la
          contratación de servicios entre usuarios y profesionales colaboradores;
          el resultado final dependerá exclusivamente de la capacidad comercial y
          profesional de cada colaborador.
        </p>
        <p>
          Ferrados.com no se responsabiliza de los daños o perjuicios que pudieran
          derivarse de interferencias, omisiones, interrupciones, virus
          informáticos o averías telefónicas o desconexiones en el funcionamiento
          operativo de este sistema electrónico.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Legislación aplicable
        </h2>
        <p>
          Las presentes condiciones se rigen por la legislación española. Para
          cualquier controversia que pudiera surgir en relación con el uso de
          este sitio web, las partes se someten a los Juzgados y Tribunales de
          A Coruña.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Enlaces relacionados
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link href="/politica-privacidad" className="text-green-700 underline hover:text-green-800">
              Política de Privacidad
            </Link>
          </li>
          <li>
            <Link href="/politica-cookies" className="text-green-700 underline hover:text-green-800">
              Política de Cookies
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
