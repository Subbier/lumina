import { RoutePage } from "../routes";
import { buildMetadata, pageSeo } from "../seo/site";

export const metadata = buildMetadata(pageSeo.lohnCheck);

export default function Page() {
  return <RoutePage view="lohn-check" />;
}
