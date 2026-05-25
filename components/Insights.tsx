"use client";

import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from "recharts";
import { preisentwicklung, quadratmeterpreise } from "@/lib/insights";

const chf = (v: number) =>
  "CHF " + v.toLocaleString("de-CH").replace(/,/g, "'");

export default function Insights() {
  return (
    <section
      id="insights"
      className="bg-cream-100 text-stein-900 py-32 md:py-44"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <motion.div
            className="col-span-12 md:col-span-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <p className="mono-caption text-stein-500">· 004  Marktinsights</p>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-light leading-[1.05] tracking-tight">
              Eigene Auswertung.
              <br />
              Nicht aus dem Portal.
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
              Was hier steht, kommt aus unseren eigenen 312 vermittelten
              Adressen — nicht aus Inseraten, nicht aus Portalen. Es ist
              die Datengrundlage, die unsere Wertanzeigen trägt.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Chart 1: Quadratmeterpreis pro Gemeinde */}
          <motion.div
            className="lg:col-span-7 bg-cream-50 p-8 md:p-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="flex items-baseline justify-between mb-2">
              <p className="mono-caption text-stein-500">
                Median-Preis · CHF / m²
              </p>
              <p className="mono-caption text-stein-500">2026</p>
            </div>
            <h3 className="font-display text-2xl font-light tracking-tight">
              Vier Gemeinden im Vergleich
            </h3>

            <div className="mt-10 h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={quadratmeterpreise}
                  layout="vertical"
                  margin={{ top: 4, right: 24, bottom: 4, left: 4 }}
                  barCategoryGap={14}
                >
                  <CartesianGrid
                    horizontal={false}
                    stroke="#E5D9C3"
                    strokeDasharray="0"
                  />
                  <XAxis
                    type="number"
                    domain={[0, 16000]}
                    tickFormatter={(v) =>
                      "CHF " +
                      (v / 1000).toLocaleString("de-CH") +
                      "k"
                    }
                    tick={{
                      fill: "#6B6B6B",
                      fontSize: 11,
                      fontFamily: "var(--font-jetbrains-mono)",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="gemeinde"
                    type="category"
                    tick={{
                      fill: "#1A1A1A",
                      fontSize: 14,
                      fontFamily: "var(--font-inter)",
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={110}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(184,115,51,0.06)" }}
                    contentStyle={{
                      background: "#0F1612",
                      border: "none",
                      color: "#FAF6EF",
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: 12,
                      padding: "8px 12px",
                    }}
                    formatter={(v) => [chf(Number(v)) + " / m²", "Median"]}
                  />
                  <Bar dataKey="preis" radius={[0, 0, 0, 0]}>
                    {quadratmeterpreise.map((d) => (
                      <Cell
                        key={d.gemeinde}
                        fill={d.highlight ? "#B87333" : "#2F4138"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 mono-caption text-stein-500">
              Triesenberg · Berglage hebt sich vom Tal ab
            </p>
          </motion.div>

          {/* Chart 2: Preisentwicklung 2019–2026 */}
          <motion.div
            className="lg:col-span-5 bg-bergforest-950 text-cream-100 p-8 md:p-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
          >
            <div className="flex items-baseline justify-between mb-2">
              <p className="mono-caption text-kupfer-500">
                Premium-Segment · Median
              </p>
              <p className="mono-caption text-cream-200/60">2019—2026</p>
            </div>
            <h3 className="font-display text-2xl font-light tracking-tight">
              Acht Jahre, eine Linie.
            </h3>

            <div className="mt-10 h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={preisentwicklung}
                  margin={{ top: 16, right: 16, bottom: 4, left: 4 }}
                >
                  <CartesianGrid
                    stroke="#2F4138"
                    strokeDasharray="2 4"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="jahr"
                    tick={{
                      fill: "#E5D9C3",
                      fontSize: 11,
                      fontFamily: "var(--font-jetbrains-mono)",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[8000, 16000]}
                    tickFormatter={(v) =>
                      (v / 1000).toLocaleString("de-CH") + "k"
                    }
                    tick={{
                      fill: "#E5D9C3",
                      fontSize: 11,
                      fontFamily: "var(--font-jetbrains-mono)",
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={42}
                  />
                  <Tooltip
                    cursor={{ stroke: "#B87333", strokeWidth: 1 }}
                    contentStyle={{
                      background: "#FAF6EF",
                      border: "none",
                      color: "#1A1A1A",
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: 12,
                      padding: "8px 12px",
                    }}
                    formatter={(v) => [chf(Number(v)), "Median"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="preis"
                    stroke="#B87333"
                    strokeWidth={1.75}
                    dot={{ r: 3, fill: "#B87333", strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#FAF6EF", stroke: "#B87333" }}
                    isAnimationActive
                    animationDuration={1400}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 mono-caption text-cream-200/60">
              Vier Gemeinden gewichtet · eigene Erhebung
            </p>
          </motion.div>
        </div>

        <p className="mt-12 text-sm text-stein-500 italic max-w-[55ch]">
          Quelle: Eigene Auswertung 312 vermittelter Adressen, 2019–2026.
          Vollständige Methodik auf Anfrage.
        </p>
      </div>
    </section>
  );
}
