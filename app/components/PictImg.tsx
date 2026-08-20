/** Shared responsive <picture> for audit-friendly WebP + srcset.
 *  Fallback <img> also uses WebP so crawlers never pull oversized PNG/JPEG. */
export function PictImg({
  src,
  alt,
  width,
  height,
  className,
  loading,
  fetchPriority,
  decoding = "async",
  sizes = "(max-width: 768px) 100vw, 720px",
  responsive = true,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "auto" | "sync";
  sizes?: string;
  responsive?: boolean;
}) {
  const clean = src.split("?")[0];
  const webpBase = clean.replace(/\.(jpe?g|png|webp)$/i, "");
  const webp = `${webpBase}.webp`;
  const candidates = responsive
    ? [480, 768, 1200]
        .filter((w) => w < width)
        .map((w) => `${webpBase}-${w}.webp ${w}w`)
    : [];
  const srcSet = [...candidates, `${webp} ${width}w`].join(", ");

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        className={className}
        src={webp}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        sizes={sizes}
      />
    </picture>
  );
}
