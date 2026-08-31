import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("luminaspitex.com is the only public, indexable website", async () => {
  const [stageSeo, llms, robots, config] = await Promise.all([
    read("lib/stage-seo.ts"),
    read("public/llms.txt"),
    read("app/robots.ts"),
    read("next.config.ts"),
  ]);

  assert.match(stageSeo, /PUBLIC_SITE_URL = "https:\/\/luminaspitex\.com"/);
  assert.match(stageSeo, /index: true/);
  assert.match(robots, /allow: "\/"/);
  assert.doesNotMatch(config, /X-Robots-Tag|noindex|coming-soon|doctors/i);
  assert.doesNotMatch(stageSeo, /lumina-spitex\.ch/);
  assert.doesNotMatch(stageSeo, /lumina-spitex\.vercel\.app/);
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
