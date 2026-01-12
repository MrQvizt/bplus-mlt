import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { getPromotedOffers, getProviderById, PromotedOffer } from '@/data/mockData';
import { cn } from '@/lib/utils';

const PromoBanner = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const promotedOffers = getPromotedOffers();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Auto-play functionality with pause support
  useEffect(() => {
    if (!emblaApi || isPaused) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }
    
    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [emblaApi, isPaused]);

  // Hold-to-pause handlers
  const handlePointerDown = () => setIsPaused(true);
  const handlePointerUp = () => setIsPaused(false);
  const handlePointerLeave = () => setIsPaused(false);

  if (promotedOffers.length === 0) return null;

  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Sponsored
      </span>
      
      <div 
        className="overflow-hidden rounded-xl touch-pan-y" 
        ref={emblaRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        <div className="flex">
          {promotedOffers.map((promo) => (
            <PromoBannerCard key={promo.id} promo={promo} />
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-1.5 pt-1">
        {promotedOffers.map((_, index) => (
          <button
            key={index}
            className={cn(
              'w-1.5 h-1.5 rounded-full transition-all duration-300',
              index === selectedIndex
                ? 'bg-primary w-4'
                : 'bg-muted-foreground/30'
            )}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const PromoBannerCard = ({ promo }: { promo: PromotedOffer }) => {
  const provider = getProviderById(promo.providerId);
  
  if (!provider) return null;

  return (
    <Link
      to={`/offer/${promo.offerId}`}
      className="flex-none w-full"
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-xl p-5 h-[140px]',
          'bg-gradient-to-br',
          promo.bgGradient
        )}
      >
        {/* Decorative circles */}
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -right-2 top-12 w-16 h-16 rounded-full bg-white/5" />
        
        <div className="relative z-10 flex items-start justify-between h-full">
          <div className="flex flex-col justify-between h-full min-w-0 flex-1 mr-4">
            <p className="text-white/80 text-sm font-medium truncate">{provider.name}</p>
            <p className="text-white text-xl sm:text-2xl font-bold tracking-tight line-clamp-1">
              {promo.discount}
            </p>
            <p className="text-white/90 text-xs sm:text-sm line-clamp-2">{promo.headline}</p>
          </div>
          
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white/20 bg-white/10 flex-shrink-0">
            <img
              src={provider.logoUrl}
              alt={provider.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PromoBanner;
