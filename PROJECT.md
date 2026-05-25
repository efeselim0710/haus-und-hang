# HAUS UND HANG · Project Bible

Vollständige technische Dokumentation für die Demo-Website **HAUS UND HANG
Immobilien**. Pitch-Asset für AIT Group, gerichtet an Liechtensteiner
Premium-Makler (E&V, JWT, Broder, ITW). Sämtliche Inhalte (Inhaberin, Team,
Portfolio, Zahlen) sind **fiktiv**.

> **Status:** Live unter [haus-und-hang.vercel.app](https://haus-und-hang.vercel.app).
> Forms sind gestubt, kein Backend, keine API-Routes. Demo-Modus.
>
> **Letzte Iteration:** Performance-Optimierung der Hero-Frame-Sequence.

---

## 1 · Tech Stack

| Layer | Wahl | Begründung |
|---|---|---|
| Framework | **Next.js 16.2** (App Router, Turbopack) | SSG für jede Route, Edge-CDN via Vercel, Routing über Filesystem |
| Runtime | **React 19.2** | Server Components, neue `use()`-API |
| Sprache | **TypeScript** strict | Zero `any`, alle Props typed |
| Styling | **Tailwind CSS v4** | CSS-first `@theme` in [globals.css](haus-und-hang/app/globals.css), kein `tailwind.config.ts` |
| Animation | **motion/react** v12 (ehemals Framer Motion) | `useScroll`, `useMotionValueEvent`, `useTransform`, `AnimatePresence` |
| Forms | **react-hook-form** + **zod** | Validation auf Client, ohne Backend |
| Fonts | **next/font** (Fraunces, Inter, Lora) | self-hosted, CLS-frei |
| 3D (legacy) | **@react-three/fiber** + **drei** | Eingebaut, dann abgelöst durch Canvas-Image-Sequence |
| Charts | **recharts** | Insights-Section |

**Node:** 20+ erforderlich (Next.js 16). Package-Manager: npm.

### Wichtige Versionen
```
"next": "16.2.6"
"react": "19.2.4"
"motion": "^12.40.0"
"tailwindcss": "^4"
"typescript": "^5"
"three": "^0.184.0"        // ungenutzt, kann weg
"@react-three/fiber": "^9" // ungenutzt, kann weg
"@react-three/drei": "^10" // ungenutzt, kann weg
```

> **Ballast-Kandidaten:** Three.js wurde durch die Image-Sequence abgelöst,
> Hero3D.tsx ist deprecated. Können entfernt werden, sparen ~600 KB Bundle.

---

## 2 · Project Layout

```
haus-und-hang/
├── app/
│   ├── layout.tsx              # Root, Fonts, Metadata
│   ├── page.tsx                # Home (Hero + Anna + OffMarket + Contact)
│   ├── globals.css             # Tailwind @theme + Editorial-Helpers
│   ├── icon.svg                # Favicon (H+H in Kupfer)
│   ├── apple-icon.png          # 180×180 PNG
│   ├── opengraph-image.jpg     # 1200×630 (frame_001 gecropped)
│   ├── twitter-image.jpg       # Dito (twitter:image)
│   ├── robots.ts               # SEO: alles erlaubt
│   ├── sitemap.ts              # 11 Routen
│   ├── team/
│   │   ├── page.tsx            # Re-export
│   │   └── TeamPage.tsx        # "use client" Page
│   ├── kontakt/
│   │   ├── page.tsx
│   │   └── KontaktPage.tsx     # Alternativer Kontakt zur Home-Section
│   ├── impressum/page.tsx      # Stub
│   ├── datenschutz/page.tsx    # Stub
│   ├── standesordnung/page.tsx # Stub
│   ├── marktinsights/page.tsx  # Stub
│   ├── portfolio/
│   │   ├── [slug]/             # SSG via PROPERTIES
│   │   └── villa-triesenberg/  # Legacy statische Route
│
├── components/
│   ├── Hero.tsx                # 858 LoC — Canvas-Image-Sequence + 3 Locks
│   ├── HeritageSlalomTimeline.tsx  # S-Kurven-SVG, Milestones
│   ├── Nav.tsx                 # Top-Nav + Burger-Overlay (mobile)
│   ├── Footer.tsx              # 4-Spalten + Pflichtangaben + AIT-Easter-Egg
│   ├── AnnaSection.tsx         # Inhaberin-Block (cream-100)
│   ├── OffMarketSection.tsx    # 14 Dot-Cluster + Form (cream + dark frame)
│   ├── ContactSection.tsx      # 3-Step-Booking (cream mit dark inset)
│   ├── ContactForm.tsx         # Wird auf Property-Detail genutzt (dark BG)
│   ├── StubPage.tsx            # Shared Layout für Legal/Marktinsights
│   ├── Hero3D.tsx              # DEPRECATED — alte 3D-Version
│   ├── Manifest.tsx            # Auskommentiert in page.tsx
│   ├── Addresses.tsx           # Auskommentiert
│   ├── Insights.tsx            # Auskommentiert
│   ├── ProofStrip.tsx          # Hero-Untertitel-Strip
│   ├── TeamTease.tsx           # Auskommentiert
│   ├── AddressCard.tsx         # Genutzt von Addresses (auskomm.)
│   ├── ContactBlock.tsx        # Auskommentiert
│   ├── OffMarket.tsx           # Alte Version vor OffMarketSection
│
├── data/
│   ├── properties.ts           # 3 Properties (villa-falknisblick, …)
│   └── heritage.ts             # 6 Milestones für HeritageSlalomTimeline
│
├── lib/
│   ├── team.ts                 # 6 Personen, 1 lokales Anna-Bild + 5 Unsplash
│   ├── properties.ts           # Legacy-Typ, von villa-triesenberg genutzt
│   ├── insights.ts             # Marktdaten für Insights.tsx (auskomm.)
│   └── motion.ts               # Easings-Helper
│
├── public/
│   ├── video/
│   │   ├── frames/             # 435 JPEG-Frames (~87 MB nach Resize)
│   │   ├── Anna.webp           # Inhaberin-Portrait
│   │   ├── villa-flight-poster.webp  # Hero-Poster vor Frame-Load
│   │   └── *.mp4               # Alte Video-Versionen (ungenutzt)
│   ├── 3d/
│   │   └── haus-und-hang-hero.glb    # DEPRECATED, 58 MB — kann weg
│   ├── Villa Triesenberg.webp        # Property-Bilder
│   ├── Villa Vaduz.webp
│   ├── Villa Schaan.webp
│
├── .gitattributes              # LFS-Regel entfernt (Vercel pullt LFS nicht)
├── .gitignore                  # node_modules, .next, .env*, !.env.example
├── .env.example                # Nur NEXT_PUBLIC_SITE_URL (optional)
├── vercel.json                 # framework=nextjs, region=fra1
├── next.config.ts              # Cache-Headers für /video/frames
├── tsconfig.json               # strict, @/* paths
├── package.json
├── README.md                   # Quick-Start + Deploy-Schritte
├── PROJECT.md                  # Diese Datei
├── AGENTS.md                   # Hinweis "This is NOT the Next.js you know"
└── CLAUDE.md                   # @AGENTS.md inkludieren
```

---

## 3 · Design System

### 3.1 Farbpalette (definiert in [globals.css](haus-und-hang/app/globals.css))

| Token | Hex | Use |
|---|---|---|
| `bergforest-950` | `#0F1612` | Dark BG (Hero, Footer, Booking-Inset, Dot-Frame) |
| `bergforest-900` | `#15201A` | Hover/Active auf dark |
| `bergforest-800` | `#1E2A23` | Text dark muted |
| `bergforest-700` → `300` | Helle Forest-Tints | selten genutzt |
| `cream-50` | `#FAF6EF` | Primärer Light-BG, Text auf dark |
| `cream-100` | `#F2EBDD` | Sektion-BG (Anna, OffMarket, Contact) |
| `cream-200` / `-300` | Wärmere Töne | Borders/Footer |
| `kupfer-500` | `#B87333` | Akzent-Primary (Buttons, Lines, Captions) |
| `kupfer-700` | `#8B5524` | Akzent auf hell |
| `kupfer-400` | `#CF8B49` | Hover auf dark |
| `stein-900` → `100` | Neutrale Greys | Footer-Pflichtangaben, Body-Text |

**Rhythmus**: Dark Hero → Cream Anna → Cream OffMarket → Cream Contact (mit
dark Inset) → Dark Footer. Kupfer ist **Salz, nicht Suppe** — sparsam für
Akzente und Heritage-Marker.

### 3.2 Typografie

| Familie | CSS-Variable | Use |
|---|---|---|
| **Fraunces** | `--font-display` / `--font-fraunces` | Headlines (`<h1>`-`<h4>`), Italic-Highlights |
| **Lora** | `--font-editorial` | Editorial-Prosa, Quotes, Signaturen |
| **Inter** | `--font-body` / `--font-inter` | Body, Buttons, Captions |
| (Inter-Slot) | `--font-mono` | Aliased auf Inter — JetBrains Mono wurde ersetzt |

**Skalen-Konvention**: `clamp(min, vw, max)` für fluid type, z. B.
`text-[clamp(2.5rem,5vw,4rem)]` für Section-Headlines.

**`.mono-caption`** (in [globals.css](haus-und-hang/app/globals.css)): 0.6875rem,
uppercase, tracking 0.18em, weight 500 — die kleinen Eyebrows über jeder
Sektion (z. B. "KONTAKT · NACH VEREINBARUNG").

### 3.3 Motion / Easing

Alle Komponenten verwenden eine konsistente Bezier:

```ts
const EASE = [0.22, 1, 0.36, 1] as const;
```

Globaler CSS-Token in `@theme`:
```css
--ease-bergforest: cubic-bezier(0.22, 1, 0.36, 1);
```

**Reduced-Motion-Branch** (in `globals.css`):
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; ... }
  .line-mask > span { transform: translateY(0) !important; }
}
```

Hero respektiert `prefers-reduced-motion` und rendert dann `HeroStatic`
statt der Image-Sequence (kein Scroll-Scrub).

---

## 4 · Hero (das Herzstück)

**File**: [components/Hero.tsx](haus-und-hang/components/Hero.tsx) — 858 LoC.

### 4.1 Architektur

```
Hero (entry)
  ├── pre-mount Skeleton          # SSR-safe bg-bergforest-950
  ├── HeroStatic                  # Mobile + reduced-motion
  └── HeroCanvas                  # Desktop, full scroll-scrub
       ├── Canvas (DPR-aware)
       ├── 5 Overlays (Initial, Proof, Anna-End, Corridor, Property, Library)
       ├── 3 Scroll-Locks         # Snap-points mit Velocity-Gate
       ├── HeritageSlalomTimeline # SVG, animiert im End-Overlay
       └── Properties-Cards Overlay
