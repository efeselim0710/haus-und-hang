"use client";

import { motion } from "motion/react";
import Link from "next/link";
import AddressCard from "./AddressCard";
import { properties } from "@/lib/properties";

export default function Addresses() {
  return (
    <section
      id="portfolio"
      className="bg-cream-50 text-stein-900 pt-24 pb-32 md:pt-32 md:pb-44"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6 mb-20 md:mb-28">
          <motion.div
            className="col-span-12 md:col-span-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <p className="mono-caption text-stein-500">· 002  Im Bestand</p>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-light leading-[1.05] tracking-tight">
              Drei aktuelle
              <br />
              Adressen.
            </h2>
          </motion.div>
          <motion.div
            className="col-span-12 md:col-span-5 md:col-start-8 md:pt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
          >
            <p className="text-[16px] text-stein-700 leading-relaxed max-w-[44ch]">
              Eine Sandstein-Fassade in Vaduz, ein Weingut in Balzers, ein
              Hangbau in Triesenberg. Drei Häuser, drei Geschichten — und
              die jeweilige Familie sucht den nächsten Bewohner.
            </p>
            <Link
              href="#"
              className="mt-6 inline-block font-body text-[11px] tracking-[0.18em] uppercase text-stein-900 border-b border-stein-900 pb-0.5 hover:text-kupfer-500 hover:border-kupfer-500 transition-colors"
            >
              Gesamtbestand auf Anfrage
            </Link>
          </motion.div>
        </div>

        {/* Editorial-Layout — kein Grid-Spam, asymmetrisch. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-10">
          <AddressCard p={properties[0]} index={0} large />
          <div className="hidden md:block md:col-span-5 md:col-start-8 md:pt-32">
            <AddressCard p={properties[1]} index={1} />
          </div>
          <div className="block md:hidden">
            <AddressCard p={properties[1]} index={1} />
          </div>
          <div className="md:col-span-7 md:col-start-3">
            <AddressCard p={properties[2]} index={2} large />
          </div>
        </div>
      </div>
    </section>
  );
}
