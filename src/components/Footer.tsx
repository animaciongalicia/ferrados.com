import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Ferrados.com</h3>
            <p className="text-sm leading-relaxed">
              Ayudamos a propietarios de montes y fincas en Galicia a resolver
              sus problemas: herencias, madera, limpieza, lindes y más.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/herencias-montes-galicia" className="hover:text-white">Herencias de montes</Link></li>
              <li><Link href="/localizar-medir-fincas-galicia" className="hover:text-white">Localizar y medir fincas</Link></li>
              <li><Link href="/precio-venta-madera-galicia" className="hover:text-white">Venta de madera</Link></li>
              <li><Link href="/limpieza-desbroce-multas-xunta" className="hover:text-white">Limpieza y multas</Link></li>
              <li><Link href="/vender-parte-monte-proindiviso" className="hover:text-white">Proindivisos</Link></li>
              <li><Link href="/compra-venta-terrenos-galicia" className="hover:text-white">Compraventa de terrenos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Empresa</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li><Link href="/quienes-somos" className="hover:text-white">Quiénes somos</Link></li>
              <li><Link href="/colaboradores" className="hover:text-white">Colaboradores</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
            <h4 className="text-white font-semibold mb-3">Contacto</h4>
            <p className="text-sm mb-4">
              ¿Tienes una finca o monte en Galicia y no sabes qué hacer?
            </p>
            <Link
              href="/empezar"
              className="inline-block bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors"
            >
              Cuéntanos tu caso
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-xs text-gray-500">
          <div className="flex flex-wrap justify-center gap-4 mb-3">
            <Link href="/politica-privacidad" className="hover:text-white">Política de Privacidad</Link>
          </div>
          <p className="text-center">
            © {new Date().getFullYear()} Ferrados.com — Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
