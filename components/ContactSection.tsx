"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const EASE = [0.22, 1, 0.36, 1] as const;

type Slot = {
  id: string;
  date: string;
  time: string;
  weekRelative: "Diese Woche" | "Nächste Woche";
};

const AVAILABLE_SLOTS: Slot[] = [
  { id: "s1", date: "Di, 28. Mai", time: "14:00", weekRelative: "Diese Woche" },
  { id: "s2", date: "Mi, 29. Mai", time: "10:00", weekRelative: "Diese Woche" },
  { id: "s3", date: "Do, 30. Mai", time: "16:00", weekRelative: "Diese Woche" },
  { id: "s4", date: "Mo, 03. Juni", time: "11:00", weekRelative: "Nächste Woche" },
  { id: "s5", date: "Mi, 05. Juni", time: "15:00", weekRelative: "Nächste Woche" },
  { id: "s6", date: "Fr, 07. Juni", time: "10:00", weekRelative: "Nächste Woche" },
];

const BookingSchema = z.object({
  name: z.string().min(2, "Bitte Vor- und Nachname"),
  email: z.string().email("Bitte gültige E-Mail"),
  phone: z.string().min(6, "Bitte Telefonnummer"),
  message: z.string().optional(),
});

type BookingValues = z.infer<typeof BookingSchema>;

