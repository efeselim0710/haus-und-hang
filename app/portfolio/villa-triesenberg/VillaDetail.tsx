"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { properties } from "@/lib/properties";

const property = properties[0]; // Villa Falknisblick

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
    caption: "Wohnraum nach Süden — vier Meter Raumhöhe, originaler Beton-Estrich aus 1962.",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80",
    caption: "Küche mit Bühlertisch, Eichenholzboden, Ostfenster zur Drei-Schwestern-Kette.",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=80",
    caption: "Bibliothek auf der Hangseite — 1962 als Kinderzimmer, 2021 zurückgebaut.",
  },
  {
    src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=80",
    caption: "Schlafgeschoss unter dem Dach, sichtbare Konstruktion in Lärche.",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=80",
    caption: "Terrasse Südwest, 1'200 m. ü. M. — Sichtachse Vaduz–Schaan–Rheintal.",
  },
];

const eckdaten = [
  { k: "Wohnfläche",   v: "412 m²" },
  { k: "Grundstück",   v: "1'840 m²" },
  { k: "Zimmer",       v: "8.5" },
  { k: "Baujahr",      v: "1962 / 2021" },
  { k: "Energie",      v: "Minergie-P" },
  { k: "Gemeinde",     v: "Triesenberg" },
  { k: "Höhe",         v: "1'200 m. ü. M." },
  { k: "Exposition",   v: "Südwest" },
];

