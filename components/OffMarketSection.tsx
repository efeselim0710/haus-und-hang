"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const EASE = [0.22, 1, 0.36, 1] as const;

const OffMarketSchema = z.object({
  name: z.string().min(2, "Bitte Vor- und Nachname"),
  email: z.string().email("Bitte gültige E-Mail"),
  phone: z.string().optional(),
  referenz: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Bitte ein paar Worte"),
});

type OffMarketValues = z.infer<typeof OffMarketSchema>;

// 14 Punkte über die Komposition verteilt — clustering in 4 Gemeinde-Bereichen.
const DOT_POSITIONS = [
  // Cluster Vaduz (zentral)
  { x: 48, y: 42, delay: 0 },
  { x: 52, y: 46, delay: 0.08 },
  { x: 45, y: 48, delay: 0.16 },
  { x: 50, y: 38, delay: 0.24 },
  { x: 55, y: 44, delay: 0.32 },
  // Cluster Triesenberg (rechts oben)
  { x: 68, y: 28, delay: 0.4 },
  { x: 72, y: 32, delay: 0.48 },
  { x: 70, y: 24, delay: 0.56 },
  // Cluster Schaan (links oben)
  { x: 28, y: 32, delay: 0.64 },
  { x: 32, y: 28, delay: 0.72 },
  { x: 25, y: 38, delay: 0.8 },
  // Cluster Triesen (rechts unten)
  { x: 65, y: 62, delay: 0.88 },
  { x: 70, y: 66, delay: 0.96 },
  { x: 62, y: 58, delay: 1.04 },
];

export function OffMarketSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(dotsContainerRef, { once: true, margin: "-200px" });

  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OffMarketValues>({
    resolver: zodResolver(OffMarketSchema),
  });

  const onSubmit = async (_data: OffMarketValues) => {
    // Demo-Stub: kein Backend, keine echte Übermittlung.
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  return (
    <section
      id="off-market"
      ref={sectionRef}
      className="relative bg-cream-100 py-32 md:py-40 overflow-hidden border-t border-bergforest-950/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-[8vw]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center max-w-[640px] mx-auto mb-20"
        >
          <p className="mono-caption text-kupfer-700 mb-4">
            PRIVATE INVENTORY · NUR AUF EINLADUNG
          </p>

          <h2 className="font-display font-light text-bergforest-950 text-[clamp(2.5rem,5vw,4rem)] leading-[1.0] tracking-tight">
            <em className="italic">Vierzehn</em> Adressen,
            <br />
            die niemand findet.
          </h2>
        </motion.div>

        {/* Dots-Visualisierung — dark frame als Kontrast zum cream. */}
        <div
          ref={dotsContainerRef}
          className="relative w-full aspect-[2/1] max-w-[900px] mx-auto mb-20"
        >
          <div className="absolute inset-0 border border-bergforest-950/15 bg-bergforest-950" />

          {DOT_POSITIONS.map((dot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: dot.delay,
                ease: EASE,
              }}
              style={{
                position: "absolute",
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="absolute rounded-full bg-kupfer-500/30"
                style={{
                  width: "16px",
                  height: "16px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  filter: "blur(4px)",
                }}
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: dot.delay,
                }}
                className="w-2 h-2 rounded-full bg-kupfer-500"
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
          >
            <p className="mono-caption text-cream-50/45 tracking-[0.25em] whitespace-nowrap">
              VADUZ · TRIESENBERG · SCHAAN · TRIESEN
            </p>
          </motion.div>
        </div>

        {/* Statement-Anker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-[520px] mx-auto mb-20"
        >
          <p className="font-editorial text-bergforest-800 text-[clamp(1rem,1.3vw,1.125rem)] leading-[1.5]">
            Wir vermitteln, bevor jemand anders erfährt dass sie
            verfügbar sind. Zugang nur durch
            <em> persönliche Vorstellung</em>.
          </p>
        </motion.div>

        {/* Formular */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-[640px] mx-auto"
        >
          <div className="bg-cream-50 border border-bergforest-950/15 p-8 md:p-10">
            <p className="mono-caption text-kupfer-700 mb-2">
              ZUGANG ANFRAGEN
            </p>

            <h3 className="font-display font-light text-bergforest-950 text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1] mb-8">
              Sprechen wir.
            </h3>

            {submitted ? (
              <div className="py-6">
                <h4 className="font-display font-light text-bergforest-950 text-2xl leading-[1.2] mb-4">
                  Wir nehmen Kontakt auf.
                </h4>
                <p className="font-editorial italic text-bergforest-800 text-base leading-[1.55] max-w-[44ch]">
                  Sobald Anna verfügbar ist, hören Sie persönlich von uns.
                </p>
                <p className="mt-10 mono-caption text-bergforest-800/30 text-[10px] tracking-[0.25em]">
                  DEMO · KEINE ECHTE ÜBERMITTLUNG
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="mono-caption text-bergforest-800/65 block mb-2">
                    NAME
                  </label>
                  <input
                    {...register("name")}
                    className="w-full bg-transparent border-b border-bergforest-950/20 pb-2 font-display text-bergforest-950 text-base focus:outline-none focus:border-kupfer-700 transition-colors"
                  />
                  {errors.name && (
                    <p className="mt-2 text-kupfer-700 text-xs font-body">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="mono-caption text-bergforest-800/65 block mb-2">
                      E-MAIL
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full bg-transparent border-b border-bergforest-950/20 pb-2 font-display text-bergforest-950 text-base focus:outline-none focus:border-kupfer-700 transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-2 text-kupfer-700 text-xs font-body">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mono-caption text-bergforest-800/65 block mb-2">
                      TELEFON
                    </label>
                    <input
                      {...register("phone")}
                      className="w-full bg-transparent border-b border-bergforest-950/20 pb-2 font-display text-bergforest-950 text-base focus:outline-none focus:border-kupfer-700 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="mono-caption text-bergforest-800/65 block mb-2">
                    PREISSEGMENT
                  </label>
                  <select
                    {...register("budget")}
                    className="w-full bg-transparent border-b border-bergforest-950/20 pb-2 font-display text-bergforest-950 text-base focus:outline-none focus:border-kupfer-700 transition-colors"
                  >
                    <option value="" className="bg-cream-50">
                      — bitte wählen —
                    </option>
                    <option value="3-5M" className="bg-cream-50">
                      CHF 3M – 5M
                    </option>
                    <option value="5-10M" className="bg-cream-50">
                      CHF 5M – 10M
                    </option>
                    <option value="10M+" className="bg-cream-50">
                      CHF 10M +
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mono-caption text-bergforest-800/65 block mb-2">
                    WAS SUCHEN SIE
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    className="w-full bg-transparent border-b border-bergforest-950/20 pb-2 font-display text-bergforest-950 text-base focus:outline-none focus:border-kupfer-700 transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="mt-2 text-kupfer-700 text-xs font-body">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-baseline gap-3 font-body text-[11px] tracking-[0.25em] uppercase text-bergforest-950 hover:text-kupfer-700 transition-colors duration-500 disabled:opacity-50"
                  >
                    <span className="border-b border-bergforest-950/30 group-hover:border-kupfer-700/60 pb-1 transition-colors duration-500">
                      {isSubmitting ? "Wird gesendet..." : "Vorstellung anfragen"}
                    </span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      ↗
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
