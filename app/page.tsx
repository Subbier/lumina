import { RoutePage } from "./routes";
import { buildMetadata, pageSeo } from "./seo/site";

export const metadata = buildMetadata(pageSeo.home);

export default function Home() {
  return <RoutePage view="home" />;
}
