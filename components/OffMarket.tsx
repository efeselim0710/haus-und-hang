"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function OffMarket() {
  return (
    <section
      id="off-market"
      className="relative bg-bergforest-950 text-cream-50 overflow-hidden"
    >
      {/* Subtile topografische Linien als Hintergrund-Geste. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-radial-gradient(ellipse 80% 40% at 70% 50%, transparent 0px, transparent 60px, #B87333 60px, #B87333 61px)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 py-32 md:py-44">
        <motion.p
          className="mono-caption text-kupfer-500"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          · 003  Private Office
        </motion.p>

        <motion.h2
          className="mt-10 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.02] tracking-tight max-w-[18ch]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
        >
          Sieben Adressen, die nicht im{" "}
          <span className="italic text-kupfer-400">Portfolio</span> erscheinen.
        </motion.h2>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-10">
          <motion.div
            className="md:col-span-2 mono-caption text-cream-200/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
          >
            Aufnahme
          </motion.div>

          <motion.div
            className="md:col-span-7 max-w-[50ch]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
          >
            <p className="text-[17px] md:text-[19px] leading-[1.7] text-cream-100/90">
              Mandate, deren Diskretion Bedingung des Verkaufs ist, vergeben
              wir ausschliesslich auf Anfrage. Voraussetzung ist eine
              vorherige persönliche Begegnung — im Atelier in Vaduz oder
              an der Adresse selbst.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-3 border border-kupfer-500 text-kupfer-400 px-6 py-4 font-body text-[11px] tracking-[0.18em] uppercase transition-colors duration-500 hover:bg-kupfer-500 hover:text-bergforest-950"
              >
                Anfrage einreichen
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <span className="mono-caption text-cream-200/50">
                Antwort innerhalb 48 h
              </span>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-3 md:border-l md:border-cream-200/15 md:pl-10"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay: 0.45 }}
          >
            <p className="mono-caption text-cream-200/60">Verantwortlich</p>
            <p className="mt-4 font-display text-2xl font-light">
              Felix Risch
            </p>
            <p className="mt-1 text-sm text-cream-200/70">
              Private Office · Off-Market
            </p>
            <p className="mt-4 text-sm text-cream-200/60 italic max-w-[24ch]">
              Drei Aufnahmen im laufenden Jahr.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
