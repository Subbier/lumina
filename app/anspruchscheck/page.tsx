import { RoutePage } from "../routes";
import { buildMetadata, pageSeo } from "../seo/site";

export const metadata = buildMetadata(pageSeo.anspruchscheck);

export default function Page() {
  return <RoutePage view="anspruchscheck" />;
}
