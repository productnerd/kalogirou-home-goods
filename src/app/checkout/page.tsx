'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/hooks/useCart';
import { OrderItem } from '@/types/database';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart, loaded } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!loaded) {
    return <div className="text-center py-16 animate-pulse"><div className="h-6 bg-accent-light rounded w-32 mx-auto" /></div>;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Checkout</h1>
          <p className="text-muted mb-8">Nothing to checkout</p>
          <Link
            href="/"
            className="inline-block bg-accent text-white px-6 py-2.5 rounded-lg hover:bg-accent-hover transition-colors"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);

    const orderItems: OrderItem[] = items.map((item) => ({
      product_id: item.product_id,
      variant_id: item.variant_id,
      title: item.title,
      variant_label: item.variant_label,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const { data, error: insertError } = await supabase
      .from('kalogirou_orders')
      .insert({
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim(),
        items: orderItems,
        total,
      })
      .select()
      .single();

    if (insertError || !data) {
      setError('Something went wrong placing your order. Please try again.');
      setSubmitting(false);
      return;
    }

    clearCart();
    router.push(`/order-confirmation?order=${data.order_number}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold font-serif text-foreground mb-8">Checkout</h1>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6 border border-border mb-6">
          <h2 className="text-lg font-medium text-foreground mb-4">Order Summary</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={`${item.product_id}-${item.variant_id ?? 'base'}`}
                className="flex justify-between text-sm"
              >
                <span className="text-foreground">
                  {item.title}
                  {item.variant_label ? ` (${item.variant_label})` : ''} x{item.quantity}
                </span>
                <span className="text-foreground font-medium">
                  &euro;{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between">
            <span className="font-medium text-foreground">Total</span>
            <span className="text-lg font-semibold text-foreground">
              &euro;{total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Customer Info Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 border border-border mb-6">
          <h2 className="text-lg font-medium text-foreground mb-4">Your Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>

          {/* Pickup notice */}
          <div className="mt-6 bg-accent-light border border-accent rounded-lg p-4 text-sm text-foreground">
            Please allow up to 24 hours for your order to be prepared for pickup.
          </div>

          {error && (
            <div className="mt-4 bg-error/10 border border-error rounded-lg p-4 text-sm text-error">
              {error}
            </div>
          )}

          <div className="mt-6 flex items-center gap-2 text-sm text-muted">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Secure order &mdash; pay in store at pickup</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-accent text-white py-3 rounded-lg font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}
