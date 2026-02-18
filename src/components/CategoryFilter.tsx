'use client';

import { Category } from '@/types/database';

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
      <button
        onClick={() => onSelect(null)}
        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          selected === null
            ? 'bg-[#2563EB] text-white'
            : 'border border-gray-300 text-gray-600 hover:border-gray-400'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.slug)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === cat.slug
              ? 'bg-[#2563EB] text-white'
              : 'border border-gray-300 text-gray-600 hover:border-gray-400'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
