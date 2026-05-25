# HAUS UND HANG — Handover für neuen Chat

Paste diesen Text als ersten Message im neuen Claude-Chat. Dann ist der neue Claude sofort im Bild.

---

## PROJEKT-KONTEXT

Ich baue eine Demo-Website für **HAUS UND HANG Immobilien**, einen fiktiven Premium-Boutique-Immobilienmakler in Liechtenstein. Das Asset dient als Pitch-Demo für meine Agentur **AIT Group**. Wir sind 5+ Stunden in Entwicklung, der Pitch steht bevor.

**Projektordner:** `/Users/efeselimtuerkyilmaz/haus-und-hang/`
**Stack:** Next.js 15, React 19, TypeScript strict, Tailwind v4, Motion (framer-motion), shadcn/ui, react-hook-form + zod

## BRAND-IDENTITÄT

- **Name:** HAUS UND HANG Immobilien
- **Claim:** "Adressen im Ländle. Seit 1987."
- **Inhaberin:** Anna Marxer-Beck (zweite Generation, geb. 1979, ETH Zürich Architekturstudium)
- **Gründer:** Helmuth Marxer-Beck (1958-2019), gegründet 1987
- **Standort:** Aeulestrasse 5, 9490 Vaduz
- **Demo-Kontakt:** +423 232 87 19, anna@hausundhang.li
- **Bestand:** 312 vermittelt seit 1987, 18 aktuell, 14 davon Off-Market
- **Gemeinden:** Vaduz, Triesenberg, Schaan, Triesen

## FARB-PALETTE & TOKENS

Tailwind-Config:
```
bergforest-950: #0F1612 (Hero-BG, Footer)
bergforest-900: #1A2520
bergforest-800: #2A3530 (Secondary text auf cream)
cream-50:       #F5F0E8 (helle accents)
cream-100:      #F0EAE0 (warm cream — Anna/Off-Market/Kontakt-BG)
cream-200:      #E5DDD0
kupfer-500:     #B87333 (Akzent auf dark)
kupfer-700:     #8B5A28 (Akzent auf cream)
kupfer-400:     #D89867 (heller Akzent)
```

**Light/Dark-Strategie:** Hero ist DARK (filmisch). Anna + Off-Market + Kontakt sind WARM CREAM (editorial Magazin-Innenseiten). Footer wird wieder DARK.

## FONTS

- **Fraunces** — Display (Headlines)
- **Inter** — UI/Body
- **JetBrains Mono** — Captions, mono-elements
- **Lora** — Editorial (Quotes, italic Akzente)

## STATUS COMPLETED

```
✅ Hero (Frame 1-435, 4 Szenen, Canvas-Image-Sequence)
✅ Property-Cards Overlay (Frame 290)
✅ 3 Property-Detail-Pages (Split-Layout)
✅ Heritage-Timeline mit S-Kurve im Library-Display
   - 3-layered Linie (cream-glow + kupfer-glow + sharp)
   - 6 Milestones: 1987/1995/2007/2015/2019/2024
   - Captions: GRÜNDUNG · ERSTE VILLA · ANNA · KURATION · HELMUTH · HEUTE
   - 1987/2019/2024 als Accent (italic 2019)
   - Pulsing Endpoint, Schnittpunkt-Dots
✅ Anna-Sektion (schlank, warm cream)
   - Foto links (anna-portrait.webp, Higgsfield-generiert)
   - Quote rechts: "Mein Vater hat mir nicht beigebracht, Häuser zu verkaufen. Er hat mir beigebracht, Familien zuzuhören."
   - Caption: EST. 1987 · 9 JAHRE INHABERIN · ARCHITEKTURSTUDIUM ETH
✅ Off-Market-Sektion (warm cream, visueller Block)
   - Headline: "Vierzehn Adressen, die niemand findet."
   - 14 pulsing Kupfer-Dots in 4 Clustern (Vaduz/Triesenberg/Schaan/Triesen)
   - Dots-Container DARK als Kontrast zum cream
   - Anfrage-Formular
✅ Light/Dark-Refactor durchgeführt
✅ Scroll-Lock-Mechanik mit hartem Zurück-Snap (annaLockTriggeredRef, propertyLockTriggeredRef, libraryLockTriggeredRef)
✅ Editorial-Typography (Lora) komplett
```

