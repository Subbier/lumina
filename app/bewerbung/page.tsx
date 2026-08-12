import { RoutePage } from "../routes";
import { buildMetadata, pageSeo } from "../seo/site";

export const metadata = buildMetadata(pageSeo.bewerbung);

export default function Page() {
  return <RoutePage view="bewerbung" />;
}
