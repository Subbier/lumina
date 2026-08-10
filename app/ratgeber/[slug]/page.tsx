import { articles } from "../articles";
import { RoutePage } from "../../routes";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <RoutePage view="ratgeber" articleSlug={slug} />;
}
