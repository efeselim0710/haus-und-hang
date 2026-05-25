"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "/#portfolio", label: "Kaufen/Mieten" },
  { href: "/#off-market", label: "Off-Market" },
  { href: "/team", label: "Team" },
  { href: "/#kontakt", label: "Kontakt" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function BurgerIcon({ open }: { open: boolean }) {
  // Drei stacked spans → rotate zu X beim Öffnen. bg-current erbt die
  // aktuelle Text-Farbe (cream-50 auf dark Nav, stein-900 auf scrolled).
  return (
    <span aria-hidden className="relative block w-6 h-5">
      <span
        className={`absolute left-0 w-full h-px bg-current transition-all duration-300 ease-out ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-current transition-opacity duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 w-full h-px bg-current transition-all duration-300 ease-out ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0.5"
        }`}
      />
    </span>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body-Scroll-Lock + ESC-Key Handler.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-cream-50/95 text-stein-900 backdrop-blur-md border-b border-cream-200"
            : "bg-transparent text-cream-50",
        ].join(" ")}
        style={{ transitionTimingFunction: "var(--ease-bergforest)" }}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12 md:py-6">
          <Link
            href="/"
            className="font-body text-[11px] tracking-[0.22em] uppercase"
          >
            Haus und Hang
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-[11px] tracking-[0.18em] uppercase hover:text-kupfer-500 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <span className="font-body text-[11px] tracking-[0.18em] uppercase opacity-60">
              DE <span className="mx-1 opacity-40">|</span> EN
            </span>
            <Link
              href="/#kontakt"
              className={[
                "font-body text-[11px] tracking-[0.18em] uppercase",
                "border px-4 py-2.5",
                scrolled
                  ? "border-stein-900 hover:bg-stein-900 hover:text-cream-50"
                  : "border-cream-50 hover:bg-cream-50 hover:text-stein-900",
                "transition-colors duration-300",
              ].join(" ")}
            >
              Termin
            </Link>
          </div>

          {/* Burger — Mobile only. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-1 -mr-1"
            aria-label={open ? "Navigation schliessen" : "Navigation öffnen"}
            aria-expanded={open}
          >
            <BurgerIcon open={open} />
          </button>
        </div>
      </header>

      {/* Mobile-Vollbild-Overlay. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[60] bg-bergforest-950 text-cream-50 md:hidden flex flex-col"
          >
            {/* Topbar matched mit Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-body text-[11px] tracking-[0.22em] uppercase"
              >
                Haus und Hang
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 -mr-1"
                aria-label="Navigation schliessen"
              >
                <BurgerIcon open />
              </button>
            </div>

            {/* Links — Fraunces gross, staggered. */}
            <nav className="flex flex-col gap-6 px-6 pt-12 flex-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-light tracking-tight hover:text-kupfer-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              {/* Trennlinie */}
              <span className="block h-px bg-cream-50/10 my-8" />

              {/* TERMIN-Button full-width */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
              >
                <Link
                  href="/#kontakt"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center font-body text-xs tracking-[0.22em] uppercase border border-cream-50 px-4 py-4 hover:bg-cream-50 hover:text-bergforest-950 transition-colors duration-300"
                >
                  Termin vereinbaren
                </Link>
              </motion.div>

              {/* DE/EN */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
                className="mt-6 font-body text-[11px] tracking-[0.22em] uppercase opacity-60"
              >
                DE <span className="mx-2 opacity-40">|</span> EN
              </motion.div>
            </nav>

            {/* Kontakt-Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
              className="px-6 pb-10 pt-8 border-t border-cream-50/10 space-y-2"
            >
              <p className="mono-caption text-cream-50/55">
                AEULESTRASSE 5 · 9490 VADUZ
              </p>
              <a
                href="tel:+4232328719"
                className="block font-body text-sm tracking-[0.15em] uppercase text-cream-50/85 hover:text-kupfer-400 transition-colors"
              >
                +423 232 87 19
              </a>
              <a
                href="mailto:anna@hausundhang.li"
                className="block font-body text-sm tracking-[0.15em] uppercase text-cream-50/85 hover:text-kupfer-400 transition-colors"
              >
                anna@hausundhang.li
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
