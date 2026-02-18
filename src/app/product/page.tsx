'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Product, CartItem } from '@/types/database';
import { useCart } from '@/hooks/useCart';

function getImageUrl(storagePath: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/kalogirou-product-images/${storagePath}`;
}

function ProductDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      setLoading(true);
      const { data } = await supabase
        .from('kalogirou_products')
        .select('*, kalogirou_product_images(*), kalogirou_product_variants(*)')
        .eq('id', id)
        .single();

      if (data) {
        setProduct(data);
        const images = data.kalogirou_product_images ?? [];
        const primary = images.find((img: { is_primary: boolean }) => img.is_primary);
        const first = primary || images[0];
        if (first) setMainImage(getImageUrl(first.storage_path));
      }
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (!id) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">No product specified.</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">Back to catalog</Link>
      </div>
    );
  }

  if (loading) {
    return <p className="text-center text-gray-500 py-16">Loading...</p>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">Back to catalog</Link>
      </div>
    );
  }

  const images = product.kalogirou_product_images ?? [];
  const variants = (product.kalogirou_product_variants ?? []).filter((v) => v.is_active);
  const hasVariants = variants.length > 0;

  const sizes = Array.from(new Set(variants.map((v) => v.size).filter(Boolean))) as string[];
  const colors = Array.from(new Set(variants.map((v) => v.color).filter(Boolean))) as string[];

  const matchedVariant = hasVariants
    ? variants.find((v) => {
        const sizeMatch = sizes.length === 0 || v.size === selectedSize;
        const colorMatch = colors.length === 0 || v.color === selectedColor;
        return sizeMatch && colorMatch;
      })
    : null;

  const selectionsComplete =
    !hasVariants ||
    ((sizes.length === 0 || selectedSize !== null) &&
     (colors.length === 0 || selectedColor !== null));

  const displayPrice = hasVariants
    ? matchedVariant ? matchedVariant.price : null
    : product.base_price;

  const outOfStock = hasVariants && matchedVariant ? matchedVariant.stock <= 0 : false;

  function handleAddToCart() {
    if (!product) return;
    const primaryImg = images.find((img) => img.is_primary) || images[0];
    const imageUrl = primaryImg ? getImageUrl(primaryImg.storage_path) : undefined;

    const item: CartItem = {
      product_id: product.id,
      variant_id: matchedVariant?.id,
      title: product.title,
      variant_label: matchedVariant
        ? [matchedVariant.size, matchedVariant.color].filter(Boolean).join(' / ')
        : undefined,
      price: displayPrice!,
      quantity: 1,
      image: imageUrl,
    };

    addToCart(item);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image section */}
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            {mainImage ? (
              <img src={mainImage} alt={product.title} className="object-cover w-full h-full" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((img) => {
                  const url = getImageUrl(img.storage_path);
                  return (
                    <button
                      key={img.id}
                      onClick={() => setMainImage(url)}
                      className={`relative w-16 h-16 shrink-0 rounded-md overflow-hidden border-2 ${
                        mainImage === url ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={url} alt={img.alt_text || product.title} className="object-cover w-full h-full" />
                    </button>
                  );
                })}
            </div>
          )}
        </div>

        {/* Details section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

          {product.description && <p className="text-gray-600 mt-3">{product.description}</p>}

          {product.material && (
            <p className="text-sm text-gray-500 mt-2">
              <span className="font-medium">Material:</span> {product.material}
            </p>
          )}

          {product.sku && (
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium">SKU:</span> {product.sku}
            </p>
          )}

          <div className="mt-4">
            {displayPrice !== null ? (
              <p className="text-xl font-bold text-gray-900">&euro;{displayPrice.toFixed(2)}</p>
            ) : (
              <p className="text-sm text-gray-500">Select options to see price</p>
            )}
          </div>

          {sizes.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={`px-4 py-2 rounded-md text-sm border transition-colors ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {colors.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Color</p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                    className={`px-4 py-2 rounded-md text-sm border transition-colors ${
                      selectedColor === color
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {outOfStock && <p className="text-sm text-red-600 mt-3">Out of stock</p>}

          <button
            onClick={handleAddToCart}
            disabled={!selectionsComplete || displayPrice === null || outOfStock}
            className="mt-6 w-full py-3 rounded-lg text-white font-medium transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {addedFeedback ? 'Added!' : outOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500 py-16">Loading...</p>}>
      <ProductDetail />
    </Suspense>
  );
}
