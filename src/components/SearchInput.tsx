import { Search } from 'lucide-react';
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search offers...'
}: SearchInputProps) => {
  return <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all px-[20px]" />
    </div>;
};
export default SearchInput;