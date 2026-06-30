"use client";

// components/Navbar.jsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translations, languages } from "@/constants/content";

export default function Navbar({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.home, href: "#home" },
    { label: t.services, href: "#services" },
    { label: t.why, href: "#why" },
    { label: t.process, href: "#process" },
    { label: t.faq, href: "#faq" },
  ];

  const currentLang = languages.find((l) => l.code === lang);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-neutral-950/70 backdrop-blur-xl border-b border-white/5"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Call<span className="text-amber-400">Pro</span>
          </span>
          <span className="hidden sm:inline text-[10px] tracking-[0.2em] uppercase text-neutral-500 border border-neutral-700 rounded-full px-2 py-0.5 group-hover:border-amber-400/50 group-hover:text-amber-400 transition-colors">
            AZ
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-300 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 rounded-full px-3.5 py-1.5 transition-colors bg-white/5"
            >
              <span className="uppercase font-medium tracking-wide">{lang}</span>
              <svg
                className={`w-3 h-3 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        l.code === lang
                          ? "text-amber-400 bg-amber-400/10"
                          : "text-neutral-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA desktop */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center text-sm font-medium text-neutral-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-full px-5 py-2 transition-all shadow-lg shadow-amber-500/20"
          >
            {t.cta}
          </a>

          {/* Burger */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 group"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-white/5 bg-neutral-950/95 backdrop-blur-xl"
          >
            <div className="px-5 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-base text-neutral-200 hover:text-amber-400 py-3 border-b border-white/5 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-5 text-center text-sm font-medium text-neutral-950 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full px-5 py-3"
              >
                {t.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