export function ContactSection() {
  const [mode, setMode] = useState<"onsite" | "video" | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingValues>({
    resolver: zodResolver(BookingSchema),
  });

  const onSubmit = async (_data: BookingValues) => {
    // Demo-Stub: kein Backend, keine echte Übermittlung.
    await new Promise((r) => setTimeout(r, 800));
    setConfirmed(true);
  };

  const resetBooking = () => {
    setMode(null);
    setSelectedSlot(null);
    setConfirmed(false);
    reset();
  };

  return (
    <section
      id="kontakt"
      className="relative bg-cream-100 py-24 md:py-32 overflow-hidden border-t border-bergforest-800/15"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-[8vw]">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-20 max-w-[640px]"
        >
          <p className="mono-caption text-kupfer-700 mb-4">
            KONTAKT · NACH VEREINBARUNG
          </p>

          <span className="block h-px w-12 bg-kupfer-700/60 mb-8" />

          <h2 className="font-display font-light text-bergforest-950 text-[clamp(2.5rem,5vw,4rem)] leading-[1.0] tracking-tight">
            Wir empfangen Sie
            <br />
            in <em className="italic">Vaduz</em>.
          </h2>
        </motion.div>

        {/* DREI-SPALTEN-INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-12 md:gap-16 mb-24 pb-16 border-b border-bergforest-800/15"
        >
          <div>
            <p className="mono-caption text-bergforest-800/60 mb-4">ADRESSE</p>
            <div className="space-y-1">
              <p className="font-display text-bergforest-950 text-lg leading-[1.4]">
                Aeulestrasse 5
              </p>
              <p className="font-display text-bergforest-950 text-lg leading-[1.4]">
                9490 Vaduz
              </p>
              <p className="font-display text-bergforest-800/70 text-base leading-[1.4] italic">
                Fürstentum Liechtenstein
              </p>
            </div>
          </div>

          <div>
            <p className="mono-caption text-bergforest-800/60 mb-4">TELEFONIE</p>
            <div className="space-y-2">
              <a
                href="tel:+4232328719"
                className="block font-display text-bergforest-950 text-lg leading-[1.4] hover:text-kupfer-700 transition-colors"
              >
                +423 232 87 19
              </a>
              <a
                href="mailto:anna@hausundhang.li"
                className="block font-display text-bergforest-950 text-lg leading-[1.4] hover:text-kupfer-700 transition-colors"
              >
                anna@hausundhang.li
              </a>
            </div>
          </div>

          <div>
            <p className="mono-caption text-bergforest-800/60 mb-4">
              ÖFFNUNGSZEITEN
            </p>
            <div className="space-y-1">
              <p className="font-display text-bergforest-950 text-lg leading-[1.4]">
                Mo – Do, 09:00 – 18:00
              </p>
              <p className="font-display text-bergforest-950 text-lg leading-[1.4]">
                Fr, 09:00 – 16:00
              </p>
              <p className="font-display text-bergforest-800/70 text-base leading-[1.4] italic">
                Wochenende nach Vereinbarung
              </p>
            </div>
          </div>
        </motion.div>

        {/* BOOKING-BLOCK — Dark Inset auf cream-Section. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-24 md:mt-32 mb-16 md:mb-24 bg-bergforest-950 py-20 px-12 md:py-24 md:px-20 max-w-[1100px]"
        >
          <p className="mono-caption text-kupfer-500 mb-2">
            TERMIN VEREINBAREN
          </p>

          <h3 className="font-display font-light text-cream-100 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.0] tracking-tight mb-12">
            Drei Schritte.
            <br />
            <em className="italic">Persönlich.</em>
          </h3>

          {confirmed ? (
            <div className="bg-cream-100/5 border border-cream-100/15 p-10">
              <p className="mono-caption text-kupfer-500 mb-4">
                TERMIN BESTÄTIGT
              </p>
              <h4 className="font-display font-light text-cream-100 text-2xl leading-[1.2] mb-4">
                Wir melden uns persönlich.
              </h4>
              <p className="font-editorial italic text-cream-100/70 text-base leading-[1.55] mb-8 max-w-[44ch]">
                Ihre Anfrage ist bei uns. Anna meldet sich innerhalb von 24
                Stunden.
              </p>
              <div className="space-y-2 pb-6 border-b border-cream-100/15 mb-6">
                <p className="font-display text-cream-100">
                  {selectedSlot?.date} · {selectedSlot?.time} Uhr
                </p>
                <p className="font-display italic text-cream-100/60">
                  {mode === "onsite"
                    ? "Vor Ort, Aeulestrasse 5, Vaduz"
                    : "Video-Gespräch, Link folgt per E-Mail"}
                </p>
              </div>
              <button
                onClick={resetBooking}
                className="group inline-flex items-baseline gap-3 font-body text-[11px] tracking-[0.25em] uppercase text-cream-100 hover:text-kupfer-500 transition-colors duration-500"
              >
                <span className="border-b border-cream-100/30 group-hover:border-kupfer-500/60 pb-1 transition-colors duration-500">
                  Anderen Termin wählen
                </span>
              </button>
              <p className="mt-10 mono-caption text-cream-100/30 text-[10px] tracking-[0.25em]">
                DEMO · KEINE ECHTE ÜBERMITTLUNG
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* SCHRITT 01: MODUS */}
              <div>
                <p className="mono-caption text-cream-100/50 mb-4">
                  01 · WIE
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setMode("onsite")}
                    className={`text-left p-6 border transition-all duration-300 ${
                      mode === "onsite"
                        ? "border-kupfer-500 bg-kupfer-500/8"
                        : "border-cream-100/20 bg-transparent hover:border-cream-100/30 hover:bg-cream-100/5"
                    }`}
                  >
                    <p className="font-display text-cream-100 text-lg mb-1">
                      Vor Ort
                    </p>
                    <p className="font-display italic text-cream-100/60 text-sm">
                      Aeulestrasse 5, Vaduz
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("video")}
                    className={`text-left p-6 border transition-all duration-300 ${
                      mode === "video"
                        ? "border-kupfer-500 bg-kupfer-500/8"
                        : "border-cream-100/20 bg-transparent hover:border-cream-100/30 hover:bg-cream-100/5"
                    }`}
                  >
                    <p className="font-display text-cream-100 text-lg mb-1">
                      Video-Gespräch
                    </p>
                    <p className="font-display italic text-cream-100/60 text-sm">
                      Verschlüsselt, 60 Minuten
                    </p>
                  </button>
                </div>
              </div>

              {/* SCHRITT 02: SLOT */}
              {mode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="mono-caption text-cream-100/50 mb-4">
                    02 · WANN
                  </p>

                  {(["Diese Woche", "Nächste Woche"] as const).map((week) => (
                    <div key={week} className="mb-6">
                      <p className="mono-caption text-cream-100/40 mb-3 tracking-[0.22em]">
                        {week.toUpperCase()}
                      </p>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {AVAILABLE_SLOTS.filter(
                          (s) => s.weekRelative === week
                        ).map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`text-left px-4 py-3 border transition-all duration-300 ${
                              selectedSlot?.id === slot.id
                                ? "border-kupfer-500 bg-kupfer-500/8"
                                : "border-cream-100/15 bg-transparent hover:border-cream-100/30 hover:bg-cream-100/5"
                            }`}
                          >
                            <p className="font-display text-cream-100 text-base">
                              {slot.date}
                            </p>
                            <p className="font-body text-cream-100/60 text-xs mt-1">
                              {slot.time} Uhr
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* SCHRITT 03: DATEN */}
              {mode && selectedSlot && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="mono-caption text-cream-100/50 mb-4">
                    03 · WER
                  </p>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 max-w-[560px]"
                  >
                    <div>
                      <label className="mono-caption text-cream-100/50 block mb-2">
                        NAME
                      </label>
                      <input
                        {...register("name")}
                        className="w-full bg-transparent border-b border-cream-100/20 pb-2 font-display text-cream-100 text-base focus:outline-none focus:border-kupfer-500 transition-colors"
                      />
                      {errors.name && (
                        <p className="mt-2 text-kupfer-500 text-xs font-body">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="mono-caption text-cream-100/50 block mb-2">
                          E-MAIL
                        </label>
                        <input
                          type="email"
                          {...register("email")}
                          className="w-full bg-transparent border-b border-cream-100/20 pb-2 font-display text-cream-100 text-base focus:outline-none focus:border-kupfer-500 transition-colors"
                        />
                        {errors.email && (
                          <p className="mt-2 text-kupfer-500 text-xs font-body">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mono-caption text-cream-100/50 block mb-2">
                          TELEFON
                        </label>
                        <input
                          {...register("phone")}
                          className="w-full bg-transparent border-b border-cream-100/20 pb-2 font-display text-cream-100 text-base focus:outline-none focus:border-kupfer-500 transition-colors"
                        />
                        {errors.phone && (
                          <p className="mt-2 text-kupfer-500 text-xs font-body">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mono-caption text-cream-100/50 block mb-2">
                        ANLIEGEN (OPTIONAL)
                      </label>
                      <textarea
                        {...register("message")}
                        rows={3}
                        placeholder="Kurz zum Anliegen, damit Anna sich vorbereiten kann"
                        className="w-full bg-transparent border-b border-cream-100/20 pb-2 font-display text-cream-100 text-base placeholder:text-cream-100/30 focus:outline-none focus:border-kupfer-500 transition-colors resize-none"
                      />
                    </div>

                    <div className="bg-cream-100/5 border border-cream-100/15 p-5 my-8">
                      <p className="mono-caption text-cream-100/50 mb-2">
                        IHR TERMIN
                      </p>
                      <p className="font-display text-cream-100 text-lg">
                        {selectedSlot.date} · {selectedSlot.time} Uhr
                      </p>
                      <p className="font-display italic text-cream-100/60 text-sm">
                        {mode === "onsite"
                          ? "Vor Ort, Aeulestrasse 5, Vaduz"
                          : "Video-Gespräch"}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex items-baseline gap-3 font-body text-[11px] tracking-[0.25em] uppercase text-cream-100 hover:text-kupfer-500 transition-colors duration-500 disabled:opacity-50"
                    >
                      <span className="border-b border-cream-100/30 group-hover:border-kupfer-500/60 pb-1 transition-colors duration-500">
                        {isSubmitting ? "Wird reserviert..." : "Termin reservieren"}
                      </span>
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        ↗
                      </span>
                    </button>
                  </form>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
