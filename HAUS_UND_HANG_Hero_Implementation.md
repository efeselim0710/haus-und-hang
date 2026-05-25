# HAUS UND HANG — Hero Implementation (Scroll-Scrubbed Video)

**Auftrag:** Implementiere die Hero-Sektion mit Scroll-Scrubbed Video.
Das Video heißt `villa-flight-scene-1.mp4` und liegt in `/public/video/`.

---

## Verhaltensweise (Pflichtenheft)

### 1. Initial-Zustand (User hat noch nicht gescrollt)

- Das Video zeigt **FRAME 0** als Standbild (der Außen-Master-Anflug-Frame)
- Frame 0 erscheint wie ein hochwertiges statisches Hero-Bild
- KEINE Auto-Play, KEINE Bewegung, KEIN Loop
- Headline ist sichtbar **OVERLAY** auf dem Frame:

  ```
  HAUS UND HANG · LIECHTENSTEIN  (kleines Eyebrow oben, JetBrains Mono, kupfer-500)

  Vier Gemeinden.                  (Fraunces, 96px Desktop / 56px Mobile)
  Achtzehn Adressen.               (mask-reveal animation on initial load)
  Ein Massstab.

  Kuratierter Immobilienbestand    (Inter, 18px, cream-100, max 60ch)
  im Fürstentum Liechtenstein.

  [ ↓ Scroll to enter ]            (kleiner CTA-Hint unten, JetBrains Mono, animiert pulsierend)
  ```

- Drittbeweis-Strip am unteren Bildrand:
  ```
  EST. 1987    ·    312 ADRESSEN    ·    4 GEMEINDEN
  ```
  (kleine Mono-Caption, cream-200 mit 50% Opacity)

### 2. Scroll-Phase (User scrollt nach unten)

- Sobald `scrollY > 1px`: Das Video startet zu **scrubben** (currentTime
  wird mit Scroll-Progress synchronisiert)
- Die Headline fadet **schnell aus** (innerhalb der ersten 10% Scroll)
- Der "Scroll to enter"-Hint verschwindet sofort beim ersten Scroll
- Der Drittbeweis-Strip bleibt **länger sichtbar** (fadet erst bei 15% raus)
- Das Video läuft DURCH den gesamten Scroll-Bereich des Heroes proportional

### 3. End-Phase (User hat das Ende des Hero-Bereichs erreicht)

- Video ist beim **letzten Frame** angekommen (Endframe: Porträt-Wand mit
  Heritage-Foto und Treppen)
- Das Video **hält** an diesem Frame
- Ein neuer Text fadet ein, **OVERLAY** auf dem Endframe:

  ```
  ABI MARXER-BECK                  (klein, Mono, kupfer-500, eyebrow)

  Inhaberin, zweite Generation.    (Fraunces Italic, 32px,
                                    fadet zeilenweise ein,
                                    cream-50)

  «Mein Vater hat 1987 mit drei     (Fraunces, 24px, cream-100,
   Adressen begonnen. Wir sind auf  max 50ch, zentriert links)
   312 gewachsen, ohne die erste
   zu vergessen.»

  [Termin im Atelier →]            (Outlined Button, kupfer-500,
                                    erscheint zuletzt)
  ```

- Der Text erscheint **rechts** im Bild (nicht zentriert), damit das
  Porträt links die Hauptrolle behält
- Das Heritage-Porträt im Bild kann durch CSS-Filter leicht
  entsättigt/abgedimmt werden, um die Lesbarkeit des Textes zu erhöhen

---

## Technische Spezifikation

### Container & Scroll-Mechanik

```tsx
// Die gesamte Hero-Sektion hat eine Höhe von 250vh (gibt User genug
// Scroll-Strecke für das 6s-Video)
//
// Das Video selbst ist position: sticky, top: 0, height: 100vh
// Es bleibt während der gesamten 250vh "kleben" am Top.

<section className="relative h-[250vh]">
  <div className="sticky top-0 h-screen w-screen overflow-hidden">
    <video
      ref={videoRef}
      src="/video/villa-flight-scene-1.mp4"
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
      // KEIN autoplay, KEIN loop, KEIN controls
    />

    {/* Overlay-Layer für Headline + End-Text */}
    <HeroOverlays scrollProgress={scrollProgress} />
  </div>
</section>
```

### Scroll-Scrubbing-Logic (mit Motion)

