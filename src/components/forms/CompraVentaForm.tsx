"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  compraVentaSchema,
  tipoOperacion,
  tipoTerreno,
  situacionDocumental,
  provincias,
  rangosSuperficie,
  urgencias,
  residencias,
  type CompraVentaLead,
} from "@/lib/lead-schema";
import FormWrapper from "./FormWrapper";
import { RadioGroup, SelectField, TextField, ContactFields } from "./FormFields";

const STEPS = 4;

export default function CompraVentaForm({ origen = "compraventa" }: { origen?: string }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CompraVentaLead>({
    resolver: zodResolver(compraVentaSchema),
    defaultValues: { embudo: "compraventa", origen },
  });

  async function nextStep() {
    const fields: Record<number, (keyof CompraVentaLead)[]> = {
      1: ["tipo_operacion"],
      2: ["tipo_terreno", "provincia", "superficie_aprox"],
      3: ["urgencia", "residencia"],
    };
    const valid = await trigger(fields[step] ?? []);
    if (valid) setStep((s) => Math.min(s + 1, STEPS));
  }

  async function onSubmit(data: CompraVentaLead) {
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
        submitLabel="Enviar mi consulta"
      >
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Qué necesitas?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Selecciona la opción que mejor describe tu situación.
            </p>
            <RadioGroup
              name="tipo_operacion"
              options={tipoOperacion}
              register={register}
              error={errors.tipo_operacion?.message as string}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Sobre el terreno
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Estos datos ayudan a que un profesional pueda orientarte mejor.
            </p>
            <SelectField name="tipo_terreno" label="Tipo de terreno" options={[...tipoTerreno]} register={register} error={errors.tipo_terreno?.message as string} required />
            <SelectField name="situacion_documental" label="Situación documental" options={[...situacionDocumental]} register={register} placeholder="Selecciona (opcional)..." />
            <SelectField name="provincia" label="Provincia" options={provincias} register={register} error={errors.provincia?.message as string} required />
            <TextField name="municipio" label="Municipio o parroquia" register={register} placeholder="Ej: Lalín, Viveiro..." />
            <SelectField name="superficie_aprox" label="Superficie aproximada" options={rangosSuperficie} register={register} error={errors.superficie_aprox?.message as string} required />
            <SelectField name="tiene_acceso" label="¿Tiene acceso por carretera o pista?" options={["Sí, por carretera o pista", "Acceso difícil / solo a pie", "No lo sé"]} register={register} placeholder="Selecciona (opcional)..." />
            <SelectField name="precio_orientativo" label="Precio orientativo que tienes en mente" options={["Menos de 5.000 €", "5.000 – 15.000 €", "15.000 – 50.000 €", "Más de 50.000 €", "No tengo ni idea"]} register={register} placeholder="Selecciona (opcional)..." />
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              ¿Cuánta urgencia tienes?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Un profesional inmobiliario de tu zona te contactará.
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
