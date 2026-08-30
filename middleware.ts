import { NextRequest, NextResponse } from "next/server";
import { CAMPAIGNS, getCampaignSlug } from "./lib/subdomains";

/**
 * Edge-safe: nur Host-/Env-Logik, keine Node-APIs.
 * Kampagnen-Projekt: CAMPAIGN_SLUG=rechner → Root zeigt die LP.
 * Host-basiert: rechner-lumina-spitex.vercel.app
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname !== "/") return NextResponse.next();

  const fromEnv = process.env.CAMPAIGN_SLUG?.trim().toLowerCase();
  const slug =
    (fromEnv && CAMPAIGNS[fromEnv] ? fromEnv : null) ??
    getCampaignSlug(request.headers.get("host"));

  if (!slug) return NextResponse.next();

  const campaign = CAMPAIGNS[slug];
  if (!campaign) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = campaign.path;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/"],
};
