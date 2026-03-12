import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * REDIRECCIONES 301 — Migración SEO desde Blogger/Blogspot
   *
   * Aquí se mapean las URLs antiguas del Blogspot a las nuevas rutas.
   * Cada redirección tiene:
   *   - source: la URL antigua (puede usar patrones con :slug*)
   *   - destination: la nueva URL en este sitio
   *   - permanent: true → redirección 301 (SEO-friendly)
   *
   * CÓMO AÑADIR REDIRECCIONES:
   * 1. Busca la URL antigua en tu Blogspot (ej: /2016/03/titulo-del-post.html)
   * 2. Decide si va a un post del blog (/blog/slug) o a una página pilar
   * 3. Añade la entrada en el array de abajo
   *
   * PATRONES ÚTILES:
   *   - Ruta exacta:     { source: "/p/pagina.html", destination: "/nueva-ruta", permanent: true }
   *   - Año/mes/post:    { source: "/2016/03/titulo.html", destination: "/blog/titulo", permanent: true }
   *   - Catch-all:       { source: "/p/:slug*.html", destination: "/blog/:slug*", permanent: true }
   */
  async redirects() {
    return [
      // ==========================================
      // PÁGINAS ESTÁTICAS DE BLOGSPOT → PILARES
      // ==========================================
      // Ejemplo: la página "Compra de terrenos" del Blogspot → pilar de compra-venta
      // {
      //   source: "/p/compra-de-terrenos.html",
      //   destination: "/compra-venta-terrenos-galicia",
      //   permanent: true,
      // },

      // Ejemplo: la página de Catastro del Blogspot → pilar de localizar fincas
      // {
      //   source: "/p/catastro-en-galicia-xunta-de-galicia.html",
      //   destination: "/localizar-medir-fincas-galicia",
      //   permanent: true,
      // },

      // ==========================================
      // POSTS DE BLOGSPOT → BLOG
      // ==========================================
      // Ejemplo: un post del 2016 → post del nuevo blog
      // {
      //   source: "/2016/03/titulo-del-post.html",
      //   destination: "/blog/titulo-del-post",
      //   permanent: true,
      // },

      // ==========================================
      // REDIRECCIÓN GENÉRICA (catch-all, usar con cuidado)
      // ==========================================
      // Si quieres redirigir TODOS los posts antiguos con patrón /YYYY/MM/slug.html:
      // {
      //   source: "/:year(\\d{4})/:month(\\d{2})/:slug*.html",
      //   destination: "/blog/:slug*",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
