import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://ferrados.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const today = new Date().toISOString().split("T")[0];

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    // Prefer lastUpdated (frontmatter), fall back to publication date
    lastModified: post.lastUpdated ?? post.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // NOTE: /blog?cat=X and /blog?tag=X are client-side filtered views of the
  // same /blog page. We intentionally don't list them in the sitemap to avoid
  // signalling duplicate content — canonical for those is /blog anyway.

  const provinciaPages: MetadataRoute.Sitemap = [
    "/fincas-montes-coruna",
    "/fincas-montes-lugo",
    "/fincas-montes-ourense",
    "/fincas-montes-pontevedra",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // NOTE: /empezar está disallowed en robots.ts (embudo de captura), no se
  // incluye aquí para no generar señales contradictorias.
  const pilarPages: MetadataRoute.Sitemap = [
    "/herencias-montes-galicia",
    "/localizar-medir-fincas-galicia",
    "/precio-venta-madera-galicia",
    "/limpieza-desbroce-multas-xunta",
    "/vender-parte-monte-proindiviso",
    "/compra-venta-terrenos-galicia",
    "/urbanismo-suelo-galicia",
    "/tramites-fincas-galicia",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/quienes-somos`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/colaboradores`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/preguntas-frecuentes`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Legales: noindex por política, no las listamos en el sitemap.
    ...pilarPages,
    ...provinciaPages,
    ...blogEntries,
  ];
}