```

### 4.2 Frame-Sequence

- **435 Frames** total in `public/video/frames/`, JPEG, 1920×814 (nach Resize), je ~200 KB
- **Drei Szenen**:
  - 1–145: Villa-Anflug aussen (initial Hero, "Adressen im Ländle")
  - 146–290: Korridor-Walk innen (Anna-Statement, Portfolio-Cards)
  - 291–435: Library-Reveal mit Display (Heritage-Timeline)
- **Lazy-Loading**: Erste 200 Frames sofort, Rest ab `progress > 0.45`
- **Pfad-Pattern**: `/video/frames/frame_001.jpg` mit 3-stelliger Padding

### 4.3 Canvas-Rendering

```ts
// DPR-aware Resizing
canvas.width  = window.innerWidth  * devicePixelRatio;
canvas.height = window.innerHeight * devicePixelRatio;
ctx.scale(dpr, dpr);
```

```ts
// object-fit: contain (Letterbox statt Crop)
if (imageRatio > canvasRatio) {
  drawWidth  = canvasWidth;
  drawHeight = drawWidth / imageRatio;
  drawY      = (canvasHeight - drawHeight) / 2;
}
```

**Fallback-Frame**: Wenn der Ziel-Frame noch nicht geladen ist (Speed-Reader
scrollt schneller als Lazy-Load), wird der letzte verfügbare Vorgänger-Frame
gezeichnet — verhindert schwarze Flashes.

### 4.4 Scroll-Locks (Snap-Choreografie)

Drei einmalige Locks mit Velocity-Gate (`< 3.5 px/ms` — verhindert
Cmd+End-Auslösung):

| Lock | Trigger-Range | Snap-Position | Dauer | Funktion |
|---|---|---|---|---|
| Anna-Lock | `0.302 – 0.36` | progress 0.307 | ~3.8 s | Anna-Statement lesen |
| Property-Lock | `0.65 – 0.70` | progress 0.66 | 1.5 s | 3 Property-Cards wahrnehmen |
| Library-Lock | `0.95 – 0.999` | progress 1.0 | ~3.8 s | Heritage-Timeline + Captions |

**Mechanik**:
1. `window.scrollTo({ behavior: 'smooth' })` zum Peak
2. Nach 300 ms `document.body.style.overflow = 'hidden'` + globaler
   `wheel`-Blocker (passive:false, preventDefault)
3. Nach `durationMs` Release: overflow zurück + `scrollBy(0)` zum Flush
   des Inertia-Buffers

### 4.5 Overlay-Timings

Per `useTransform(scrollYProgress, ...)` an die Frame-Progression gemappt:

| Overlay | Progress-Range | Inhalt |
|---|---|---|
| InitialOverlay | 0 → 0.033 | "DISKRETER IMMOBILIENMAKLER…" + "Adressen im Ländle. / Seit 1987." |
| Proof | 0 → 0.05 | "4 Gemeinden · 312 Adressen · Est. 1987" Strip |
| Anna-End | 0.273 → 0.367 | Helmuth-Zitat ("›Vergiss nie, wem das Haus gehört…‹") |
| Corridor | 0.567 → 0.69 | "Drei Adressen im Bestand" Headline |
| Property | 0.63 → 0.71 | 3 klickbare Cards mit `FRAME_POSITIONS` |
| Library | 0.88 → 1.0 | HeritageSlalomTimeline (S-Kurve, 6 Milestones) |

### 4.6 Property-Cards Overlay

Position-Pinning auf das Hintergrundbild via Viewport-Prozenten:

```ts
const DISPLAY_POSITION = { left: "39.15%", top: "28.05%", width: "21.7%", height: "24.9%" };
const FRAME_POSITIONS = [
  { left: "42.835%", top: "32.20%", width: "8.13%", height: "25.93%" }, // Villa Falknisblick
  { left: "52.735%", top: "32.20%", width: "8.13%", height: "25.93%" }, // Penthouse Schlosshügel
  { left: "62.135%", top: "32.20%", width: "7.13%", height: "25.93%" }, // Refugium Steinhof
];
```

⚠️ **Bekanntes Issue**: Auf abweichenden Viewport-Aspekten driften die
Frame-Positionen — Calibration ist für 1920×900 (Standard-Desktop).

### 4.7 HeritageSlalomTimeline

Eigene Komponente: SVG-S-Kurve mit progressivem Line-Draw, 6 Milestones, 3-Layer-Glow.

```ts
const PATH = "M 8,8 C 30,8 30,30 50,30 S 70,52 92,52";
const PATH_LENGTH = 220;
const LINE_START = 0.93; // Scroll-Progress
const LINE_END   = 1.0;
```

Milestones aus [data/heritage.ts](haus-und-hang/data/heritage.ts):
1987 Gründung · 1995 Erste Villa · 2007 Übergabe · 2015 Off-Market ·
2019 Helmuth (Anna übernimmt) · 2024 Heute.

---

## 5 · Sektionen unter dem Hero

### 5.1 AnnaSection ([components/AnnaSection.tsx](haus-und-hang/components/AnnaSection.tsx))

- **BG**: `cream-100`, `id="anna"`
- **Layout**: Grid `[1fr_1.1fr]`, links Foto (`/video/Anna.webp`,
  aspect-[3/4]), rechts Editorial-Text
- **Quote**: "Mein Vater hat mir nicht beigebracht, Häuser zu verkaufen.
  Er hat mir beigebracht, Familien *zuzuhören*." mit `border-l-2 border-kupfer-700/40`
- **Faktoren-Caption**: `EST. 1987 · 9 JAHRE INHABERIN · ARCHITEKTURSTUDIUM ETH`
- **Animation**: `whileInView` mit `x: -20 / +20` Slide-in

### 5.2 OffMarketSection ([components/OffMarketSection.tsx](haus-und-hang/components/OffMarketSection.tsx))

- **BG**: `cream-100`, `id="off-market"`, mit **darkem Frame** (`bg-bergforest-950`)
  für die 14-Dot-Visualisierung
- **DOT_POSITIONS**: 14 Punkte in 4 Clustern (Vaduz/Triesenberg/Schaan/Triesen),
  je mit `kupfer-500/30 blur(4px)` Glow + Scale-Pulse-Animation
- **Headline**: "*Vierzehn* Adressen, / die niemand findet."
- **Form**: 6 Felder (Name, E-Mail, Phone, Preissegment-Select, Message),
  cream-50 Card auf cream-100 BG
- **Submit**: gestubt → Success: "Wir nehmen Kontakt auf." + DEMO-Caption

### 5.3 ContactSection ([components/ContactSection.tsx](haus-und-hang/components/ContactSection.tsx))

- **BG**: `cream-100`, `id="kontakt"`, mit **dark Inset** (`bg-bergforest-950`)
  für den Booking-Block
- **3-Spalten Info**: Adresse · Telefonie · Öffnungszeiten
- **Booking-Flow** (3 Schritte):
  1. `01 · WIE` — Vor Ort / Video-Gespräch
  2. `02 · WANN` — 6 hardcoded `AVAILABLE_SLOTS` (Diese Woche / Nächste Woche)
  3. `03 · WER` — Name / E-Mail / Phone / Message
- **Aktive State**: `border-kupfer-500 bg-kupfer-500/8`
- **Submit**: gestubt → Success: "Wir melden uns persönlich." + DEMO-Caption

### 5.4 Footer ([components/Footer.tsx](haus-und-hang/components/Footer.tsx))

- **BG**: `bergforest-950 text-cream-100`
- **Hauptzeile**: 4-Spalten — Adresse / Adressen / Haus und Hang / Rechtliches
- **Pflichtangaben**: UID + HR + Gewerbebewilligung in mono-caption
- **AIT-Easter-Egg**: "DESIGNED & BUILT BY [AIT GROUP](https://ait.li) · LIECHTENSTEIN"

### 5.5 Nav ([components/Nav.tsx](haus-und-hang/components/Nav.tsx))

- **Desktop**: 4 Links (Kaufen/Mieten · Off-Market · Team · Kontakt) + DE/EN + Termin-Button
- **Scroll-State**: bei `scrollY > 80` wechselt Header von transparent (cream-50 text) zu cream-50/95 (stein-900 text)
- **Mobile**: Burger-Icon mit 3 stacked spans → X-Rotation, AnimatePresence Overlay
- **Mobile-Overlay**: Vollbild bergforest-950, gestaffelte Link-Reveals (delay i*0.06), Termin-Button + Kontakt-Footer
- **ESC-Key + Body-Scroll-Lock** beim Open

---

## 6 · Routen-Tabelle

| Route | Datei | Typ | Inhalt |
|---|---|---|---|
| `/` | `app/page.tsx` | Static | Hero + Anna + OffMarket + Contact |
| `/team` | `app/team/page.tsx` → `TeamPage.tsx` | Static | 6 Personen, Faktoren-Strip, Sprachen-Anchor |
| `/kontakt` | `app/kontakt/page.tsx` → `KontaktPage.tsx` | Static | Alternative Kontakt-Seite mit Form |
| `/portfolio/[slug]` | `app/portfolio/[slug]/page.tsx` | SSG | Dynamische Detail-Pages |
| → `/portfolio/villa-falknisblick` | (generiert) | | |
| → `/portfolio/penthouse-schlosshuegel` | (generiert) | | |
| → `/portfolio/refugium-steinhof` | (generiert) | | |
| `/portfolio/villa-triesenberg` | `app/portfolio/villa-triesenberg/page.tsx` | Static | Legacy-Route (ungenutzt im Footer) |
| `/impressum` | `app/impressum/page.tsx` | Static | Stub via `StubPage` |
| `/datenschutz` | `app/datenschutz/page.tsx` | Static | Stub |
| `/standesordnung` | `app/standesordnung/page.tsx` | Static | Stub |
| `/marktinsights` | `app/marktinsights/page.tsx` | Static | Stub |
| `/robots.txt` | `app/robots.ts` | Dynamic | SEO |
| `/sitemap.xml` | `app/sitemap.ts` | Dynamic | SEO, 11 Routen |

**Asset-Routen** (auto-generated via Next.js File-Conventions):
- `/icon.svg`, `/apple-icon.png`
- `/opengraph-image.jpg`, `/twitter-image.jpg`

---

## 7 · Forms — alle gestubt

Vier Forms, alle mit `react-hook-form` + `zod`, **keine echte Übermittlung**:

| Form | Datei | Schema-Felder | Success-Headline |
|---|---|---|---|
| Booking | [ContactSection.tsx](haus-und-hang/components/ContactSection.tsx) | name, email, phone, message? | "Wir melden uns persönlich." |
| Off-Market | [OffMarketSection.tsx](haus-und-hang/components/OffMarketSection.tsx) | name, email, phone?, budget, message | "Wir nehmen Kontakt auf." |
| Property-Inquiry | [ContactForm.tsx](haus-und-hang/components/ContactForm.tsx) | name, email, phone?, message | "Wir melden uns persönlich." |
| Kontakt-Page | [KontaktPage.tsx](haus-und-hang/app/kontakt/KontaktPage.tsx) | name, thema, nachricht (kein Zod) | "Wir nehmen Kontakt auf." |

**Implementierungs-Muster**:
```ts
const onSubmit = async (_data: FormValues) => {
  // Demo-Stub: kein Backend, keine echte Übermittlung.
  await new Promise((r) => setTimeout(r, 800));
  setSubmitted(true);
};
```

Alle haben dezente DEMO-Caption (`text-cream-100/30` bzw. `text-bergforest-800/30`):
```
DEMO · KEINE ECHTE ÜBERMITTLUNG
```

**zod-Schemas bleiben aktiv** für UX-Validation (sofortiges Inline-Feedback).

---

## 8 · SEO + Metadata

### Root-Metadata ([app/layout.tsx](haus-und-hang/app/layout.tsx))

```ts
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://hausundhang.li");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HAUS UND HANG Immobilien · Adressen im Ländle. Seit 1987.",
    template: "%s · HAUS UND HANG Immobilien",
  },
  description: "Diskreter Immobilienmakler in Liechtenstein. 312 Adressen vermittelt seit 1987. ...",
  keywords: [...],
  openGraph: { type: "website", locale: "de_LI", ... },
  twitter: { card: "summary_large_image", ... },
  robots: { index: true, follow: true },
};
```

### Icon-Konventionen (Next.js File-Based)
- `app/icon.svg` — Favicon (H+H in Kupfer auf Bergforest)
- `app/apple-icon.png` — 180×180
- `app/opengraph-image.jpg` — 1200×630 (frame_001 gecropped via sips)
- `app/twitter-image.jpg` — Copy von opengraph-image

### robots.ts + sitemap.ts
- Beide TypeScript-Files in `app/`, generieren `/robots.txt` und `/sitemap.xml`
- Site-URL zieht automatisch `VERCEL_URL` falls deployed

---

## 9 · Build & Deploy

### Lokaler Build

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Production-Bundle (alle 20 Routen prerendered)
npm run start        # http://localhost:3000 mit Production-Bundle
npm run lint         # ESLint
```

