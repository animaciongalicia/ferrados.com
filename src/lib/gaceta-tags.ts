export interface GacetaTag {
  id: string;
  label: string;
  /** Tailwind classes for the tag chip */
  chipClasses: string;
}

/**
 * Transversal tags — cross-cutting concerns that span multiple pilares.
 * Pilares are vertical (topic silos), tags are horizontal (intent/angle).
 */
export const GACETA_TAGS: GacetaTag[] = [
  {
    id: "impuestos",
    label: "Impuestos",
    chipClasses: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    id: "xunta",
    label: "Xunta",
    chipClasses: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    id: "vecinos",
    label: "Conflictos vecinales",
    chipClasses: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    id: "emigrantes",
    label: "Emigrantes",
    chipClasses: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    id: "subvenciones",
    label: "Subvenciones",
    chipClasses: "bg-lime-50 text-lime-700 border-lime-200",
  },
  {
    id: "precios",
    label: "Precios",
    chipClasses: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    id: "paso-a-paso",
    label: "Paso a paso",
    chipClasses: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    id: "errores",
    label: "Errores a evitar",
    chipClasses: "bg-red-50 text-red-700 border-red-200",
  },
  {
    id: "legislacion",
    label: "Legislación",
    chipClasses: "bg-slate-50 text-slate-700 border-slate-200",
  },
  {
    id: "documentacion",
    label: "Documentación",
    chipClasses: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
];

export function getTagById(tagId: string): GacetaTag | undefined {
  return GACETA_TAGS.find((t) => t.id === tagId);
}
