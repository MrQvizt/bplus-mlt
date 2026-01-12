import { categories } from '@/data/mockData';

interface CategoryChipsProps {
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryChips = ({ selected, onSelect }: CategoryChipsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`chip-category whitespace-nowrap ${
            selected === category ? 'chip-category-active' : 'chip-category-inactive'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
