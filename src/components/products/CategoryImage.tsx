import Image from 'next/image';

/**
 * Category picture uploaded in the admin panel. The admin crops every upload to 3:2, which is
 * the shape of the category card, so nothing is trimmed. Renders nothing when there is no picture, letting
 * the caller keep its icon fallback.
 */
export function CategoryImage({
  src,
  alt,
  className = '',
  aspect = 'aspect-[3/2]',
}: {
  src?: string;
  alt: string;
  className?: string;
  /** Tailwind aspect class for the display box; the picture is cropped to fill it. */
  aspect?: string;
}) {
  if (!src) return null;
  return (
    <div className={`relative ${aspect} w-full overflow-hidden bg-[#F3F6FA] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
        unoptimized
      />
    </div>
  );
}
