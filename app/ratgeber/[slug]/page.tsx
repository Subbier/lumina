import type { Metadata } from "next";
import { articles, getArticle } from "../articles";
import { RoutePage } from "../../routes";
import { SITE_NAME, SITE_URL } from "../../seo/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "Ratgeber" };
  }
  const url = `${SITE_URL}/ratgeber/${article.slug}`;
  return {
    title: article.title,
    description: article.text,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.text,
      url,
      siteName: SITE_NAME,
      locale: "de_CH",
      type: "article",
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <RoutePage view="ratgeber" articleSlug={slug} />;
}
