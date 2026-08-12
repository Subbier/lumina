import { RoutePage } from "../routes";
import { buildMetadata, pageSeo } from "../seo/site";

export const metadata = buildMetadata(pageSeo.ueberUns);

export default function Page() {
  return <RoutePage view="ueber-uns" />;
}
