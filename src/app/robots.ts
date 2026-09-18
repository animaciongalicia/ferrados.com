import type { MetadataRoute } from "next";

/**
 * Robots.txt — política de crawling.
 *
 * Aceptamos EXPLÍCITAMENTE los bots de IA generativa (LLMs) para maximizar
 * las probabilidades de que Ferrados.com aparezca citado en respuestas de
 * ChatGPT, Claude, Perplexity, Gemini, etc. Esto es intencional: el contenido
 * está pensado para ser referenciado.
 */
export default function robots(): MetadataRoute.Robots {
  const commonDisallow = [
    "/api/",
    // Embudo de captura: no debe indexarse como entrada orgánica.
    "/empezar",
    // Versiones filtradas de /blog por categoría/tag — contenido
    // duplicado respecto al índice canónico /blog.
    "/blog?cat=",
    "/blog?tag=",
  ];

  return {
    rules: [
      // Bots tradicionales (Google, Bing, DuckDuckGo, Yandex, etc.)
      {
        userAgent: "*",
        allow: "/",
        disallow: commonDisallow,
      },

      // OpenAI — ChatGPT (crawler de entrenamiento + búsqueda en vivo)
      { userAgent: "GPTBot", allow: "/", disallow: commonDisallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow: commonDisallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: commonDisallow },

      // Anthropic — Claude (crawler de entrenamiento + búsqueda en vivo)
      { userAgent: "ClaudeBot", allow: "/", disallow: commonDisallow },
      { userAgent: "Claude-Web", allow: "/", disallow: commonDisallow },
      { userAgent: "anthropic-ai", allow: "/", disallow: commonDisallow },
      { userAgent: "Claude-SearchBot", allow: "/", disallow: commonDisallow },
      { userAgent: "Claude-User", allow: "/", disallow: commonDisallow },

      // Perplexity — motor de búsqueda con IA
      { userAgent: "PerplexityBot", allow: "/", disallow: commonDisallow },
      { userAgent: "Perplexity-User", allow: "/", disallow: commonDisallow },

      // Google Gemini / Bard (entrenamiento). Nota: Googlebot ya está
      // cubierto arriba y sigue siendo el bot de search principal.
      { userAgent: "Google-Extended", allow: "/", disallow: commonDisallow },

      // Common Crawl — corpus base usado por múltiples LLMs
      { userAgent: "CCBot", allow: "/", disallow: commonDisallow },

      // Apple Intelligence
      { userAgent: "Applebot-Extended", allow: "/", disallow: commonDisallow },

      // Otros LLMs / agregadores
      { userAgent: "cohere-ai", allow: "/", disallow: commonDisallow },
      { userAgent: "Meta-ExternalAgent", allow: "/", disallow: commonDisallow },
      { userAgent: "Bytespider", allow: "/", disallow: commonDisallow },
      { userAgent: "DuckAssistBot", allow: "/", disallow: commonDisallow },
      { userAgent: "MistralAI-User", allow: "/", disallow: commonDisallow },
      { userAgent: "YouBot", allow: "/", disallow: commonDisallow },
    ],
    host: "https://ferrados.com",
    sitemap: [
      "https://ferrados.com/sitemap.xml",
      "https://ferrados.com/llms.txt",
    ],
  };
}
