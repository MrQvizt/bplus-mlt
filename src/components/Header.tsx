import logo from '@/assets/benefitplus-logo.svg';
import SearchInput from '@/components/SearchInput';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
}

const Header = ({ searchQuery = '', onSearchChange, showSearch = true }: HeaderProps) => {
  return (
    <header className="py-3 px-4">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Benefitplus" className="h-9 w-auto flex-shrink-0" />
        {showSearch && onSearchChange && (
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search providers or offers..."
          />
        )}
      </div>
    </header>
  );
};

export default Header;
