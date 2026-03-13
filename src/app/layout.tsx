import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Ferrados.com — Montes, fincas y terrenos en Galicia",
    template: "%s | Ferrados.com",
  },
  description:
    "Ayudamos a propietarios de montes y fincas en Galicia: herencias, venta de madera, limpieza, lindes, proindivisos y más. Vivas en Galicia o fuera.",
  metadataBase: new URL("https://ferrados.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Ferrados.com",
    title: "Ferrados.com — Montes, fincas y terrenos en Galicia",
    description:
      "Ayudamos a propietarios de montes y fincas en Galicia: herencias, venta de madera, limpieza, lindes, proindivisos y más.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferrados.com — Montes, fincas y terrenos en Galicia",
    description:
      "Ayudamos a propietarios de montes y fincas en Galicia: herencias, venta de madera, limpieza, lindes, proindivisos y más.",
  },
};

// Organization JSON-LD
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ferrados.com",
  url: "https://ferrados.com",
  description:
    "Ayudamos a propietarios de montes y fincas en Galicia: herencias, venta de madera, limpieza, lindes, proindivisos y más.",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Galicia, España",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
