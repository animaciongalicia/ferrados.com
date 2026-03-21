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
  "Muy pequeña (menos de 1 ferrado, < 500 m²)",
  "Pequeña (de 1 a 5 ferrados, aprox. 500 – 2.500 m²)",
  "Mediana (de 5 a 10 ferrados, aprox. 2.500 – 5.000 m²)",
  "Grande (de 10 a 20 ferrados, aprox. 5.000 – 10.000 m² ≈ hasta 1 ha)",
  "Muy grande (de 1 a 5 hectáreas)",
  "Excepcional (más de 5 hectáreas)",
] as const;

/** Valor numérico aproximado (centro del rango) en m² para scoring y cálculos */
export const superficieM2: Record<(typeof rangosSuperficie)[number], number> = {
  "Muy pequeña (menos de 1 ferrado, < 500 m²)": 250,
  "Pequeña (de 1 a 5 ferrados, aprox. 500 – 2.500 m²)": 1500,
  "Mediana (de 5 a 10 ferrados, aprox. 2.500 – 5.000 m²)": 3750,
  "Grande (de 10 a 20 ferrados, aprox. 5.000 – 10.000 m² ≈ hasta 1 ha)": 7500,
  "Muy grande (de 1 a 5 hectáreas)": 30000,
  "Excepcional (más de 5 hectáreas)": 100000,
};

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
  telefono: z.string().regex(/^\+?\d[\d\s\-]{7,}\d$/, "Introduce un teléfono válido (mín. 9 dígitos)").or(z.literal("")),
  comentarios: z.string().max(2000, "Máximo 2000 caracteres").optional(),
  origen: z.string().optional(),
  url_origen: z.string().optional(),
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
  telefono: z.string().regex(/^\+?\d[\d\s\-]{7,}\d$/, "Introduce un teléfono válido (mín. 9 dígitos)").or(z.literal("")),
  comentarios: z.string().max(2000, "Máximo 2000 caracteres").optional(),
  origen: z.string().optional(),
  url_origen: z.string().optional(),
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
  telefono: z.string().regex(/^\+?\d[\d\s\-]{7,}\d$/, "Introduce un teléfono válido (mín. 9 dígitos)").or(z.literal("")),
  comentarios: z.string().max(2000, "Máximo 2000 caracteres").optional(),
  origen: z.string().optional(),
  url_origen: z.string().optional(),
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
  telefono: z.string().regex(/^\+?\d[\d\s\-]{7,}\d$/, "Introduce un teléfono válido (mín. 9 dígitos)").or(z.literal("")),
  comentarios: z.string().max(2000, "Máximo 2000 caracteres").optional(),
  origen: z.string().optional(),
  url_origen: z.string().optional(),
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
  telefono: z.string().regex(/^\+?\d[\d\s\-]{7,}\d$/, "Introduce un teléfono válido (mín. 9 dígitos)").or(z.literal("")),
  comentarios: z.string().max(2000, "Máximo 2000 caracteres").optional(),
  origen: z.string().optional(),
  url_origen: z.string().optional(),
}).refine(
  (d) => d.email !== "" || d.telefono !== "",
  { message: "Necesitamos al menos un email o teléfono", path: ["email"] }
);

// ===== EMBUDO: COMPRA-VENTA DE TERRENOS =====

export const tipoOperacion = [
  "Quiero vender un terreno o finca",
  "Quiero comprar un terreno o finca",
  "Quiero saber cuánto vale mi terreno",
  "Tengo un terreno y no sé qué hacer con él",
  "Quiero vender pero no tengo los papeles en regla",
] as const;

export const tipoTerreno = [
  "Monte con eucalipto o pino",
  "Terreno agrícola / prado",
  "Parcela con edificación o ruina",
  "Solar urbanizable",
  "Monte sin aprovechamiento (matorral)",
  "Mixto / no lo sé",
] as const;

