import { NextRequest, NextResponse } from "next/server";
import { schemaByEmbudo, superficieM2, type EmbudoType } from "@/lib/lead-schema";
import { calcularScoreLead } from "@/lib/lead-scoring";
import { rateLimit } from "@/lib/rate-limit";
import { getMakeWebhookUrl } from "@/lib/make-webhooks";

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
    const { score, clasificacion, cliente_b2b_target } = calcularScoreLead(data);

    // Calcular superficie en m² si el campo existe
    const superficieTexto = "superficie_aprox" in data ? (data as Record<string, string>).superficie_aprox : undefined;
    const superficieM2Valor = superficieTexto
      ? superficieM2[superficieTexto as keyof typeof superficieM2] ?? null
      : null;

    const lead = {
      id: crypto.randomUUID(),
      ...data,
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
        await fetch(sheetsWebhookUrl, {
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
        await fetch(makeWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (webhookError) {
        console.error(`Error enviando a Make (${embudo}):`, webhookError);
      }
    }

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
