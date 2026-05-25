import Hero from "@/components/Hero";
import { AnnaSection } from "@/components/AnnaSection";
import { OffMarketSection } from "@/components/OffMarketSection";
import { ContactSection } from "@/components/ContactSection";
// TEMP: Sektionen unter Hero deaktiviert für Performance-Debugging.
// Wieder reinholen wenn der Hero-Scrub steht.
// import Manifest from "@/components/Manifest";
// import Addresses from "@/components/Addresses";
// import OffMarket from "@/components/OffMarket";
// import Insights from "@/components/Insights";
// import TeamTease from "@/components/TeamTease";
// import ContactBlock from "@/components/ContactBlock";

export default function Home() {
  return (
    <>
      <Hero />
      <AnnaSection />
      <OffMarketSection />
      <ContactSection />
      {/*
      <Manifest />
      <Addresses />
      <OffMarket />
      <Insights />
      <TeamTease />
      <ContactBlock />
      */}
    </>
  );
}
