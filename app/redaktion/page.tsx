import { RoutePage } from "../routes";
import { buildMetadata, pageSeo } from "../seo/site";

export const metadata = buildMetadata(pageSeo.redaktion);

export default function Page() {
  return <RoutePage view="redaktion" />;
}
