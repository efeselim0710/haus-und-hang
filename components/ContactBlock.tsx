"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function ContactBlock() {
  return (
    <section className="bg-bergforest-900 text-cream-50 py-32 md:py-44">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <motion.p
          className="mono-caption text-kupfer-500"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          · 006  Termin
        </motion.p>

        <motion.h2
          className="mt-10 font-display text-[clamp(2.4rem,6.5vw,5rem)] font-light leading-[1.02] tracking-tight max-w-[16ch]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
        >
          Wir empfangen Sie im{" "}
          <span className="italic text-kupfer-400">Atelier</span>.
        </motion.h2>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
        >
          <div>
            <p className="mono-caption text-cream-200/60">Adresse</p>
            <p className="mt-4 font-display text-2xl font-light">
              Aeulestrasse 5
              <br />
              9490 Vaduz
            </p>
            <p className="mt-3 text-sm text-cream-200/70 italic">
              Termin nach Vereinbarung.
            </p>
          </div>
          <div>
            <p className="mono-caption text-cream-200/60">Telefon</p>
            <p className="mt-4 font-display text-2xl font-light tracking-tight">
              +423 232 19 87
            </p>
            <p className="mt-3 text-sm text-cream-200/70 italic">
              Mo–Fr · 09 – 12 Uhr / 14 – 17 Uhr
            </p>
          </div>
          <div>
            <p className="mono-caption text-cream-200/60">Brief</p>
            <p className="mt-4 font-display text-2xl font-light">
              anna@hausundhang.li
            </p>
            <p className="mt-3 text-sm text-cream-200/70 italic">
              Antwort innerhalb 48 Stunden.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-cream-200/15 pt-12"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay: 0.35 }}
        >
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-3 border border-cream-50/80 px-6 py-4 font-body text-[11px] tracking-[0.18em] uppercase transition-colors duration-500 hover:bg-cream-50 hover:text-bergforest-950"
          >
            Termin vereinbaren
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <span className="mono-caption text-cream-200/60">
            Oder WhatsApp · +423 232 19 87
          </span>
        </motion.div>
      </div>
    </section>
  );
}
