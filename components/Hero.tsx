"use client";

import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PROPERTIES } from "@/data/properties";
import { HeritageSlalomTimeline } from "@/components/HeritageSlalomTimeline";

const TOTAL_FRAMES = 435; // Hero (1–145) + Korridor (146–290) + Library-Pull-Back (291–435).
const FRAMES_FIRST_BATCH = 200; // Erste 200 sofort, Rest lazy bei progress > 0.45.
const LAZY_TRIGGER = 0.45;
const FRAME_PATH = (i: number) =>
  `/video/frames/frame_${String(i).padStart(3, "0")}.jpg`;
const POSTER_SRC = "/video/villa-flight-poster.webp";
const EASE = [0.22, 1, 0.36, 1] as const;
// Frames laufen gleichmäßig über den ganzen Scroll — kein Endplateau mehr,
// Overlays werden mit ihren eigenen Opacity-Ramps zeitlich gesteuert.
const VIDEO_SCRUB_CEILING = 1.0;

function useMatchMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const evaluate = () => setMatches(mq.matches);
    evaluate();
    mq.addEventListener("change", evaluate);
    return () => mq.removeEventListener("change", evaluate);
  }, [query]);
  return matches;
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isMobile = useMatchMedia("(max-width: 767px)");
  const reduced = useMatchMedia("(prefers-reduced-motion: reduce)");

  // Pre-Mount: SSR-sicheres Skeleton ohne Poster/Headline. Verhindert
  // den Hydration-Flash der entstand wenn HeroStatic (h-[100svh] + Poster)
  // zu HeroCanvas (h-[750vh] + Canvas) wechselte — Layout-Shift + Bildwechsel.
  if (!mounted) {
    return (
      <section
        aria-hidden
        className="relative h-[750vh] bg-bergforest-950"
      />
    );
  }
  if (isMobile || reduced) {
    return <HeroStatic />;
  }
  return <HeroCanvas />;
}

/* --------------------------------------------------------------- *
 *  Desktop: Canvas-Image-Sequence statt Video                      *
 * --------------------------------------------------------------- */