```tsx
import { useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { useRef, useEffect } from 'react'

const heroRef = useRef(null)
const videoRef = useRef<HTMLVideoElement>(null)

const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ["start start", "end end"]
})

// Video-Scrub auf Scroll
useMotionValueEvent(scrollYProgress, "change", (progress) => {
  const video = videoRef.current
  if (!video || !video.duration) return

  // Map 0 → 0.95 (lass das letzte Stück Scroll für End-Text-Overlay)
  const targetProgress = Math.min(progress / 0.85, 1)
  video.currentTime = targetProgress * video.duration
})

// Headline-Visibility (sichtbar 0-10%)
const headlineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 1, 0])
const headlineY = useTransform(scrollYProgress, [0, 0.1], [0, -40])

// Drittbeweis-Visibility (sichtbar 0-15%)
const proofOpacity = useTransform(scrollYProgress, [0, 0.12, 0.15], [1, 1, 0])

// End-Text-Visibility (sichtbar 85-100%)
const endTextOpacity = useTransform(scrollYProgress, [0.82, 0.88, 1], [0, 1, 1])
const endTextY = useTransform(scrollYProgress, [0.82, 0.92], [20, 0])
```

### Initial-Frame absichern

```tsx
// Beim Mount: Video auf Frame 0 setzen (manche Browser zeigen sonst
// einen kurzen schwarzen Flash)
useEffect(() => {
  const video = videoRef.current
  if (!video) return

  const handleLoadedMetadata = () => {
    video.currentTime = 0.01  // 0.01s statt 0, damit Frame definitiv da ist
  }

  video.addEventListener('loadedmetadata', handleLoadedMetadata)
  return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata)
}, [])
```

### Performance-Optimierungen (PFLICHT)

```tsx
// 1. Video preloaden im <head> der Page
<link rel="preload" as="video" href="/video/villa-flight-scene-1.mp4" />

// 2. Poster-Image als Fallback bevor Video lädt
<video poster="/video/villa-flight-poster.webp" ... />

// 3. requestVideoFrameCallback für smoothness (falls verfügbar)
useEffect(() => {
  const video = videoRef.current
  if (!video || !('requestVideoFrameCallback' in video)) return

  const updateFrame = () => {
    video.requestVideoFrameCallback(updateFrame)
  }
  video.requestVideoFrameCallback(updateFrame)
}, [])
```

### Mobile-Fallback (<768px)

```tsx
const isMobile = useMediaQuery('(max-width: 767px)')
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

if (isMobile || prefersReducedMotion) {
  return (
    <section className="relative h-screen">
      {/* Statisches Poster + Headline darüber */}
      <Image
        src="/video/villa-flight-poster.webp"
        fill
        alt=""
        className="object-cover"
        priority
      />
      <div className="relative z-10 ...">
        {/* Gleiche Headline + Drittbeweis, ABER:
            - Kein Scroll-Scrub
            - End-Text kommt in einer separaten Sektion DARUNTER */}
      </div>
    </section>
  )
}
```

---

## Overlay-Design — präzise Positionen

### Initial-Overlay (Hero-Headline)

```
Layout:    Links-orientiert, max-w-[60ch], starts at left 8vw
Vertical:  Centered vertically (top: 50%, transform: translateY(-50%))
Padding:   p-8 md:p-16
Z-Index:   z-10

Eyebrow:   text-xs tracking-[0.2em] uppercase font-mono text-kupfer-500
           margin-bottom: 24px

Headline:  font-display text-[clamp(48px,8vw,96px)]
           leading-[0.95] tracking-tight text-cream-50
           font-weight: 300 (Fraunces Light)
           margin-bottom: 32px

Subline:   font-body text-base md:text-lg text-cream-100
           max-w-[60ch] opacity-80
           margin-bottom: 48px

Hint:      text-xs font-mono tracking-widest text-cream-200/60
           animate-pulse-slow (custom slow pulse animation)
           position: absolute bottom-16
```

### Drittbeweis-Strip

```
Position:  absolute bottom-8 left-8 right-8
Layout:    flex justify-between items-center
Style:     text-[10px] tracking-[0.3em] uppercase font-mono
           text-cream-200/40
Width:     full width with even distribution

Beispiel:
  EST. 1987          312 ADRESSEN          4 GEMEINDEN
```

### End-Overlay (Inhaber-Statement)

```
Layout:    Rechts-orientiert, max-w-[480px]
Position:  absolute right-[8vw] top-1/2 transform -translate-y-1/2
Vertical:  Centered

Background: Subtiler dunkler Gradient hinter dem Text für Lesbarkeit
           (linear-gradient(to left, rgba(15,22,18,0.6), transparent))
           Padding-left auf dem Text, Gradient erweitert nach links raus

Eyebrow:   text-xs tracking-[0.2em] uppercase font-mono text-kupfer-500
           "ANNA MARXER-BECK"
           margin-bottom: 16px

Role:      font-display italic text-2xl text-cream-50
           "Inhaberin, zweite Generation."
           margin-bottom: 32px

Quote:     font-display text-xl md:text-2xl text-cream-100
           leading-[1.4] tracking-tight font-weight: 300
           max-w-[420px]
           «text in Guillemets»
           margin-bottom: 48px

CTA:       Outlined button, kupfer-500 border, kupfer-500 text
           hover: bg-kupfer-500 text-bergforest-950
           padding: 16px 32px
           font-mono text-xs tracking-[0.2em] uppercase
           "Termin im Atelier →"
```

