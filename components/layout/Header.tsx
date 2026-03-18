"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
];

function LinkyLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradientHeader" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B7BF2" />
            <stop offset="100%" stopColor="#6EA8FE" />
          </linearGradient>
        </defs>
        <rect width="30" height="30" rx="8" fill="url(#logoGradientHeader)" />
        <text
          x="15"
          y="21"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          L
        </text>
      </svg>
      <span className="text-xl font-bold text-gray-900">Linky</span>
    </Link>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-1/2 z-50 w-full -translate-x-1/2 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/60 bg-white/70 px-6 py-3 shadow-lg shadow-black/3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <LinkyLogo />

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#contact"
              className="px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
            >
              Contact
            </a>
            <a
              href="#login"
              className="rounded-lg border border-gray-400 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-900"
            >
              Login
            </a>
            <a
              href="#get-card"
              className="inline-flex items-center rounded-full bg-linear-to-r from-[#5D52BF] to-[#4dafd7] px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
            >
              Get Your Linky Card
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-white/60 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mt-3 border-t border-gray-200/50 pt-3 lg:hidden">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-white/60 hover:text-gray-900"
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-2 border-gray-200/50" />
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-white/60 hover:text-gray-900"
              >
                Contact
              </a>
              <a
                href="#login"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-white/60 hover:text-gray-900"
              >
                Login
              </a>
              <a
                href="#get-card"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-full bg-linear-to-r from-[#5D52BF] to-[#4dafd7] px-5 py-3 text-center text-base font-semibold text-white shadow-md"
              >
                Get Your Linky Card
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
