/**
 * JSON-LD structured data for pillar (service) pages.
 * Renders Service + BreadcrumbList schemas for rich snippets.
 */

interface PilarJsonLdProps {
  title: string;
  description: string;
  slug: string;
  breadcrumbLabel: string;
}

export default function PilarJsonLd({ title, description, slug, breadcrumbLabel }: PilarJsonLdProps) {
  const url = `https://ferrados.com/${slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: "Ferrados.com",
      url: "https://ferrados.com",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Galicia, España",
    },
    serviceType: "Asesoramiento inmobiliario rural",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://ferrados.com" },
      { "@type": "ListItem", position: 2, name: breadcrumbLabel, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
