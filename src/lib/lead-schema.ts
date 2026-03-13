import { z } from "zod";

/**
 * ESQUEMA DE LEADS — Ferrados.com
 *
 * Cada embudo (limpieza, herencias, lindes, madera, proindiviso) captura
 * datos específicos que necesita el cliente B2B al que se le vende el lead.
 *
 * Los campos comunes van en baseLeadSchema.
 * Los campos específicos van en cada schema de embudo.
 */

// ===== OPCIONES COMPARTIDAS =====

export const provincias = [
  "A Coruña",
  "Lugo",
  "Ourense",
  "Pontevedra",
  "No lo sé",
] as const;

export const residencias = [
  "Vivo en Galicia",
  "Vivo en el resto de España",
  "Vivo en el extranjero (Europa)",
  "Vivo en Latinoamérica",
  "Vivo en otro país",
] as const;

export const rangosSuperficie = [
  "Menos de 5.000 m²",
  "5.000 m² - 1 hectárea",
  "1 - 5 hectáreas",
  "5 - 20 hectáreas",
  "20 - 100 hectáreas",
  "Más de 100 hectáreas",
  "No lo sé",
] as const;

export const urgencias = [
  "Urgente (tengo un plazo o una multa)",
  "En los próximos meses",
  "Sin prisa, quiero informarme",
] as const;

// ===== EMBUDO: LIMPIEZA / MULTAS =====

export const estadoNotificacion = [
  "He recibido carta/notificación de la Xunta",
  "Me han dicho que tengo que limpiar pero no tengo carta",
  "Quiero limpiar antes de que me multen",
  "Ya me han multado",
  "Solo quiero informarme",
] as const;

export const tipoVegetacion = [
  "Matorral y maleza (toxo, silva, xesta...)",
  "Árboles sin valor comercial (alisos, sauces...)",
  "Eucaliptos o pinos jóvenes (sin valor maderero)",
  "Monte mixto",
  "No lo sé, hace años que no voy",
] as const;

export const cercaniaPoblacion = [
  "Sí, a menos de 50 metros de casas",
  "Sí, a menos de 100 metros",
  "No, está alejado de viviendas",
  "No lo sé",
] as const;

export const limpiezaSchema = z.object({
  embudo: z.literal("limpieza"),
  estado_notificacion: z.enum(estadoNotificacion, { message: "Selecciona tu situación" }),
  provincia: z.enum(provincias, { message: "Selecciona la provincia" }),
  municipio: z.string().optional(),
  superficie_aprox: z.enum(rangosSuperficie, { message: "Selecciona la superficie" }),
  tipo_vegetacion: z.enum(tipoVegetacion).optional(),
  cerca_poblacion: z.enum(cercaniaPoblacion, { message: "Indica si está cerca de viviendas" }),
  acceso_vehiculo: z.enum(["Sí", "No", "No lo sé"] as const).optional(),
  urgencia: z.enum(urgencias, { message: "Indica la urgencia" }),
  residencia: z.enum(residencias, { message: "Indica dónde vives" }),
  nombre: z.string().min(2, "Tu nombre es necesario"),
  email: z.string().email("Email no válido").or(z.literal("")),
  telefono: z.string().min(6, "Teléfono no válido").or(z.literal("")),
  comentarios: z.string().optional(),
  origen: z.string().optional(),
}).refine(
  (d) => d.email !== "" || d.telefono !== "",
  { message: "Necesitamos al menos un email o teléfono", path: ["email"] }
);

// ===== EMBUDO: HERENCIAS / SUCESIONES =====

export const situacionHerencia = [
  "Ha fallecido un familiar y no sé qué hacer con las fincas",
  "Ya sé que heredé pero no he hecho los papeles",
  "La herencia lleva años sin hacer (padres, abuelos...)",
  "Herencia desde el extranjero, no sé cómo gestionar",
  "Hay testamento pero no sé si incluye las fincas",
  "No hay testamento",
] as const;

export const numFincas = [
  "1 finca o parcela",
  "2-5 fincas",
  "Más de 5 fincas",
  "No sé cuántas hay",
] as const;

