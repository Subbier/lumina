import { RoutePage } from "../routes";
import { buildMetadata, pageSeo } from "../seo/site";

export const metadata = buildMetadata(pageSeo.datenschutz);

export default function Page() {
  return <RoutePage view="datenschutz" />;
}