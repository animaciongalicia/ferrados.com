"use client";

import { useState } from "react";
import Link from "next/link";
import LimpiezaForm from "@/components/forms/LimpiezaForm";
import HerenciasForm from "@/components/forms/HerenciasForm";
import LindesForm from "@/components/forms/LindesForm";
import MaderaForm from "@/components/forms/MaderaForm";
import ProindivisoForm from "@/components/forms/ProindivisoForm";

const embudos = [
  {
    id: "limpieza" as const,
    icon: "🧹",
    title: "Multa o limpieza obligatoria",
    desc: "Te han notificado, te pueden multar o quieres limpiar antes de que actúe la Xunta.",
  },
  {
    id: "herencias" as const,
    icon: "📜",
    title: "Herencia de un monte o finca",
    desc: "Has heredado (o vas a heredar) fincas en Galicia y necesitas resolver los papeles.",
  },
  {
    id: "lindes" as const,
    icon: "📍",
    title: "Localizar, medir o resolver lindes",
    desc: "No sabes dónde está tu finca, el Catastro tiene errores o tienes un conflicto de lindes.",
  },
  {
    id: "madera" as const,
    icon: "🌲",
    title: "Vender la madera de mi monte",
    desc: "Tienes pinos o eucaliptos y quieres saber cuánto valen y cómo venderlos.",
  },
  {
    id: "proindiviso" as const,
    icon: "🤝",
    title: "Proindiviso o monte compartido",
    desc: "Compartes un monte con otros propietarios y necesitas desbloquear la situación.",
  },
];

type EmbudoId = (typeof embudos)[number]["id"];

const formComponents: Record<EmbudoId, React.ComponentType<{ origen?: string }>> = {
  limpieza: LimpiezaForm,
  herencias: HerenciasForm,
  lindes: LindesForm,
  madera: MaderaForm,
  proindiviso: ProindivisoForm,
};

export default function EmpezarPage() {
  const [selected, setSelected] = useState<EmbudoId | null>(null);

  const FormComponent = selected ? formComponents[selected] : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          ¿En qué podemos ayudarte?
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Selecciona tu situación y te pondremos en contacto con el profesional
          adecuado. Es confidencial, rápido y sin compromiso.
        </p>
      </div>

      {!selected ? (
        <div className="space-y-3">
          {embudos.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelected(e.id)}
              className="w-full text-left flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all"
            >
              <span className="text-2xl mt-0.5">{e.icon}</span>
              <div>
                <p className="font-semibold text-gray-900">{e.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{e.desc}</p>
              </div>
            </button>
          ))}

          <p className="text-xs text-gray-400 text-center mt-6">
            ¿No encaja ninguna? <Link href="/blog" className="underline hover:text-green-700">Visita nuestro blog</Link> o
            selecciona la opción más parecida.
          </p>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelected(null)}
            className="text-sm text-gray-500 hover:text-green-700 mb-4 flex items-center gap-1"
          >
            ← Cambiar problema
          </button>
          {FormComponent && <FormComponent origen="empezar" />}
        </div>
      )}
    </div>
  );
}
