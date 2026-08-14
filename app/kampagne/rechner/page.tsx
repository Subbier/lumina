import type { Metadata } from "next";
import { stageRobotsMeta } from "../../../lib/stage-seo";
import { RechnerKampagne } from "./RechnerKampagne";

export const metadata: Metadata = {
  title: "Lohnrechner für pflegende Angehörige | Lumina Spitex",
  description:
    "Unverbindliche Brutto-Orientierung in Franken für pflegende Angehörige. Sofort Anstellung möglich, Ausbildung innert zwölf Monaten.",
  robots: stageRobotsMeta,
};

export default function Page() {
  return <RechnerKampagne />;
}
