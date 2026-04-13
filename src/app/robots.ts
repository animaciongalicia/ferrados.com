import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          // Embudo de captura: no debe indexarse como entrada orgánica.
          "/empezar",
          // Versiones filtradas de /blog por categoría/tag — contenido
          // duplicado respecto al índice canónico /blog.
          "/blog?cat=",
          "/blog?tag=",
        ],
      },
    ],
    host: "https://ferrados.com",
    sitemap: "https://ferrados.com/sitemap.xml",
  };
}
