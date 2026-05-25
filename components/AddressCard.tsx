"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Property } from "@/lib/properties";

export default function AddressCard({
  p,
  index,
  large = false,
}: {
  p: Property;
  index: number;
  large?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: index * 0.12,
      }}
      className={[
        "group relative",
        large ? "md:col-span-7" : "md:col-span-5",
      ].join(" ")}
    >
      <Link href={`/portfolio/${p.slug}`} className="block">
        <div
          className={[
            "relative overflow-hidden bg-bergforest-900",
            large ? "aspect-[5/6]" : "aspect-[4/5]",
          ].join(" ")}
        >
          <Image
            src={p.cover}
            alt={`${p.name}, ${p.gemeinde}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            style={{ transitionTimingFunction: "var(--ease-bergforest)" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bergforest-950/40 to-transparent" />
          <span className="absolute top-5 left-5 mono-caption text-cream-50/90">
            · 00{index + 1}
          </span>
          <span
            className={[
              "absolute top-5 right-5 mono-caption px-3 py-1.5",
              p.status === "Reserviert"
                ? "bg-stein-900/40 text-cream-100"
                : "bg-cream-50/95 text-stein-900",
            ].join(" ")}
          >
            {p.status}
          </span>
        </div>
        <div className="mt-6 grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-7">
            <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-light leading-[1.1] tracking-tight">
              {p.name}
            </h3>
            <p className="mt-2 text-stein-500 text-[15px]">
              {p.gemeinde} · {p.hoehe}
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <p className="font-body text-[11px] tracking-[0.18em] uppercase text-stein-500">
              {p.zimmer} Zimmer · {p.wohnflaeche}
            </p>
            <p className="mt-2 font-display text-xl text-stein-900">
              {p.preis}
            </p>
          </div>
        </div>
        <p className="mt-5 max-w-[60ch] text-[15px] text-stein-700 leading-relaxed italic">
          {p.caption}
        </p>
      </Link>
    </motion.article>
  );
}
