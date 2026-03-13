"use client";

import { useState, type ReactNode } from "react";

interface FormWrapperProps {
  totalSteps: number;
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  submitLabel?: string;
  children: ReactNode;
}

export default function FormWrapper({
  totalSteps,
  currentStep,
  onNext,
  onPrev,
  onSubmit,
  submitting,
  submitted,
  error,
  submitLabel = "Enviar mi consulta",
  children,
}: FormWrapperProps) {
  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-xl mx-auto">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          ¡Recibido! Estamos analizando tu caso
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Un profesional especializado en tu zona revisará tu situación
          y te contactará a la mayor brevedad. No te cobramos nada por
          esta consulta.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 max-w-xl mx-auto shadow-sm">
      {/* Progress */}
      <div className="flex items-center gap-1 mb-6">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < currentStep ? "bg-green-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {children}

      {error && (
        <p className="text-red-600 text-sm mt-3 bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <div className="flex gap-3 mt-6">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onPrev}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Atrás
          </button>
        )}

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={onNext}
            className="flex-1 py-3 px-4 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors"
          >
            Siguiente
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className="flex-1 py-3 px-4 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors disabled:opacity-50"
          >
            {submitting ? "Enviando..." : submitLabel}
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-3">
        Paso {currentStep} de {totalSteps} — Tu información es confidencial
      </p>
    </div>
  );
}
