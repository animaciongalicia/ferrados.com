import type { LeadFormData } from "./lead-schema";

/**
 * Función de scoring para clasificar leads.
 *
 * EDITABLE: Modifica los pesos y la lógica según tus necesidades.
 * El score resultante es un número (mayor = lead más interesante).
 *
 * Factores actuales (ejemplo):
 *  - Superficie grande → más puntos
 *  - Madera madura → más puntos
 *  - Residencia fuera de Galicia → más puntos (más necesitan ayuda remota)
 *  - Tipo de problema específico → puntos variables
 */
export function calcularScoreLead(data: LeadFormData): number {
  let score = 0;

  // --- Superficie ---
  const superficieScores: Record<string, number> = {
    "Menos de 1 hectárea": 5,
    "1-5 hectáreas": 15,
    "5-20 hectáreas": 25,
    "20-100 hectáreas": 40,
    "Más de 100 hectáreas": 50,
    "No lo sé": 10,
  };
  score += superficieScores[data.superficie_aprox] ?? 0;

  // --- Edad de la madera ---
  if (data.edad_madera_aprox) {
    const edadScores: Record<string, number> = {
      "Menos de 10 años": 5,
      "10-20 años": 10,
      "20-30 años": 20,
      "Más de 30 años": 30,
      "No lo sé": 8,
    };
    score += edadScores[data.edad_madera_aprox] ?? 0;
  }

  // --- Residencia ---
  const residenciaScores: Record<string, number> = {
    "Galicia": 5,
    "Resto de España": 15,
    "Extranjero": 20,
  };
  score += residenciaScores[data.residencia] ?? 0;

  // --- Tipo de problema ---
  const problemaScores: Record<string, number> = {
    "herencia": 15,
    "madera": 20,
    "limpieza": 10,
    "lindes": 10,
    "proindiviso": 15,
    "compra-venta": 20,
    "otro": 5,
  };
  score += problemaScores[data.tipo_problema] ?? 0;

  // --- Datos de contacto completos (bonus) ---
  if (data.email && data.telefono) {
    score += 10;
  }

  return score;
}
