import { StubPage } from "@/components/StubPage";

export const metadata = {
  title: "Standesordnung · HAUS UND HANG",
};

export default function Standesordnung() {
  return (
    <StubPage eyebrow="RECHTLICHES · STANDESORDNUNG" title="Standesordnung">
      {`Wir sind Mitglied des Liechtensteinischen Immobilienverbandes und halten uns an dessen Standesregeln.

Unsere Verpflichtung:

Vertraulichkeit. Wir nennen keine Adressen, bevor eine Beziehung besteht. Wir nennen keine Verkäufer, bevor sie es selbst tun.

Sorgfalt. Wir prüfen jede Immobilie persönlich. Wir kennen jeden Hang, jedes Dach, jede Geschichte.

Aufrichtigkeit. Wir sagen ab, wenn wir nicht der richtige Makler sind. Wir bevorzugen den richtigen Käufer vor dem zahlungskräftigsten.

Unabhängigkeit. Wir vertreten eine Seite klar — Käufer oder Verkäufer. Niemals beide.`}
    </StubPage>
  );
}
