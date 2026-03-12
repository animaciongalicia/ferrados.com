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
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Ferrados.com",
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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
