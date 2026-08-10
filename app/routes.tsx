import { LuminaSite, type View } from "./LuminaSite";

export function RoutePage({
  view,
  articleSlug,
}: {
  view: View;
  articleSlug?: string;
}) {
  return <LuminaSite view={view} articleSlug={articleSlug} />;
}
