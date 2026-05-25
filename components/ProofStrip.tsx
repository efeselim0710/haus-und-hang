// Drittbeweis-Strip am Hero-Boden — konkret, ruhig, keine Sterne.
export default function ProofStrip() {
  const facts = [
    { value: "EST. 1987", label: "Zweite Generation in Vaduz" },
    { value: "312 Adressen", label: "vermittelt seit Gründung" },
    { value: "4 Gemeinden", label: "Vaduz · Schaan · Triesenberg · Balzers" },
  ];
  return (
    <section className="bg-bergforest-950 text-cream-100 border-t border-bergforest-700/40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
          {facts.map((f) => (
            <div key={f.value} className="flex items-baseline gap-5">
              <span className="font-body text-[11px] tracking-[0.22em] uppercase text-kupfer-500 whitespace-nowrap">
                {f.value}
              </span>
              <span className="hairline flex-1 max-w-[60px] mt-2.5 bg-cream-200/30" />
              <span className="text-sm text-cream-200/80 leading-snug">
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
