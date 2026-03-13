"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  maderaSchema,
  especieArbol,
  edadPlantacion,
  provincias,
  rangosSuperficie,
  urgencias,
  residencias,
  type MaderaLead,
} from "@/lib/lead-schema";
import FormWrapper from "./FormWrapper";
import { RadioGroup, SelectField, TextField, ContactFields } from "./FormFields";

const STEPS = 4;

export default function MaderaForm({ origen = "madera" }: { origen?: string }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<MaderaLead>({
    resolver: zodResolver(maderaSchema),
    defaultValues: { embudo: "madera", origen },
  });

  async function nextStep() {
    const fields: Record<number, (keyof MaderaLead)[]> = {
      1: ["especie_arbol", "edad_plantacion"],
      2: ["provincia", "superficie_aprox"],
      3: ["urgencia", "residencia"],
    };
    const valid = await trigger(fields[step] ?? []);
    if (valid) setStep((s) => Math.min(s + 1, STEPS));
  }

  async function onSubmit(data: MaderaLead) {
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
        submitLabel="Pedir valoración de mi madera"
      >
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Qué madera tienes?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              La especie y la edad son los dos factores que más influyen en el precio.
            </p>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Especie principal</h4>
              <RadioGroup
                name="especie_arbol"
                options={especieArbol}
                register={register}
                error={errors.especie_arbol?.message as string}
              />
            </div>
            <SelectField
              name="edad_plantacion"
              label="Edad aproximada de la plantación"
              options={edadPlantacion}
              register={register}
              error={errors.edad_plantacion?.message as string}
              required
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Datos del monte
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              El acceso para camiones y la superficie determinan si la corta es viable.
            </p>
            <SelectField name="provincia" label="Provincia" options={provincias} register={register} error={errors.provincia?.message as string} required />
            <TextField name="municipio" label="Municipio o parroquia" register={register} placeholder="Ej: Mondoñedo, Ponteareas..." />
            <SelectField name="superficie_aprox" label="Superficie con árboles" options={rangosSuperficie} register={register} error={errors.superficie_aprox?.message as string} required />
            <SelectField name="tiene_acceso_camion" label="¿Llega un camión hasta el monte?" options={["Sí, llega un camión", "No, no hay acceso", "No lo sé"]} register={register} />
            <SelectField name="cortas_previas" label="¿Se ha cortado madera antes?" options={["Sí, se ha cortado antes", "No, es la primera corta", "No lo sé"]} register={register} />
            <SelectField name="tiene_permiso_corta" label="¿Tienes permiso de corta?" options={["Sí", "No", "No sé qué es eso"]} register={register} />
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Tu situación
            </h3>
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">¿Cuándo quieres vender?</h4>
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
