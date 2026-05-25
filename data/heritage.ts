export type HeritageMilestone = {
  year: string;
  marker: string;
  position: number; // 0 = Start der S-Kurve, 1 = Ende
  isAccent: boolean;
  description: string;
};

export const HERITAGE_MILESTONES: HeritageMilestone[] = [
  {
    year: "1987",
    marker: "Gründung",
    position: 0.08,
    isAccent: true,
    description: "Helmuth Marxer-Beck gründet das Büro in Vaduz.",
  },
  {
    year: "1995",
    marker: "Erste Villa",
    position: 0.25,
    isAccent: false,
    description: "Vermittlung über CHF 5 Millionen.",
  },
  {
    year: "2007",
    marker: "Übergabe",
    position: 0.4,
    isAccent: false,
    description: "Anna Marxer-Beck tritt ins Familienunternehmen.",
  },
  {
    year: "2015",
    marker: "Off-Market",
    position: 0.58,
    isAccent: false,
    description: "Etablierung des diskreten Portfolios.",
  },
  {
    year: "2019",
    marker: "Helmuth",
    position: 0.76,
    isAccent: true,
    description: "Anna übernimmt die Geschäftsleitung.",
  },
  {
    year: "2024",
    marker: "Heute",
    position: 0.92,
    isAccent: true,
    description: "312 Adressen. Vier Gemeinden.",
  },
];
