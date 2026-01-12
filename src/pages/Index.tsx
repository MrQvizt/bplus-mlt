import { useState, useMemo, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryChips from '@/components/CategoryChips';
import OfferCard from '@/components/OfferCard';
import BottomNav from '@/components/BottomNav';
import PromoBanner from '@/components/PromoBanner';
import { offers, getOffersByCategory, searchOffers } from '@/data/mockData';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredOffers = useMemo(() => {
    let result = selectedCategory === 'All' ? offers : getOffersByCategory(selectedCategory);
    
    if (searchQuery.trim()) {
      const searchResults = searchOffers(searchQuery);
      result = result.filter((offer) => searchResults.some((sr) => sr.id === offer.id));
    }

    return result.filter((o) => o.isActive);
  }, [selectedCategory, searchQuery]);

  // Track when header scrolls out of view
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setIsSticky(rect.bottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-wavy-pattern pb-24">
      <div ref={headerRef}>
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>
      
      {/* Sticky container for categories */}
      <div 
        className={cn(
          'sticky top-0 z-20 transition-all duration-200',
          isSticky ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="px-4 py-2">
          <CategoryChips
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </div>
      
      <main className="px-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Offers</h1>

        <div>
          <PromoBanner />
        </div>
        
        <div className="space-y-3 pt-2">
          {filteredOffers.length > 0 ? (
            filteredOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">No offers found</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Try adjusting your search or category filter to find more offers.
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
