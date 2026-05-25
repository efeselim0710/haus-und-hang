import { StubPage } from "@/components/StubPage";

export const metadata = {
  title: "Impressum · HAUS UND HANG",
};

export default function Impressum() {
  return (
    <StubPage eyebrow="RECHTLICHES · IMPRESSUM" title="Impressum">
      {`HAUS UND HANG IMMOBILIEN AG
Aeulestrasse 5
9490 Vaduz
Fürstentum Liechtenstein

T +423 232 87 19
anna@hausundhang.li

Handelsregister-Nr.: FL-0002.123.456-7
UID: CHE-123.456.789
Gewerbebewilligung: Fürstentum Liechtenstein, Amt für Volkswirtschaft

Vertretungsberechtigt: Anna Marxer-Beck, Inhaberin

Inhaltlich verantwortlich: Anna Marxer-Beck`}
    </StubPage>
  );
}
