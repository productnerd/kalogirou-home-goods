'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Product, Category } from '@/types/database';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import ProductGrid from '@/components/ProductGrid';
import SortSelect from '@/components/SortSelect';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Debounce search query by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from('kalogirou_categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      let query = supabase
        .from('kalogirou_products')
        .select('*, kalogirou_product_images(*), kalogirou_product_variants(*)')
        .eq('is_active', true);

      // Text search
      if (debouncedSearch) {
        query = query.textSearch('fts', debouncedSearch, { type: 'websearch' });
      }

      // Category filter
      if (selectedCategory) {
        const category = categories.find((c) => c.slug === selectedCategory);
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      // Sort
      if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'price_asc') {
        query = query.order('base_price', { ascending: true });
      } else {
        query = query.order('base_price', { ascending: false });
      }

      const { data } = await query;
      setProducts(data ?? []);
      setLoading(false);
    }

    fetchProducts();
  }, [debouncedSearch, selectedCategory, sortBy, categories]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="flex items-start justify-between gap-4 mb-6">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <SortSelect
          value={sortBy}
          onChange={(v) => setSortBy(v as 'newest' | 'price_asc' | 'price_desc')}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-16">Loading...</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
