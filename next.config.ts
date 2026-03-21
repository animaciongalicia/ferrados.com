import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ==========================================
      // PÁGINAS ESTÁTICAS DE BLOGSPOT → PILARES
      // ==========================================
      {
        source: "/p/venta-de-madera.html",
        destination: "/precio-venta-madera-galicia",
        permanent: true,
      },
      {
        source: "/p/compra-de-terrenos.html",
        destination: "/compra-venta-terrenos-galicia",
        permanent: true,
      },
      {
        source: "/p/catastro-en-galicia-xunta-de-galicia.html",
        destination: "/localizar-medir-fincas-galicia",
        permanent: true,
      },
      {
        source: "/p/contacto.html",
        destination: "/empezar",
        permanent: true,
      },
      // Tasaciones por provincia → pilar localizar/medir fincas
      {
        source: "/p/tasacion-de-montes-y-terrenos-en-lugo.html",
        destination: "/localizar-medir-fincas-galicia",
        permanent: true,
      },
      {
        source: "/p/tasaciones-de-montes-y-terrenos-en.html",
        destination: "/localizar-medir-fincas-galicia",
        permanent: true,
      },
      {
        source: "/p/tasacion-de-terrenos-y-montes-en-orense.html",
        destination: "/localizar-medir-fincas-galicia",
        permanent: true,
      },
      {
        source: "/p/tasacion-de-fincas-y-terrenos-en-coruna.html",
        destination: "/localizar-medir-fincas-galicia",
        permanent: true,
      },

      // ==========================================
      // POSTS DE BLOGSPOT → BLOG / PILARES
      // ==========================================

      // Valoración y precios de montes/terrenos
      {
        source: "/2016/03/cuanto-vale-el-metro-cuadrado-rustico.html",
        destination: "/blog/tasacion-monte-galicia",
        permanent: true,
      },
      {
        source: "/2016/03/cual-es-el-precio-de-un-monte-en-galicia.html",
        destination: "/blog/tasacion-monte-galicia",
        permanent: true,
      },
      {
        source: "/2016/03/precio-del-ferrado-de-monte-en-galicia.html",
        destination: "/blog/tasacion-monte-galicia",
        permanent: true,
      },

      // Herencias
      {
        source: "/2016/03/como-vender-mi-terreno-desde-america.html",
        destination: "/blog/herencia-finca-desde-extranjero",
        permanent: true,
      },
      {
        source: "/2016/03/vender-un-monte-de-una-herencia-en.html",
        destination: "/blog/ejemplo-herencia-monte-galicia",
        permanent: true,
      },
      {
        source: "/2016/03/herede-un-monte-en-galicia-que-tengo.html",
        destination: "/herencias-montes-galicia",
        permanent: true,
      },

      // Compra-venta de terrenos
      {
        source: "/2016/03/precios-de-venta-de-terrenos-en-galicia.html",
        destination: "/compra-venta-terrenos-galicia",
        permanent: true,
      },
      {
        source: "/2019/03/cuestinos-basicas-para-vender-terrenos.html",
        destination: "/compra-venta-terrenos-galicia",
        permanent: true,
      },
      {
        source: "/2020/09/se-compran-terrenos-fincas-y-terrenos.html",
        destination: "/compra-venta-terrenos-galicia",
        permanent: true,
      },

      // Madera
      {
        source: "/2016/03/pagos-y-contrato-cuando-se-vende-madera.html",
        destination: "/precio-venta-madera-galicia",
        permanent: true,
      },
      {
        source: "/2024/09/cuanto-dinero-vale-una-tonelada-de.html",
        destination: "/blog/precio-eucalipto-galicia-2026",
        permanent: true,
      },

      // Catastro / buscar fincas
      {
        source: "/2016/03/como-buscar-un-terreno-finca-o-monte.html",
        destination: "/blog/catastro-finca-galicia-referencia",
        permanent: true,
      },

      // Anuncios / directorio → onboarding
      {
        source: "/2024/09/anuncios-empresas.html",
        destination: "/empezar",
        permanent: true,
      },
      {
        source: "/2024/09/anuncios.html",
        destination: "/empezar",
        permanent: true,
      },

      // ==========================================
      // ARCHIVOS Y BÚSQUEDAS → BLOG
      // ==========================================
      {
        source: "/2016/03",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/search",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/search/label/:label*",
        destination: "/blog",
        permanent: true,
      },

      // ==========================================
      // CATCH-ALL: otros posts antiguos de Blogspot
      // Patrón /YYYY/MM/slug.html → /blog
      // ==========================================
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:slug*.html",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
