"use client";

import { useState } from "react";

const actividades = [
  "Abogado / Herencias / Proindivisos",
  "Maderista / Empresa de corta",
  "Topógrafo / Ingeniero forestal",
  "Empresa de desbroce / Limpieza",
  "Inmobiliaria rústica",
  "Gestoría / Asesoría fiscal",
  "Otro",
] as const;

const provincias = [
  "A Coruña",
  "Lugo",
  "Ourense",
  "Pontevedra",
] as const;

const capacidades = [
  "1 – 5 clientes/mes",
  "5 – 15 clientes/mes",
  "15 – 30 clientes/mes",
  "Más de 30 clientes/mes",
] as const;

export default function ColaboradorForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      embudo: "colaborador",
      origen: "pagina-colaboradores",
      url_origen: window.location.href,
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement).value,
      empresa: (form.elements.namedItem("empresa") as HTMLInputElement).value,
      actividad: (form.elements.namedItem("actividad") as HTMLSelectElement).value,
      provincia: (form.elements.namedItem("provincia") as HTMLSelectElement).value,
      capacidad: (form.elements.namedItem("capacidad") as HTMLSelectElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      telefono: (form.elements.namedItem("telefono") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Error al enviar");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <p className="text-2xl font-bold text-green-800 mb-2">Solicitud recibida</p>
        <p className="text-gray-600">
          Te contactaremos en menos de 24 horas para explicarte las condiciones
          y confirmar la disponibilidad de tu provincia.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tu nombre <span className="text-red-500">*</span>
          </label>
          <input
            name="nombre"
            required
            type="text"
            placeholder="Nombre y apellidos"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Empresa o despacho
          </label>
          <input
            name="empresa"
            type="text"
            placeholder="Nombre de tu empresa"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ¿A qué te dedicas? <span className="text-red-500">*</span>
        </label>
        <select
          name="actividad"
          required
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600 bg-white"
        >
          <option value="">Selecciona tu actividad...</option>
          {actividades.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ¿En qué provincia trabajas? <span className="text-red-500">*</span>
          </label>
          <select
            name="provincia"
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600 bg-white"
          >
            <option value="">Selecciona provincia...</option>
            {provincias.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ¿Cuántos clientes puedes asumir? <span className="text-red-500">*</span>
          </label>
          <select
            name="capacidad"
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600 bg-white"
          >
            <option value="">Selecciona...</option>
            {capacidades.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            required
            type="email"
            placeholder="tu@empresa.com"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            name="telefono"
            required
            type="tel"
            placeholder="600 000 000"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 px-4 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors disabled:opacity-50"
      >
        {submitting ? "Enviando..." : "Solicitar exclusividad provincial"}
      </button>
    </form>
  );
}
