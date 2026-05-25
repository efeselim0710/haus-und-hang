export type TeamMember = {
  slug: string;
  name: string;
  rolle: string;
  zitat: string;
  portrait: string;
};

// Unsplash-Porträts werden im Frontend mit CSS grayscale gefiltert — Audit-Hebel H4
// "Bewohner-Hand am Fenstergriff" wird hier zu "Senior-Porträt im Atelierlicht".
export const team: TeamMember[] = [
  {
    slug: "anna-marxer-beck",
    name: "Anna Marxer-Beck",
    rolle: "Inhaberin · Dipl. Immobilientreuhänderin",
    zitat:
      "Mein Vater hat 1987 mit drei Adressen begonnen. Wir sind auf 312 gewachsen, ohne die erste zu vergessen.",
    portrait: "/video/Anna.webp",
  },
  {
    slug: "lorenz-frommelt",
    name: "Lorenz Frommelt",
    rolle: "Senior-Berater · Bewertung & Mandat",
    zitat:
      "Ein Quadratmeterpreis ist eine Behauptung. Die Geschichte des Hauses ist der Beweis.",
    portrait:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "sofia-bianchi",
    name: "Sofia Bianchi",
    rolle: "Internationale Mandate · IT, FR",
    zitat:
      "Ich übersetze nicht zwischen Sprachen. Ich übersetze zwischen Erwartungen.",
    portrait:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "marius-hilti",
    name: "Marius Hilti",
    rolle: "Akquisition Triesenberg & Malbun",
    zitat:
      "Drei Generationen sind nötig, um eine Hangadresse richtig zu verstehen.",
    portrait:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "vera-kindle",
    name: "Vera Kindle",
    rolle: "Mandantenbetreuung & Atelier",
    zitat:
      "Wir empfangen mehr Menschen, als wir Adressen vermitteln. Das ist die richtige Reihenfolge.",
    portrait:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "felix-risch",
    name: "Felix Risch",
    rolle: "Off-Market · Private Office",
    zitat: "Auf Anfrage.",
    portrait:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80",
  },
];
