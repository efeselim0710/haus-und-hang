"use client";

import { motion } from "motion/react";
import { useState } from "react";

const wege = [
  {
    n: "001",
    titel: "Termin im Atelier",
    ort: "Aeulestrasse 5, Vaduz",
    detail:
      "Sie kommen vorbei, wir machen eine Kanne Kaffee, sprechen über Ihre Adresse — keine Verpflichtung, keine Unterschrift.",
    aktion: "Vereinbaren",
  },
  {
    n: "002",
    titel: "Brief",
    ort: "anna@hausundhang.li",
    detail:
      "Wir antworten persönlich, nicht mit Templates. Erwarten Sie eine Reaktion innerhalb von 48 Stunden — Werktage zählen, Wochenenden nicht.",
    aktion: "Schreiben",
  },
  {
    n: "003",
    titel: "Telefon · WhatsApp",
    ort: "+423 232 19 87",
    detail:
      "Mo–Fr 9–12 und 14–17. Ausserhalb dieser Zeiten erreichen Sie unsere Sprachbox — wir rufen verlässlich zurück.",
    aktion: "Anrufen",
  },
];

export default function KontaktPage() {
  // Demo-Form: state nur lokal, kein Backend. Submit zeigt eine ruhige Bestätigung.
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ anrede: "", name: "", thema: "", nachricht: "" });

  return (
    <>
      <section className="bg-cream-50 text-stein-900 pt-44 md:pt-52 pb-20 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="mono-caption text-stein-500">· Drei Wege</p>
          <motion.h1
            className="mt-10 font-display text-[clamp(3rem,8vw,6.5rem)] font-light leading-[0.98] tracking-tight max-w-[14ch]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
          >
            Wir antworten
            <br />
            in <span className="italic text-kupfer-600">48 Stunden</span>.
          </motion.h1>
        </div>
      </section>

      <section className="bg-cream-50 text-stein-900 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {wege.map((w, i) => (
              <motion.article
                key={w.n}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1] as const,
                  delay: i * 0.12,
                }}
                className="border-t border-stein-200 pt-8"
              >
                <p className="mono-caption text-stein-500">· {w.n}</p>
                <h2 className="mt-4 font-display text-2xl md:text-3xl font-light tracking-tight">
                  {w.titel}
                </h2>
                <p className="mt-3 font-display text-xl text-kupfer-700">
                  {w.ort}
                </p>
                <p className="mt-4 text-[15px] text-stein-700 leading-relaxed max-w-[40ch]">
                  {w.detail}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Anfrageform — unter der Falz, bewusst nicht oberhalb */}
      <section className="bg-cream-100 text-stein-900 py-24 md:py-32">
        <div className="mx-auto max-w-[920px] px-6 md:px-12">
          <p className="mono-caption text-stein-500">· Wenn Sie schreiben mögen</p>
          <h2 className="mt-8 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-light leading-[1.15] tracking-tight max-w-[28ch]">
            Drei Felder genügen. Wir lesen jedes Wort.
          </h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="mt-12 border-l-2 border-kupfer-500 pl-6 py-2 max-w-[44ch]"
            >
              <p className="mono-caption text-kupfer-600">· Angekommen</p>
              <h4 className="mt-4 font-display font-light text-stein-900 text-2xl leading-[1.2]">
                Wir nehmen Kontakt auf.
              </h4>
              <p className="mt-4 font-editorial italic text-stein-700 text-base leading-[1.55]">
                Sobald Anna verfügbar ist, hören Sie persönlich von uns.
              </p>
              <p className="mt-10 mono-caption text-stein-700/40 text-[10px] tracking-[0.25em]">
                DEMO · KEINE ECHTE ÜBERMITTLUNG
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8"
            >
              <Field
                label="Anrede / Name"
                hint="optional"
                wrap="md:col-span-12"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Frau Marxer-Beck"
              />
              <Field
                label="Worum geht es?"
                wrap="md:col-span-12"
                value={form.thema}
                onChange={(v) => setForm({ ...form, thema: v })}
                placeholder="Ein Haus in Triesenberg, das Sie kennen sollten"
              />
              <FieldArea
                label="Ihre Nachricht"
                wrap="md:col-span-12"
                value={form.nachricht}
                onChange={(v) => setForm({ ...form, nachricht: v })}
                placeholder="Ein paar Zeilen reichen — wir rufen für Details an."
              />
              <div className="md:col-span-12 flex flex-wrap items-center gap-8 pt-4">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-stein-900 text-cream-50 px-8 py-4 font-body text-[11px] tracking-[0.18em] uppercase hover:bg-kupfer-700 transition-colors duration-500"
                >
                  Absenden
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <p className="text-sm text-stein-500 italic max-w-[40ch]">
                  Wir speichern keine Daten ausserhalb dieses Vorgangs. Kein
                  Newsletter, kein Tracking.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Schluss-Adressblock */}
      <section className="bg-bergforest-950 text-cream-50 py-24 md:py-32">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="mono-caption text-kupfer-500">· Vaduz</p>
            <p className="mt-8 font-display text-3xl md:text-4xl font-light leading-[1.1]">
              Aeulestrasse 5
              <br />
              9490 Vaduz
            </p>
            <p className="mt-6 mono-caption text-cream-200/60">
              Eingang im Hof · 1. Stock · Atelier
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-8">
            <div>
              <p className="mono-caption text-cream-200/60">Mo – Fr</p>
              <p className="mt-3 font-display text-xl">09:00 – 12:00</p>
              <p className="mt-1 font-display text-xl">14:00 – 17:00</p>
            </div>
            <div>
              <p className="mono-caption text-cream-200/60">Sa · So</p>
              <p className="mt-3 font-display text-xl italic">Nur Termin</p>
            </div>
            <div className="col-span-2 mt-4 border-t border-cream-200/15 pt-6">
              <p className="mono-caption text-cream-200/60">Hinweis</p>
              <p className="mt-3 text-cream-100/85 text-[15px] leading-relaxed max-w-[42ch]">
                Wir bitten Sie vorab um Anmeldung — auch zu den Bürozeiten.
                Dann ist die Person im Haus, die für Ihr Anliegen die
                richtige ist.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
  wrap,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  wrap?: string;
}) {
  return (
    <label className={`block ${wrap ?? ""}`}>
      <span className="flex items-baseline gap-4 mono-caption text-stein-500">
        · {label}
        {hint && <span className="opacity-60 text-[10px]">{hint}</span>}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent border-b border-stein-300 focus:border-kupfer-500 outline-none py-3 font-display text-2xl font-light text-stein-900 placeholder:text-stein-300 transition-colors"
      />
    </label>
  );
}

function FieldArea({
  label,
  value,
  onChange,
  placeholder,
  wrap,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  wrap?: string;
}) {
  return (
    <label className={`block ${wrap ?? ""}`}>
      <span className="mono-caption text-stein-500">· {label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="mt-3 w-full bg-transparent border-b border-stein-300 focus:border-kupfer-500 outline-none py-3 font-body text-[17px] text-stein-900 placeholder:text-stein-300 leading-relaxed resize-none transition-colors"
      />
    </label>
  );
}
