import { RoutePage } from "../routes";
import { buildMetadata, pageSeo } from "../seo/site";

export const metadata = buildMetadata(pageSeo.begleitung);

export default function Page() {
  return <RoutePage view="begleitung" />;
}