## INITIAL-OVERLAY TEXT (final)

```
DISKRETER IMMOBILIENMAKLER · LIECHTENSTEIN
Adressen im Ländle.
Seit 1987.
312 vermittelt. Achtzehn aktuell.
Vaduz · Triesenberg · Schaan · Triesen.
```

## HELMUTH-WAND ANNA-QUOTE (final)

```
1958 — 2019
HELMUTH MARXER-BECK
„Den letzten Satz, den mein Vater mir am Telefon gesagt hat, war:
 ›Vergiss nie, wem das Haus gehört, bevor du es zeigst.‹
Ich vergesse ihn nicht."
— Anna Marxer-Beck, im Frühjahr 2024
```

## AKTUELLER LIVE-AUFTRAG

**Ich baue gerade die Kontakt-Sektion mit Booking-System.**

Spec:
- Position: NACH OffMarketSection
- Background: cream-100 (wie Anna + Off-Market)
- Layout: 3-Spalten (Adresse · Telefonie · Öffnungszeiten)
- Booking: 3-Stufiges System (Mode → Slot → Daten)
- Modus-Optionen: Vor Ort (Aeulestrasse 5) ODER Video-Gespräch
- Slots: hardcoded für "Diese Woche" + "Nächste Woche"
- id="kontakt" für Nav-Link

**Component: ContactSection.tsx — der vollständige Code ist im vorherigen Chat dokumentiert.**

Falls du den Code nochmal brauchst, sag Bescheid — ich kann ihn dir rekonstruieren.

## NOCH OFFEN BIS PITCH-READY

1. **Kontakt-Sektion testen** (gerade gebaut, noch nicht visuell verifiziert)
2. **Footer** mit Impressum, Datenschutz, Copyright (Liechtenstein-Pflicht)
3. **Top-Nav-Links funktional** machen: #portfolio, #off-market, #kontakt
4. **Team-Sektion** entscheiden — entweder bauen oder Link aus Nav entfernen
5. **OPTIONAL:** Property-Detail-Pages auf cream umstellen (Konsistenz)

## WICHTIGE CONSTRAINTS

- DISPLAY_POSITION in LibraryDisplayOverlay (Timeline) NICHT mehr anfassen
- Scroll-Lock-Mechanik NICHT mehr anfassen — ist iteriert und fertig
- Hero.tsx + alle Hero-Overlays sind fertig — nur kleine Bug-Fixes wenn nötig
- Editorial-CSS-Klassen sind in app/globals.css definiert
- Frame-Files: public/video/frames/frame_001.jpg bis frame_435.jpg (~85MB total, 1920×814 Cinemascope)

## ARBEITSWEISE

- Ich bin Designer/PM, kein Developer. Du gibst mir **fertige Copy-Paste-Prompts** für Claude Code (CLI).
- Du gibst mir vorab Fragen via ask_user_input_v0 wenn nötig, nicht ungefragt komplexe Multi-Choice-Listen.
- Schreibstil: direkt, ehrlich, mit "**hier ist warum**"-Reasoning.
- KEIN Stufenmodell wenn ich klar entschieden habe.
- Du sagst klar wenn etwas zu textlastig / zu generisch / nicht premium-genug ist.

---

**Erste Aufgabe im neuen Chat:** Fass kurz zusammen dass du den Stand verstanden hast, frag was ich als nächstes machen will (Kontakt verifizieren, Footer bauen, oder Pause), und warte auf meine Antwort.
