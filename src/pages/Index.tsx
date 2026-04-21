import { useState, useMemo, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryChips from '@/components/CategoryChips';
import OfferCard from '@/components/OfferCard';
import BottomNav from '@/components/BottomNav';
import PromoBanner from '@/components/PromoBanner';
import { useOffersWithProvider } from '@/hooks/useData';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import PagePanel from '@/components/layout/PagePanel';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const { data: allOffers = [], isLoading } = useOffersWithProvider();

  const filteredOffers = useMemo(() => {
    let result = allOffers;

    if (selectedCategory !== 'All') {
      result = result.filter(({ offer }) => offer.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        ({ offer, provider }) =>
          offer.title.toLowerCase().includes(q) ||
          provider.name.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allOffers, selectedCategory, searchQuery]);

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
    <div className="min-h-screen pb-24">
      <PagePanel className="mx-4 mt-3 mb-6">
        <div ref={headerRef}>
          <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>

        <div
          className={cn(
            'sticky top-0 z-20 transition-all duration-200',
            isSticky ? 'bg-background/95 backdrop-blur-sm shadow-soft' : 'bg-transparent'
          )}
        >
          <div className="px-4 py-2">
            <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>
        </div>

        <main className="px-4 pb-6 space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Offers</h1>

          <div>
            <PromoBanner />
          </div>

          <div className="space-y-3 pt-2">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="card-elevated p-4 h-24 animate-pulse bg-muted rounded-xl" />
                ))}
              </div>
            ) : filteredOffers.length > 0 ? (
              filteredOffers.map(({ offer, provider }) => (
                <OfferCard key={offer.id} offer={offer} provider={provider} />
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
      </PagePanel>

      <BottomNav />
    </div>
  );
};

export default Index;
