import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "./seo/Analytics";
import { JsonLd } from "./seo/JsonLd";
import { SITE_NAME, SITE_URL, pageSeo } from "./seo/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: pageSeo.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: pageSeo.home.description,
  applicationName: SITE_NAME,
  authors: [{ name: "Lumina Spitex AG" }],
  creator: "Lumina Spitex AG",
  publisher: "Lumina Spitex AG",
  category: "healthcare",
  keywords: [
    "Spitex",
    "Spitex Zürich",
    "Spitex Aargau",
    "Spitex Limmattal",
    "Pflege zu Hause",
    "pflegende Angehörige",
    "Angehörige anstellen",
    "Grundpflege",
    "Behandlungspflege",
    "Begleitung",
    "Lumina Spitex",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "de-CH": SITE_URL },
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Lumina",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icon-192.png",
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: pageSeo.home.title,
    description: pageSeo.home.description,
    images: [
      {
        url: "/og.png",
        alt: "Lumina Spitex – Pflege, die ankommt. Anerkennung, die bleibt.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageSeo.home.title,
    description: pageSeo.home.description,
    images: ["/og.png"],
  },
  other: {
    "ai-content-declaration": "human-edited",
  },
};

export const viewport: Viewport = {
  themeColor: "#102f3b",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-CH">
      <body>
        <JsonLd />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
