'use client';

import { useState, useEffect, useCallback } from 'react';
import { CartItem } from '@/types/database';

const STORAGE_KEY = 'kalogirou_cart';

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage full or unavailable
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    setItems(loadCart());
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addToCart = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product_id === item.product_id && i.variant_id === item.variant_id
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + item.quantity };
        return updated;
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((productId: number, variantId?: number) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product_id === productId && i.variant_id === variantId)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, variantId: number | undefined, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, variantId);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product_id === productId && i.variant_id === variantId
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return { items, addToCart, removeFromCart, updateQuantity, clearCart, total };
}
