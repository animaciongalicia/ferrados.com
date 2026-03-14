export interface GacetaCategory {
  id: string;
  label: string;
  /** Tailwind classes for the pill chip */
  pillClasses: string;
  /** Tailwind classes for the active/selected state */
  pillActiveClasses: string;
  /** Which `pilar` values from blog posts map to this category */
  pilares: string[];
}

export const GACETA_CATEGORIES: GacetaCategory[] = [
  {
    id: "multas",
    label: "Multas y Limpieza",
    pillClasses: "bg-red-50 text-red-800 border-red-200",
    pillActiveClasses: "bg-red-100 text-red-900 border-red-400 ring-2 ring-red-200",
    pilares: ["limpieza"],
  },
  {
    id: "madera",
    label: "Venta de Madera",
    pillClasses: "bg-green-50 text-green-800 border-green-200",
    pillActiveClasses: "bg-green-100 text-green-900 border-green-400 ring-2 ring-green-200",
    pilares: ["madera"],
  },
  {
    id: "herencias",
    label: "Herencias",
    pillClasses: "bg-blue-50 text-blue-800 border-blue-200",
    pillActiveClasses: "bg-blue-100 text-blue-900 border-blue-400 ring-2 ring-blue-200",
    pilares: ["herencias"],
  },
  {
    id: "catastro",
    label: "Fincas y Catastro",
    pillClasses: "bg-amber-50 text-amber-800 border-amber-200",
    pillActiveClasses: "bg-amber-100 text-amber-900 border-amber-400 ring-2 ring-amber-200",
    pilares: ["lindes"],
  },
  {
    id: "compraventa",
    label: "Compra-Venta",
    pillClasses: "bg-purple-50 text-purple-800 border-purple-200",
    pillActiveClasses: "bg-purple-100 text-purple-900 border-purple-400 ring-2 ring-purple-200",
    pilares: ["compraventa"],
  },
];

export function getCategoryForPilar(pilar?: string): GacetaCategory | undefined {
  if (!pilar) return undefined;
  return GACETA_CATEGORIES.find((cat) => cat.pilares.includes(pilar));
}
