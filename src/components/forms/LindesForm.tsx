"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  lindesSchema,
  problemaLindes,
  provincias,
  rangosSuperficie,
  urgencias,
  residencias,
  type LindesLead,
} from "@/lib/lead-schema";
import FormWrapper from "./FormWrapper";
import { RadioGroup, SelectField, TextField, ContactFields } from "./FormFields";

const STEPS = 4;

export default function LindesForm({ origen = "lindes" }: { origen?: string }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<LindesLead>({
    resolver: zodResolver(lindesSchema),
    defaultValues: { embudo: "lindes", origen },
  });

  async function nextStep() {
    const fields: Record<number, (keyof LindesLead)[]> = {
      1: ["problema_lindes"],
      2: ["provincia", "superficie_aprox"],
      3: ["urgencia", "residencia"],
    };
    const valid = await trigger(fields[step] ?? []);
    if (valid) setStep((s) => Math.min(s + 1, STEPS));
  }

  async function onSubmit(data: LindesLead) {
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
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setSubmitting(false);
    }
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
        submitLabel="Solicitar medición"
      >
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Qué problema tienes con tu finca?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Un topógrafo o ingeniero técnico de tu zona podrá ayudarte.
            </p>
            <RadioGroup
              name="problema_lindes"
              options={problemaLindes}
              register={register}
              error={errors.problema_lindes?.message as string}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Datos de la parcela
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Esto permite calcular el coste aproximado del trabajo técnico.
            </p>
            <SelectField name="provincia" label="Provincia" options={provincias} register={register} error={errors.provincia?.message as string} required />
            <TextField name="municipio" label="Municipio o parroquia" register={register} placeholder="Ej: Ribadeo, Verín..." />
            <SelectField name="superficie_aprox" label="Superficie aproximada" options={rangosSuperficie} register={register} error={errors.superficie_aprox?.message as string} required />
            <SelectField name="tiene_referencia_catastral" label="¿Tienes la referencia catastral?" options={["Sí", "No", "No lo sé"]} register={register} />
            <SelectField name="motivo_medicion" label="¿Para qué necesitas la medición?" options={["Para vender la finca", "Para heredar / escriturar", "Para resolver un conflicto de lindes", "Para aprovechar la madera", "Para saber qué tengo exactamente"]} register={register} />
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Tu situación
            </h3>
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">¿Cuánta urgencia tienes?</h4>
              <RadioGroup name="urgencia" options={urgencias} register={register} error={errors.urgencia?.message as string} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">¿Dónde vives?</h4>
              <RadioGroup name="residencia" options={residencias} register={register} error={errors.residencia?.message as string} />
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
