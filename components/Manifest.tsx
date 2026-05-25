"use client";

import { motion } from "motion/react";

export default function Manifest() {
  return (
    <section
      id="manifest"
      className="bg-cream-50 text-stein-900 py-32 md:py-44"
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <motion.p
          className="mono-caption text-stein-500"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          · 001  Haltung
        </motion.p>

        <motion.h2
          className="mt-10 font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-[1.1] tracking-tight max-w-[22ch]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
        >
          Eine Adresse ist nicht das, was sie kostet. Es ist das, was
          <span className="italic text-kupfer-600"> bleibt</span>, wenn der
          Preis vergessen ist.
        </motion.h2>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12 max-w-[920px]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.25 }}
        >
          <div className="md:col-span-2 mono-caption text-stein-500 pt-2">
            Vermittler
          </div>
          <p className="md:col-span-10 text-[17px] md:text-[18px] leading-[1.65] text-stein-700 max-w-[60ch]">
            Wir verkaufen nicht. Wir übergeben. Ein Mandat dauert bei uns im
            Schnitt 14 Monate — von der ersten Begehung bis zur Schlüssel-
            übergabe an die nächste Familie. Wer schneller will, ist bei uns
            falsch. Wer langsamer will, ist bei uns richtig.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
