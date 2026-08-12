import type { Metadata } from "next";
import { stageRobotsMeta } from "../../../lib/stage-seo";
import { RechnerKampagne } from "./RechnerKampagne";

export const metadata: Metadata = {
  title: "Lohn- & Anspruchsrechner | Lumina Spitex",
  description:
    "Prüfen Sie unverbindlich Anspruch und mögliche Lohnorientierung für pflegende Angehörige.",
  robots: stageRobotsMeta,
};

export default function Page() {
  return <RechnerKampagne />;
}
