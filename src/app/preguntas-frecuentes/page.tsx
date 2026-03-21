import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPostBySlug, extractFaqs } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Preguntas frecuentes sobre montes y fincas en Galicia — Ferrados.com",
  description:
    "Respuestas claras a las dudas más comunes sobre herencias de montes, venta de madera, multas de limpieza, lindes, compraventa de terrenos y proindivisos en Galicia.",
  alternates: {
    canonical: "/preguntas-frecuentes",
  },
};

interface FaqWithSource {
  question: string;
  answer: string;
  slug: string;
  postTitle: string;
}

interface FaqSection {
  id: string;
  title: string;
  description: string;
  pilares: string[];
  ctaHref: string;
  ctaLabel: string;
}

const sections: FaqSection[] = [
  {
    id: "herencias",
    title: "Herencias de montes y fincas",
    description: "Heredar terrenos en Galicia puede ser un lío. Estas son las dudas más habituales.",
    pilares: ["herencias"],
    ctaHref: "/herencias-montes-galicia",
    ctaLabel: "Consulta tu herencia",
  },
  {
    id: "limpieza",
    title: "Limpieza obligatoria y multas",
    description: "La Xunta exige desbrozar. Esto es lo que necesitas saber para no llevarte un susto.",
    pilares: ["limpieza"],
    ctaHref: "/limpieza-desbroce-multas-xunta",
    ctaLabel: "Ver guía de limpieza y multas",
  },
  {
    id: "madera",
    title: "Venta de madera",
    description: "Precios, impuestos, permisos y cuándo cortar. Las preguntas que más nos hacen.",
    pilares: ["madera"],
    ctaHref: "/precio-venta-madera-galicia",
    ctaLabel: "Pide valoración de tu madera",
  },
  {
    id: "lindes",
    title: "Fincas, catastro y lindes",
    description: "Lindes, mediciones, Catastro y SIXPAC. Donde Galicia y la burocracia se encuentran.",
    pilares: ["lindes"],
    ctaHref: "/localizar-medir-fincas-galicia",
    ctaLabel: "Solicita una medición",
  },
  {
    id: "compraventa",
    title: "Compra-venta de terrenos",
    description: "Comprar o vender fincas rústicas en Galicia tiene sus trampas. Aquí resolvemos las más comunes.",
    pilares: ["compraventa"],
    ctaHref: "/compra-venta-terrenos-galicia",
    ctaLabel: "Consulta tu compra-venta",
  },
  {
    id: "proindiviso",
    title: "Proindivisos y copropiedades",
    description: "Cuando un monte es de varios y no hay acuerdo. Las preguntas que nos llegan a diario.",
    pilares: ["proindiviso"],
    ctaHref: "/vender-parte-monte-proindiviso",
    ctaLabel: "Consulta tu proindiviso",
  },
];

function getFaqsBySection(): Record<string, FaqWithSource[]> {
  const allPosts = getAllPosts();
  const result: Record<string, FaqWithSource[]> = {};

  for (const section of sections) {
    result[section.id] = [];
  }

  for (const postMeta of allPosts) {
    const post = getPostBySlug(postMeta.slug);
    if (!post || !post.meta.pilar) continue;

    const faqs = extractFaqs(post.content);
    if (faqs.length === 0) continue;

    const section = sections.find((s) => s.pilares.includes(post.meta.pilar!));
    if (!section) continue;

    for (const faq of faqs) {
      result[section.id].push({
        question: faq.question,
        answer: faq.answer,
        slug: postMeta.slug,
        postTitle: postMeta.title,
      });
    }
  }

  // Limit to 5 per section for readability
  for (const key of Object.keys(result)) {
    result[key] = result[key].slice(0, 5);
  }

  return result;
}

export default function PreguntasFrecuentesPage() {
  const faqsBySection = getFaqsBySection();

  // Collect all FAQs for JSON-LD
  const allFaqs = Object.values(faqsBySection).flat();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://ferrados.com" },
      { "@type": "ListItem", position: 2, name: "Preguntas frecuentes", item: "https://ferrados.com/preguntas-frecuentes" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-green-800 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
          <nav className="text-sm text-green-200 mb-4">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Preguntas frecuentes</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            Preguntas frecuentes
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Las dudas que más nos plantean los propietarios de montes y fincas
            en Galicia, organizadas por tema. Con respuestas claras y sin rodeos.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-sm px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-700 transition-colors"
            >
              {section.title}
            </a>
          ))}
        </div>
      </div>

      {/* FAQ sections */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {sections.map((section) => {
          const faqs = faqsBySection[section.id];
          if (!faqs || faqs.length === 0) return null;

          return (
            <section key={section.id} id={section.id} className="mb-12 scroll-mt-20">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  {section.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  {section.description}
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-gray-900 text-sm pr-4">
                        {faq.question}
                      </span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                      <p className="mb-2">{faq.answer}</p>
                      <Link
                        href={`/blog/${faq.slug}`}
                        className="text-green-700 hover:text-green-900 text-xs font-medium"
                      >
                        Lee la guía completa →
                      </Link>
                    </div>
                  </details>
                ))}
              </div>

              <div className="mt-4">
                <Link
                  href={section.ctaHref}
                  className="inline-block text-sm text-green-700 font-semibold hover:text-green-900 transition-colors"
                >
                  {section.ctaLabel} →
                </Link>
              </div>
            </section>
          );
        })}

        {/* CTA final */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 md:p-8 text-center mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            ¿No encuentras tu pregunta?
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Cuéntanos tu caso y un profesional de tu zona te orientará sin compromiso.
          </p>
          <Link
            href="/empezar"
            className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors text-sm"
          >
            Empezar ahora
          </Link>
        </div>
      </div>
    </>
  );
}
