'use client';

import Link from 'next/link';
import { Product } from '@/types/database';

function getImageUrl(product: Product): string | null {
  const images = product.kalogirou_product_images;
  if (!images || images.length === 0) return null;
  const primary = images.find((img) => img.is_primary);
  const image = primary || images[0];
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/kalogirou-product-images/${image.storage_path}`;
}

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = getImageUrl(product);
  const hasVariants = product.kalogirou_product_variants && product.kalogirou_product_variants.length > 0;

  return (
    <Link
      href={`/product?id=${product.id}`}
      className="group block bg-surface rounded-lg overflow-hidden border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative aspect-square bg-accent-light">
        {imageUrl ? (
          <img src={imageUrl} alt={product.title} className="object-cover w-full h-full" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted/30">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-foreground truncate">{product.title}</h3>
        {product.material && (
          <p className="text-xs text-muted mt-0.5">{product.material}</p>
        )}
        <p className="text-sm font-semibold text-accent mt-1.5">
          {hasVariants ? 'From ' : ''}&euro;{product.base_price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
