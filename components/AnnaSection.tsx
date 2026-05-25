"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AnnaSection() {
  return (
    <section id="anna" className="relative bg-cream-100 py-24 md:py-32 overflow-hidden border-t border-bergforest-950/10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-[8vw]">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-20 items-center">
          {/* LINKS: Foto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative w-full aspect-[3/4] overflow-hidden bg-bergforest-900"
          >
            <Image
              src="/video/Anna.webp"
              alt="Anna Marxer-Beck, Inhaberin HAUS UND HANG Immobilien"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
              priority={false}
            />
          </motion.div>

          {/* RECHTS: Editorial-Text (verschlankt — Quote + Faktoren). */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="space-y-10"
          >
            <p className="mono-caption text-kupfer-700">
              ZWEITE GENERATION · SEIT 2019
            </p>

            <span className="block h-px w-12 bg-kupfer-700/60 my-3" />

            <h2 className="font-display font-light text-bergforest-950 text-[clamp(2.75rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
              Anna
              <br />
              <em className="italic">Marxer-Beck</em>
            </h2>

            <blockquote className="font-editorial text-bergforest-950 text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.5] max-w-[44ch] border-l-2 border-kupfer-700/40 pl-6 py-2">
              <span className="text-kupfer-700/70 text-[1.5em] leading-none align-text-top font-display">
                „
              </span>
              Mein Vater hat mir nicht beigebracht, Häuser zu verkaufen.
              Er hat mir beigebracht, Familien <em>zuzuhören</em>.
            </blockquote>

            <div className="pt-6 border-t border-bergforest-950/15">
              <p className="mono-caption text-bergforest-800/65 tracking-[0.22em]">
                EST. 1987 · 9 JAHRE INHABERIN · ARCHITEKTURSTUDIUM ETH
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
