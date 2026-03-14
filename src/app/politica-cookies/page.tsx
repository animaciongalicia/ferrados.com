import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies — Ferrados.com",
  description:
    "Política de cookies de Ferrados.com. Información sobre las cookies que utiliza este sitio web y cómo gestionarlas.",
};

export default function PoliticaCookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-green-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Política de Cookies</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Política de Cookies
      </h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p>
          De conformidad con la Ley 34/2002 de Servicios de la Sociedad de la
          Información y de Comercio Electrónico (LSSI-CE) y el Reglamento (UE)
          2016/679 (RGPD), le informamos sobre el uso de cookies en este sitio
          web.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          ¿Qué son las cookies?
        </h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en su
          dispositivo (ordenador, móvil o tableta) cuando visita un sitio web.
          Permiten que el sitio recuerde sus acciones y preferencias durante un
          período de tiempo.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Tipos de cookies que utilizamos
        </h2>

        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Tipo</th>
                <th className="text-left p-3 font-semibold text-gray-700">Finalidad</th>
                <th className="text-left p-3 font-semibold text-gray-700">Duración</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3 font-medium">Técnicas</td>
                <td className="p-3">Necesarias para el funcionamiento básico del sitio web. No requieren consentimiento.</td>
                <td className="p-3">Sesión</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Analíticas</td>
                <td className="p-3">Nos ayudan a entender cómo los usuarios interactúan con el sitio web (páginas visitadas, tiempo de navegación, etc.).</td>
                <td className="p-3">Hasta 2 años</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Cookies de terceros
        </h2>
        <p>
          Este sitio web puede utilizar servicios de análisis de terceros como
          Google Analytics. Estos servicios utilizan cookies propias para
          recopilar información anónima sobre el uso del sitio web. La
          información generada se transmite y almacena en los servidores del
          proveedor del servicio.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          ¿Cómo gestionar las cookies?
        </h2>
        <p>
          Puede configurar su navegador para aceptar, rechazar o eliminar
          cookies. A continuación le indicamos cómo hacerlo en los navegadores
          más comunes:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Chrome:</strong> Configuración &rarr; Privacidad y seguridad &rarr; Cookies</li>
          <li><strong>Firefox:</strong> Opciones &rarr; Privacidad y seguridad &rarr; Cookies</li>
          <li><strong>Safari:</strong> Preferencias &rarr; Privacidad &rarr; Cookies</li>
          <li><strong>Edge:</strong> Configuración &rarr; Cookies y permisos del sitio</li>
        </ul>
        <p>
          Tenga en cuenta que si desactiva las cookies, algunas funcionalidades
          del sitio web podrían no estar disponibles.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Actualización de la política
        </h2>
        <p>
          Esta política de cookies puede ser actualizada periódicamente. Le
          recomendamos revisarla con regularidad para estar informado sobre
          cómo utilizamos las cookies.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          Más información
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link href="/politica-privacidad" className="text-green-700 underline hover:text-green-800">
              Política de Privacidad
            </Link>
          </li>
          <li>
            <Link href="/aviso-legal" className="text-green-700 underline hover:text-green-800">
              Aviso Legal
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