export const situacionDocumental = [
  "Todo en regla (escrituras + Registro + Catastro)",
  "Tengo escrituras pero no está inscrito en el Registro",
  "Solo figura en el Catastro, no hay escrituras",
  "La finca está a nombre de un fallecido",
  "No tengo ningún papel, solo sé que es mío",
  "No lo sé",
] as const;

export const compraVentaSchema = z.object({
  embudo: z.literal("compraventa"),
  tipo_operacion: z.enum(tipoOperacion, { message: "Selecciona qué necesitas" }),
  tipo_terreno: z.enum(tipoTerreno, { message: "Selecciona el tipo de terreno" }),
  situacion_documental: z.enum(situacionDocumental).optional(),
  provincia: z.enum(provincias, { message: "Selecciona la provincia" }),
  municipio: z.string().optional(),
  superficie_aprox: z.enum(rangosSuperficie, { message: "Selecciona la superficie" }),
  tiene_acceso: z.enum(["Sí, por carretera o pista", "Acceso difícil / solo a pie", "No lo sé"] as const).optional(),
  precio_orientativo: z.enum([
    "Menos de 5.000 €",
    "5.000 – 15.000 €",
    "15.000 – 50.000 €",
    "Más de 50.000 €",
    "No tengo ni idea",
  ] as const).optional(),
  urgencia: z.enum(urgencias, { message: "Indica la urgencia" }),
  residencia: z.enum(residencias, { message: "Indica dónde vives" }),
  nombre: z.string().min(2, "Tu nombre es necesario"),
  email: z.string().email("Email no válido").or(z.literal("")),
  telefono: z.string().regex(/^\+?\d[\d\s\-]{7,}\d$/, "Introduce un teléfono válido (mín. 9 dígitos)").or(z.literal("")),
  comentarios: z.string().max(2000, "Máximo 2000 caracteres").optional(),
  origen: z.string().optional(),
  url_origen: z.string().optional(),
}).refine(
  (d) => d.email !== "" || d.telefono !== "",
  { message: "Necesitamos al menos un email o teléfono", path: ["email"] }
);

// ===== EMBUDO: URBANISMO =====

export const consultaUrbanismo = [
  "Quiero saber si puedo construir en mi finca rústica",
  "Quiero poner una casa prefabricada o tiny house",
  "Necesito saber qué tipo de suelo tengo",
  "Quiero cambiar la calificación del suelo",
  "Necesito segregar una finca",
  "Quiero saber qué puedo hacer con mi terreno",
] as const;

export const tipoSueloActual = [
  "Rústico común",
  "Rústico de protección forestal",
  "Rústico de protección agropecuaria",
  "Núcleo rural",
  "Urbano",
  "No lo sé",
] as const;

export const urbanismoSchema = z.object({
  embudo: z.literal("urbanismo"),
  consulta_urbanismo: z.enum(consultaUrbanismo, { message: "Selecciona tu consulta" }),
  tipo_suelo_actual: z.enum(tipoSueloActual, { message: "Selecciona el tipo de suelo" }),
  provincia: z.enum(provincias, { message: "Selecciona la provincia" }),
  municipio: z.string().optional(),
  superficie_aprox: z.enum(rangosSuperficie, { message: "Selecciona la superficie" }),
  urgencia: z.enum(urgencias, { message: "Indica la urgencia" }),
  residencia: z.enum(residencias, { message: "Indica dónde vives" }),
  nombre: z.string().min(2, "Tu nombre es necesario"),
  email: z.string().email("Email no válido").or(z.literal("")),
  telefono: z.string().regex(/^\+?\d[\d\s\-]{7,}\d$/, "Introduce un teléfono válido (mín. 9 dígitos)").or(z.literal("")),
  comentarios: z.string().max(2000, "Máximo 2000 caracteres").optional(),
  origen: z.string().optional(),
  url_origen: z.string().optional(),
}).refine(
  (d) => d.email !== "" || d.telefono !== "",
  { message: "Necesitamos al menos un email o teléfono", path: ["email"] }
);

