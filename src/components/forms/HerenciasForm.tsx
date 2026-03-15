"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  herenciasSchema,
  situacionHerencia,
  numFincas,
  numHerederos,
  provincias,
  urgencias,
  residencias,
  type HerenciasLead,
} from "@/lib/lead-schema";
import FormWrapper from "./FormWrapper";
import { RadioGroup, SelectField, TextField, ContactFields } from "./FormFields";

const STEPS = 4;

export default function HerenciasForm({ origen = "herencias" }: { origen?: string }) {
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
  } = useForm<HerenciasLead>({
    resolver: zodResolver(herenciasSchema),
    defaultValues: { embudo: "herencias", origen },
  });

  const residencia = watch("residencia");
  const showPais = residencia && residencia !== "Vivo en Galicia" && residencia !== "Vivo en el resto de España";

  async function nextStep() {
    const fields: Record<number, (keyof HerenciasLead)[]> = {
      1: ["situacion_herencia"],
      2: ["provincia"],
      3: ["urgencia", "residencia"],
    };
    const valid = await trigger(fields[step] ?? []);
    if (valid) setStep((s) => Math.min(s + 1, STEPS));
  }

  async function onSubmit(data: HerenciasLead) {
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
        submitLabel="Consultar mi herencia"
      >
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Cuál es tu situación con la herencia?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Cada caso es diferente. Selecciona lo que más se parezca a tu situación.
            </p>
            <RadioGroup
              name="situacion_herencia"
              options={situacionHerencia}
              register={register}
              error={errors.situacion_herencia?.message as string}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Detalles de la herencia
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Cuanto más sepamos, mejor podremos orientarte sobre los trámites y costes.
            </p>
            <SelectField name="anos_fallecimiento" label="¿Cuándo falleció la persona?" options={["Menos de 6 meses", "6 meses - 1 año", "1-5 años", "5-20 años", "Más de 20 años", "No lo sé"]} register={register} />
            <SelectField name="num_fincas" label="¿Cuántas fincas o parcelas hay?" options={numFincas} register={register} />
            <SelectField name="num_herederos" label="¿Cuántos herederos sois?" options={numHerederos} register={register} />
            <SelectField name="tiene_escrituras" label="¿Existen escrituras de las fincas?" options={["Sí", "No", "Algunas", "No lo sé"]} register={register} />
            <SelectField name="provincia" label="Provincia donde están las fincas" options={provincias} register={register} error={errors.provincia?.message as string} required />
            <TextField name="municipio" label="Municipio o parroquia" register={register} placeholder="Ej: Monforte, Ourense..." />
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Tu situación personal
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Un abogado especializado te contactará para orientarte.
            </p>
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">¿Cuánta urgencia tienes?</h4>
              <RadioGroup
                name="urgencia"
                options={urgencias}
                register={register}
                error={errors.urgencia?.message as string}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">¿Dónde vives actualmente?</h4>
              <RadioGroup
                name="residencia"
                options={residencias}
                register={register}
                error={errors.residencia?.message as string}
              />
              {showPais && (
                <div className="mt-3">
                  <TextField name="pais_residencia" label="¿En qué país?" register={register} placeholder="Ej: Argentina, Suiza..." />
                </div>
              )}
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
