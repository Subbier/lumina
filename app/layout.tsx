import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lumina-spitex.ch"),
  title: {
    default: "Lumina Spitex | Persönliche Pflege mit Licht & Wärme",
    template: "%s | Lumina Spitex",
  },
  description:
    "Persönliche Spitex in den Kantonen Zürich und Aargau. Pflege zu Hause, Begleitung und faire Anerkennung für pflegende Angehörige.",
  applicationName: "Lumina Spitex",
  // Noch nicht öffentlich: keine Suchmaschinen-Indexierung
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Lumina", statusBarStyle: "default" },
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
    siteName: "Lumina Spitex",
    title: "Pflege, die ankommt. Anerkennung, die bleibt.",
    description: "Persönliche Pflege zu Hause und faire Anerkennung für pflegende Angehörige.",
    images: [{ url: "/og.png", alt: "Lumina Spitex – Pflege, die ankommt. Anerkennung, die bleibt." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina Spitex",
    description: "Pflege, die ankommt. Anerkennung, die bleibt.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-CH">
      <body>{children}</body>
    </html>
  );
}
