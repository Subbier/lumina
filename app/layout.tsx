import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { publicSiteUrl, stageRobotsMeta } from "../lib/stage-seo";
import {
  SITE_NAME,
  organizationJsonLd,
  pageSeo,
} from "./seo/site";

const publicBase = publicSiteUrl();

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(publicBase),
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
  robots: stageRobotsMeta,
  // Canonical pro Seite via buildMetadata / generateMetadata – nie global auf /
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Lumina",
    statusBarStyle: "black-translucent",
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
    url: publicBase,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: pageSeo.home.description,
    images: [
      {
        url: "/og.png",
        alt: "Lumina Spitex AG – Pflege zu Hause in Zürich und Aargau",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: pageSeo.home.description,
    images: ["/og.png"],
  },
  other: {
    "ai-content-declaration": "human-edited",
  },
};

export const viewport: Viewport = {
  themeColor: "#173f3c",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = organizationJsonLd(publicBase);
  return (
    <html lang="de-CH">
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="llms.txt"
        />
      </head>
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
