import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bergforest-950 text-cream-100">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="mono-caption text-kupfer-500">EST. 1987 · VADUZ</p>
            <h3 className="mt-6 font-display text-4xl md:text-5xl font-light leading-[1.05]">
              Aeulestrasse 5
              <br />
              9490 Vaduz
            </h3>
            <p className="mt-8 max-w-md text-cream-200/80 text-[15px] leading-relaxed">
              Atelierbesuch nach Vereinbarung. Wir empfangen mehr Menschen,
              als wir Adressen vermitteln. Das ist die richtige Reihenfolge.
            </p>
          </div>

          <FooterCol title="Adressen">
            <FooterLink href="/#portfolio">Im Bestand</FooterLink>
            <FooterLink href="/#off-market">Off-Market · Private Office</FooterLink>
            <FooterLink href="/portfolio/villa-falknisblick">Villa Falknisblick</FooterLink>
          </FooterCol>

          <FooterCol title="Haus und Hang">
            <FooterLink href="/team">Team</FooterLink>
            <FooterLink href="/#anna">Haltung</FooterLink>
            <FooterLink href="/marktinsights">Marktinsights</FooterLink>
            <FooterLink href="/#kontakt">Termin</FooterLink>
          </FooterCol>

          <FooterCol title="Rechtliches">
            <FooterLink href="/impressum">Impressum</FooterLink>
            <FooterLink href="/datenschutz">Datenschutz</FooterLink>
            <FooterLink href="/standesordnung">Standesordnung</FooterLink>
          </FooterCol>
        </div>

        {/* Bottom-Line: Pflichtangaben links, Copyright rechts. */}
        <div className="mt-20 pt-10 border-t border-bergforest-700/50 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="mono-caption text-cream-100/60">
              HAUS UND HANG IMMOBILIEN AG · AEULESTRASSE 5 · 9490 VADUZ
            </p>
            <p className="mt-2 mono-caption text-cream-100/40 text-[10px] tracking-[0.22em]">
              UID CHE-123.456.789 · HR FL-0002.123.456-7 · GEWERBEBEWILLIGUNG FÜRSTENTUM LIECHTENSTEIN
            </p>
          </div>
          <p className="mono-caption text-cream-100/40">
            © 2026 HAUS UND HANG IMMOBILIEN
          </p>
        </div>

        {/* Easter-Egg-Credit. */}
        <div className="mt-12 pt-8 border-t border-cream-100/5">
          <p className="text-center mono-caption text-cream-100/25 tracking-[0.3em]">
            DESIGNED & BUILT BY{" "}
            <a
              href="https://ait.li"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-kupfer-500 transition-colors duration-500"
            >
              AIT GROUP
            </a>{" "}
            · LIECHTENSTEIN
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="md:col-span-2 lg:col-span-2 col-span-1">
      <p className="mono-caption text-cream-200/50">{title}</p>
      <ul className="mt-6 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-[15px] text-cream-100/60 hover:text-cream-100 transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );
}
