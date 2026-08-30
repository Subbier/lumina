import Image from "next/image";

/** Shared image wrapper. Next.js generates correctly sized AVIF/WebP variants. */
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
  return (
    <Image
      className={className}
      src={src.split("?")[0]}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      priority={fetchPriority === "high"}
      decoding={decoding}
      sizes={sizes}
    />
  );
}
