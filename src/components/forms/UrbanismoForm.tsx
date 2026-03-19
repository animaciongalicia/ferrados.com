"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  urbanismoSchema,
  consultaUrbanismo,
  tipoSueloActual,
  provincias,
  rangosSuperficie,
  urgencias,
  residencias,
  type UrbanismoLead,
} from "@/lib/lead-schema";
import FormWrapper from "./FormWrapper";
import { RadioGroup, SelectField, TextField, ContactFields } from "./FormFields";

const STEPS = 4;

export default function UrbanismoForm({ origen = "urbanismo" }: { origen?: string }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<UrbanismoLead>({
    resolver: zodResolver(urbanismoSchema),
    defaultValues: { embudo: "urbanismo", origen },
  });

  async function nextStep() {
    const fields: Record<number, (keyof UrbanismoLead)[]> = {
      1: ["consulta_urbanismo"],
      2: ["tipo_suelo_actual", "provincia", "superficie_aprox"],
      3: ["urgencia", "residencia"],
    };
    const valid = await trigger(fields[step] ?? []);
    if (valid) setStep((s) => Math.min(s + 1, STEPS));
  }

  async function onSubmit(data: UrbanismoLead) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, origen, url_origen: window.location.href }),
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
        submitLabel="Enviar mi consulta"
      >
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Qué necesitas saber?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Selecciona la consulta que mejor describe tu situación.
            </p>
            <RadioGroup
              name="consulta_urbanismo"
              options={consultaUrbanismo}
              register={register}
              error={errors.consulta_urbanismo?.message as string}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Sobre tu finca
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Estos datos ayudan a que un técnico pueda orientarte mejor.
            </p>
            <SelectField name="tipo_suelo_actual" label="Tipo de suelo actual" options={[...tipoSueloActual]} register={register} error={errors.tipo_suelo_actual?.message as string} required />
            <SelectField name="provincia" label="Provincia" options={provincias} register={register} error={errors.provincia?.message as string} required />
            <TextField name="municipio" label="Municipio o parroquia" register={register} placeholder="Ej: Lalín, Viveiro..." />
            <SelectField name="superficie_aprox" label="Superficie aproximada" options={rangosSuperficie} register={register} error={errors.superficie_aprox?.message as string} required />
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Cuánta urgencia tienes?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Un técnico especializado en urbanismo rural te contactará.
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