export default function VillaDetail() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.85, 0.3]);

  return (
    <>
      {/* 1. Voll-Hero — hochformatiges Cover */}
      <section
        ref={heroRef}
        className="relative h-[100svh] w-full overflow-hidden bg-bergforest-950 text-cream-50"
      >
        <motion.div className="absolute inset-0" style={{ scale, opacity }}>
          <Image
            src={property.cover}
            alt={property.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bergforest-950/85 via-bergforest-950/30 to-bergforest-950/40" />
        </motion.div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-20 md:px-12 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
          >
            <p className="mono-caption text-kupfer-500">
              · Adresse 001 · Triesenberg
            </p>
            <h1 className="mt-8 font-display text-[clamp(2.5rem,7vw,5.8rem)] font-light leading-[0.98] tracking-tight max-w-[18ch]">
              Villa Falknisblick
            </h1>
            <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-4">
              <p className="font-display text-3xl md:text-4xl font-light">
                {property.preis}
              </p>
              <p className="font-body text-[11px] tracking-[0.18em] uppercase text-cream-100/70">
                · Auf Anfrage
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Manifest-Absatz */}
      <section className="bg-cream-50 text-stein-900 py-32 md:py-44">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <motion.p
            className="mono-caption text-stein-500"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            · Manifest
          </motion.p>
          <motion.p
            className="mt-10 font-display text-[clamp(1.5rem,3vw,2.3rem)] font-light leading-[1.3] tracking-tight max-w-[28ch] text-stein-900"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
          >
            An der Strasse zum Steg liegt ein Haus, das die Hangkante zur
            <span className="italic text-kupfer-600"> Bühne</span> macht. 1962
            von Otto Marxer erbaut, 2021 vom Atelier Liechti zurückgebaut auf
            das, was bleibt.
          </motion.p>
        </div>
      </section>

      {/* 3. Eckdaten Mono-Grid */}
      <section className="bg-cream-100 text-stein-900 py-20 md:py-28">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <p className="mono-caption text-stein-500">· Eckdaten</p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
            {eckdaten.map((e) => (
              <motion.div
                key={e.k}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <p className="mono-caption text-stein-500">{e.k}</p>
                <p className="mt-3 font-display text-2xl font-light tracking-tight">
                  {e.v}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bildergalerie — Long-Scroll */}
      <section className="bg-cream-50 text-stein-900 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="mono-caption text-stein-500 mb-12">
            · Innen und Aussen
          </p>
          <div className="space-y-24 md:space-y-32">
            {gallery.map((g, i) => (
              <motion.figure
                key={g.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1] as const,
                  delay: 0.1,
                }}
                className={[
                  i % 2 === 0 ? "md:pr-32" : "md:pl-32",
                ].join(" ")}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bergforest-900">
                  <Image
                    src={g.src}
                    alt={g.caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-5 flex items-baseline gap-6 max-w-[60ch]">
                  <span className="mono-caption text-stein-500 shrink-0">
                    · 00{i + 1}
                  </span>
                  <span className="text-[15px] text-stein-700 italic leading-relaxed">
                    {g.caption}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Lage */}
      <section className="bg-bergforest-950 text-cream-50 py-32 md:py-44">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="mono-caption text-kupfer-500">· Lage</p>
            <h2 className="mt-8 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.05] tracking-tight">
              1'200 m. ü. M.
              <br />
              Südwest.
            </h2>
            <p className="mt-8 text-cream-100/85 text-[17px] leading-[1.7] max-w-[42ch]">
              Sichtachse Vaduz–Schaan–Rheintal. Sonnenstunden im
              Jahresmittel 1'780 (15 % über Tal). Schnee von Mitte
              November bis Anfang April, asphaltierte Zufahrt
              ganzjährig.
            </p>
          </div>
          <div className="lg:col-span-7">
            {/* SVG-Skizze der Lage statt Map-Embed */}
            <svg
              viewBox="0 0 600 400"
              className="w-full h-auto"
              role="img"
              aria-label="Lage-Skizze Triesenberg"
            >
              <defs>
                <pattern id="ridge" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M0 28 L8 22 L16 26 L24 20 L30 22" stroke="#B87333" strokeWidth="0.5" fill="none" opacity="0.4"/>
                </pattern>
              </defs>
              {/* Hang */}
              <path d="M0 320 C 100 280, 220 240, 320 200 S 540 140, 600 130 L 600 400 L 0 400 Z"
                    fill="#1E2A23" opacity="0.85" />
              <path d="M0 320 C 100 280, 220 240, 320 200 S 540 140, 600 130"
                    stroke="#B87333" strokeWidth="1" fill="none" opacity="0.9" />
              <path d="M0 350 C 100 320, 220 290, 320 260 S 540 200, 600 190"
                    stroke="#B87333" strokeWidth="0.6" fill="none" opacity="0.55" />
              <path d="M0 290 C 100 245, 220 200, 320 155 S 540 95, 600 85"
                    stroke="#B87333" strokeWidth="0.6" fill="none" opacity="0.4" />
              {/* Rhein */}
              <path d="M0 385 Q 200 370, 400 380 T 600 375" stroke="#5C7568" strokeWidth="2" fill="none" opacity="0.6"/>
              {/* Villa Marker */}
              <g transform="translate(330, 200)">
                <circle r="14" fill="none" stroke="#B87333" strokeWidth="1.2"/>
                <circle r="3" fill="#B87333"/>
                <text x="22" y="5" fill="#FAF6EF" fontSize="11" fontFamily="var(--font-jetbrains-mono)" letterSpacing="0.18em">
                  VILLA FALKNISBLICK
                </text>
                <text x="22" y="22" fill="#E5D9C3" opacity="0.7" fontSize="9" fontFamily="var(--font-jetbrains-mono)" letterSpacing="0.18em">
                  1200 M Ü. M.
                </text>
              </g>
              {/* Vaduz */}
              <g transform="translate(140, 360)">
                <circle r="2" fill="#FAF6EF"/>
                <text x="8" y="4" fill="#E5D9C3" fontSize="9" fontFamily="var(--font-jetbrains-mono)" letterSpacing="0.18em">
                  VADUZ
                </text>
              </g>
              {/* Schaan */}
              <g transform="translate(420, 355)">
                <circle r="2" fill="#FAF6EF"/>
                <text x="8" y="4" fill="#E5D9C3" fontSize="9" fontFamily="var(--font-jetbrains-mono)" letterSpacing="0.18em">
                  SCHAAN
                </text>
              </g>
              {/* Compass */}
              <g transform="translate(540, 50)" opacity="0.6">
                <text x="0" y="0" fill="#B87333" fontSize="10" fontFamily="var(--font-jetbrains-mono)">N</text>
                <line x1="3" y1="6" x2="3" y2="28" stroke="#B87333" strokeWidth="0.8"/>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* 6. Architektenzitat */}
      <section className="bg-cream-50 text-stein-900 py-32 md:py-44">
        <div className="mx-auto max-w-[1000px] px-6 md:px-12">
          <p className="mono-caption text-stein-500">· Atelier Liechti</p>
          <blockquote className="mt-10 font-display text-[clamp(1.6rem,3.4vw,2.5rem)] font-light leading-[1.25] italic tracking-tight max-w-[32ch]">
            „Wir haben nichts hinzugefügt, was 1962 nicht schon hätte da
            sein können. Wir haben nur das Spätere weggenommen."
          </blockquote>
          <p className="mt-8 mono-caption text-stein-500">
            Karin Liechti · Architektin BSA SIA · Vaduz / Zürich
          </p>
        </div>
      </section>

      {/* 7. CTA-Dreiklang */}
      <section className="bg-bergforest-900 text-cream-50 py-28 md:py-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <p className="mono-caption text-kupfer-500">· Drei Wege</p>
          <h2 className="mt-8 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-light leading-[1.05] tracking-tight max-w-[22ch]">
            Wir empfangen Sie an der Adresse oder im Atelier.
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                t: "Termin vor Ort",
                d: "Begehung der Villa, durch Anna Marxer-Beck persönlich. Etwa zwei Stunden.",
                cta: "Anfragen →",
              },
              {
                t: "Datenblatt",
                d: "Vertiefendes Exposé mit Grundrissen, Energie­ausweis, Sanierungsdokumentation 2021.",
                cta: "PDF anfordern →",
              },
              {
                t: "Verkäuferschaft",
                d: "Direkter Kontakt zur Eigentümerfamilie auf vorherige Absprache und nach Vorgespräch.",
                cta: "Auf Anfrage →",
              },
            ].map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1] as const,
                  delay: i * 0.12,
                }}
                className="border-t border-cream-200/20 pt-8"
              >
                <p className="mono-caption text-cream-200/60">
                  · 00{i + 1}
                </p>
                <h3 className="mt-4 font-display text-2xl font-light tracking-tight">
                  {c.t}
                </h3>
                <p className="mt-4 text-[15px] text-cream-100/80 leading-relaxed">
                  {c.d}
                </p>
                <Link
                  href="/kontakt"
                  className="mt-6 inline-block font-body text-[11px] tracking-[0.18em] uppercase text-kupfer-400 hover:text-kupfer-500 border-b border-kupfer-400/40 hover:border-kupfer-500 pb-0.5"
                >
                  {c.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Weitere Adressen */}
      <section className="bg-cream-50 text-stein-900 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex items-baseline justify-between mb-12">
            <p className="mono-caption text-stein-500">· Im Bestand</p>
            <Link
              href="/#portfolio"
              className="mono-caption text-stein-900 hover:text-kupfer-500 transition-colors"
            >
              Zum Portfolio →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {properties.slice(1, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group block"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-bergforest-900">
                  <Image
                    src={p.cover}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-light tracking-tight">
                    {p.name}
                  </h3>
                  <p className="mono-caption text-stein-500">
                    {p.gemeinde}
                  </p>
                </div>
                <p className="mt-2 text-stein-700 italic max-w-[44ch]">
                  {p.caption}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
