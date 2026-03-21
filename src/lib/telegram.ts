/**
 * Notificación a Telegram cuando entra un lead.
 *
 * Variables de entorno necesarias:
 *   TELEGRAM_BOT_TOKEN  - Token del bot (obtenido de @BotFather)
 *   TELEGRAM_CHAT_ID    - Chat ID donde enviar los mensajes
 */

const TELEGRAM_API = "https://api.telegram.org";

interface LeadNotification {
  id: string;
  embudo: string;
  nombre?: string;
  telefono?: string;
  email?: string;
  municipio?: string;
  provincia?: string;
  urgencia?: string;
  score: number;
  clasificacion: string;
}

/**
 * Envía un mensaje a Telegram con los datos del lead.
 * No lanza errores — solo loguea si falla (para no bloquear la respuesta al usuario).
 */
export async function notifyTelegramLead(lead: LeadNotification): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const emoji =
    lead.clasificacion === "premium" ? "💎" :
    lead.clasificacion === "hot" ? "🔥" :
    lead.clasificacion === "warm" ? "🟡" : "🔵";

  const lines = [
    `${emoji} <b>Nuevo lead en Ferrados.com</b>`,
    ``,
    `<b>Embudo:</b> ${lead.embudo}`,
    `<b>Score:</b> ${lead.score}/100 (${lead.clasificacion})`,
  ];

  if (lead.nombre) lines.push(`<b>Nombre:</b> ${lead.nombre}`);
  if (lead.telefono) lines.push(`<b>Teléfono:</b> ${lead.telefono}`);
  if (lead.email) lines.push(`<b>Email:</b> ${lead.email}`);
  if (lead.provincia) lines.push(`<b>Provincia:</b> ${lead.provincia}`);
  if (lead.municipio) lines.push(`<b>Municipio:</b> ${lead.municipio}`);
  if (lead.urgencia) lines.push(`<b>Urgencia:</b> ${lead.urgencia}`);

  lines.push(``, `<code>${lead.id}</code>`);

  const text = lines.join("\n");

  try {
    await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });
  } catch (err) {
    console.error("Error enviando notificación a Telegram:", err);
  }
}
