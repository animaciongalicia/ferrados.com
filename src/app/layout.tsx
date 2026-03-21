import Script from "next/script";
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
    types: {
      "application/rss+xml": "/rss.xml",
    },
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
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WZC6N4LS');`}
        </Script>

        {/* Meta Pixel — Descomenta y pon tu ID cuando lo tengas */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
fbq('track', 'PageView');`}
          </Script>
        )}
      </head>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WZC6N4LS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
