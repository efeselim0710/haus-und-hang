import { StubPage } from "@/components/StubPage";

export const metadata = {
  title: "Datenschutz · HAUS UND HANG",
};

export default function Datenschutz() {
  return (
    <StubPage eyebrow="RECHTLICHES · DATENSCHUTZ" title="Datenschutz">
      {`Wir behandeln Daten mit der gleichen Diskretion, mit der wir Adressen behandeln.

Diese Demo-Website verarbeitet keine personenbezogenen Daten über das hinaus, was für die Kontaktaufnahme notwendig ist. Anfragen über das Termin- oder Anfrageformular werden ausschliesslich zur Bearbeitung Ihres Anliegens verwendet und nicht an Dritte weitergegeben.

Eine ausführliche Datenschutzerklärung gemäss Liechtensteinischem Datenschutzgesetz (DSG) wird auf der finalen Live-Site verfügbar sein.

Verantwortlich:
HAUS UND HANG IMMOBILIEN AG
Aeulestrasse 5, 9490 Vaduz
anna@hausundhang.li`}
    </StubPage>
  );
}
