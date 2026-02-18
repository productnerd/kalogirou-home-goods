'use client';

import { Category } from '@/types/database';

interface CategoryFilterProps {
  categories: Category[];
  selected: string[];
  onSelect: (slugs: string[]) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  function toggle(slug: string) {
    if (selected.includes(slug)) {
      onSelect(selected.filter((s) => s !== slug));
    } else {
      onSelect([...selected, slug]);
    }
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
      <button
        onClick={() => onSelect([])}
        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          selected.length === 0
            ? 'bg-[#2563EB] text-white'
            : 'border border-gray-300 text-gray-600 hover:border-gray-400'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => toggle(cat.slug)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected.includes(cat.slug)
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
