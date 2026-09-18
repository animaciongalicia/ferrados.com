import { getAllPosts, getPostBySlug } from "@/lib/blog";

/**
 * /llms-full.txt — contenido COMPLETO de todos los artículos en Markdown
 * plano, pensado para que un LLM pueda ingerir el corpus entero sin tener
 * que rastrear la web.
 *
 * Se sirve como text/plain. La versión resumida (índice) está en /llms.txt.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const posts = getAllPosts();
  const parts: string[] = [];

  parts.push("# Ferrados.com — Corpus completo\n");
  parts.push(
    "> Contenido completo del blog La Gaceta de Ferrados.com en Markdown. Ayuda práctica para propietarios de montes, fincas y terrenos rústicos en Galicia.\n"
  );
  parts.push(
    `Sitio: https://ferrados.com  |  Idioma: es-ES  |  Artículos: ${posts.length}  |  Aviso: contenido informativo, no constituye asesoramiento jurídico ni fiscal.\n`
  );
  parts.push("---\n");

  for (const meta of posts) {
    const full = getPostBySlug(meta.slug);
    if (!full) continue;
    const url = `https://ferrados.com/blog/${meta.slug}`;
    parts.push(`\n\n# ${meta.title}\n`);
    parts.push(`Fuente: ${url}`);
    parts.push(`Publicado: ${meta.date}`);
    if (meta.lastUpdated) parts.push(`Actualizado: ${meta.lastUpdated}`);
    if (meta.pilar) parts.push(`Categoría: ${meta.pilar}`);
    if (meta.tags && meta.tags.length > 0)
      parts.push(`Etiquetas: ${meta.tags.join(", ")}`);
    parts.push("");
    parts.push(full.content.trim());
    parts.push("\n---");
  }

  return new Response(parts.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
