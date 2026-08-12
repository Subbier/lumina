import { RoutePage } from "../routes";
import { buildMetadata, pageSeo } from "../seo/site";

export const metadata = buildMetadata(pageSeo.tarife);

export default function Page() {
  return <RoutePage view="tarife" />;
}
