"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  leadSchema,
  tiposProblema,
  provincias,
  rangosSuperficie,
  tiposUso,
  rangoEdadMadera,
  residencias,
  type LeadFormData,
} from "@/lib/lead-schema";

interface LeadFormProps {
  origen?: string;
}

const TOTAL_STEPS = 5;

const labelProblema: Record<string, string> = {
  herencia: "Herencia / sucesión",
  madera: "Vender madera",
  limpieza: "Limpieza / multas",
  lindes: "Localizar / medir finca",
  proindiviso: "Proindiviso / copropietarios",
  "compra-venta": "Comprar o vender terreno",
  otro: "Otro tema",
};

export default function LeadForm({ origen = "general" }: LeadFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      origen,
      tipo_problema: undefined,
      provincia: undefined,
      superficie_aprox: undefined,
      tipo_uso: undefined,
      edad_madera_aprox: undefined,
      residencia: undefined,
      nombre: "",
      email: "",
      telefono: "",
      comentarios: "",
    },
  });

  const tipoProblema = watch("tipo_problema");
  const showMadera = tipoProblema === "madera";

  async function nextStep() {
    const fieldsPerStep: Record<number, (keyof LeadFormData)[]> = {
      1: ["tipo_problema"],
      2: ["provincia", "superficie_aprox"],
      3: ["residencia"],
      4: ["nombre"],
    };
    const fields = fieldsPerStep[step];
    if (fields) {
      const valid = await trigger(fields);
      if (!valid) return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function onSubmit(data: LeadFormData) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, origen }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Error al enviar el formulario");
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
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-lg mx-auto">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          ¡Gracias! Hemos recibido tu consulta
        </h3>
        <p className="text-gray-600">
          Revisaremos tu caso y te contactaremos lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="flex items-center gap-1 mb-6">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < step ? "bg-green-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("origen")} />

        {/* Step 1: Tipo de problema */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Qué necesitas resolver?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Selecciona la opción que mejor describe tu situación.
            </p>
            <div className="space-y-2">
              {tiposProblema.map((tipo) => (
                <label
                  key={tipo}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-green-400 has-[:checked]:border-green-600 has-[:checked]:bg-green-50 transition-colors"
                >
                  <input
                    type="radio"
                    value={tipo}
                    {...register("tipo_problema")}
                    className="text-green-700 focus:ring-green-600"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {labelProblema[tipo]}
                  </span>
                </label>
              ))}
            </div>
            {errors.tipo_problema && (
              <p className="text-red-600 text-sm mt-2">{errors.tipo_problema.message}</p>
            )}
          </div>
        )}

        {/* Step 2: Info finca */}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Sobre la finca o monte
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              No hace falta que seas exacto, un dato aproximado nos vale.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provincia
              </label>
              <select
                {...register("provincia")}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
              >
                <option value="">Selecciona...</option>
                {provincias.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              {errors.provincia && (
                <p className="text-red-600 text-sm mt-1">{errors.provincia.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Superficie aproximada
              </label>
              <select
                {...register("superficie_aprox")}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
              >
                <option value="">Selecciona...</option>
                {rangosSuperficie.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              {errors.superficie_aprox && (
                <p className="text-red-600 text-sm mt-1">{errors.superficie_aprox.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de uso o arbolado
              </label>
              <select
                {...register("tipo_uso")}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
              >
                <option value="">Selecciona (opcional)...</option>
                {tiposUso.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {showMadera && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Edad aproximada de la madera
                </label>
                <select
                  {...register("edad_madera_aprox")}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
                >
                  <option value="">Selecciona (opcional)...</option>
                  {rangoEdadMadera.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Residencia */}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Dónde vives actualmente?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Esto nos ayuda a entender cómo podemos ayudarte mejor.
            </p>
            <div className="space-y-2">
              {residencias.map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-green-400 has-[:checked]:border-green-600 has-[:checked]:bg-green-50 transition-colors"
                >
                  <input
                    type="radio"
                    value={r}
                    {...register("residencia")}
                    className="text-green-700 focus:ring-green-600"
                  />
                  <span className="text-sm font-medium text-gray-800">{r}</span>
                </label>
              ))}
            </div>
            {errors.residencia && (
              <p className="text-red-600 text-sm mt-2">{errors.residencia.message}</p>
            )}
          </div>
        )}

        {/* Step 4: Datos de contacto */}
        {step === 4 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Tus datos de contacto
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Necesitamos al menos un email o un teléfono.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                {...register("nombre")}
                placeholder="Tu nombre"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
              />
              {errors.nombre && (
                <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="tu@email.com"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                {...register("telefono")}
                placeholder="600 000 000"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
              />
              {errors.telefono && (
                <p className="text-red-600 text-sm mt-1">{errors.telefono.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Comentarios */}
        {step === 5 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Algo más que debamos saber?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Opcional: cuéntanos los detalles que quieras sobre tu situación.
            </p>

            <textarea
              {...register("comentarios")}
              rows={4}
              placeholder="Describe brevemente tu situación..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600 resize-none"
            />
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="text-red-600 text-sm mt-3 bg-red-50 p-3 rounded-lg">{error}</p>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Atrás
            </button>
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 py-3 px-4 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 px-4 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors disabled:opacity-50"
            >
              {submitting ? "Enviando..." : "Enviar mi consulta"}
            </button>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          Paso {step} de {TOTAL_STEPS}
        </p>
      </form>
    </div>
  );
}
