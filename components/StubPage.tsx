import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function StubPage({ eyebrow, title, children }: Props) {
  return (
    <main className="min-h-screen bg-cream-100 pt-44 md:pt-52 pb-32">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <p className="mono-caption text-kupfer-700 mb-6">{eyebrow}</p>

        <span className="block h-px w-12 bg-kupfer-700/60 mb-10" />

        <h1 className="font-display font-light text-bergforest-950 text-[clamp(2.5rem,5vw,4rem)] leading-[1.0] tracking-tight mb-16">
          {title}
        </h1>

        <div className="font-editorial text-bergforest-800 text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.7] space-y-6 whitespace-pre-line">
          {children}
        </div>
      </div>
    </main>
  );
}
