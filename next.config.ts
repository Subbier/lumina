import type { NextConfig } from "next";
import { INDEXING_ENABLED } from "./lib/stage-seo";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["app", "db"],
  },
  async headers() {
    const headers = [...securityHeaders];
    if (!INDEXING_ENABLED) {
      headers.push({
        key: "X-Robots-Tag",
        value: "noindex, nofollow, noarchive",
      });
    }
    return [
      {
        source: "/:path*",
        headers,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/dienstleistungen",
        destination: "/spitex",
        statusCode: 301,
      },
      {
        source: "/doctors",
        destination: "/ueber-uns",
        statusCode: 301,
      },
      {
        source: "/uber-uns",
        destination: "/ueber-uns",
        statusCode: 301,
      },
      {
        source: "/coming-soon",
        destination: "/",
        statusCode: 301,
      },
    ];
  },
  async rewrites() {
    const hosts = [
      "rechner-lumina-spitex.vercel.app",
      "rechner-lumina-spitex-gntc.vercel.app",
    ];
    return {
      beforeFiles: hosts.map((host) => ({
        source: "/",
        has: [{ type: "host" as const, value: host }],
        destination: "/kampagne/rechner",
      })),
    };
  },
};

export default nextConfig;
