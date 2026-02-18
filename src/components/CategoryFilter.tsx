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
    <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelect([])}
        className={`shrink-0 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
          selected.length === 0
            ? 'border-accent text-foreground'
            : 'border-transparent text-muted hover:text-foreground'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => toggle(cat.slug)}
          className={`shrink-0 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            selected.includes(cat.slug)
              ? 'border-accent text-foreground'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
