# HAUS UND HANG Immobilien

Demo-Website für AIT Group Pitch. Fiktive Premium-Boutique-Maklerei in Vaduz,
Liechtenstein. Gerichtet an Liechtensteiner Premium-Makler (E&V, JWT, Broder,
ITW). Built with Next.js 16, React 19, TypeScript, Tailwind v4, Motion.

> **Disclaimer:** Sämtliche Inhalte (Anna Marxer-Beck, Portfolio, Zahlen,
> Adressen) sind fiktiv. Demo-Forms speichern und übermitteln nichts.

---

## Tech Stack

- **Next.js 16.2** · App Router · SSG für alle Routen
- **React 19**
- **TypeScript** strict
- **Tailwind CSS v4** (CSS-first `@theme` in `app/globals.css`, kein
  `tailwind.config.ts`)
- **Motion** (`motion/react`, früher Framer Motion)
- **react-hook-form** + **zod** für Form-Validierung (UX, kein Backend)
- **next/font** mit Fraunces (display), Inter (body), Lora (editorial)

## Project Structure

```
app/
  layout.tsx          – Root-Layout, Fonts, Metadata
  page.tsx            – Home (Hero + Anna + OffMarket + Contact)
  team/               – /team
  kontakt/            – /kontakt (Alternativ zur Home-Contact-Section)
  portfolio/[slug]/   – Dynamische Property-Detail-Pages (SSG)
  portfolio/villa-triesenberg/ – Statische Property-Detail-Page
  impressum, datenschutz, standesordnung, marktinsights/ – Legal/Stubs
  robots.ts, sitemap.ts – SEO
  icon.svg, apple-icon.png, opengraph-image.jpg, twitter-image.jpg
components/           – Hero, Nav, Footer, AnnaSection, OffMarketSection, …
data/                 – Property-Daten
lib/                  – Team, Insights, Properties (Typen + Helpers)
public/
  video/frames/       – 435 JPEG-Frames für Hero-Scroll-Scrub (~85 MB)
```

---

## Local Development

Voraussetzung: Node 20+ (Next.js 16).

```bash
npm install
npm run dev          # http://localhost:3000
```

Für einen lokalen Production-Test (statisches Bundle + Standalone-Server):

```bash
npm run build
npm run start        # http://localhost:3000 mit Production-Bundle
```

---

## Deploy auf Vercel

Die Demo ist für **Vercel Hobby-Tier** ausgelegt (keine API-Routes, keine
Env-Vars, alle Routen prerendered, Frame-Sequence ~85 MB <100 MB Limit).

### Schritt-für-Schritt (Web-UI)

1. **GitHub-Repo anlegen.** Auf [github.com/new](https://github.com/new) ein
   neues Repo namens `haus-und-hang` erstellen (privat oder public, egal).
2. **Code pushen** (siehe Abschnitt "Git Setup" unten falls noch kein
   `origin` gesetzt ist).
3. **Vercel-Account.** Auf [vercel.com](https://vercel.com) mit GitHub
   einloggen (kostenfreier Hobby-Tier reicht).
4. **Projekt importieren.**
   `Add New… → Project → Import Git Repository → haus-und-hang`.
5. **Settings prüfen** (Defaults stimmen, dank `vercel.json`):
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Root Directory: `./`
   - Install Command: `npm install`
   - Region: `fra1` (Frankfurt — Latency für DACH/LI)
6. **Environment Variables.** Keine nötig. Optional:
   `NEXT_PUBLIC_SITE_URL=https://hausundhang.li` falls eigene Domain.
7. **Deploy.** Nach ~3 Minuten erscheint eine URL wie
   `haus-und-hang-xyz.vercel.app`.

### Schritt-für-Schritt (CLI, alternativ)

```bash
npx vercel              # interaktiver Setup, einmalig
npx vercel --prod       # Production-Deploy
```

### Eigene Domain später

`Vercel Project → Settings → Domains → Add` und beim Domain-Registrar die
von Vercel angezeigten DNS-Records setzen (A oder CNAME).

---

## Git Setup (falls noch kein Remote)

```bash
# Aus dem Projekt-Root:
git remote add origin git@github.com:DEIN-USERNAME/haus-und-hang.git
git branch -M main
git push -u origin main
```

### Git LFS für Frame-Sequence (empfohlen)

Die 435 Hero-Frames belegen ~85 MB. Ohne LFS bläht jeder Branch das Repo
auf. Setup auf macOS:

```bash
brew install git-lfs
git lfs install
git lfs track "public/video/frames/*.jpg"
git add .gitattributes public/video/frames
git commit -m "chore: track hero frames via LFS"
```

> **Hinweis:** Vercel unterstützt LFS, aber **das Hobby-Bandwidth-Quota
> (1 GB/Monat) wird mitgerechnet**. Bei viel Traffic ggf. auf
> `unoptimized` JPEG-Reexport oder Cloud-Storage (R2, S3) umsteigen.

Falls LFS nicht möglich: Frames können auch ohne LFS gepusht werden
(funktioniert, Repo wird halt grösser).

---

## Was deaktiviert ist

- **Forms.** Booking, Off-Market, Property-Inquiry, /kontakt — alle
  zeigen lokal eine Success-Message, übermitteln aber nichts. Caption
  `DEMO · KEINE ECHTE ÜBERMITTLUNG` ist als dezenter Hinweis sichtbar.
- **API-Routes.** Keine vorhanden, keine geplant.
- **Tracking / Analytics.** Nichts eingebaut.

## Lighthouse / A11y

Vorgesehener Smoketest nach Deploy: Vercel-URL in Chrome DevTools →
Lighthouse → "Generate report". Erwartete Schwachpunkte: kleine
Editorial-Captions (color-contrast), Motion-driven elements (reduced-motion
abdeckt das in `globals.css`). Bei Bedarf nachschärfen.
