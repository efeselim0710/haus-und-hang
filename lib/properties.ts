export type Property = {
  slug: string;
  name: string;
  gemeinde: string;
  hoehe: string;
  wohnflaeche: string;
  grundstueck: string;
  zimmer: string;
  baujahr: string;
  preis: string;
  status: "Im Bestand" | "Auf Anfrage" | "Reserviert";
  cover: string;
  caption: string;
  manifest: string;
};

// Kuratierte Lifestyle-Bilder (Unsplash). Keine Stock-Property-Aufnahmen.
// Hinweis: Für die Demo bewusst nur drei Adressen — Verknappung als Geste.
export const properties: Property[] = [
  {
    slug: "villa-triesenberg",
    name: "Villa Falknisblick",
    gemeinde: "Triesenberg",
    hoehe: "1'200 m. ü. M.",
    wohnflaeche: "412 m²",
    grundstueck: "1'840 m²",
    zimmer: "8.5",
    baujahr: "1962 / 2021",
    preis: "CHF 8'400'000",
    status: "Auf Anfrage",
    cover:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    caption: "Hangkante als Bühne. Sichtachse Vaduz–Schaan–Rheintal.",
    manifest:
      "An der Strasse zum Steg liegt ein Haus, das die Hangkante zur Bühne macht. 1962 von Otto Marxer erbaut, 2021 vom Atelier Liechti zurückgebaut auf das, was bleibt.",
  },
  {
    slug: "stadthaus-vaduz",
    name: "Stadthaus an der Aeule",
    gemeinde: "Vaduz",
    hoehe: "460 m. ü. M.",
    wohnflaeche: "248 m²",
    grundstueck: "612 m²",
    zimmer: "6.5",
    baujahr: "1924 / 2019",
    preis: "CHF 4'950'000",
    status: "Im Bestand",
    cover:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    caption: "Erste Bauphase Vaduz, Sandstein-Fassade, Hofgarten an der Aeule.",
    manifest: "",
  },
  {
    slug: "weingut-balzers",
    name: "Weingut am Maréeberg",
    gemeinde: "Balzers",
    hoehe: "520 m. ü. M.",
    wohnflaeche: "186 m²",
    grundstueck: "8'400 m²",
    zimmer: "5.5",
    baujahr: "1873 / 2022",
    preis: "CHF 6'200'000",
    status: "Reserviert",
    cover:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
    caption: "Riesling-Rebenhang Südwest, Pressraum aus dem Jahr 1873.",
    manifest: "",
  },
];
