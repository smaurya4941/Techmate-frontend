import Image from 'next/image';
import type { BrandInfo } from '@/lib/brands-data';

/** Brand logo, or the brand name as text until a logo has been supplied. */
export function BrandLogo({ brand, className = 'h-14' }: { brand: Pick<BrandInfo, 'name' | 'logo'>; className?: string }) {
  if (!brand.logo) return <span>{brand.name}</span>;
  return (
    <Image
      src={brand.logo}
      alt={`${brand.name} logo`}
      width={260}
      height={130}
      className={`${className} w-auto max-w-full object-contain`}
    />
  );
}
