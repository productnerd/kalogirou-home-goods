'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-border rounded-2xl p-8 sm:p-12">
          {/* Green checkmark */}
          <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-6">
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
              className="text-success"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-3xl font-semibold font-serif text-foreground mb-2">Order Confirmed!</h1>

          {orderNumber && (
            <p className="text-lg text-muted mb-6">
              Order number: <span className="font-medium text-foreground">{orderNumber}</span>
            </p>
          )}

          <p className="text-muted mb-2">
            Thank you for your order! Please allow up to 24 hours for your order to be prepared
            for pickup.
          </p>

          <p className="text-muted text-sm mb-10">
            Visit us at Kalogirou Home Goods, Larnaca, Cyprus
          </p>

          <Link
            href="/"
            className="inline-block bg-accent text-white px-6 py-2.5 rounded-lg hover:bg-accent-hover transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
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
