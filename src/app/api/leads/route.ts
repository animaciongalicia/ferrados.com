import { NextRequest, NextResponse } from "next/server";
import { schemaByEmbudo, type EmbudoType } from "@/lib/lead-schema";
import { calcularScoreLead } from "@/lib/lead-scoring";

/**
 * POST /api/leads
 *
 * Recibe los datos de cualquiera de los 5 formularios especializados,
 * valida con el schema correspondiente, calcula el scoring y guarda.
 *
 * PRÓXIMOS PASOS (conectar persistencia):
 *
 * 1. GOOGLE SHEETS:
 *    - Crear un Google Sheet con columnas para todos los campos
 *    - Configurar una Google Service Account con acceso al sheet
 *    - Instalar: npm install googleapis
 *    - Añadir a .env.local:
 *        GOOGLE_SHEETS_ID=tu_sheet_id
 *        GOOGLE_SERVICE_ACCOUNT_EMAIL=...
 *        GOOGLE_PRIVATE_KEY=...
 *    - Descomentar el bloque de Google Sheets abajo
 *
 * 2. SUPABASE:
 *    - npm install @supabase/supabase-js
 *    - Crear tabla "leads" en Supabase con columnas tipo JSONB para los datos
 *    - Añadir SUPABASE_URL y SUPABASE_ANON_KEY a .env.local
 *    - Descomentar el bloque de Supabase abajo
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

    const lead = {
      id: crypto.randomUUID(),
      ...data,
      score,
      clasificacion,
      cliente_b2b_target,
      created_at: new Date().toISOString(),
    };

    // --- SIMULACIÓN DE GUARDADO ---
    console.log("📋 Nuevo lead recibido:", JSON.stringify(lead, null, 2));

    // --- GOOGLE SHEETS (descomentar cuando esté listo) ---
    // import { google } from "googleapis";
    //
    // const auth = new google.auth.GoogleAuth({
    //   credentials: {
    //     client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    //     private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    //   },
    //   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    // });
    //
    // const sheets = google.sheets({ version: "v4", auth });
    // await sheets.spreadsheets.values.append({
    //   spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    //   range: "Leads!A:Z",
    //   valueInputOption: "USER_ENTERED",
    //   requestBody: {
    //     values: [[
    //       lead.id,
    //       lead.embudo,
    //       lead.created_at,
    //       lead.score,
    //       lead.clasificacion,
    //       lead.cliente_b2b_target,
    //       lead.nombre,
    //       lead.email,
    //       lead.telefono,
    //       lead.residencia,
    //       lead.provincia,
    //       lead.origen,
    //       JSON.stringify(lead), // Todos los datos como JSON
    //     ]],
    //   },
    // });

    // --- SUPABASE (descomentar cuando esté listo) ---
    // import { createClient } from "@supabase/supabase-js";
    // const supabase = createClient(
    //   process.env.SUPABASE_URL!,
    //   process.env.SUPABASE_ANON_KEY!
    // );
    // const { error: dbError } = await supabase.from("leads").insert(lead);
    // if (dbError) {
    //   console.error("Error Supabase:", dbError);
    //   return NextResponse.json({ error: "Error interno" }, { status: 500 });
    // }

    return NextResponse.json({
      ok: true,
      id: lead.id,
      score: lead.score,
      clasificacion: lead.clasificacion,
    });
  } catch {
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
