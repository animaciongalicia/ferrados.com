import Link from "next/link";

const pilarLinks: Record<string, { href: string; label: string }> = {
  herencias: { href: "/herencias-montes-galicia", label: "Resolver mi herencia" },
  limpieza: { href: "/limpieza-desbroce-multas-xunta", label: "Evitar la multa" },
  lindes: { href: "/localizar-medir-fincas-galicia", label: "Medir mi finca" },
  madera: { href: "/precio-venta-madera-galicia", label: "Valorar mi madera" },
  proindiviso: { href: "/vender-parte-monte-proindiviso", label: "Resolver el proindiviso" },
  compraventa: { href: "/compra-venta-terrenos-galicia", label: "Gestionar compra-venta" },
};

interface CajaSecuestroProps {
  pilar?: string;
}

export default function CajaSecuestro({ pilar }: CajaSecuestroProps) {
  const cta = pilar ? pilarLinks[pilar] : null;
  const href = cta?.href ?? "/empezar";
  const label = cta?.label ?? "Selecciona tu problema";

  return (
    <div className="bg-green-50 border-l-4 border-green-600 rounded-r-xl p-6 md:p-8 my-10 not-prose">
      <p className="text-lg md:text-xl font-extrabold text-gray-900 mb-2 leading-snug">
        ¿Tienes este problema?
      </p>
      <p className="text-gray-700 mb-5 leading-relaxed">
        Deja de perder el tiempo leyendo. Selecciona tu provincia y te llamamos hoy mismo.
      </p>
      <Link
        href={href}
        className="inline-block bg-green-700 hover:bg-green-800 text-white text-center px-8 py-4 rounded-xl text-lg font-bold transition-colors"
      >
        {label}
      </Link>
    </div>
  );
}
