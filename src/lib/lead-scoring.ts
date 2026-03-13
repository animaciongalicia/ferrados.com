import type { LeadFormData } from "./lead-schema";

/**
 * SCORING DE LEADS — Ferrados.com
 *
 * Este scoring determina la calidad del lead para el cliente B2B.
 * No es un número inventado: cada factor refleja lo que el profesional
 * (empresa de desbroce, abogado, topógrafo, maderista, inversor) realmente
 * valora a la hora de pagar por un lead.
 *
 * ESCALA: 0-100
 *   0-25:  Lead frío (solo informándose, sin datos útiles)
 *   26-50: Lead templado (tiene un problema real pero falta info o urgencia)
 *   51-75: Lead caliente (problema claro, datos suficientes, urgencia media-alta)
 *   76-100: Lead premium (urgencia alta, datos completos, alto valor económico)
 *
 * EDITABLE: Ajusta los pesos según feedback real de tus clientes B2B.
 */

// ===== FACTORES COMUNES =====

function scoreUrgencia(urgencia: string): number {
  // Un lead urgente vale mucho más: el cliente está dispuesto a pagar ya
  const scores: Record<string, number> = {
    "Urgente (tengo un plazo o una multa)": 25,
    "En los próximos meses": 15,
    "Sin prisa, quiero informarme": 5,
  };
  return scores[urgencia] ?? 0;
}

function scoreResidencia(residencia: string): number {
  // Quien vive fuera necesita MÁS ayuda y paga más por el servicio
  // Especialmente desde el extranjero (herencias internacionales, gestión remota)
  const scores: Record<string, number> = {
    "Vivo en Galicia": 5,
    "Vivo en el resto de España": 12,
    "Vivo en el extranjero (Europa)": 18,
    "Vivo en Latinoamérica": 20,
    "Vivo en otro país": 18,
  };
  return scores[residencia] ?? 0;
}

function scoreSuperficie(superficie: string): number {
  // Mayor superficie = mayor factura para el profesional
  // Rangos adaptados al minifundio gallego (ferrados)
  const scores: Record<string, number> = {
    "Muy pequeña (menos de 1 ferrado, < 500 m²)": 3,
    "Pequeña (de 1 a 5 ferrados, aprox. 500 – 2.500 m²)": 6,
    "Mediana (de 5 a 10 ferrados, aprox. 2.500 – 5.000 m²)": 10,
    "Grande (de 10 a 20 ferrados, aprox. 5.000 – 10.000 m² ≈ hasta 1 ha)": 15,
    "Muy grande (de 1 a 5 hectáreas)": 20,
    "Excepcional (más de 5 hectáreas)": 25,
  };
  return scores[superficie] ?? 0;
}

function scoreContactoCompleto(email: string | undefined, telefono: string | undefined): number {
  // Un lead con teléfono vale mucho más (contacto directo e inmediato)
  if (telefono && email) return 10;
  if (telefono) return 8;
  if (email) return 4;
  return 0;
}

// ===== SCORING POR EMBUDO =====

function scoreLimpieza(data: Extract<LeadFormData, { embudo: "limpieza" }>): number {
  let score = 0;

  // Estado de notificación: ya multado o con carta = lead premium
  const notifScores: Record<string, number> = {
    "Ya me han multado": 25,
    "He recibido carta/notificación de la Xunta": 22,
    "Quiero limpiar antes de que me multen": 15,
    "Me han dicho que tengo que limpiar pero no tengo carta": 10,
    "Solo quiero informarme": 3,
  };
  score += notifScores[data.estado_notificacion] ?? 0;

  // Cerca de población = obligación legal más clara, trabajo más seguro para la empresa
  const cercaniaScores: Record<string, number> = {
    "Sí, a menos de 50 metros de casas": 10,
    "Sí, a menos de 100 metros": 8,
    "No, está alejado de viviendas": 3,
    "No lo sé": 5,
  };
  score += cercaniaScores[data.cerca_poblacion] ?? 0;

  score += scoreSuperficie(data.superficie_aprox);
  score += scoreUrgencia(data.urgencia);
  score += scoreResidencia(data.residencia);
  score += scoreContactoCompleto(data.email, data.telefono);

  return Math.min(score, 100);
}