function HeroCanvas() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const loadedCountRef = useRef<number>(0);
  const secondBatchLoadedRef = useRef<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // Erste Batch sofort: Frames 1–150 (Hero-Hälfte). Zweite Batch lädt
  // im Scroll-Handler sobald progress > LAZY_TRIGGER.
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 1; i <= FRAMES_FIRST_BATCH; i++) {
      const img = new window.Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCountRef.current += 1;
        if (i === 1) drawFrame(0);
      };
      images[i - 1] = img;
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  // Canvas-Size mit DPR-Awareness
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      ctx?.scale(dpr, dpr);

      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Frame zeichnen mit object-fit: cover. Fallback: wenn Ziel-Frame noch
  // nicht geladen ist (Speed-Reader scrollt schneller als Lazy-Load),
  // zeige den letzten verfügbaren Frame davor statt eines schwarzen Flash.
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let img = imagesRef.current[frameIndex];

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = frameIndex - 1; i >= 0; i--) {
        const fb = imagesRef.current[i];
        if (fb && fb.complete && fb.naturalWidth > 0) {
          img = fb;
          break;
        }
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const canvasRatio = cw / ch;
    const imageRatio = iw / ih;

    // object-fit: contain — Bild komplett zeigen, Letterbox statt Crop.
    let drawWidth, drawHeight, drawX, drawY;

    if (imageRatio > canvasRatio) {
      drawWidth = cw;
      drawHeight = drawWidth / imageRatio;
      drawX = 0;
      drawY = (ch - drawHeight) / 2;
    } else {
      drawHeight = ch;
      drawWidth = drawHeight * imageRatio;
      drawX = (cw - drawWidth) / 2;
      drawY = 0;
    }

    ctx.fillStyle = "#0F1612";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    currentFrameRef.current = frameIndex;
  };

  // Scroll-Driven Frame-Update + Lazy-Trigger für zweite Batch.
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Frames 151–290 nachladen sobald der User in die zweite Hälfte rutscht.
    if (progress > LAZY_TRIGGER && !secondBatchLoadedRef.current) {
      secondBatchLoadedRef.current = true;
      for (let i = FRAMES_FIRST_BATCH + 1; i <= TOTAL_FRAMES; i++) {
        const img = new window.Image();
        img.src = FRAME_PATH(i);
        img.onload = () => { loadedCountRef.current += 1; };
        imagesRef.current[i - 1] = img;
      }
    }

    const targetProgress = Math.min(progress / VIDEO_SCRUB_CEILING, 1);
    const frameIndex = Math.min(
      Math.floor(targetProgress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );

    if (frameIndex !== currentFrameRef.current) {
      drawFrame(frameIndex);
    }
  });

  // Overlay-Timings — neu gemappt auf 435 Frames / 750 vh Scroll.
  // Faktor 290/435 = 0.667 für alle alten Trigger.
  //   0.000–0.033  Hero-Headline sichtbar → fadet aus
  //   0.273–0.367  Anna-Statement (Helmuth-Frame ~143, progress ~0.328)
  //   0.567–0.667  CorridorOverlay (Portfolio-Frame ~275, progress ~0.633)
  //   0.633–0.700  PropertyOverlay (Frame 290 + Übergang zu Sz4)
  //   0.960–1.000  LibraryDisplayOverlay (Frame 420–435)
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.0167, 0.033], [1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.033], [0, -40]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.00167, 0.00667], [1, 0, 0]);
  const proofOpacity = useTransform(scrollYProgress, [0, 0.04, 0.05], [1, 1, 0]);
  const endOpacity = useTransform(scrollYProgress, [0.273, 0.307, 0.347, 0.367], [0, 1, 1, 0]);
  // Corridor + Property Peaks überlappen sich bewusst zwischen 0.65 und 0.68
  // — der Lock-Snap (0.66) landet in dem Fenster wo Headline UND Cards
  // gleichzeitig voll sichtbar sind.
  const corridorOpacity = useTransform(scrollYProgress, [0.567, 0.61, 0.68, 0.69], [0, 1, 1, 0]);
  const propertyOpacity = useTransform(scrollYProgress, [0.63, 0.65, 0.69, 0.71], [0, 1, 1, 0]);
  const libraryOpacity = useTransform(scrollYProgress, [0.88, 0.92, 1], [0, 1, 1]);

  // Conditional Mounting für Overlays
  const [showInitial, setShowInitial] = useState(true);
  const [showProof, setShowProof] = useState(true);
  const [showEnd, setShowEnd] = useState(false);
  const [showCorridor, setShowCorridor] = useState(false);
  const [showProperty, setShowProperty] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);

  // Scroll-Lock beim Anna-Statement — einmalig, ~3.8 s (Animations-Dauer).
  const annaLockTriggeredRef = useRef(false);
  // Scroll-Lock bei den Property-Cards — kurz, ~1.5 s zum Wahrnehmen.
  const propertyLockTriggeredRef = useRef(false);
  // Scroll-Lock am Library-Endframe — damit der User die fertige
  // Heritage-Timeline + Captions wahrnimmt, bevor er weiterscrollt.
  const libraryLockTriggeredRef = useRef(false);

  // Scroll-Direction + Velocity tracking. Locks feuern NUR beim Runterscrollen
  // und nur wenn die Geschwindigkeit unterhalb MAX_LOCK_VELOCITY liegt —
  // verhindert Rückwärts-Sprünge und Cmd+End-Auslösung.
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const scrollVelocityRef = useRef(0);

  // Lock-State für visuelles Feedback (LockIndicator) + globalen
  // Wheel-Blocker (verhindert Inertia-Buffering während Lock).
  const [isLocked, setIsLocked] = useState(false);
  const isLockedRef = useRef(false);
  const setLock = (val: boolean) => {
    isLockedRef.current = val;
    setIsLocked(val);
  };

  // Globaler Wheel-Listener: blockiert default-scroll während Lock aktiv ist.
  // passive:false ist Pflicht für preventDefault.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (isLockedRef.current) e.preventDefault();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Helper für sanftes Lock-Snap + Release.
  const runLock = (targetProgress: number, durationMs: number) => {
    const sec = heroRef.current;
    if (sec) {
      const peakY =
        sec.offsetTop + targetProgress * (sec.offsetHeight - window.innerHeight);
      window.scrollTo({ top: peakY, behavior: "smooth" });
    }
    // Erst nach dem smooth-Glide (300 ms) overflow blocken — sonst ignorieren
    // manche Browser das smooth-Behavior wegen overflow:hidden.
    window.setTimeout(() => {
      document.body.style.overflow = "hidden";
      setLock(true);
    }, 300);
    window.setTimeout(() => {
      document.body.style.overflow = "";
      setLock(false);
      // Inertia-Buffer flushen — kein Spring nach Release.
      window.scrollBy({ top: 0, left: 0, behavior: "auto" });
    }, 300 + durationMs);
  };

  const MAX_LOCK_VELOCITY = 3.5; // px/ms — darüber wird der Lock geschluckt
  const ANNA_SNAP_TOLERANCE = 0.04;
  const PROPERTY_SNAP_TOLERANCE = 0.03;

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // Scroll-Direction + Velocity bestimmen.
    const now = Date.now();
    const currentScrollY = window.scrollY;
    const timeDelta = now - lastScrollTimeRef.current;
    const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);
    const isScrollingDown = currentScrollY > lastScrollYRef.current;
    scrollVelocityRef.current =
      timeDelta > 0 ? scrollDelta / timeDelta : 0;
    lastScrollYRef.current = currentScrollY;
    lastScrollTimeRef.current = now;

    setShowInitial(p < 0.04);
    setShowProof(p < 0.053);
    setShowEnd(p > 0.26 && p < 0.38);
    setShowCorridor(p > 0.55 && p < 0.69);
    setShowProperty(p > 0.62 && p < 0.72);
    setShowLibrary(p > 0.88);

    // Locks nur beim Runterscrollen + nicht zu schnell (kein Cmd+End-Spring).
    const canLock =
      isScrollingDown && scrollVelocityRef.current < MAX_LOCK_VELOCITY;

    // Anna-Lock — eng um den Peak (0.307), mit Tolerance nach oben.
    if (
      p >= 0.302 &&
      p <= 0.32 + ANNA_SNAP_TOLERANCE &&
      !annaLockTriggeredRef.current &&
      canLock
    ) {
      annaLockTriggeredRef.current = true;
      runLock(0.307, 3800);
    }

    // Property-Cards + Corridor-Headline — Snap auf 0.66.
    if (
      p >= 0.65 &&
      p <= 0.67 + PROPERTY_SNAP_TOLERANCE &&
      !propertyLockTriggeredRef.current &&
      canLock
    ) {
      propertyLockTriggeredRef.current = true;
      runLock(0.66, 800);
    }

    // Library-Endframe — Snap auf 1.0, Chronik vervollständigt sich live.
    if (
      p >= 0.95 &&
      p <= 0.999 &&
      !libraryLockTriggeredRef.current &&
      canLock
    ) {
      libraryLockTriggeredRef.current = true;
      runLock(1.0, 1500);
    }
  });

  // Safety-Cleanup falls Hero während des Locks unmounted.
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section
      id="portfolio"
      ref={heroRef}
      className="relative h-[750vh] bg-bergforest-950 text-cream-50"
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        />

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, rgba(15,22,18,0.55) 0%, rgba(15,22,18,0.25) 40%, rgba(15,22,18,0.10) 70%, rgba(15,22,18,0) 100%)",
          }}
        />

        {showInitial && (
          <InitialOverlay
            opacity={headlineOpacity}
            y={headlineY}
            hintOpacity={hintOpacity}
          />
        )}
        {showProof && <ProofOverlay opacity={proofOpacity} />}
        {showEnd && <AnnaStatement opacity={endOpacity} />}
        {showCorridor && <CorridorOverlay opacity={corridorOpacity} />}
        {showProperty && <PropertyOverlay opacity={propertyOpacity} />}
        {showLibrary && (
          <LibraryOverlay
            opacity={libraryOpacity}
            scrollProgress={scrollYProgress}
          />
        )}
        <LockIndicator active={isLocked} />
      </div>
    </section>
  );
}

