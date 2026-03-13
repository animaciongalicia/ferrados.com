"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  limpiezaSchema,
  estadoNotificacion,
  provincias,
  rangosSuperficie,
  tipoVegetacion,
  cercaniaPoblacion,
  urgencias,
  residencias,
  type LimpiezaLead,
} from "@/lib/lead-schema";
import FormWrapper from "./FormWrapper";
import { RadioGroup, SelectField, TextField, ContactFields } from "./FormFields";

const STEPS = 4;

/** Rangos de coste orientativo según superficie (ferrados) */
const costePorSuperficie: Record<string, string> = {
  "Muy pequeña (menos de 1 ferrado, < 500 m²)": "150 – 400 €",
  "Pequeña (de 1 a 5 ferrados, aprox. 500 – 2.500 m²)": "300 – 800 €",
  "Mediana (de 5 a 10 ferrados, aprox. 2.500 – 5.000 m²)": "600 – 1.500 €",
  "Grande (de 10 a 20 ferrados, aprox. 5.000 – 10.000 m² ≈ hasta 1 ha)": "1.000 – 2.500 €",
  "Muy grande (de 1 a 5 hectáreas)": "2.000 – 5.000 €",
  "Excepcional (más de 5 hectáreas)": "Presupuesto a medida",
};

export default function LimpiezaForm({ origen = "limpieza" }: { origen?: string }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [costeEstimado, setCosteEstimado] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<LimpiezaLead>({
    resolver: zodResolver(limpiezaSchema),
    defaultValues: { embudo: "limpieza", origen },
  });

  async function nextStep() {
    const fields: Record<number, (keyof LimpiezaLead)[]> = {
      1: ["estado_notificacion"],
      2: ["provincia", "superficie_aprox", "cerca_poblacion"],
      3: ["urgencia", "residencia"],
    };
    const valid = await trigger(fields[step] ?? []);
    if (valid) setStep((s) => Math.min(s + 1, STEPS));
  }

  async function onSubmit(data: LimpiezaLead) {
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
        throw new Error(body.error || "Error al enviar");
      }
      setCosteEstimado(costePorSuperficie[data.superficie_aprox] ?? null);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 max-w-xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">✓</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">
            ¡Recibido! Estamos buscando un profesional para ti
          </h3>
        </div>

        {costeEstimado && (
          <div className="bg-white border border-green-200 rounded-lg p-5 mb-5">
            <p className="text-sm font-medium text-gray-600 mb-1">
              Coste orientativo de limpieza para tu finca:
            </p>
            <p className="text-2xl font-bold text-green-800">{costeEstimado}</p>
            <p className="text-xs text-gray-500 mt-2">
              * Precio estimado según la superficie indicada. El coste final
              depende del tipo de vegetación, pendiente, acceso y estado de
              abandono. Una empresa de desbroce de tu zona te dará un
              presupuesto exacto.
            </p>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-gray-700">
          <p className="font-semibold text-amber-800 mb-1">¿Qué pasa ahora?</p>
          <p>
            Una empresa de desbroce profesional de tu zona revisará tu caso y se
            pondrá en contacto contigo para darte un presupuesto sin compromiso.
            No necesitas hacer nada más.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("embudo")} />
      <input type="hidden" {...register("origen")} />

      <FormWrapper
        totalSteps={STEPS}
        currentStep={step}
        onNext={nextStep}
        onPrev={() => setStep((s) => Math.max(s - 1, 1))}
        onSubmit={handleSubmit(onSubmit)}
        submitting={submitting}
        submitted={submitted}
        error={error}
        submitLabel="Calcular coste de limpieza"
      >
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Cuál es tu situación con la limpieza?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Esto nos ayuda a saber la urgencia real de tu caso.
            </p>
            <RadioGroup
              name="estado_notificacion"
              options={estadoNotificacion}
              register={register}
              error={errors.estado_notificacion?.message as string}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Sobre tu finca
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Estos datos son clave para estimar el coste de la limpieza.
            </p>
            <SelectField name="provincia" label="Provincia" options={provincias} register={register} error={errors.provincia?.message as string} required />
            <TextField name="municipio" label="Municipio o parroquia" register={register} placeholder="Ej: Lalín, Viveiro..." />
            <SelectField name="superficie_aprox" label="Superficie aproximada" options={rangosSuperficie} register={register} error={errors.superficie_aprox?.message as string} required />
            <SelectField name="tipo_vegetacion" label="Tipo de vegetación" options={tipoVegetacion} register={register} placeholder="Selecciona (opcional)..." />
            <SelectField name="cerca_poblacion" label="¿Está cerca de viviendas?" options={cercaniaPoblacion} register={register} error={errors.cerca_poblacion?.message as string} required />
            <SelectField name="acceso_vehiculo" label="¿Se puede acceder con maquinaria?" options={["Sí", "No", "No lo sé"]} register={register} placeholder="Selecciona (opcional)..." />
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Cuánta urgencia tienes?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Un profesional de tu zona te contactará para darte presupuesto.
            </p>
            <RadioGroup
              name="urgencia"
              options={urgencias}
              register={register}
              error={errors.urgencia?.message as string}
            />
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">¿Dónde vives?</h4>
              <RadioGroup
                name="residencia"
                options={residencias}
                register={register}
                error={errors.residencia?.message as string}
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <ContactFields register={register} errors={errors} />
        )}
      </FormWrapper>
    </form>
  );
}
