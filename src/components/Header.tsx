"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/herencias-montes-galicia", label: "Herencias" },
  { href: "/localizar-medir-fincas-galicia", label: "Fincas y Catastro" },
  { href: "/precio-venta-madera-galicia", label: "Venta de Madera" },
  { href: "/limpieza-desbroce-multas-xunta", label: "Limpieza y Multas" },
  { href: "/vender-parte-monte-proindiviso", label: "Proindivisos" },
  { href: "/compra-venta-terrenos-galicia", label: "Compra-venta" },
  { href: "/blog", label: "La Gaceta" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Ferrados.com" width={32} height={32} priority />
          <span className="text-xl font-bold text-green-800">Ferrados.com</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-700 hover:text-green-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/empezar"
            className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors"
          >
            Empezar ahora
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-gray-100 bg-white px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-gray-700 hover:text-green-700 border-b border-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/empezar"
            className="block mt-3 bg-green-700 text-white text-center px-4 py-3 rounded-lg font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Empezar ahora
          </Link>
        </nav>
      )}
    </header>
  );
}