export const numHerederos = [
  "Solo yo",
  "2-3 herederos",
  "4-10 herederos",
  "Más de 10 o no lo sé",
] as const;

export const herenciasSchema = z.object({
  embudo: z.literal("herencias"),
  situacion_herencia: z.enum(situacionHerencia, { message: "Selecciona tu situación" }),
  anos_fallecimiento: z.enum([
    "Menos de 6 meses",
    "6 meses - 1 año",
    "1-5 años",
    "5-20 años",
    "Más de 20 años",
    "No lo sé",
  ] as const).optional(),
  num_fincas: z.enum(numFincas).optional(),
  num_herederos: z.enum(numHerederos).optional(),
  tiene_escrituras: z.enum(["Sí", "No", "Algunas", "No lo sé"] as const).optional(),
  provincia: z.enum(provincias, { message: "Selecciona la provincia" }),
  municipio: z.string().optional(),
  residencia: z.enum(residencias, { message: "Indica dónde vives" }),
  pais_residencia: z.string().optional(),
  urgencia: z.enum(urgencias, { message: "Indica la urgencia" }),
  nombre: z.string().min(2, "Tu nombre es necesario"),
  email: z.string().email("Email no válido").or(z.literal("")),
  telefono: z.string().min(6, "Teléfono no válido").or(z.literal("")),
  comentarios: z.string().optional(),
  origen: z.string().optional(),
}).refine(
  (d) => d.email !== "" || d.telefono !== "",
  { message: "Necesitamos al menos un email o teléfono", path: ["email"] }
);

// ===== EMBUDO: LINDES / CATASTRO / TOPOGRAFÍA =====

export const problemaLindes = [
  "No sé dónde están los límites de mi finca",
  "Conflicto con un vecino por los lindes",
  "La superficie del Catastro no coincide con la real",
  "Mi finca no aparece en el Catastro",
  "Necesito georreferenciar para vender o heredar",
  "Quiero medir para saber cuánta madera tengo",
] as const;

export const lindesSchema = z.object({
  embudo: z.literal("lindes"),
  problema_lindes: z.enum(problemaLindes, { message: "Selecciona tu problema" }),
  tiene_referencia_catastral: z.enum(["Sí", "No", "No lo sé"] as const).optional(),
  provincia: z.enum(provincias, { message: "Selecciona la provincia" }),
  municipio: z.string().optional(),
  superficie_aprox: z.enum(rangosSuperficie, { message: "Selecciona la superficie" }),
  motivo_medicion: z.enum([
    "Para vender la finca",
    "Para heredar / escriturar",
    "Para resolver un conflicto de lindes",
    "Para aprovechar la madera",
    "Para saber qué tengo exactamente",
  ] as const).optional(),
  urgencia: z.enum(urgencias, { message: "Indica la urgencia" }),
  residencia: z.enum(residencias, { message: "Indica dónde vives" }),
  nombre: z.string().min(2, "Tu nombre es necesario"),
  email: z.string().email("Email no válido").or(z.literal("")),
  telefono: z.string().min(6, "Teléfono no válido").or(z.literal("")),
  comentarios: z.string().optional(),
  origen: z.string().optional(),
}).refine(
  (d) => d.email !== "" || d.telefono !== "",
  { message: "Necesitamos al menos un email o teléfono", path: ["email"] }
);

// ===== EMBUDO: VENTA DE MADERA =====

export const especieArbol = [
  "Eucalipto (Eucalyptus globulus)",
  "Eucalipto nitens",
  "Pino del país (Pinus pinaster)",
  "Pino insigne (Pinus radiata)",
  "Mezcla de varias especies",
  "No estoy seguro de la especie",
] as const;

export const edadPlantacion = [
  "Menos de 10 años",
  "10 - 15 años",
  "15 - 20 años",
  "20 - 30 años",
  "Más de 30 años",
  "No lo sé",
] as const;

