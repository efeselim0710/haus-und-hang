import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROPERTIES } from "@/data/properties";
import { ContactForm } from "@/components/ContactForm";

export async function generateStaticParams() {
  return PROPERTIES.map((property) => ({ slug: property.slug }));
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = PROPERTIES.find((p) => p.slug === slug);
  if (!property) notFound();

  return (
    <main className="min-h-screen bg-bergforest-950 text-cream-50">
      {/* BACK-LINK in eigener Sektion — kein Overlap mit Top-Header */}
      <section className="bg-bergforest-950 pt-12 pb-6 border-b border-cream-50/5">
        <div className="mx-auto max-w-[1440px] px-6 md:px-[8vw]">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 mono-caption text-cream-50/60 hover:text-cream-50 transition-colors"
          >
            <span className="text-base">←</span>
            <span>Zurück zum Portfolio</span>
          </Link>
        </div>
      </section>

      {/* HERO: Split-Layout — Foto links (Portrait 2:3), Info rechts */}
      <section className="bg-bergforest-950 py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-[8vw]">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative w-full aspect-[2/3] overflow-hidden bg-bergforest-900">
              <Image
                src={property.image}
                alt={property.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-8">
              <p className="mono-caption text-kupfer-500">
                {property.location.toUpperCase()} · {property.district.toUpperCase()}
              </p>

              <span className="block h-px w-12 bg-kupfer-500/60" />

              <h1 className="font-display font-light text-cream-50 text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
                {property.name}
              </h1>

              <p className="editorial-body max-w-[42ch] text-cream-50/75">
                {property.description[0]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SPECS BAND */}
      <section className="border-y border-cream-50/10 bg-bergforest-950">
        <div className="mx-auto max-w-[1440px] px-6 md:px-[8vw] py-10 grid grid-cols-2 md:grid-cols-4 gap-8 font-body text-[11px] tracking-[0.2em] uppercase">
          <div>
            <p className="text-cream-200/55 mb-2">Wohnfläche</p>
            <p className="text-cream-50 text-base font-display font-light tracking-normal normal-case">
              {property.specs.wohnflaeche}
            </p>
          </div>
          {property.specs.grundstueck && (
            <div>
              <p className="text-cream-200/55 mb-2">Grundstück / Terrasse</p>
              <p className="text-cream-50 text-base font-display font-light tracking-normal normal-case">
                {property.specs.grundstueck}
              </p>
            </div>
          )}
          <div>
            <p className="text-cream-200/55 mb-2">Zimmer / Schlafzimmer</p>
            <p className="text-cream-50 text-base font-display font-light tracking-normal normal-case">
              {property.specs.zimmer} Zi / {property.specs.schlafzimmer} SZ
            </p>
          </div>
          <div>
            <p className="text-cream-200/55 mb-2">Indikative Preisspanne</p>
            <p className="text-cream-50 text-base font-display font-light tracking-normal normal-case">
              {property.specs.preisspanne}
            </p>
          </div>
        </div>
      </section>

      {/* DESCRIPTION + HIGHLIGHTS */}
      <section className="bg-bergforest-950 py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-[8vw] grid md:grid-cols-[1.5fr_1fr] gap-16">
          <div className="space-y-6">
            <p className="mono-caption text-kupfer-500">DAS OBJEKT</p>
            {property.description.slice(1).map((para, i) => (
              <p
                key={i}
                className="font-display font-light text-[17px] md:text-lg text-cream-100/90 leading-[1.6]"
              >
                {para}
              </p>
            ))}
          </div>

          <aside>
            <p className="mono-caption text-kupfer-500 mb-6">HIGHLIGHTS</p>
            <ul className="space-y-3">
              {property.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-cream-100/80 text-[15px] leading-[1.5]"
                >
                  <span className="text-kupfer-500 mt-1.5 text-xs">◆</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* CONTACT-FORM */}
      <section className="bg-bergforest-800 py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-[8vw]">
          <p className="mono-caption text-kupfer-500 mb-4">ANFRAGE</p>
          <h2 className="font-display font-light text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-cream-50 mb-12 max-w-[42ch]">
            Sie haben Interesse an {property.name}? <br />
            Sprechen wir.
          </h2>
          <ContactForm propertyName={property.name} />
        </div>
      </section>
    </main>
  );
}
