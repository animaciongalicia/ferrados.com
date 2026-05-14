"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

// Reusable form field components

interface RadioGroupProps {
  name: string;
  options: readonly string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
}

export function RadioGroup({ name, options, register, error }: RadioGroupProps) {
  return (
    <div>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-green-400 has-[:checked]:border-green-600 has-[:checked]:bg-green-50 transition-colors"
          >
            <input
              type="radio"
              value={opt}
              {...register(name)}
              className="mt-0.5 text-green-700 focus:ring-green-600"
            />
            <span className="text-sm font-medium text-gray-800">{opt}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: readonly string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function SelectField({
  name,
  label,
  options,
  register,
  error,
  required,
  placeholder = "Selecciona...",
}: SelectFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register(name)}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600 bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

interface TextFieldProps {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export function TextField({
  name,
  label,
  register,
  error,
  type = "text",
  placeholder,
  required,
}: TextFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600"
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

interface ContactFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export function ContactFields({ register, errors }: ContactFieldsProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        Tus datos de contacto
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Un profesional te contactará para ayudarte. Necesitamos al menos un email o un teléfono.
      </p>

      <TextField
        name="nombre"
        label="Nombre"
        register={register}
        error={errors.nombre?.message as string}
        placeholder="Tu nombre"
        required
      />
      <TextField
        name="email"
        label="Email"
        register={register}
        error={errors.email?.message as string}
        type="email"
        placeholder="tu@email.com"
      />
      <TextField
        name="telefono"
        label="Teléfono"
        register={register}
        error={errors.telefono?.message as string}
        type="tel"
        placeholder="600 000 000"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ¿Algo más que quieras contarnos?
        </label>
        <textarea
          {...register("comentarios")}
          rows={3}
          placeholder="Describe brevemente tu situación si quieres..."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-green-600 focus:border-green-600 resize-none"
        />
      </div>
    </div>
  );
}
