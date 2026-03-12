import { z } from "zod";

/**
 * Esquema de validación para los leads del formulario.
 * Se usa tanto en el frontend (LeadForm) como en el backend (API /api/leads).
 */

export const tiposProblema = [
  "herencia",
  "madera",
  "limpieza",
  "lindes",
  "proindiviso",
  "compra-venta",
  "otro",
] as const;

export const provincias = [
  "A Coruña",
  "Lugo",
  "Ourense",
  "Pontevedra",
  "No lo sé / otra",
] as const;

export const rangosSuperficie = [
  "Menos de 1 hectárea",
  "1-5 hectáreas",
  "5-20 hectáreas",
  "20-100 hectáreas",
  "Más de 100 hectáreas",
  "No lo sé",
] as const;

export const tiposUso = [
  "Pinos",
  "Eucaliptos",
  "Mixto (pinos y eucaliptos)",
  "Prado / pastizal",
  "Matorral / monte bajo",
  "Otro / no lo sé",
] as const;

export const rangoEdadMadera = [
  "Menos de 10 años",
  "10-20 años",
  "20-30 años",
  "Más de 30 años",
  "No lo sé",
] as const;

export const residencias = [
  "Galicia",
  "Resto de España",
  "Extranjero",
] as const;

export const leadSchema = z.object({
  tipo_problema: z.enum(tiposProblema, {
    message: "Selecciona el tipo de problema",
  }),
  provincia: z.enum(provincias, {
    message: "Selecciona una provincia",
  }),
  superficie_aprox: z.enum(rangosSuperficie, {
    message: "Selecciona la superficie aproximada",
  }),
  tipo_uso: z.enum(tiposUso).optional(),
  edad_madera_aprox: z.enum(rangoEdadMadera).optional(),
  residencia: z.enum(residencias, {
    message: "Indica dónde vives",
  }),
  nombre: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Introduce un email válido").or(z.literal("")),
  telefono: z.string().min(6, "Introduce un teléfono válido").or(z.literal("")),
  comentarios: z.string().optional(),
  origen: z.string().optional(),
}).refine(
  (data) => data.email !== "" || data.telefono !== "",
  {
    message: "Necesitamos al menos un email o un teléfono para contactarte",
    path: ["email"],
  }
);

export type LeadFormData = z.infer<typeof leadSchema>;

export type LeadRecord = LeadFormData & {
  id: string;
  score: number;
  created_at: string;
};
