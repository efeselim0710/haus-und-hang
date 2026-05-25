"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { HERITAGE_MILESTONES, type HeritageMilestone } from "@/data/heritage";

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 60;

// Sanfte S-Form.
const PATH = "M 8,8 C 30,8 30,30 50,30 S 70,52 92,52";
const PATH_LENGTH = 220;

// Scroll-Range in dem die Linie wächst.
const LINE_START = 0.93;
const LINE_END = 1.0;
const LABEL_LEAD = 0.015;

const EASE_BERG = [0.22, 1, 0.36, 1] as const;

// SVG-Noise-Texture für OLED-artige Display-Anmutung.
const DISPLAY_BG = `
  radial-gradient(ellipse at center, rgba(20, 28, 24, 1) 0%, rgba(8, 14, 11, 1) 100%),
  url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")
`;

interface Props {
  scrollProgress: MotionValue<number>;
}

export function HeritageSlalomTimeline({ scrollProgress }: Props) {
  const strokeProgress = useTransform(
    scrollProgress,
    [LINE_START, LINE_END],
    [PATH_LENGTH, 0]
  );

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: DISPLAY_BG }}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Hintergrund-Spur — sehr subtil. */}
        <path
          d={PATH}
          fill="none"
          stroke="rgba(184,115,51,0.08)"
          strokeWidth="0.3"
          strokeLinecap="round"
        />

        {/* Outer Cream-Glow — soft halo. */}
        <motion.path
          d={PATH}
          fill="none"
          stroke="rgba(245,240,232,0.15)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray={PATH_LENGTH}
          style={{
            strokeDashoffset: strokeProgress,
            filter: "blur(2px)",
            transition: "stroke-dashoffset 0.1s ease-out",
          }}
        />

        {/* Middle Kupfer-Glow — warm. */}
        <motion.path
          d={PATH}
          fill="none"
          stroke="rgba(184,115,51,0.55)"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeDasharray={PATH_LENGTH}
          style={{
            strokeDashoffset: strokeProgress,
            filter: "blur(0.8px)",
            transition: "stroke-dashoffset 0.1s ease-out",
          }}
        />

        {/* Inner sharp Kupfer-Linie. */}
        <motion.path
          d={PATH}
          fill="none"
          stroke="rgb(217,145,76)"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeDasharray={PATH_LENGTH}
          style={{
            strokeDashoffset: strokeProgress,
            transition: "stroke-dashoffset 0.1s ease-out",
          }}
        />

        {/* Dots an Schnittpunkten — Pulse beim Erreichen. */}
        {HERITAGE_MILESTONES.map((m) => (
          <MilestoneDot
            key={`dot-${m.year}`}
            milestone={m}
            scrollProgress={scrollProgress}
          />
        ))}

        {/* Pulsierender Endpoint-Dot folgt der wachsenden Linie. */}
        <ActiveLineEndpoint scrollProgress={scrollProgress} />
      </svg>

      <div className="absolute inset-0 h-full w-full">
        {HERITAGE_MILESTONES.map((m, index) => (
          <MilestoneLabel
            key={m.year}
            milestone={m}
            scrollProgress={scrollProgress}
            isAbove={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  MilestoneDot — Pulse-Overshoot beim Erreichen durch die Linie.
 * ------------------------------------------------------------------ */

function MilestoneDot({
  milestone,
  scrollProgress,
}: {
  milestone: HeritageMilestone;
  scrollProgress: MotionValue<number>;
}) {
  const point = getPositionOnSCurve(milestone.position);
  const dotTrigger = LINE_START + milestone.position * (LINE_END - LINE_START);

  const dotScale = useTransform(
    scrollProgress,
    [dotTrigger - 0.005, dotTrigger, dotTrigger + 0.01],
    [0, 1.6, 1]
  );
  const dotOpacity = useTransform(
    scrollProgress,
    [dotTrigger - 0.005, dotTrigger],
    [0, 1]
  );

  const origin = `${point.x}px ${point.y}px`;

  return (
    <motion.g style={{ opacity: dotOpacity }}>
      <motion.circle
        cx={point.x}
        cy={point.y}
        r="1.4"
        fill="rgba(184,115,51,0.3)"
        style={{
          scale: dotScale,
          filter: "blur(1.2px)",
          transformOrigin: origin,
        }}
      />
      <motion.circle
        cx={point.x}
        cy={point.y}
        r="0.6"
        fill="rgb(217,145,76)"
        style={{
          scale: dotScale,
          transformOrigin: origin,
        }}
      />
    </motion.g>
  );
}

/* ------------------------------------------------------------------ *
 *  ActiveLineEndpoint — continuous Pulse, läuft mit der Linie mit.
 * ------------------------------------------------------------------ */

function ActiveLineEndpoint({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const linePosition = useTransform(scrollProgress, [LINE_START, LINE_END], [0, 1]);

  const [position, setPosition] = useState(() => getPositionOnSCurve(0));
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(linePosition, "change", (t) => {
    const clamped = Math.min(Math.max(t, 0), 1);
    setPosition(getPositionOnSCurve(clamped));
    setVisible(t > 0 && t < 1);
  });

  if (!visible) return null;

  const origin = `${position.x}px ${position.y}px`;

  return (
    <motion.g
      animate={{ scale: [1, 1.4, 1] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: origin }}
    >
      <circle
        cx={position.x}
        cy={position.y}
        r="2.2"
        fill="rgba(217,145,76,0.25)"
        style={{ filter: "blur(2.5px)" }}
      />
      <circle
        cx={position.x}
        cy={position.y}
        r="0.9"
        fill="rgb(245,200,130)"
      />
    </motion.g>
  );
}

/* ------------------------------------------------------------------ *
 *  MilestoneLabel — Year + Marker, isAccent steuert Hierarchie.
 * ------------------------------------------------------------------ */

function MilestoneLabel({
  milestone,
  scrollProgress,
  isAbove,
}: {
  milestone: HeritageMilestone;
  scrollProgress: MotionValue<number>;
  isAbove: boolean;
}) {
  const point = getPositionOnSCurve(milestone.position);
  const triggerEnd = LINE_START + milestone.position * (LINE_END - LINE_START);

  // Latch: einmal sichtbar → bleibt sichtbar.
  const [revealed, setRevealed] = useState(false);
  useMotionValueEvent(scrollProgress, "change", (p) => {
    if (!revealed && p >= triggerEnd) setRevealed(true);
  });
  // (LABEL_LEAD bleibt als kleine Vorlauf-Konstante dokumentiert verfügbar.)
  void LABEL_LEAD;

  const leftPct = (point.x / VIEWBOX_WIDTH) * 100;
  const topPct = (point.y / VIEWBOX_HEIGHT) * 100;

  const isItalic = milestone.year === "2019";
  const yearClass = milestone.isAccent
    ? `font-display font-normal text-cream-50 leading-none mb-0.5${isItalic ? " italic" : ""}`
    : "font-display font-light text-cream-50/85 leading-none mb-0.5";
  const yearFontSize = milestone.isAccent
    ? "clamp(0.7rem, 1.15vw, 1.1rem)"
    : "clamp(0.55rem, 0.85vw, 0.8rem)";
  const markerClass = milestone.isAccent
    ? "font-body tracking-[0.15em] uppercase text-kupfer-400"
    : "font-body tracking-[0.15em] uppercase text-kupfer-500/65";
  const markerFontSize = milestone.isAccent
    ? "clamp(6px, 0.55vw, 8px)"
    : "clamp(5px, 0.45vw, 7px)";

  // Position-Wrapper macht das Translate. Innerer motion.div macht
  // opacity / y / scale — verhindert Transform-Konflikt.
  return (
    <div
      style={{
        position: "absolute",
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: isAbove
          ? "translate(-50%, -110%)"
          : "translate(-50%, 10%)",
      }}
      className="pointer-events-none"
    >
      <motion.div
        initial={false}
        animate={
          revealed
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 10, scale: 0.85 }
        }
        transition={{ duration: 0.5, ease: EASE_BERG }}
        style={{ transformOrigin: "center" }}
      >
        <div className="text-center whitespace-nowrap">
          <div className={yearClass} style={{ fontSize: yearFontSize }}>
            {milestone.year}
          </div>
          <div className={markerClass} style={{ fontSize: markerFontSize }}>
            {milestone.marker}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Helper: Punkt auf der S-Kurve aus Parameter t ∈ [0, 1].
 *  Lineare Interpolation entlang der beiden Halbwellen.
 * ------------------------------------------------------------------ */

function getPositionOnSCurve(t: number): { x: number; y: number } {
  if (t <= 0.5) {
    const localT = t * 2;
    return {
      x: 8 + (50 - 8) * localT,
      y: 8 + (30 - 8) * localT,
    };
  }
  const localT = (t - 0.5) * 2;
  return {
    x: 50 + (92 - 50) * localT,
    y: 30 + (52 - 30) * localT,
  };
}
