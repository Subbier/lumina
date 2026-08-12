import { organizationJsonLd } from "./site";

export function JsonLd() {
  const data = organizationJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
