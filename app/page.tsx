import { LuminaSite } from "./LuminaSite";
import { buildMetadata, pageSeo } from "./seo/site";

export const metadata = buildMetadata(pageSeo.home);

export default function Home() {
  return <LuminaSite view="home" />;
}