/* ------------------ Property-Overlay (klickbare Galerie-Bilder) ------------------ */

// Empirische Pixel-Positionen der 3 Rahmen im Frame 290.
// Beim Test in Brave anschauen + diese Werte tunen bis sie auf die
// grauen Placeholder im Bild passen.
// Exakte Pixel-Messung aus 1920×1080 Viewport.
const FRAME_POSITIONS = [
  // Villa Falknisblick (links): 0.5% links + 0.5% rechts breiter, 5% nach unten verlängert
  { left: "42.835%", top: "32.20%", width: "8.13%", height: "25.93%" },
  // Penthouse Schlosshügel (Mitte): 1% nach rechts breiter, 5% nach unten verlängert
  { left: "52.735%", top: "32.20%", width: "8.13%", height: "25.93%" },
  // Refugium Steinhof (rechts): nur 5% nach unten verlängert
  { left: "62.135%", top: "32.20%", width: "7.13%", height: "25.93%" },
] as const;

function PropertyOverlay({ opacity }: { opacity?: MotionValue<number> }) {
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 z-20 pointer-events-none"
    >
      {PROPERTIES.map((property, index) => (
        <Link
          key={property.slug}
          href={`/portfolio/${property.slug}`}
          aria-label={`${property.name} — ${property.location}, ${property.specs.preisspanne}. Details ansehen.`}
          className="group absolute pointer-events-auto transition-transform duration-500 hover:scale-[1.03]"
          style={FRAME_POSITIONS[index]}
        >
          <div className="relative h-full w-full overflow-hidden border-2 border-bergforest-950">
            <Image
              src={property.image}
              alt={property.imageAlt}
              fill
              sizes="(max-width: 768px) 30vw, 10vw"
              className="object-cover transition-opacity duration-500 group-hover:opacity-90"
            />

            {/* Gradient für permanente Text-Lesbarkeit am unteren Rand */}
            <div className="absolute inset-0 bg-gradient-to-t from-bergforest-950/85 via-bergforest-950/30 to-transparent pointer-events-none" />

            {/* Permanenter Text-Block: Location + Name + Details-Hint */}
            <div className="absolute inset-x-0 bottom-0 p-2 md:p-3 text-cream-50">
              <p className="font-body text-[8px] md:text-[9px] tracking-[0.18em] uppercase text-kupfer-400">
                {property.location}
              </p>
              <p className="font-display font-light text-[13px] md:text-[15px] leading-[1.1] mt-1 tracking-tight">
                {property.name}
              </p>
              <p className="font-body text-[8px] md:text-[9px] tracking-[0.18em] uppercase text-cream-200/70 mt-2 flex items-baseline gap-1">
                <span className="border-b border-cream-200/30 pb-px">Details</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </motion.div>
  );
}

/* ------------------ Lock-Indicator (visuelles Feedback während Lock) ------------------ */

function LockIndicator({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-[5vh] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="flex items-center gap-3 px-5 py-2.5 bg-bergforest-950/85 backdrop-blur-md border border-cream-50/10">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="block w-1.5 h-1.5 rounded-full bg-kupfer-500"
            />
            <span className="font-body text-[10px] tracking-[0.25em] uppercase text-cream-50/80">
              Moment
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------ Library-Display-Overlay (Endframe, S-Kurve) ------------------ */

// Position des 75″-Displays im Frame 435 — vom User justiert.
const DISPLAY_POSITION = {
  left: "39.15%",
  top: "28.05%",
  width: "21.7%",
  height: "24.9%",
} as const;

function LibraryOverlay({
  opacity,
  scrollProgress,
}: {
  opacity?: MotionValue<number>;
  scrollProgress: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 z-30 pointer-events-none"
    >
      {/* Heritage-Timeline IM Display (Position unverändert). */}
      <div
        className="absolute pointer-events-none overflow-hidden"
        style={DISPLAY_POSITION}
      >
        <HeritageSlalomTimeline scrollProgress={scrollProgress} />
      </div>

      {/* Dezenter Backdrop links für Text-Lesbarkeit. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,22,18,0.68) 0%, rgba(15,22,18,0.45) 25%, rgba(15,22,18,0.15) 45%, rgba(15,22,18,0) 65%)",
        }}
      />

      {/* Editorial-Text-Block, vertikal zentriert. */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[6vw] md:left-[8vw] max-w-[440px] pointer-events-auto">
        <p className="editorial-caption text-cream-50/55 mb-2">
          Im Atelier
        </p>

        <span className="editorial-divider" />

        <h2 className="font-display font-light text-cream-50 text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight mb-1">
          <em className="italic">37 Jahre</em>.
        </h2>
        <h2 className="font-display font-light text-cream-50 text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight mb-8">
          Ein Haus.
        </h2>

        <p className="editorial-body mb-10 max-w-[36ch]">
          Auf dem Bildschirm: die Chronik des Hauses — von der
          Gründung durch <em>Helmuth Marxer-Beck</em> im Jahr
          <em> 1987</em> bis zum heutigen Bestand von
          <em> 312 Adressen</em> in vier Gemeinden.
        </p>

        <div className="border-t border-cream-50/15 pt-6">
          <p className="mono-caption text-kupfer-500/85 mb-2">
            Aeulestrasse 5 · 9490 Vaduz
          </p>
          <p className="editorial-signature">
            Besuch nach Vereinbarung
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------ Corridor-Overlay (Portfolio-Header) ------------------ */

function CorridorOverlay({ opacity }: { opacity?: MotionValue<number> }) {
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 z-20 pointer-events-none"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,22,18,0.65) 0%, rgba(15,22,18,0.35) 30%, rgba(15,22,18,0.05) 50%, rgba(15,22,18,0) 65%)",
        }}
      />

      <div className="absolute top-1/2 -translate-y-1/2 left-[6vw] md:left-[8vw] max-w-[420px] pointer-events-auto">
        <p className="editorial-caption text-cream-50/55 mb-2">
          Stand Mai 2024
        </p>

        <span className="editorial-divider" />

        <h2 className="font-display font-light text-cream-50 text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight mb-2">
          Drei <em className="italic">Mandate</em>.
        </h2>
        <h2 className="font-display font-light text-cream-50/85 text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight mb-10">
          Drei <em className="italic">Adressen</em>.
        </h2>

        <div className="flex items-center gap-3 text-cream-50/60">
          <span className="block h-px w-8 bg-cream-50/30" />
          <span className="font-body text-[10px] tracking-[0.25em] uppercase">
            Eine zum Vergrössern wählen
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------ Initial-Overlay (mit Pulse-Fix) ------------------ */

function InitialOverlay({
  opacity,
  y,
  hintOpacity,
}: {
  opacity?: MotionValue<number>;
  y?: MotionValue<number>;
  hintOpacity?: MotionValue<number>;
}) {
  const [hintActive, setHintActive] = useState(true);

  useEffect(() => {
    if (!hintOpacity) return;
    const unsubscribe = hintOpacity.on("change", (latest) => {
      setHintActive(latest > 0.1);
    });
    return unsubscribe;
  }, [hintOpacity]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 z-10 pointer-events-none"
    >
      {/* Backdrop links für Text-Lesbarkeit der Headline. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,22,18,0.65) 0%, rgba(15,22,18,0.45) 30%, rgba(15,22,18,0.15) 55%, rgba(15,22,18,0) 75%)",
        }}
      />

      <div className="absolute top-1/2 -translate-y-1/2 left-[6vw] md:left-[8vw] max-w-[720px] pointer-events-auto">
        <motion.p
          className="mono-caption text-kupfer-500/85 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          DISKRETER IMMOBILIENMAKLER · LIECHTENSTEIN
        </motion.p>

        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          style={{ originX: 0, display: "block" }}
          className="editorial-divider"
        />

        <h1 className="mt-8 mb-2 font-display font-light tracking-tight text-cream-50 text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.92]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.5, ease: EASE }}
            >
              Adressen im <em className="italic font-medium">Ländle</em>.
            </motion.span>
          </span>
        </h1>
        <h1 className="mb-12 font-display font-light tracking-tight text-cream-50 text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.92]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.7, ease: EASE }}
            >
              Seit <em className="italic font-medium">1987</em>.
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="editorial-body text-cream-50/80 mb-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
        >
          <em>312</em> vermittelt. <em>Achtzehn</em> aktuell.
        </motion.p>
        <motion.p
          className="editorial-body text-cream-50/65"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
        >
          Vaduz · Triesenberg · Schaan · Triesen.
        </motion.p>
      </div>

      <motion.div
        style={{ opacity: hintOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
        className="absolute inset-x-0 bottom-24 md:bottom-28 flex justify-center pointer-events-none"
      >
        <motion.span
          className="mono-caption text-cream-200/60"
          animate={
            hintActive ? { opacity: [0.45, 0.95, 0.45] } : { opacity: 0.45 }
          }
          transition={
            hintActive
              ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        >
          ↓ Scroll to enter
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

/* ------------------ Proof-Overlay ------------------ */

function ProofOverlay({ opacity }: { opacity?: MotionValue<number> }) {
  // Proof-Inhalt wanderte in den InitialOverlay (312 vermittelt /
  // Achtzehn aktuell / Gemeinde-Liste). Container bleibt erhalten —
  // Show-Logic + Opacity-Ramp intakt, einfach kein UI mehr.
  void opacity;
  return null;
}

/* ------------------ Anna-Statement (Helmuth-Wand) ------------------ */

function AnnaStatement({ opacity }: { opacity?: MotionValue<number> }) {
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 z-20 pointer-events-none"
    >
      {/* Dezenter Backdrop-Gradient links. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,22,18,0.65) 0%, rgba(15,22,18,0.45) 30%, rgba(15,22,18,0.15) 55%, rgba(15,22,18,0) 75%)",
        }}
      />

      <div className="absolute top-1/2 -translate-y-1/2 left-[6vw] md:left-[8vw] max-w-[480px] md:max-w-[540px] pointer-events-auto">
        <p className="mono-caption text-kupfer-500/85 mb-2">
          1958 — 2019
        </p>

        <span className="editorial-divider" />

        <p className="mono-caption text-cream-50/65 mb-8">
          HELMUTH MARXER-BECK
        </p>

        <blockquote className="font-display font-light text-cream-50 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] tracking-tight mb-8">
          <span className="text-kupfer-500/70 text-[1.5em] leading-none align-text-top">„</span>
          Den letzten Satz, den mein Vater mir am Telefon gesagt hat, war:
          <em className="italic font-normal block mt-3 text-cream-50/85">
            ›Vergiss nie, wem das Haus gehört, bevor du es zeigst.‹
          </em>
          <span className="block mt-4">Ich vergesse ihn nicht.</span>
        </blockquote>

        <p className="editorial-signature">
          Anna Marxer-Beck, im Frühjahr 2024
        </p>
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------------------- *
 *  Mobile / reduced-motion: statisches Poster + Headline           *
 *  (unverändert von vorher)                                        *
 * --------------------------------------------------------------- */

function HeroStatic() {
  return (
    <>
      <section className="relative h-[100svh] w-full overflow-hidden bg-bergforest-950 text-cream-50">
        <Image
          src={POSTER_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,22,18,0.55) 0%, rgba(15,22,18,0.25) 35%, rgba(15,22,18,0.65) 100%)",
          }}
        />

        <div className="absolute inset-0 z-10">
          <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6">
            <div className="max-w-[60ch]">
              <p className="mono-caption text-kupfer-500">
                HAUS UND HANG · LIECHTENSTEIN
              </p>
              <h1 className="mt-6 font-display font-light tracking-tight text-cream-50 text-[clamp(2.75rem,9vw,4.5rem)] leading-[0.95]">
                Vier Gemeinden.
                <br />
                Achtzehn Adressen.
                <br />
                Ein Massstab.
              </h1>
              <p className="mt-8 max-w-[60ch] text-[16px] leading-[1.55] text-cream-100/85">
                Kuratierter Immobilienbestand im Fürstentum Liechtenstein.
                Zweite Generation, eine Vermittlung nach der anderen.
              </p>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-8 px-6 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase font-body text-cream-200/55">
            <span>EST. 1987</span>
            <span>4 Gemeinden</span>
          </div>
        </div>
      </section>

      <section className="bg-bergforest-950 text-cream-50 py-24 px-6">
        <p className="mono-caption text-kupfer-500">ANNA MARXER-BECK</p>
        <p className="mt-4 font-display italic font-light text-2xl text-cream-50 leading-[1.2]">
          Inhaberin, zweite Generation.
        </p>
        <blockquote className="mt-8 font-display font-light text-xl text-cream-100 leading-[1.4] tracking-tight max-w-[42ch]">
          «Mein Vater hat 1987 mit drei Adressen begonnen. Wir sind auf
          312 gewachsen, ohne die erste zu vergessen.»
        </blockquote>
        <Link
          href="/kontakt"
          className="mt-10 inline-flex items-center gap-3 border border-kupfer-500 text-kupfer-400 px-7 py-4 font-body text-[11px] tracking-[0.2em] uppercase"
        >
          Termin im Atelier <span>→</span>
        </Link>
      </section>
    </>
  );
}
