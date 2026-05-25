export type Property = {
  slug: string;
  name: string;
  location: string;
  district: string;
  image: string;
  imageAlt: string;
  specs: {
    wohnflaeche: string;
    grundstueck?: string;
    zimmer: string;
    schlafzimmer: string;
    preisspanne: string;
  };
  description: string[];
  highlights: string[];
};

export const PROPERTIES: Property[] = [
  {
    slug: "villa-falknisblick",
    name: "Villa Falknisblick",
    location: "Triesenberg",
    district: "Liechtenstein",
    image: "/Villa Triesenberg.webp",
    imageAlt: "Villa Falknisblick — Modernist am Hang in Triesenberg",
    specs: {
      wohnflaeche: "412 m²",
      grundstueck: "2'400 m²",
      zimmer: "6",
      schlafzimmer: "4",
      preisspanne: "CHF 7.5M – 9.2M",
    },
    description: [
      "Auf 1'200 Meter über Meer, dort wo die Aussicht ungestört bleibt: Eine moderne Villa, eingebettet in den Berghang von Triesenberg, mit ungehindertem Blick auf die Drei Schwestern und das Rheintal.",
      "Architektonisch ist sie ein präzises Statement — Sichtbeton trifft auf vertikale Larch-Holzschalung, weite Glasfronten öffnen den Raum nach Süden. Im Innern: Polierte Betonböden, dunkle Eichenholz-Deckenleisten, ein offener Wohnraum, der den Aussenraum gleichberechtigt einlädt.",
      "Die Villa ist auf zwei Niveaus organisiert: Im Obergeschoss leben Sie unter dem freitragenden Dach mit Bergblick, im Untergeschoss findet sich der private Rückzug — Schlafzimmer-Suite, Bibliothek, ein kleiner Wein-Raum.",
      "Das Grundstück erstreckt sich über 2'400 Quadratmeter und ist vom Architekten bewusst zurückhaltend gestaltet: Alpine Gräser, ein gewundener Kiesweg, einzelne Pinien, die der Wind über Jahrzehnte geformt hat. Keine Manicured Lawn — bewusst gehaltene Wildnis.",
      "Diese Adresse erfordert keine Erklärung. Sie ist für jemanden, der versteht, dass Diskretion und Architektur die selbe Sprache sprechen.",
    ],
    highlights: [
      "Direkter Blick auf die Drei Schwestern und das Rheintal",
      "Architekt-zertifiziert (Atelier nicht öffentlich genannt)",
      "Bodenheizung mit Geothermie",
      "Triple-glazed Glasfronten Süd",
      "Wein-Raum mit Klimatisierung",
      "Garage für 3 Fahrzeuge",
    ],
  },
  {
    slug: "penthouse-schlosshuegel",
    name: "Penthouse Schlosshügel",
    location: "Vaduz",
    district: "Liechtenstein",
    image: "/Villa Vaduz.webp",
    imageAlt: "Penthouse Schlosshügel — Dachterrasse mit Schlossblick in Vaduz",
    specs: {
      wohnflaeche: "218 m²",
      grundstueck: "95 m² Terrasse",
      zimmer: "4",
      schlafzimmer: "2",
      preisspanne: "CHF 4.4M – 5.6M",
    },
    description: [
      "Das Penthouse liegt im obersten Geschoss eines diskreten Stadthauses am Schlosshügel. Es ist nicht das grösste Apartment in Vaduz — es ist das, das den direktesten Blick auf das Schloss Vaduz bietet, ohne Strassenlärm, ohne Nachbarn über sich.",
      "Die 218 Quadratmeter sind klar gegliedert: Ein zentraler Wohnraum mit doppelt-hoher Decke, zwei en-suite Schlafzimmer, ein Atelier mit Schiebewänden, eine offene Küche aus Marmor und Edelstahl.",
      "Das Herz des Penthouse ist seine 95 Quadratmeter Dachterrasse. Sie wickelt sich um zwei Seiten der Wohnung, gerahmt von Glas-Balustraden, mit einer einzelnen Pinie im Beton-Pflanzer und einer Liegefläche aus Karbon-Stahl. Beim Sonnenuntergang scheint die Terrasse zu schweben.",
      "Die Lage erlaubt zwei Welten: In drei Minuten zu Fuss bei den Banken am Städtle, in fünfzehn Minuten in Triesenberg oder am Wandern in den Bergen. Vaduz ist klein — diese Adresse macht es zur Mitte.",
      "Wer hier einzieht, sucht keine Ostentation. Er sucht das, was Geld nicht direkt kaufen kann: Stille, Distanz, Aussicht.",
    ],
    highlights: [
      "Direkter Blick auf Schloss Vaduz und Rätikon",
      "95 m² Dachterrasse umlaufend",
      "Privater Aufzug bis vor die Wohnungstür",
      "Doppelt-hohe Decke im Wohnraum",
      "Tiefgaragenstellplatz für 2 Fahrzeuge",
      "Concierge-Service im Haus (24/7)",
    ],
  },
  {
    slug: "refugium-steinhof",
    name: "Refugium Steinhof",
    location: "Schaan",
    district: "Liechtenstein",
    image: "/Villa Schaan.webp",
    imageAlt: "Refugium Steinhof — Ländlicher Familiensitz in Schaan",
    specs: {
      wohnflaeche: "387 m²",
      grundstueck: "4'800 m²",
      zimmer: "7",
      schlafzimmer: "5",
      preisspanne: "CHF 3.2M – 4.1M",
    },
    description: [
      "Steinhof steht seit 1742 am Rand von Schaan, dort wo die Wiesen sich zum Alpenwald hin neigen. Das ursprüngliche Bauernhaus aus Natur­stein wurde behutsam saniert und um einen modernen Anbau aus Lärchenholz erweitert — Tradition und Gegenwart, die einander nicht widersprechen.",
      "387 Quadratmeter Wohnfläche verteilen sich über drei Geschosse. Im Erdgeschoss: Eine grosse offene Küche mit antiker Holzdecke, ein Esstisch, der zwölf Personen aufnimmt, ein Wohnraum mit Kaminschacht aus dem 18. Jahrhundert. Im ersten Stock: Vier Schlafzimmer, drei davon en-suite. Unter dem Dach: Ein offenes Studio mit Veluxen, das als fünftes Schlafzimmer oder als Atelier dient.",
      "Das Grundstück umfasst 4'800 Quadratmeter — alter Apfelbaumbestand, ein kleiner Bach, eine ehemalige Scheune, die zur Werkstatt oder Galerie umgewidmet werden kann.",
      "Steinhof ist kein Statement. Es ist ein Ort. Für eine Familie, die nicht nur ihren Wohnsitz wechselt, sondern eine Adresse bezieht, die schon ein Leben vor ihr hatte.",
      "Wir vermitteln dieses Anwesen mit der Sorgfalt, die seine Geschichte verlangt. Es ist nicht für jeden gedacht — und das ist der Punkt.",
    ],
    highlights: [
      "Originaler Steinkamin aus 1742",
      "Moderne Lärchenholz-Erweiterung (2019)",
      "Alter Apfelbaumbestand (10 Bäume)",
      "Eigene Quellwasserversorgung",
      "Nebengebäude (Scheune) — sanierbar",
      "Bewilligung für Schwimmteich auf Antrag",
    ],
  },
];
