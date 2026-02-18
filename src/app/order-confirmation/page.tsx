'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        {/* Green checkmark */}
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Order Confirmed!</h1>

        {orderNumber && (
          <p className="text-lg text-gray-600 mb-6">
            Order number: <span className="font-medium text-gray-900">{orderNumber}</span>
          </p>
        )}

        <p className="text-gray-600 mb-2">
          Thank you for your order! Please allow up to 24 hours for your order to be prepared
          for pickup.
        </p>

        <p className="text-gray-500 text-sm mb-10">
          Visit us at Kalogirou Home Goods, Larnaca, Cyprus
        </p>

        <Link
          href="/"
          className="inline-block bg-[#2563EB] text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense>
      <OrderConfirmationContent />
    </Suspense>
  );
}
