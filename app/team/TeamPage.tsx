"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { team } from "@/lib/team";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TeamPage() {
  return (
    <>
      {/* HEADER */}
      <section className="bg-cream-100 text-bergforest-950 pt-44 md:pt-52 pb-20 md:pb-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-[8vw]">
          <motion.p
            className="mono-caption text-kupfer-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            SECHS MENSCHEN · EIN HAUS
          </motion.p>

          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            style={{ originX: 0, display: "block" }}
            className="h-px w-12 bg-kupfer-700/60 mt-3 mb-10"
          />

          <motion.h1
            className="font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] tracking-tight max-w-[14ch] text-bergforest-950"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.3 }}
          >
            Wer das Haus
            <br />
            <em className="italic">zusammenhält</em>.
          </motion.h1>

          <motion.p
            className="mt-12 max-w-[54ch] font-editorial text-bergforest-800 text-[clamp(1.0625rem,1.3vw,1.25rem)] leading-[1.6]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.55 }}
          >
            Wir sind sechs. Drei von uns sind in Liechtenstein{" "}
            <em>geboren</em>, drei zugezogen — alle bleiben. Niemand bei
            uns arbeitet auf Provision allein. Wer Sie empfängt, ist nicht
            zufällig im Haus.
          </motion.p>

          {/* Faktoren-Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-bergforest-950/15 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-10"
          >
            {[
              { v: "6", l: "Im Atelier" },
              { v: "4", l: "Sprachen" },
              { v: "37", l: "Jahre Haus" },
              { v: "1987", l: "Erste Adresse" },
            ].map((f) => (
              <div key={f.l}>
                <p className="font-display text-bergforest-950 text-3xl md:text-4xl font-light leading-none">
                  {f.v}
                </p>
                <p className="mono-caption text-bergforest-800/60 mt-2">
                  {f.l}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CARDS */}
      <section className="bg-cream-100 pb-32 md:pb-44">
        <div className="mx-auto max-w-[1440px] px-6 md:px-[8vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
            {team.map((m, i) => (
              <motion.article
                key={m.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.9,
                  ease: EASE,
                  delay: (i % 3) * 0.1,
                }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-bergforest-900">
                  <Image
                    src={m.portrait}
                    alt={`Porträt ${m.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover grayscale transition-all duration-[1200ms] group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                  {/* Number-Marker oben links */}
                  <span className="absolute top-5 left-5 mono-caption text-kupfer-400 tracking-[0.25em]">
                    · 0{i + 1}
                  </span>
                  {/* Bottom-Gradient für Eyebrow-Lesbarkeit */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bergforest-950/70 via-bergforest-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  {/* On-Hover: Rolle als Caption auf dem Bild unten */}
                  <div className="absolute inset-x-5 bottom-5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
                    <p className="mono-caption text-cream-50/90">
                      {m.rolle}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-bergforest-950">
                    {m.name}
                  </h2>
                  <p className="mt-2 mono-caption text-bergforest-800/60">
                    {m.rolle}
                  </p>
                </div>

                <blockquote className="mt-5 font-editorial text-lg md:text-xl italic font-light leading-[1.4] text-bergforest-800 max-w-[36ch] border-l-2 border-kupfer-700/40 pl-5">
                  „{m.zitat}"
                </blockquote>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SPRACHEN — dark als Kontrast-Anker */}
      <section className="bg-bergforest-950 text-cream-50 py-28 md:py-36">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <p className="mono-caption text-kupfer-500">SPRACHEN</p>
            <span className="block h-px w-10 bg-kupfer-500/60 mt-3" />
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-[1.2] tracking-tight max-w-[24ch] text-cream-50">
              Vier Sprachen im Haus, alle Mitarbeitenden mindestens
              <span className="italic text-kupfer-400"> trilingual</span>.
            </h2>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 border-t border-cream-50/15 pt-8">
              {[
                { l: "Deutsch", n: "Muttersprache · 6/6" },
                { l: "English", n: "Verhandlung · 6/6" },
                { l: "Italiano", n: "Verhandlung · 4/6" },
                { l: "Français", n: "Verhandlung · 3/6" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl font-light text-cream-50">
                    {s.l}
                  </p>
                  <p className="mt-2 mono-caption text-cream-200/60">{s.n}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
