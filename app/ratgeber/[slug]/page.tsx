import type { Metadata } from "next";
import { articles, getArticle } from "../articles";
import { RoutePage } from "../../routes";
import {
  SITE_NAME,
  absoluteUrl,
  breadcrumbJsonLd,
  pageJsonLd,
} from "../../seo/site";
import { publicSiteUrl, stageRobotsMeta } from "../../../lib/stage-seo";

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
  const url = absoluteUrl(`/ratgeber/${article.slug}`);
  const title =
    article.slug === "arbeitsvertrag-ferien-sozialversicherungen"
      ? "Arbeitsvertrag & Sozialversicherungen"
      : article.title;
  return {
    title,
    description: article.text,
    robots: stageRobotsMeta,
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
    twitter: {
      card: "summary_large_image",
      title,
      description: article.text,
      images: [article.image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return <RoutePage view="ratgeber" articleSlug={slug} />;

  const path = `/ratgeber/${article.slug}`;
  const base = publicSiteUrl().replace(/\/$/, "");
  const webpage = pageJsonLd({
    path,
    title: article.title,
    description: article.text,
  });
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: article.title,
    description: article.text,
    author: { "@id": `${base}/#organization` },
    publisher: { "@id": `${base}/#organization` },
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt,
    image: absoluteUrl(article.image),
    mainEntityOfPage: { "@id": webpage["@id"] },
    inLanguage: "de-CH",
  };
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Startseite", path: "/" },
    { name: "Ratgeber", path: "/ratgeber" },
    { name: article.title, path },
  ]);
  const questions = article.sections.filter(
    (section) => section.heading?.trim().endsWith("?"),
  );
  const faqJsonLd = questions.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((section) => ({
          "@type": "Question",
          name: section.heading,
          acceptedAnswer: {
            "@type": "Answer",
            text: section.paragraphs.join(" "),
          },
        })),
      }
    : null;
  const schemas = [webpage, articleJsonLd, breadcrumbSchema, faqJsonLd].filter(
    Boolean,
  );

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${article.slug}-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <RoutePage view="ratgeber" articleSlug={slug} />
    </>
  );
}
