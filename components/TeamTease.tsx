"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { team } from "@/lib/team";

export default function TeamTease() {
  const anna = team[0];

  return (
    <section className="bg-cream-50 text-stein-900 py-32 md:py-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-bergforest-900">
              <Image
                src={anna.portrait}
                alt={`Porträt ${anna.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-cream-50">
                <p className="mono-caption">{anna.name}</p>
                <p className="mono-caption opacity-80">Vaduz · 1987</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
          >
            <p className="mono-caption text-stein-500">· 005  Sechs Menschen</p>
            <blockquote className="mt-8 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-light leading-[1.18] tracking-tight italic max-w-[26ch]">
              „Mein Vater hat 1987 mit drei Adressen begonnen. Wir sind auf
              312 gewachsen, ohne die erste zu vergessen."
            </blockquote>
            <p className="mt-8 text-stein-700 text-[17px] leading-relaxed max-w-[48ch]">
              {anna.rolle}. Zweite Generation HAUS UND HANG. Sechs Menschen
              halten dieses Haus zusammen — Sie können jedem von ihnen
              persönlich begegnen.
            </p>
            <Link
              href="/team"
              className="mt-10 inline-flex items-center gap-3 font-body text-[11px] tracking-[0.18em] uppercase text-stein-900 border-b border-stein-900 pb-1 hover:text-kupfer-500 hover:border-kupfer-500 transition-colors"
            >
              Das ganze Team
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
