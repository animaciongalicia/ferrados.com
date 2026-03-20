import { NextRequest, NextResponse } from "next/server";
import { schemaByEmbudo, superficieM2, type EmbudoType } from "@/lib/lead-schema";
import { calcularScoreLead } from "@/lib/lead-scoring";
import { rateLimit } from "@/lib/rate-limit";
import { getMakeWebhookUrl } from "@/lib/make-webhooks";
import { notifyTelegramLead } from "@/lib/telegram";

/** Limpia caracteres HTML peligrosos de campos de texto libre */
function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/** Sanitiza todos los campos string de un objeto (solo texto libre, no enums) */
function sanitizeLead(data: Record<string, unknown>, freeTextFields: string[]): Record<string, unknown> {
  const result = { ...data };
  for (const field of freeTextFields) {
    if (typeof result[field] === "string" && result[field]) {
      result[field] = sanitizeHtml(result[field] as string);
    }
  }
  return result;
}

/** Fetch con timeout de 5s y 1 reintento */
async function fetchWithRetry(url: string, options: RequestInit): Promise<Response> {
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      return res;
    } catch (err) {
      if (attempt === 1) throw err;
      // primer intento falló, reintentar
    } finally {
      clearTimeout(timeout);
    }
  }
  throw new Error("fetchWithRetry: unreachable");
}

/**
 * POST /api/leads
 *
 * Recibe los datos de cualquiera de los 5 formularios especializados,
 * valida con el schema correspondiente, calcula el scoring y guarda.
 *
 * INTEGRACIÓN CON MAKE (Integromat):
 *   1. Crea un escenario en Make con un módulo "Webhook" → "Custom Webhook"
 *   2. Copia la URL del webhook que te da Make
 *   3. Añádela a .env.local:  MAKE_WEBHOOK_URL=https://hook.eu1.make.com/...
 *   4. El lead se enviará automáticamente a Make, donde puedes conectarlo
 *      a Google Sheets, email, CRM, Slack, etc.
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per minute per IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const { allowed, remaining } = rateLimit(ip, { maxRequests: 5, windowMs: 60_000 });

    if (!allowed) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Inténtalo de nuevo en un minuto." },
        {
          status: 429,
          headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" },
        }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "El cuerpo de la solicitud no es JSON válido" },
        { status: 400 }
      );
    }

    // Determinar qué schema usar según el embudo
    const embudo = body.embudo as EmbudoType;
    const schema = schemaByEmbudo[embudo];

    if (!schema) {
      return NextResponse.json(
        { error: "Tipo de formulario no válido" },
        { status: 400 }
      );
    }

    // Validación backend con el schema específico del embudo
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Sanitizar campos de texto libre (no enums) contra inyección HTML
    const freeTextFields = ["nombre", "comentarios", "municipio", "empresa", "pais_residencia"];
    const sanitizedData = sanitizeLead(data as Record<string, unknown>, freeTextFields);

    const { score, clasificacion, cliente_b2b_target } = calcularScoreLead(data);

    // Calcular superficie en m² si el campo existe
    const superficieTexto = "superficie_aprox" in data ? (data as Record<string, string>).superficie_aprox : undefined;
    const superficieM2Valor = superficieTexto
      ? superficieM2[superficieTexto as keyof typeof superficieM2] ?? null
      : null;

    const lead = {
      id: crypto.randomUUID(),
      ...sanitizedData,
      ...(superficieM2Valor !== null && { superficie_m2: superficieM2Valor }),
      score,
      clasificacion,
      cliente_b2b_target,
      created_at: new Date().toISOString(),
    };

    // --- GOOGLE SHEETS DIRECTO (sin Make) ---
    // Si tienes un Google Apps Script desplegado como webapp que recibe POST
    // y escribe en una hoja de cálculo, pon su URL aquí.
    // Instrucciones: Crea un Apps Script con doPost(e), parsea el JSON y
    // escribe una fila. Despliega como webapp → copia la URL → pégala en .env.local
    //   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsWebhookUrl) {
      try {
        await fetchWithRetry(sheetsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (sheetsError) {
        console.error("Error enviando a Google Sheets:", sheetsError);
      }
    }

    // --- MAKE WEBHOOKS (uno por embudo) ---
    // Cada embudo tiene su propio webhook en Make para ruteo independiente.
    // Si no hay webhook específico, intenta el genérico legacy como fallback.
    const makeWebhookUrl = getMakeWebhookUrl(embudo) ?? process.env.MAKE_WEBHOOK_URL;
    if (makeWebhookUrl) {
      try {
        await fetchWithRetry(makeWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (webhookError) {
        console.error(`Error enviando a Make (${embudo}):`, webhookError);
      }
    }

    // --- TELEGRAM ---
    // Notificación instantánea al móvil cuando entra un lead
    notifyTelegramLead({
      id: lead.id,
      embudo,
      nombre: typeof sanitizedData.nombre === "string" ? sanitizedData.nombre : undefined,
      telefono: typeof sanitizedData.telefono === "string" ? sanitizedData.telefono : undefined,
      municipio: typeof sanitizedData.municipio === "string" ? sanitizedData.municipio : undefined,
      score: lead.score,
      clasificacion: lead.clasificacion,
    });

    return NextResponse.json(
      {
        ok: true,
        id: lead.id,
        score: lead.score,
        clasificacion: lead.clasificacion,
      },
      {
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