// ===== EMBUDO: TRÁMITES =====

export const tipoTramite = [
  "Necesito escriturar una finca (no tengo escritura)",
  "Quiero inscribir una finca en el Registro de la Propiedad",
  "Necesito inmatricular una finca (primera inscripción)",
  "Tengo dudas sobre impuestos (plusvalía, ITP, IRPF)",
  "Necesito hacer una declaración de obra nueva",
  "Gastos de notaría y registro para una compraventa",
] as const;

export const tramitesSchema = z.object({
  embudo: z.literal("tramites"),
  tipo_tramite: z.enum(tipoTramite, { message: "Selecciona qué trámite necesitas" }),
  tiene_escrituras: z.enum(["Sí", "No", "Algunas", "No lo sé"] as const).optional(),
  provincia: z.enum(provincias, { message: "Selecciona la provincia" }),
  municipio: z.string().optional(),
  urgencia: z.enum(urgencias, { message: "Indica la urgencia" }),
  residencia: z.enum(residencias, { message: "Indica dónde vives" }),
  nombre: z.string().min(2, "Tu nombre es necesario"),
  email: z.string().email("Email no válido").or(z.literal("")),
  telefono: z.string().regex(/^\+?\d[\d\s\-]{7,}\d$/, "Introduce un teléfono válido (mín. 9 dígitos)").or(z.literal("")),
  comentarios: z.string().max(2000, "Máximo 2000 caracteres").optional(),
  origen: z.string().optional(),
  url_origen: z.string().optional(),
}).refine(
  (d) => d.email !== "" || d.telefono !== "",
  { message: "Necesitamos al menos un email o teléfono", path: ["email"] }
);

// ===== EMBUDO: COLABORADOR (B2B) =====

export const colaboradorSchema = z.object({
  embudo: z.literal("colaborador"),
  nombre: z.string().min(2, "Tu nombre es necesario"),
  empresa: z.string().optional(),
  actividad: z.string().min(1, "Selecciona tu actividad"),
  provincia: z.string().min(1, "Selecciona la provincia"),
  capacidad: z.string().min(1, "Selecciona la capacidad"),
  email: z.string().email("Email no válido"),
  telefono: z.string().regex(/^\+?\d[\d\s\-]{7,}\d$/, "Introduce un teléfono válido (mín. 9 dígitos)"),
  origen: z.string().optional(),
  url_origen: z.string().optional(),
});

// ===== TIPO UNIFICADO =====

export type LimpiezaLead = z.infer<typeof limpiezaSchema>;
export type HerenciasLead = z.infer<typeof herenciasSchema>;
export type LindesLead = z.infer<typeof lindesSchema>;
export type MaderaLead = z.infer<typeof maderaSchema>;
export type ProindivisoLead = z.infer<typeof proindivisoSchema>;
export type CompraVentaLead = z.infer<typeof compraVentaSchema>;
export type UrbanismoLead = z.infer<typeof urbanismoSchema>;
export type TramitesLead = z.infer<typeof tramitesSchema>;
export type ColaboradorLead = z.infer<typeof colaboradorSchema>;

export type LeadFormData =
  | LimpiezaLead
  | HerenciasLead
  | LindesLead
  | MaderaLead
  | ProindivisoLead
  | CompraVentaLead
  | UrbanismoLead
  | TramitesLead
  | ColaboradorLead;

export type EmbudoType = LeadFormData["embudo"];

export const schemaByEmbudo = {
  limpieza: limpiezaSchema,
  herencias: herenciasSchema,
  lindes: lindesSchema,
  madera: maderaSchema,
  proindiviso: proindivisoSchema,
  compraventa: compraVentaSchema,
  urbanismo: urbanismoSchema,
  tramites: tramitesSchema,
  colaborador: colaboradorSchema,
} as const;

export type LeadRecord = LeadFormData & {
  id: string;
  score: number;
  clasificacion: string;
  cliente_b2b_target: string;
  created_at: string;
};
