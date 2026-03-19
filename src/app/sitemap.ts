import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://ferrados.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const pilarPages: MetadataRoute.Sitemap = [
    "/herencias-montes-galicia",
    "/localizar-medir-fincas-galicia",
    "/precio-venta-madera-galicia",
    "/limpieza-desbroce-multas-xunta",
    "/vender-parte-monte-proindiviso",
    "/compra-venta-terrenos-galicia",
    "/urbanismo-suelo-galicia",
    "/tramites-fincas-galicia",
    "/empezar",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date().toISOString().split("T")[0],
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
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/preguntas-frecuentes`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/politica-privacidad`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/aviso-legal`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/politica-cookies`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...pilarPages,
    ...blogEntries,
  ];
}
