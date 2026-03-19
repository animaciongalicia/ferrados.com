"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  tramitesSchema,
  tipoTramite,
  provincias,
  urgencias,
  residencias,
  type TramitesLead,
} from "@/lib/lead-schema";
import FormWrapper from "./FormWrapper";
import { RadioGroup, SelectField, TextField, ContactFields } from "./FormFields";

const STEPS = 4;

export default function TramitesForm({ origen = "tramites" }: { origen?: string }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<TramitesLead>({
    resolver: zodResolver(tramitesSchema),
    defaultValues: { embudo: "tramites", origen },
  });

  async function nextStep() {
    const fields: Record<number, (keyof TramitesLead)[]> = {
      1: ["tipo_tramite"],
      2: ["provincia"],
      3: ["urgencia", "residencia"],
    };
    const valid = await trigger(fields[step] ?? []);
    if (valid) setStep((s) => Math.min(s + 1, STEPS));
  }

  async function onSubmit(data: TramitesLead) {
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
              ¿Qué trámite necesitas?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Selecciona la opción que mejor describe tu situación.
            </p>
            <RadioGroup
              name="tipo_tramite"
              options={tipoTramite}
              register={register}
              error={errors.tipo_tramite?.message as string}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Sobre tu finca
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Estos datos ayudan a que un profesional pueda orientarte mejor.
            </p>
            <SelectField name="tiene_escrituras" label="¿Tienes escrituras?" options={["Sí", "No", "Algunas", "No lo sé"]} register={register} placeholder="Selecciona (opcional)..." />
            <SelectField name="provincia" label="Provincia" options={provincias} register={register} error={errors.provincia?.message as string} required />
            <TextField name="municipio" label="Municipio o parroquia" register={register} placeholder="Ej: Lalín, Viveiro..." />
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Cuánta urgencia tienes?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Un abogado o gestor especializado en fincas te contactará.
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
