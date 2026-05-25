import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Lora } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

// Variable fonts, preload aus — Brave/Chrome erkennt sonst die spätere
// Nutzung (Motion-Delays, italic erst im End-Overlay) nicht rechtzeitig
// und meckert. display:'swap' kümmert sich um Fallback während des Loads.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Lora — editorial serif body / signature / italic kursivierte Captions.
// Wärmer und etwas humanistischer als Spectral, sehr schöne Italic.
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://hausundhang.li");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HAUS UND HANG Immobilien · Adressen im Ländle. Seit 1987.",
    template: "%s · HAUS UND HANG Immobilien",
  },
  description:
    "Diskreter Immobilienmakler in Liechtenstein. 312 Adressen vermittelt seit 1987. Vaduz · Triesenberg · Schaan · Triesen.",
  keywords: [
    "Immobilien Liechtenstein",
    "Immobilienmakler Vaduz",
    "Off-Market Immobilien",
    "Villa Liechtenstein",
    "Triesenberg",
    "Schaan",
    "Premium Immobilien FL",
  ],
  authors: [{ name: "HAUS UND HANG Immobilien AG" }],
  openGraph: {
    type: "website",
    locale: "de_LI",
    title: "HAUS UND HANG Immobilien · Adressen im Ländle. Seit 1987.",
    description:
      "Diskreter Immobilienmakler in Liechtenstein. 312 Adressen vermittelt seit 1987. Vaduz · Triesenberg · Schaan · Triesen.",
    siteName: "HAUS UND HANG Immobilien",
  },
  twitter: {
    card: "summary_large_image",
    title: "HAUS UND HANG Immobilien · Adressen im Ländle. Seit 1987.",
    description:
      "Diskreter Immobilienmakler in Liechtenstein. 312 Adressen vermittelt seit 1987.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de-LI"
      className={`${fraunces.variable} ${inter.variable} ${mono.variable} ${lora.variable}`}
    >
      <body className="min-h-screen bg-cream-50 text-stein-900">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