**Build-Output**: 14 Routen prerendered (`○ Static`) + 3 SSG-Properties +
`/_not-found` + Asset-Routes. Keine Server-Routen, kein Streaming, kein
Middleware. TypeScript clean, keine Warnings.

### Vercel-Konfiguration ([vercel.json](haus-und-hang/vercel.json))

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "regions": ["fra1"]
}
```

**Region `fra1` = Frankfurt** — niedrigste Latenz für DACH/LI-Traffic.

### Deployment-Pipeline
1. `git push origin main` → GitHub
2. Vercel-Webhook → Build (Turbopack) → Preview/Production-Deploy
3. Edge-CDN serviert `/public/*` und prerenderte HTML

**Aktive URL**: [haus-und-hang.vercel.app](https://haus-und-hang.vercel.app)

---

## 10 · Performance-Arbeit (chronologisch)

| # | Problem | Fix | Effekt |
|---|---|---|---|
| 1 | Vercel serviert LFS-Pointer als JPEG (Body = Textfile) | LFS für `public/video/frames/*.jpg` entfernt, Frames als plain committed | Frames laden jetzt überhaupt |
| 2 | `Cache-Control: max-age=0` auf allen Frames | `next.config.ts` Header: `public, max-age=31536000, immutable` für `/video/frames/:path*` | Repeat-Visits aus Browser-Cache |
| 3 | Frames 1–149 waren **2880×1222** (444 KB each = ~66 MB initial-load) | `sips -Z 1920 -s formatOptions 75` auf alle 435 Frames | Initial-Frames 444 KB → 329 KB, halbe Pixel-Anzahl, ~50% Decode-Last weg |

### Verbleibendes Lag-Risiko

- **First-Visit-Network**: ~37 MB für die ersten 150 Frames bleiben, auf
  langsamen Verbindungen spürbar
- **Decode-Last**: 1920×814 JPEG-Decode pro Scroll-Tick — auf älteren CPUs
  könnte noch Frame-Drop auftreten
- **Mögliche nächste Schritte**:
  - Quality auf 60 senken (Risiko: sichtbare Artefakte)
  - WebP-Reexport (~30% kleiner, bessere Decode-Speed)
  - Auflösung auf 1280×543 senken (halbe Decode-Last)
  - Preload-Hints im `<head>` für die ersten 30 Frames
  - Move frames auf R2/S3/Vercel-Blob, raus aus Repo

---

## 11 · Git-Setup

### Remote
```
origin  https://github.com/efeselim0710/haus-und-hang.git
```

### Branch: `main`

### Commit-Historie (ab Production-Sprint)
1. `d1c9195` Initial commit from Create Next App
2. `cbea38c` chore: enable LFS for hero frames (entfernt in #4)
3. `85cbff6` feat: production-ready, forms stubbed, SEO + assets
4. `8309643` fix: untrack frames from LFS — Vercel does not pull LFS files on build
5. `8df368d` perf: long-cache hero frame sequence (1y immutable)
6. `1564912` perf: normalize hero frames to 1920px wide, quality 75

### `.gitignore`
- `node_modules/`, `.next/`, `.env*` ignoriert
- `!.env.example` Exception
- `public/video/frames/` NICHT ignoriert (müssen mit ins Deployment)

### `.gitattributes`
- LFS-Regel wurde entfernt (`git lfs untrack`)
- Datei steht noch im Repo als History-Artefakt, kann gelöscht werden

---

## 12 · Was deaktiviert / auskommentiert ist

### In `app/page.tsx`:
```ts
// Manifest, Addresses, OffMarket (alt), Insights, TeamTease, ContactBlock
// alle auskommentiert für Hero-Performance-Debug
```
Diese Komponenten existieren noch in `components/`, sind aber nicht im
Default-Render. Können reaktiviert werden, wenn der Hero stabil ist.

### Komponenten ohne Use:
- `Hero3D.tsx` — alte Three.js-Version vor Image-Sequence
- `OffMarket.tsx` — alte Version vor `OffMarketSection.tsx`
- `Manifest.tsx`, `Addresses.tsx`, `Insights.tsx`, `TeamTease.tsx`, `ContactBlock.tsx`

### Assets ohne Use:
- `public/3d/haus-und-hang-hero.glb` (58 MB!) — alte 3D-Hero, kann weg
- `public/video/*.mp4` — alte Video-Versionen vor Image-Sequence
- `public/video/villa-flight-poster.webp` — Poster vor Frame-Load
- `Referenzbild Higgsfield.webp`, `Szene 2 Startframe.webp`,
  `Szene 2 endframe Korridor.webp` — Source-Renders im Repo-Root

### Dependencies ohne Use:
- `three`, `@react-three/fiber`, `@react-three/drei` (~600 KB Bundle)
- `lucide-react` — vereinzelt importiert, prüfen

---

## 13 · Bekannte Issues / Limitationen

| Issue | Schweregrad | Fix-Pfad |
|---|---|---|
| Frame-Positions driften auf abweichendem Aspect | Medium | Viewport-Calibration für 16:9 + 21:9 |
| Initial-Load 37 MB Frames | Medium | WebP-Reexport oder R2-Move |
| Hero aspect 2.36:1 vs Korridor 1.79:1 → leichter Zoom-Pop | Low | Asset-Reexport auf einheitlich 2.36:1 |
| Unsplash-Portraits können sich ändern (kein lokales Caching) | Low | Lokale Portraits, oder Image-Optimization mit Cache |
| GLB-File 58 MB ungenutzt im Repo | Low | `git rm public/3d/haus-und-hang-hero.glb` |
| `git lfs install` läuft global — bei externer Maschine Pointer-Risiko | Low | `.gitattributes` ist leer, Frames als plain committed — Safe |

---

## 14 · Was der User noch tun muss (manuelle Aktionen)

### Ab jetzt automatisch:
- Bei jedem `git push origin main` → Vercel auto-deployed
- Preview-URLs für Feature-Branches (falls Pull-Requests verwendet)

### Optional / nice-to-have:
- **Eigene Domain**: Vercel-Settings → Domains → DNS-Records bei Registrar setzen
- **Analytics**: Vercel-Analytics aktivieren (1-Click in Settings)
- **Branch Protection**: GitHub-Settings → Rules
- **Asset-Cleanup**: GLB + alte MP4s entfernen, Three.js-Deps aus package.json

---

## 15 · Skills / Workflows die ich nutze (LLM-Kontext)

- **Slash-Commands aktiv**: `/ultrareview` (von Efe getriggert), `/loop`, `/schedule`
- **MCP**: Vercel-Plugin installiert (26 Skills, 6 Commands, 3 Agents)
  — Auth pending, würde Deploy-Logs/Env-Vars/Domain-Management ermöglichen
- **Browser-Verifikation**: Kein Chrome-Headless (per Efes Feedback) — er
  testet selbst in Brave/Safari
- **Sprache**: Deutsch durchgehend
- **Style**: Editorial / Magazine, sparsam mit Effekten, Kupfer = Salz

---

*Letzte Aktualisierung: 2026-05-25*