function scoreHerencias(data: Extract<LeadFormData, { embudo: "herencias" }>): number {
  let score = 0;

  // Situación: herencias internacionales y herencias encadenadas = más valor
  const sitScores: Record<string, number> = {
    "Herencia desde el extranjero, no sé cómo gestionar": 22,
    "La herencia lleva años sin hacer (padres, abuelos...)": 20,
    "No hay testamento": 18,
    "Ha fallecido un familiar y no sé qué hacer con las fincas": 15,
    "Ya sé que heredé pero no he hecho los papeles": 12,
    "Hay testamento pero no sé si incluye las fincas": 10,
  };
  score += sitScores[data.situacion_herencia] ?? 0;

  // Más fincas = mayor factura para el abogado
  const fincasScores: Record<string, number> = {
    "1 finca o parcela": 3,
    "2-5 fincas": 8,
    "Más de 5 fincas": 15,
    "No sé cuántas hay": 10,
  };
  score += fincasScores[data.num_fincas ?? ""] ?? 0;

  // Más herederos = proceso más complejo = más honorarios
  const herederosScores: Record<string, number> = {
    "Solo yo": 3,
    "2-3 herederos": 6,
    "4-10 herederos": 10,
    "Más de 10 o no lo sé": 12,
  };
  score += herederosScores[data.num_herederos ?? ""] ?? 0;

  // Sin escrituras = más trabajo = más valor
  const escriturasScores: Record<string, number> = {
    "Sí": 2,
    "No": 8,
    "Algunas": 5,
    "No lo sé": 6,
  };
  score += escriturasScores[data.tiene_escrituras ?? ""] ?? 0;

  score += scoreUrgencia(data.urgencia);
  score += scoreResidencia(data.residencia);
  score += scoreContactoCompleto(data.email, data.telefono);

  return Math.min(score, 100);
}

function scoreLindes(data: Extract<LeadFormData, { embudo: "lindes" }>): number {
  let score = 0;

  // Conflicto de lindes o necesidad de venta = más urgencia real
  const probScores: Record<string, number> = {
    "Conflicto con un vecino por los lindes": 20,
    "Necesito georreferenciar para vender o heredar": 18,
    "La superficie del Catastro no coincide con la real": 15,
    "Mi finca no aparece en el Catastro": 15,
    "Quiero medir para saber cuánta madera tengo": 12,
    "No sé dónde están los límites de mi finca": 10,
  };
  score += probScores[data.problema_lindes] ?? 0;

  // Motivo: vender o heredar = pagará seguro por el servicio
  const motivoScores: Record<string, number> = {
    "Para vender la finca": 12,
    "Para heredar / escriturar": 10,
    "Para resolver un conflicto de lindes": 10,
    "Para aprovechar la madera": 8,
    "Para saber qué tengo exactamente": 4,
  };
  score += motivoScores[data.motivo_medicion ?? ""] ?? 0;

  score += scoreSuperficie(data.superficie_aprox);
  score += scoreUrgencia(data.urgencia);
  score += scoreResidencia(data.residencia);
  score += scoreContactoCompleto(data.email, data.telefono);

  return Math.min(score, 100);
}

