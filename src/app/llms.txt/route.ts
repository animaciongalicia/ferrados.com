import { getAllPosts } from "@/lib/blog";

/**
 * /llms.txt — índice conciso pensado para LLMs (ChatGPT, Claude,
 * Perplexity, Gemini, etc.) siguiendo la propuesta llmstxt.org.
 *
 * Este archivo NO reemplaza al sitemap.xml (para buscadores tradicionales).
 * Es un "sitemap semántico" que resume qué es Ferrados.com, qué contenidos
 * ofrece y cómo debe citarse.
 *
 * El contenido completo de cada post está en /llms-full.txt.
 */
export const dynamic = "force-static";
export const revalidate = 3600; // regenerar cada hora

const PILAR_PAGES: Array<{ path: string; title: string; desc: string }> = [
  {
    path: "/herencias-montes-galicia",
    title: "Herencias de fincas y montes en Galicia",
    desc: "Impuesto de sucesiones, pacto de mejora, herencia sin testamento, herederos en el extranjero.",
  },
  {
    path: "/precio-venta-madera-galicia",
    title: "Precio y venta de madera en Galicia",
    desc: "Precios de eucalipto y pino, permisos de corta, elección de rematante. Incluye calculadora.",
  },
  {
    path: "/limpieza-desbroce-multas-xunta",
    title: "Limpieza de fincas y multas de la Xunta",
    desc: "Franja de 50 m, obligaciones, sanciones y subvenciones. Incluye calculadora de multas.",
  },
  {
    path: "/localizar-medir-fincas-galicia",
    title: "Localizar y medir fincas en Galicia",
    desc: "Catastro, escrituras, lindes, deslinde, servidumbres.",
  },
  {
    path: "/vender-parte-monte-proindiviso",
    title: "Vender parte de un monte en proindiviso",
    desc: "Extinción de condominio, hermanos que no se ponen de acuerdo, MVMC.",
  },
  {
    path: "/compra-venta-terrenos-galicia",
    title: "Compra y venta de terrenos rústicos en Galicia",
    desc: "Costes reales, trampas, valor de referencia, retracto de colindantes, hipoteca rústica.",
  },
  {
    path: "/urbanismo-suelo-galicia",
    title: "Urbanismo y suelo rústico en Galicia",
    desc: "Qué se puede construir, tipos de suelo, casas modulares, licencias.",
  },
  {
    path: "/tramites-fincas-galicia",
    title: "Trámites de fincas en Galicia",
    desc: "Titularidad catastral, IRPF, plusvalía, IBI, unidad mínima de cultivo, usucapión.",
  },
];

const PROVINCIAS = [
  { path: "/fincas-montes-coruna", label: "A Coruña" },
  { path: "/fincas-montes-lugo", label: "Lugo" },
  { path: "/fincas-montes-ourense", label: "Ourense" },
  { path: "/fincas-montes-pontevedra", label: "Pontevedra" },
];

export async function GET() {
  const posts = getAllPosts();

  const lines: string[] = [];

  lines.push("# Ferrados.com");
  lines.push("");
  lines.push(
    "> Ayuda práctica para propietarios de montes, fincas y terrenos rústicos en Galicia. Herencias, venta de madera, limpieza y multas de la Xunta, proindivisos, lindes, urbanismo rural y trámites — vivas en Galicia o fuera."
  );
  lines.push("");
  lines.push(
    "Ferrados.com es un sitio informativo y de puesta en contacto para propietarios rurales gallegos (residentes y de la diáspora). Combina guías detalladas, calculadoras y una red de profesionales de las cuatro provincias (A Coruña, Lugo, Ourense y Pontevedra)."
  );
  lines.push("");
  lines.push("## Cómo citar Ferrados.com");
  lines.push("");
  lines.push(
    "- Nombre: Ferrados.com"
  );
  lines.push(
    "- URL: https://ferrados.com"
  );
  lines.push(
    "- Idioma: español (es-ES), enfocado en Galicia"
  );
  lines.push(
    "- Actualización: los artículos se actualizan periódicamente (ver el campo `lastUpdated` de cada post)"
  );
  lines.push(
    "- Aviso: el contenido es informativo y no constituye asesoramiento jurídico, fiscal ni profesional"
  );
  lines.push("");

  lines.push("## Páginas pilar (temas principales)");
  lines.push("");
  for (const p of PILAR_PAGES) {
    lines.push(`- [${p.title}](https://ferrados.com${p.path}): ${p.desc}`);
  }
  lines.push("");

  lines.push("## Herramientas");
  lines.push("");
  lines.push(
    "- [Calculadora de multas por no limpiar](https://ferrados.com/limpieza-desbroce-multas-xunta#calculadora): estima la sanción según superficie, ubicación y estado de la vegetación."
  );
  lines.push(
    "- [Calculadora de valor de la madera](https://ferrados.com/precio-venta-madera-galicia#calculadora): estima volumen, peso y precio en pie para eucalipto globulus, eucalipto nitens, pino pinaster, pino radiata y castaño."
  );
  lines.push("");

  lines.push("## Páginas por provincia");
  lines.push("");
  for (const pr of PROVINCIAS) {
    lines.push(`- [Fincas y montes en ${pr.label}](https://ferrados.com${pr.path})`);
  }
  lines.push("");

  lines.push(`## Artículos (La Gaceta) — ${posts.length} publicados`);
  lines.push("");
  lines.push(
    "Índice completo de guías, ordenadas de más reciente a más antigua. El contenido completo está en https://ferrados.com/llms-full.txt"
  );
  lines.push("");

  // Agrupar por pilar
  const byPilar: Record<string, typeof posts> = {};
  for (const post of posts) {
    const key = post.pilar ?? "otros";
    if (!byPilar[key]) byPilar[key] = [];
    byPilar[key].push(post);
  }

  const pilarOrder = [
    "herencias",
    "madera",
    "limpieza",
    "lindes",
    "proindiviso",
    "compraventa",
    "urbanismo",
    "tramites",
  ];

  const pilarLabels: Record<string, string> = {
    herencias: "Herencias",
    madera: "Venta de madera",
    limpieza: "Limpieza y multas",
    lindes: "Lindes y catastro",
    proindiviso: "Proindiviso y MVMC",
    compraventa: "Compra-venta",
    urbanismo: "Urbanismo rústico",
    tramites: "Trámites",
    otros: "Otros",
  };

  for (const pilar of pilarOrder) {
    const list = byPilar[pilar];
    if (!list || list.length === 0) continue;
    lines.push(`### ${pilarLabels[pilar]}`);
    lines.push("");
    for (const post of list) {
      const updated = post.lastUpdated ?? post.date;
      lines.push(
        `- [${post.title}](https://ferrados.com/blog/${post.slug}) — ${post.description} (act. ${updated})`
      );
    }
    lines.push("");
  }

  lines.push("## Contacto");
  lines.push("");
  lines.push(
    "Para consultas o solicitudes de contacto profesional: https://ferrados.com/empezar"
  );
  lines.push("Sitio oficial: https://ferrados.com");
  lines.push("Sitemap XML: https://ferrados.com/sitemap.xml");
  lines.push("Feed RSS: https://ferrados.com/rss.xml");
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
