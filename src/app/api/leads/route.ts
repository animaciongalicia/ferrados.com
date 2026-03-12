import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { calcularScoreLead } from "@/lib/lead-scoring";

/**
 * POST /api/leads
 *
 * Recibe los datos del formulario, los valida y guarda el lead.
 *
 * PRÓXIMOS PASOS (conectar persistencia):
 *
 * 1. SUPABASE:
 *    - npm install @supabase/supabase-js
 *    - Crear tabla "leads" en Supabase con las columnas del LeadRecord
 *    - Añadir SUPABASE_URL y SUPABASE_ANON_KEY a .env.local
 *    - Descomentar el bloque de Supabase abajo
 *
 * 2. GOOGLE SHEETS:
 *    - Crear un Google Sheet con las columnas
 *    - Usar Google Sheets API o un servicio como Sheety/Make
 *    - Añadir las credenciales a .env.local
 *    - Descomentar el bloque de Google Sheets abajo
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validación backend con Zod
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const score = calcularScoreLead(data);

    const lead = {
      id: crypto.randomUUID(),
      ...data,
      score,
      created_at: new Date().toISOString(),
    };

    // --- SIMULACIÓN DE GUARDADO ---
    // En producción, reemplazar este console.log por uno de los bloques de abajo.
    console.log("📋 Nuevo lead recibido:", JSON.stringify(lead, null, 2));

    // --- SUPABASE (descomentar cuando esté listo) ---
    // import { createClient } from "@supabase/supabase-js";
    // const supabase = createClient(
    //   process.env.SUPABASE_URL!,
    //   process.env.SUPABASE_ANON_KEY!
    // );
    // const { error: dbError } = await supabase.from("leads").insert(lead);
    // if (dbError) {
    //   console.error("Error guardando en Supabase:", dbError);
    //   return NextResponse.json({ error: "Error interno" }, { status: 500 });
    // }

    // --- GOOGLE SHEETS (descomentar cuando esté listo) ---
    // const sheetRes = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL!, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(lead),
    // });
    // if (!sheetRes.ok) {
    //   console.error("Error enviando a Google Sheets");
    //   return NextResponse.json({ error: "Error interno" }, { status: 500 });
    // }

    return NextResponse.json({ ok: true, id: lead.id, score: lead.score });
  } catch {
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
