/**
 * Configuración de webhooks de Make.com (Integromat)
 *
 * Un webhook por cada página reina / embudo.
 * Las URLs se leen de variables de entorno para no exponer secretos en el código.
 *
 * Para configurar:
 * 1. Crea 6 escenarios en Make, cada uno con un módulo "Webhook → Custom Webhook"
 * 2. Copia cada URL y pégala en .env.local con la clave correspondiente
 *
 * Ejemplo de .env.local:
 *   MAKE_WEBHOOK_HERENCIAS=https://hook.eu1.make.com/XXXXXXXX
 *   MAKE_WEBHOOK_MADERA=https://hook.eu1.make.com/XXXXXXXX
 *   MAKE_WEBHOOK_DESBROCE=https://hook.eu1.make.com/XXXXXXXX
 *   MAKE_WEBHOOK_CATASTRO=https://hook.eu1.make.com/XXXXXXXX
 *   MAKE_WEBHOOK_PROINDIVISO=https://hook.eu1.make.com/XXXXXXXX
 *   MAKE_WEBHOOK_SUELOS=https://hook.eu1.make.com/XXXXXXXX
 */

export type EmbudoWebhook =
  | "herencias"
  | "madera"
  | "limpieza"
  | "lindes"
  | "proindiviso"
  | "compraventa"
  | "colaborador";

/**
 * Devuelve la URL del webhook de Make para un embudo concreto.
 * Devuelve undefined si no está configurada (no rompe nada).
 */
export function getMakeWebhookUrl(embudo: string): string | undefined {
  const map: Record<string, string | undefined> = {
    herencias: process.env.MAKE_WEBHOOK_HERENCIAS,
    madera: process.env.MAKE_WEBHOOK_MADERA,
    limpieza: process.env.MAKE_WEBHOOK_DESBROCE,
    lindes: process.env.MAKE_WEBHOOK_CATASTRO,
    proindiviso: process.env.MAKE_WEBHOOK_PROINDIVISO,
    compraventa: process.env.MAKE_WEBHOOK_SUELOS,
    colaborador: process.env.MAKE_WEBHOOK_COLABORADOR,
  };
  return map[embudo];
}
