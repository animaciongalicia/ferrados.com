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
 *   MAKE_WEBHOOK_SUBSCRIBE=https://hook.eu1.make.com/XXXXXXXX  (suscriptores La Gaceta)
 */

export type EmbudoWebhook =
  | "herencias"
  | "madera"
  | "limpieza"
  | "lindes"
  | "proindiviso"
  | "compraventa"
  | "urbanismo"
  | "tramites"
  | "colaborador";

/**
 * Aviso (único por embudo y proceso) cuando se intenta enviar un lead a Make
 * pero la variable de entorno del webhook no está configurada.
 * Evita spamear en cada request: cada embudo se loguea solo una vez.
 */
const warnedEmbudos = new Set<string>();
function warnMissingWebhook(embudo: string, envVar: string): void {
  if (warnedEmbudos.has(embudo)) return;
  warnedEmbudos.add(embudo);
  console.warn(
    `[make-webhooks] ${envVar} no está configurada. ` +
      `Los leads del embudo "${embudo}" no se enviarán a Make ` +
      `(se sigue intentando el webhook genérico MAKE_WEBHOOK_URL si existe).`
  );
}

/** Mapeo embudo → nombre de la variable de entorno que debe contener la URL. */
const embudoEnvVar: Record<string, string> = {
  herencias: "MAKE_WEBHOOK_HERENCIAS",
  madera: "MAKE_WEBHOOK_MADERA",
  limpieza: "MAKE_WEBHOOK_DESBROCE",
  lindes: "MAKE_WEBHOOK_CATASTRO",
  proindiviso: "MAKE_WEBHOOK_PROINDIVISO",
  compraventa: "MAKE_WEBHOOK_SUELOS",
  urbanismo: "MAKE_WEBHOOK_URBANISMO",
  tramites: "MAKE_WEBHOOK_TRAMITES",
  colaborador: "MAKE_WEBHOOK_COLABORADOR",
};

/**
 * Devuelve la URL del webhook de Make para un embudo concreto.
 * Devuelve undefined si no está configurada (no rompe nada, solo avisa por consola).
 */
export function getMakeWebhookUrl(embudo: string): string | undefined {
  const envVar = embudoEnvVar[embudo];
  if (!envVar) return undefined;
  const url = process.env[envVar];
  if (!url) {
    warnMissingWebhook(embudo, envVar);
    return undefined;
  }
  return url;
}
