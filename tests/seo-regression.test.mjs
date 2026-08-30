import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("staging cannot be indexed and does not advertise review content", async () => {
  const [stageSeo, llms] = await Promise.all([
    read("lib/stage-seo.ts"),
    read("public/llms.txt"),
  ]);

  assert.match(stageSeo, /REVIEW_CRAWL_OPEN\s*=\s*false/);
  assert.doesNotMatch(llms, /staging|review|vorschau/i);
});

test("page metadata stays route-specific across search and social cards", async () => {
  const [layout, site, articlePage] = await Promise.all([
    read("app/layout.tsx"),
    read("app/seo/site.ts"),
    read("app/ratgeber/[slug]/page.tsx"),
  ]);

  assert.doesNotMatch(layout, /\bkeywords\s*:/);
  const organizationGraph = site.slice(
    site.indexOf("export function organizationJsonLd"),
  );
  assert.doesNotMatch(organizationGraph, /"@type":\s*"WebPage"/);
  assert.match(site, /twitter:\s*\{/);
  assert.match(site, /images:\s*\[/);
  assert.match(site, /Spitex Zürich & Limmattal: Pflege zu Hause/);
  assert.match(articlePage, /articleJsonLd/);
  assert.match(articlePage, /breadcrumbJsonLd/);
  assert.match(articlePage, /twitter:\s*\{/);
});

test("structured data and sitemap use content dates instead of build time", async () => {
  const [articles, sitemap] = await Promise.all([
    read("app/ratgeber/articles.ts"),
    read("app/sitemap.ts"),
  ]);

  assert.match(articles, /publishedAt:/);
  assert.match(articles, /modifiedAt:/);
  assert.doesNotMatch(sitemap, /lastModified:\s*new Date\(\)/);
  assert.match(sitemap, /article\.modifiedAt/);
});

test("the two conversion checks have distinct intent and supporting content", async () => {
  const site = await read("app/LuminaSite.tsx");

  assert.match(site, /<AnspruchscheckQuiz/);
  assert.match(site, /So entsteht Ihre Lohnorientierung/);
  assert.match(site, /Wann Angehörigenpflege grundsätzlich anstellbar ist/);
  assert.match(site, /href="\/anspruchscheck"/);
  assert.match(site, /href="\/lohn-check"/);
});

test("images and headings keep the mobile page fast and accessible", async () => {
  const [image, site] = await Promise.all([
    read("app/components/PictImg.tsx"),
    read("app/LuminaSite.tsx"),
  ]);

  assert.match(image, /from "next\/image"/);
  assert.doesNotMatch(site, /<h3>\s*(Dienstleistungen|Über uns)\s*<\/h3>/);
  assert.match(site, /src="\/images\/home-hero\.jpg[\s\S]+fetchPriority="high"/);
});

test("legacy WordPress routes keep permanent URL-to-URL redirects", async () => {
  const config = await read("next.config.ts");

  assert.match(config, /source: "\/dienstleistungen"[\s\S]+destination: "\/spitex"/);
  assert.match(config, /source: "\/doctors"[\s\S]+destination: "\/ueber-uns"/);
  assert.match(config, /source: "\/uber-uns"[\s\S]+destination: "\/ueber-uns"/);
  assert.match(config, /source: "\/coming-soon"[\s\S]+destination: "\/"/);
  assert.equal((config.match(/statusCode: 301/g) ?? []).length, 4);
});
