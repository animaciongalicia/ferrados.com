"use client";

import { useState } from "react";
import Link from "next/link";

const zonas = [
  { label: "Junto a viviendas (franja 50 m)", factor: 1.5 },
  { label: "Junto a núcleo de población (franja 100 m)", factor: 1.2 },
  { label: "Monte aislado (sin viviendas cerca)", factor: 1.0 },
] as const;

const estados = [
  { label: "Matorral bajo (menos de 1 metro)", factor: 1.0 },
  { label: "Matorral alto y maleza densa", factor: 1.5 },
  { label: "Monte abandonado (más de 5 años sin limpiar)", factor: 2.0 },
] as const;

export default function CalculadoraMultas() {
  const [superficie, setSuperficie] = useState("");
  const [zona, setZona] = useState("");
  const [estado, setEstado] = useState("");
  const [resultado, setResultado] = useState<{
    multaMin: number;
    multaMax: number;
    limpiezaMin: number;
    limpiezaMax: number;
    ejecucionSubsidiaria: number;
  } | null>(null);

  function calcular() {
    const sup = parseFloat(superficie);
    if (!sup || !zona || !estado) return;

    const zonaData = zonas.find((z) => z.label === zona);
    const estadoData = estados.find((e) => e.label === estado);
    if (!zonaData || !estadoData) return;

    const supM2 = sup * 10000; // hectáreas a m²
    const factorTotal = zonaData.factor * estadoData.factor;

    // Multa según gravedad (basado en Ley gallega de prevención de incendios)
    let multaMin: number;
    let multaMax: number;

    if (supM2 <= 2500) {
      // Leve
      multaMin = 1000;
      multaMax = 3000;
    } else if (supM2 <= 10000) {
      // Grave
      multaMin = 3001;
      multaMax = 30000;
    } else {
      // Muy grave
      multaMin = 10000;
      multaMax = 100000;
    }

    // Ajustar por zona y estado
    multaMin = Math.round(multaMin * factorTotal);
    multaMax = Math.round(multaMax * factorTotal);

    // Coste de limpieza orientativo (€/m²)
    const costePorM2Min = 0.30 * estadoData.factor;
    const costePorM2Max = 0.60 * estadoData.factor;
    const limpiezaMin = Math.round(Math.max(150, supM2 * costePorM2Min));
    const limpiezaMax = Math.round(Math.max(400, supM2 * costePorM2Max));

    // Ejecución subsidiaria (la Xunta cobra mucho más)
    const ejecucionSubsidiaria = Math.round(limpiezaMax * 2.5);

    setResultado({
      multaMin,
      multaMax,
      limpiezaMin,
      limpiezaMax,
      ejecucionSubsidiaria,
    });
  }

  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 md:p-8">
      <h2 className="text-xl font-bold text-red-900 mb-2">
        Calculadora de multas: ¿cuánto te puede caer?
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Introduce los datos de tu finca y calcula la sanción estimada por
        incumplimiento de la ley de prevención de incendios de Galicia.
        <strong> Valores orientativos, no vinculantes.</strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Superficie (hectáreas)
          </label>
          <input
            type="number"
            step="0.1"
            min="0.01"
            value={superficie}
            onChange={(e) => setSuperficie(e.target.value)}
            placeholder="Ej: 0.5"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-red-600 focus:border-red-600"
          />
          <p className="text-xs text-gray-400 mt-1">1 ferrado ≈ 0,05 ha</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ubicación de la finca
          </label>
          <select
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-red-600 focus:border-red-600 bg-white"
          >
            <option value="">Selecciona...</option>
            {zonas.map((z) => (
              <option key={z.label} value={z.label}>{z.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado de la vegetación
          </label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-red-600 focus:border-red-600 bg-white"
          >
            <option value="">Selecciona...</option>
            {estados.map((e) => (
              <option key={e.label} value={e.label}>{e.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={calcular}
        disabled={!superficie || !zona || !estado}
        className="w-full md:w-auto py-3 px-8 bg-red-700 text-white rounded-lg text-sm font-semibold hover:bg-red-800 transition-colors disabled:opacity-50"
      >
        Calcular multa estimada
      </button>

      {resultado && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-red-200 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Multa estimada
              </p>
              <p className="text-2xl font-bold text-red-700">
                {resultado.multaMin.toLocaleString("es-ES")} – {resultado.multaMax.toLocaleString("es-ES")} €
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Sanción administrativa
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-green-200 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Limpiar por tu cuenta
              </p>
              <p className="text-2xl font-bold text-green-700">
                {resultado.limpiezaMin.toLocaleString("es-ES")} – {resultado.limpiezaMax.toLocaleString("es-ES")} €
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Contratando una empresa
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-amber-200 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Si actúa la Xunta
              </p>
              <p className="text-2xl font-bold text-amber-700">
                {resultado.ejecucionSubsidiaria.toLocaleString("es-ES")} €
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Ejecución subsidiaria + multa
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <p className="text-sm text-gray-700 mb-3">
              <strong>Resumen:</strong> Si no limpias, te puede costar entre{" "}
              <span className="text-red-700 font-bold">
                {(resultado.multaMin + resultado.ejecucionSubsidiaria).toLocaleString("es-ES")} €
              </span>
              {" "}y{" "}
              <span className="text-red-700 font-bold">
                {(resultado.multaMax + resultado.ejecucionSubsidiaria).toLocaleString("es-ES")} €
              </span>
              . Limpiar por tu cuenta sale desde{" "}
              <span className="text-green-700 font-bold">
                {resultado.limpiezaMin.toLocaleString("es-ES")} €
              </span>.
            </p>
            <Link
              href="/empezar?tipo=limpieza"
              className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition-colors"
            >
              Pedir presupuesto de limpieza gratis
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
