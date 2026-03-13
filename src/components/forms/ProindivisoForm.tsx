"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  proindivisoSchema,
  situacionProindiviso,
  provincias,
  rangosSuperficie,
  urgencias,
  residencias,
  type ProindivisoLead,
} from "@/lib/lead-schema";
import FormWrapper from "./FormWrapper";
import { RadioGroup, SelectField, TextField, ContactFields } from "./FormFields";

const STEPS = 4;

export default function ProindivisoForm({ origen = "proindiviso" }: { origen?: string }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<ProindivisoLead>({
    resolver: zodResolver(proindivisoSchema),
    defaultValues: { embudo: "proindiviso", origen },
  });

  async function nextStep() {
    const fields: Record<number, (keyof ProindivisoLead)[]> = {
      1: ["situacion_proindiviso"],
      2: ["provincia", "superficie_aprox"],
      3: ["urgencia", "residencia"],
    };
    const valid = await trigger(fields[step] ?? []);
    if (valid) setStep((s) => Math.min(s + 1, STEPS));
  }

  async function onSubmit(data: ProindivisoLead) {
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
        submitLabel="Consultar mi proindiviso"
      >
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Cuál es tu situación con el proindiviso?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Cada proindiviso tiene sus particularidades. Selecciona la más parecida.
            </p>
            <RadioGroup
              name="situacion_proindiviso"
              options={situacionProindiviso}
              register={register}
              error={errors.situacion_proindiviso?.message as string}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Datos del terreno compartido
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              El tipo de terreno y la superficie influyen en las opciones disponibles.
            </p>
            <SelectField name="num_copropietarios" label="¿Cuántos copropietarios hay?" options={["2-3 copropietarios", "4-10 copropietarios", "Más de 10 copropietarios", "No lo sé"]} register={register} />
            <SelectField name="tipo_terreno" label="¿Qué tipo de terreno es?" options={["Monte con madera aprovechable", "Monte sin madera (matorral)", "Terreno agrícola / prado", "Mixto", "No lo sé"]} register={register} />
            <SelectField name="provincia" label="Provincia" options={provincias} register={register} error={errors.provincia?.message as string} required />
            <TextField name="municipio" label="Municipio o parroquia" register={register} placeholder="Ej: Celanova, Becerreá..." />
            <SelectField name="superficie_aprox" label="Superficie total del monte" options={rangosSuperficie} register={register} error={errors.superficie_aprox?.message as string} required />
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
