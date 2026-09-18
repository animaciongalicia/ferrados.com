"use client";

import { useState } from "react";
import Link from "next/link";

const especies = [
  {
    label: "Eucalipto globulus",
    densidad: 815,
    turnoMin: 12,
    turnoMax: 15,
    precioTMin: 30,
    precioTMax: 50,
    imaM3Ha: 20,
  },
  {
    label: "Eucalipto nitens",
    densidad: 775,
    turnoMin: 15,
    turnoMax: 20,
    precioTMin: 20,
    precioTMax: 35,
    imaM3Ha: 18,
  },
  {
    label: "Pino del país (pinaster)",
    densidad: 875,
    turnoMin: 25,
    turnoMax: 35,
    precioTMin: 25,
    precioTMax: 45,
    imaM3Ha: 10,
  },
  {
    label: "Pino insigne (radiata)",
    densidad: 775,
    turnoMin: 20,
    turnoMax: 30,
    precioTMin: 20,
    precioTMax: 35,
    imaM3Ha: 12,
  },
  {
    label: "Castaño",
    densidad: 825,
    turnoMin: 30,
    turnoMax: 45,
    precioTMin: 40,
    precioTMax: 70,
    imaM3Ha: 7,
  },
] as const;

const densidades = [
  { label: "Baja (< 800 árboles/ha)", factor: 0.7 },
  { label: "Normal (800 – 1.200 árboles/ha)", factor: 1.0 },
  { label: "Alta (> 1.200 árboles/ha)", factor: 1.15 },
] as const;

export default function CalculadoraMadera() {
  const [especie, setEspecie] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [unidad, setUnidad] = useState<"ha" | "ferrados">("ha");
  const [edad, setEdad] = useState("");
  const [densidad, setDensidad] = useState("");
  const [resultado, setResultado] = useState<{
    volumen: number;
    peso: number;
    valorMin: number;
    valorMax: number;
    turnoOptimo: string;
    madurez: string;
  } | null>(null);

  function calcular() {
    const sup = parseFloat(superficie);
    const ed = parseFloat(edad);
    if (!sup || !ed || !especie || !densidad) return;

    const especieData = especies.find((e) => e.label === especie);
    const densidadData = densidades.find((d) => d.label === densidad);
    if (!especieData || !densidadData) return;

    const supHa = unidad === "ferrados" ? sup * 0.0506 : sup;

    const turnoMedio =
      (especieData.turnoMin + especieData.turnoMax) / 2;
    const ratioEdad = Math.min(ed / turnoMedio, 1.3);
    const curvaRendimiento =
      ratioEdad <= 1
        ? Math.pow(ratioEdad, 0.8)
        : 1 + (ratioEdad - 1) * 0.15;

    const volumenHa =
      especieData.imaM3Ha * turnoMedio * curvaRendimiento * densidadData.factor;
    const volumen = Math.round(volumenHa * supHa * 10) / 10;

    const peso = Math.round((volumen * especieData.densidad) / 1000 * 10) / 10;

    const valorMin = Math.round(peso * especieData.precioTMin);
    const valorMax = Math.round(peso * especieData.precioTMax);

    let madurez: string;
    if (ed < especieData.turnoMin * 0.7) {
      madurez = "Plantación joven — aún no es rentable cortar";
    } else if (ed < especieData.turnoMin) {
      madurez = "Casi en turno — esperar puede aumentar mucho el valor";
    } else if (ed <= especieData.turnoMax) {
      madurez = "En turno óptimo de corta";
    } else {
      madurez = "Pasado el turno — el crecimiento se ha ralentizado";
    }

    setResultado({
      volumen,
      peso,
      valorMin,
      valorMax,
      turnoOptimo: `${especieData.turnoMin}–${especieData.turnoMax} años`,
      madurez,
    });
  }

  return (
    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 md:p-8">
      <h2 className="text-xl font-bold text-green-900 mb-2">
        Calculadora de madera: ¿cuánto vale tu monte?
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Estima el volumen, peso y valor de la madera en pie de tu parcela.
        <strong> Valores orientativos basados en tablas de producción estándar.</strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Especie
          </label>
          <select
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600 bg-white"
          >
            <option value="">Selecciona especie...</option>
            {especies.map((e) => (
              <option key={e.label} value={e.label}>{e.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Superficie
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              min="0.01"
              value={superficie}
              onChange={(e) => setSuperficie(e.target.value)}
              placeholder={unidad === "ha" ? "Ej: 2.5" : "Ej: 50"}
              className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
            />
            <select
              value={unidad}
              onChange={(e) => setUnidad(e.target.value as "ha" | "ferrados")}
              className="border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600 bg-white"
            >
              <option value="ha">Hectáreas</option>
              <option value="ferrados">Ferrados</option>
            </select>
          </div>
          <p className="text-xs text-gray-400 mt-1">1 ferrado ≈ 506 m²</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Edad de la plantación (años)
          </label>
          <input
            type="number"
            step="1"
            min="1"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Ej: 15"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
          />
          {especie && (
            <p className="text-xs text-gray-400 mt-1">
              Turno óptimo de {especie.split(" (")[0]}:{" "}
              {especies.find((e) => e.label === especie)?.turnoMin}–
              {especies.find((e) => e.label === especie)?.turnoMax} años
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Densidad de plantación
          </label>
          <select
            value={densidad}
            onChange={(e) => setDensidad(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600 bg-white"
          >
            <option value="">Selecciona densidad...</option>
            {densidades.map((d) => (
              <option key={d.label} value={d.label}>{d.label}</option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">Si no lo sabes, elige «Normal»</p>
        </div>
      </div>

      <button
        onClick={calcular}
        disabled={!especie || !superficie || !edad || !densidad}
        className="w-full md:w-auto py-3 px-8 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors disabled:opacity-50"
      >
        Calcular valor de la madera
      </button>

      {resultado && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-green-200 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Volumen estimado
              </p>
              <p className="text-2xl font-bold text-green-700">
                {resultado.volumen.toLocaleString("es-ES")} m³
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Madera en pie
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-green-200 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Peso estimado
              </p>
              <p className="text-2xl font-bold text-green-700">
                {resultado.peso.toLocaleString("es-ES")} t
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Toneladas en verde
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-amber-200 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Valor estimado en pie
              </p>
              <p className="text-2xl font-bold text-amber-700">
                {resultado.valorMin.toLocaleString("es-ES")} – {resultado.valorMax.toLocaleString("es-ES")} €
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Según precios actuales en Galicia
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                resultado.madurez.includes("óptimo")
                  ? "bg-green-100 text-green-800"
                  : resultado.madurez.includes("joven")
                    ? "bg-blue-100 text-blue-800"
                    : resultado.madurez.includes("Casi")
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-orange-100 text-orange-800"
              }`}>
                {resultado.madurez}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              Turno óptimo de corta para esta especie: <strong>{resultado.turnoOptimo}</strong>
            </p>
            <p className="text-sm text-gray-700 mt-3">
              Estos valores son orientativos. El precio real depende del diámetro de los
              troncos, la accesibilidad del monte, la calidad de la madera y la demanda
              del momento. Pide siempre varias ofertas antes de vender.
            </p>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/empezar?tipo=madera"
              className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition-colors"
            >
              Pedir valoración profesional gratis
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