export const maderaSchema = z.object({
  embudo: z.literal("madera"),
  especie_arbol: z.enum(especieArbol, { message: "Selecciona la especie" }),
  edad_plantacion: z.enum(edadPlantacion, { message: "Selecciona la edad aproximada" }),
  provincia: z.enum(provincias, { message: "Selecciona la provincia" }),
  municipio: z.string().optional(),
  superficie_aprox: z.enum(rangosSuperficie, { message: "Selecciona la superficie" }),
  tiene_acceso_camion: z.enum(["Sí, llega un camión", "No, no hay acceso", "No lo sé"] as const).optional(),
  cortas_previas: z.enum(["Sí, se ha cortado antes", "No, es la primera corta", "No lo sé"] as const).optional(),
  tiene_permiso_corta: z.enum(["Sí", "No", "No sé qué es eso"] as const).optional(),
  urgencia: z.enum(urgencias, { message: "Indica la urgencia" }),
  residencia: z.enum(residencias, { message: "Indica dónde vives" }),
  nombre: z.string().min(2, "Tu nombre es necesario"),
  email: z.string().email("Email no válido").or(z.literal("")),
  telefono: z.string().min(6, "Teléfono no válido").or(z.literal("")),
  comentarios: z.string().optional(),
  origen: z.string().optional(),
}).refine(
  (d) => d.email !== "" || d.telefono !== "",
  { message: "Necesitamos al menos un email o teléfono", path: ["email"] }
);

// ===== EMBUDO: PROINDIVISO =====

export const situacionProindiviso = [
  "Quiero vender mi parte pero los demás no quieren",
  "No sé quiénes son todos los copropietarios",
  "Queremos vender todos pero no nos ponemos de acuerdo en el precio",
  "Necesito disolver el proindiviso legalmente",
  "Un copropietario quiere comprar las partes de los demás",
  "Tenemos madera que cortar pero no hay acuerdo",
] as const;

export const proindivisoSchema = z.object({
  embudo: z.literal("proindiviso"),
  situacion_proindiviso: z.enum(situacionProindiviso, { message: "Selecciona tu situación" }),
  num_copropietarios: z.enum([
    "2-3 copropietarios",
    "4-10 copropietarios",
    "Más de 10 copropietarios",
    "No lo sé",
  ] as const).optional(),
  tipo_terreno: z.enum([
    "Monte con madera aprovechable",
    "Monte sin madera (matorral)",
    "Terreno agrícola / prado",
    "Mixto",
    "No lo sé",
  ] as const).optional(),
  provincia: z.enum(provincias, { message: "Selecciona la provincia" }),
  municipio: z.string().optional(),
  superficie_aprox: z.enum(rangosSuperficie, { message: "Selecciona la superficie" }),
  urgencia: z.enum(urgencias, { message: "Indica la urgencia" }),
  residencia: z.enum(residencias, { message: "Indica dónde vives" }),
  nombre: z.string().min(2, "Tu nombre es necesario"),
  email: z.string().email("Email no válido").or(z.literal("")),
  telefono: z.string().min(6, "Teléfono no válido").or(z.literal("")),
  comentarios: z.string().optional(),
  origen: z.string().optional(),
}).refine(
  (d) => d.email !== "" || d.telefono !== "",
  { message: "Necesitamos al menos un email o teléfono", path: ["email"] }
);

// ===== TIPO UNIFICADO =====

export type LimpiezaLead = z.infer<typeof limpiezaSchema>;
export type HerenciasLead = z.infer<typeof herenciasSchema>;
export type LindesLead = z.infer<typeof lindesSchema>;
export type MaderaLead = z.infer<typeof maderaSchema>;
export type ProindivisoLead = z.infer<typeof proindivisoSchema>;

export type LeadFormData =
  | LimpiezaLead
  | HerenciasLead
  | LindesLead
  | MaderaLead
  | ProindivisoLead;

export type EmbudoType = LeadFormData["embudo"];

export const schemaByEmbudo = {
  limpieza: limpiezaSchema,
  herencias: herenciasSchema,
  lindes: lindesSchema,
  madera: maderaSchema,
  proindiviso: proindivisoSchema,
} as const;

export type LeadRecord = LeadFormData & {
  id: string;
  score: number;
  clasificacion: string;
  cliente_b2b_target: string;
  created_at: string;
};
