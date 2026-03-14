import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad — Ferrados.com",
  description:
    "Política de privacidad de Ferrados.com. Información sobre el tratamiento de datos personales, cesión a profesionales colaboradores y derechos RGPD.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-green-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Política de Privacidad</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Política de Privacidad
      </h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p>
          En cumplimiento del Reglamento (UE) 2016/679 General de Protección de
          Datos (RGPD) y de la Ley Orgánica 3/2018, de 5 de diciembre, de
          Protección de Datos Personales y garantía de los derechos digitales
          (LOPDGDD), le informamos de lo siguiente:
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Responsable del tratamiento
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Responsable:</strong> Consultoría Método de Coruña</li>
          <li><strong>Domicilio:</strong> Ronda de Montealto 4, 15002 A Coruña</li>
          <li><strong>Contacto:</strong> info@ferrados.com</li>
          <li><strong>Sitio web:</strong> https://ferrados.com</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Finalidad del tratamiento
        </h2>
        <p>
          Los datos que introduzca el usuario en los formularios de Ferrados.com
          se utilizarán para:
        </p>
        <ol className="list-[lower-alpha] pl-5 space-y-2">
          <li>
            Atender y responder a su consulta.
          </li>
          <li>
            Ceder dichos datos a terceros profesionales del sector (abogados,
            despachos de herencias, ingenieros, tasadores, maderistas, empresas
            de desbroce, inmobiliarias rústicas, etc.) con los que Ferrados.com
            colabora, para que contacten directamente con el usuario y le
            ofrezcan sus servicios relacionados con la finca o el monte
            indicado.
          </li>
        </ol>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Legitimación
        </h2>
        <p>
          La base jurídica para el tratamiento y la cesión de datos es el
          consentimiento explícito del usuario, otorgado al marcar la casilla de
          aceptación de la Política de Privacidad antes de enviar el formulario.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Destinatarios
        </h2>
        <p>
          Los datos podrán ser comunicados a los citados profesionales
          colaboradores, que actuarán como responsables independientes del
          tratamiento en el marco de la normativa RGPD. Ferrados.com no se hace
          responsable del uso posterior que estos profesionales hagan de los
          datos en el ejercicio de su propia actividad.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Conservación de datos
        </h2>
        <p>
          Los datos personales se conservarán mientras sean necesarios para la
          finalidad del tratamiento y, una vez finalizada la relación, durante
          los plazos legalmente establecidos para atender posibles
          responsabilidades.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Derechos del usuario
        </h2>
        <p>
          El usuario puede ejercer en cualquier momento sus derechos de acceso,
          rectificación, supresión, oposición, limitación del tratamiento y
          portabilidad de sus datos personales, dirigiéndose por escrito a
          info@ferrados.com indicando en el asunto &quot;Protección de datos&quot;.
        </p>
        <p>
          Asimismo, tiene derecho a presentar una reclamación ante la Agencia
          Española de Protección de Datos (
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline hover:text-green-800"
          >
            www.aepd.es
          </a>
          ) si considera que el tratamiento de sus datos no es conforme con la
          normativa vigente.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Cookies
        </h2>
        <p>
          Este sitio web puede utilizar cookies técnicas y de análisis. Puede
          consultar más información en nuestra política de cookies o en la
          configuración de su navegador.
        </p>
      </div>
    </div>
  );
}
