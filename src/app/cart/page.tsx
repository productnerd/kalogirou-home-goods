'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Your Cart</h1>
          <p className="text-gray-500 mb-8">Your cart is empty</p>
          <Link
            href="/"
            className="inline-block bg-[#2563EB] text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Your Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product_id}-${item.variant_id ?? 'base'}`}
              className="bg-white rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
            >
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                {item.variant_label && (
                  <p className="text-sm text-gray-500">{item.variant_label}</p>
                )}
                <p className="text-sm text-gray-600 mt-1">
                  &euro;{item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.product_id, item.variant_id, item.quantity - 1)
                  }
                  className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  &minus;
                </button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product_id, item.variant_id, item.quantity + 1)
                  }
                  className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Line total */}
              <div className="text-right sm:w-24">
                <p className="font-medium text-gray-900">
                  &euro;{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromCart(item.product_id, item.variant_id)}
                className="self-start sm:self-center p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                aria-label={`Remove ${item.title}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Total + Actions */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium text-gray-900">Order Total</span>
            <span className="text-xl font-semibold text-gray-900">
              &euro;{total.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 text-center border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/checkout"
              className="flex-1 text-center bg-[#2563EB] text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
