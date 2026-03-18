import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const subscribeSchema = z.object({
  email: z.string().email("Email no válido"),
  origen: z.string().optional(),
  url_origen: z.string().optional(),
});

/**
 * POST /api/subscribe
 *
 * Captura email para el resumen semanal de La Gaceta.
 * Envía a Make webhook → Google Sheets "Suscriptores".
 *
 * Configura en .env.local:
 *   MAKE_WEBHOOK_SUBSCRIBE=https://hook.eu1.make.com/XXXXXXXX
 */
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const { allowed } = rateLimit(ip, { maxRequests: 3, windowMs: 60_000 });

    if (!allowed) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Email no válido" },
        { status: 400 }
      );
    }

    const data = {
      ...parsed.data,
      tipo: "suscriptor_gaceta",
      created_at: new Date().toISOString(),
    };

    // Send to Make webhook for Google Sheets
    const webhookUrl = process.env.MAKE_WEBHOOK_SUBSCRIBE;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (webhookError) {
        console.error("Error enviando suscripción a Make:", webhookError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