function scoreMadera(data: Extract<LeadFormData, { embudo: "madera" }>): number {
  let score = 0;

  // Especie: eucalipto globulus es la más demandada por la industria
  const especieScores: Record<string, number> = {
    "Eucalipto (Eucalyptus globulus)": 18,
    "Eucalipto nitens": 12,
    "Pino del país (Pinus pinaster)": 14,
    "Pino insigne (Pinus radiata)": 10,
    "Mezcla de varias especies": 10,
    "No estoy seguro de la especie": 6,
  };
  score += especieScores[data.especie_arbol] ?? 0;

  // Edad: madera madura = listo para cortar = dinero inmediato
  const edadScores: Record<string, number> = {
    "Menos de 10 años": 2,
    "10 - 15 años": 8,
    "15 - 20 años": 15,
    "20 - 30 años": 20,
    "Más de 30 años": 18, // Puede estar pasada de turno, menos valor
    "No lo sé": 8,
  };
  score += edadScores[data.edad_plantacion] ?? 0;

  // Acceso para camión: sin acceso el maderista ni se plantea comprar
  const accesoScores: Record<string, number> = {
    "Sí, llega un camión": 8,
    "No, no hay acceso": -5,
    "No lo sé": 2,
  };
  score += accesoScores[data.tiene_acceso_camion ?? ""] ?? 0;

  score += scoreSuperficie(data.superficie_aprox);
  score += scoreUrgencia(data.urgencia);
  score += scoreResidencia(data.residencia);
  score += scoreContactoCompleto(data.email, data.telefono);

  return Math.max(0, Math.min(score, 100));
}

function scoreProindiviso(data: Extract<LeadFormData, { embudo: "proindiviso" }>): number {
  let score = 0;

  // Situación: madera por cortar o compra de partes = más valor económico
  const sitScores: Record<string, number> = {
    "Tenemos madera que cortar pero no hay acuerdo": 20,
    "Un copropietario quiere comprar las partes de los demás": 18,
    "Quiero vender mi parte pero los demás no quieren": 15,
    "Queremos vender todos pero no nos ponemos de acuerdo en el precio": 15,
    "Necesito disolver el proindiviso legalmente": 12,
    "No sé quiénes son todos los copropietarios": 10,
  };
  score += sitScores[data.situacion_proindiviso] ?? 0;

  // Tipo de terreno: con madera aprovechable = interés de maderistas/inversores
  const terrenoScores: Record<string, number> = {
    "Monte con madera aprovechable": 15,
    "Terreno agrícola / prado": 8,
    "Mixto": 10,
    "Monte sin madera (matorral)": 3,
    "No lo sé": 5,
  };
  score += terrenoScores[data.tipo_terreno ?? ""] ?? 0;

  score += scoreSuperficie(data.superficie_aprox);
  score += scoreUrgencia(data.urgencia);
  score += scoreResidencia(data.residencia);
  score += scoreContactoCompleto(data.email, data.telefono);

  return Math.min(score, 100);
}

// ===== FUNCIÓN PRINCIPAL =====

export function calcularScoreLead(data: LeadFormData): {
  score: number;
  clasificacion: string;
  cliente_b2b_target: string;
} {
  let score = 0;

  switch (data.embudo) {
    case "limpieza":
      score = scoreLimpieza(data);
      break;
    case "herencias":
      score = scoreHerencias(data);
      break;
    case "lindes":
      score = scoreLindes(data);
      break;
    case "madera":
      score = scoreMadera(data);
      break;
    case "proindiviso":
      score = scoreProindiviso(data);
      break;
  }

  // Clasificación legible
  let clasificacion: string;
  if (score >= 76) clasificacion = "premium";
  else if (score >= 51) clasificacion = "caliente";
  else if (score >= 26) clasificacion = "templado";
  else clasificacion = "frio";

  // Cliente B2B target
  const clienteB2B: Record<string, string> = {
    limpieza: "Empresas de desbroce forestal",
    herencias: "Abogados especialistas en sucesiones",
    lindes: "Ingenieros técnicos y topógrafos",
    madera: "Aserraderos y compradores de madera",
    proindiviso: "Inversores forestales / maderistas",
  };

  return {
    score,
    clasificacion,
    cliente_b2b_target: clienteB2B[data.embudo],
  };
}