---

## Animationen (Motion)

### Initial Headline Reveal (beim Page-Load)

```tsx
// Jede Zeile der Headline maskt-reveal von unten, mit 200ms stagger
// Eyebrow zuerst (opacity fade), dann Zeilen, dann Subline, dann Hint

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  {eyebrow}
</motion.div>

<h1>
  <motion.span style={{ display: 'block', overflow: 'hidden' }}>
    <motion.span
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      Vier Gemeinden.
    </motion.span>
  </motion.span>
  {/* Repeat für Zeile 2 mit delay: 0.6, Zeile 3 mit delay: 0.8 */}
</h1>
```

### End-Text Reveal (beim Hero-Ende-Scroll)

```tsx
// Triggert durch scrollYProgress > 0.82
// Sequence: Eyebrow → Role → Quote line-by-line → CTA

<motion.div style={{ opacity: endTextOpacity, y: endTextY }}>
  {/* Eyebrow */}
  <motion.div ...>ANNA MARXER-BECK</motion.div>

  {/* Role (Fraunces Italic) */}
  <motion.div ...>Inhaberin, zweite Generation.</motion.div>

  {/* Quote — zeilenweise wenn möglich */}
  <motion.blockquote ...>
    «Mein Vater hat 1987 mit drei Adressen begonnen.
    Wir sind auf 312 gewachsen, ohne die erste zu vergessen.»
  </motion.blockquote>

  {/* CTA Button */}
  <motion.button ...>Termin im Atelier →</motion.button>
</motion.div>
```

---

## Edge Cases & Robustheit

### 1. Safari currentTime-Update kann ruckeln

Safari aktualisiert `currentTime` nicht so smooth wie Chrome.
**Fix:** Nutze `requestVideoFrameCallback` falls verfügbar, sonst
`requestAnimationFrame` zur Synchronisation.

### 2. Video lädt langsam auf 4G

**Fix:**
- Poster-Image (Frame 0) als WebP, ~150 KB
- Video preloaden mit `<link rel="preload">`
- Spinner-Indicator (subtil) während `readyState < 4`
- Scroll-Interaktion erst aktivieren wenn Video bereit ist

### 3. Rückwärts-Scroll

Browser kann VP9/H.264 rückwärts dekodieren, aber bei niedriger
Keyframe-Density kann es ruckeln.
**Fix:** Beim Video-Export auf jeden Frame als Keyframe gesetzt (das
hast du in DaVinci gemacht, falls nicht: machen!).

### 4. Touch-Devices ohne sauberes Scrolling

**Fix:** Bei iOS/Android das Standard-Touch-Scrolling beibehalten,
NICHT mit `overflow: hidden` oder ähnlichem überschreiben.

---

## Done-Definition

- [ ] Video startet bei Frame 0 als Standbild
- [ ] Scroll triggert smooth currentTime-Sync
- [ ] Initial-Headline läuft Reveal-Animation beim Page-Load
- [ ] Headline fadet sauber aus beim ersten Scroll
- [ ] Drittbeweis-Strip ist sichtbar im Hero-Anfang
- [ ] Bei Hero-Ende: End-Text fadet ein mit Anna's Statement
- [ ] End-Text bleibt sichtbar wenn User weiter scrollt (oder fadet erst bei Sektion 2 raus)
- [ ] Mobile: statisches Poster + traditionelle Sektionen
- [ ] prefers-reduced-motion: kein Scrub, statisches Layout
- [ ] LCP < 2.5s auf 4G Mobile (Poster zählt als LCP)
- [ ] Keine Layout-Shifts (CLS < 0.05)
- [ ] Video <= 8 MB

---

## Was später kommt (NICHT in dieser Iteration)

- Video-Module 2-7 (Wohnraum, Off-Market, Galerie, Pull-back) folgen
- Portfolio-Cards-Overlay auf dem schwarzen Display
- Team-Portraits auf den Galerie-Wänden
- Off-Market-Sektion mit 7 Kerzen

Erstmal NUR diese Hero-Sektion sauber bauen. Wenn die sitzt, kommt
der Rest dazu.
