import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Empezar — Cuéntanos tu situación",
  description:
    "Rellena este formulario rápido y te orientamos sobre cómo resolver tu situación con tu monte, finca o terreno en Galicia.",
};

export default function EmpezarPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Cuéntanos tu situación
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Responde unas pocas preguntas sobre tu finca o monte en Galicia.
          Es rápido, confidencial y sin compromiso.
        </p>
      </div>

      <LeadForm origen="home" />

      <p className="text-xs text-gray-400 text-center mt-6 max-w-md mx-auto">
        Tu información es confidencial. Solo la utilizaremos para evaluar tu
        caso y contactarte si lo necesitas.
      </p>
    </div>
  );
}
