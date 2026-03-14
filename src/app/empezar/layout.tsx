import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empezar — Cuéntanos tu problema con montes o fincas en Galicia",
  description:
    "Selecciona tu situación y te pondremos en contacto con el profesional adecuado: herencias, madera, limpieza, lindes, proindivisos o compraventa de terrenos en Galicia.",
  alternates: {
    canonical: "/empezar",
  },
  openGraph: {
    title: "Empezar — Cuéntanos tu problema con montes o fincas en Galicia",
    description:
      "Selecciona tu situación y te conectamos con un profesional de tu zona en menos de 24h.",
  },
};

export default function EmpezarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
