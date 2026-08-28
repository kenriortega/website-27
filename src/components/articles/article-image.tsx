import Image, { type ImageProps } from "next/image";

type ArticleImageProps = ImageProps & {
  caption?: string;
};

export function ArticleImage({
  alt,
  caption,
  className = "",
  sizes = "(max-width: 768px) 100vw, 768px",
  unoptimized,
  ...props
}: ArticleImageProps) {
  const isAnimatedGif =
    typeof props.src === "string" &&
    props.src.toLowerCase().endsWith(".gif");

  return (
    <figure className="my-8">
      <Image
        {...props}
        alt={alt}
        className={`h-auto w-full border border-border bg-surface ${className}`}
        sizes={sizes}
        unoptimized={unoptimized ?? isAnimatedGif}
      />

      {caption ? (
        <figcaption className="mt-3 text-center text-sm leading-6 text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
