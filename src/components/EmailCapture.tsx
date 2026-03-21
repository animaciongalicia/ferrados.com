"use client";

import { useState } from "react";

interface EmailCaptureProps {
  origen: string;
}

export default function EmailCapture({ origen }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, origen, url_origen: window.location.href }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <p className="text-green-800 font-semibold text-sm">
          Listo. Te avisamos cada semana con lo nuevo de La Gaceta.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
      <input
        type="email"
        required
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-green-800 transition-colors disabled:opacity-50 whitespace-nowrap"
      >
        {status === "loading" ? "Enviando..." : "Suscribirme"}
      </button>
      {status === "error" && (
        <p className="text-red-600 text-xs sm:hidden">Error al suscribirte. Inténtalo de nuevo.</p>
      )}
    </form>
  );
}
