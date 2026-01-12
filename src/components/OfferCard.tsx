import { MapPin } from 'lucide-react';
import { Offer, getProviderById } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface OfferCardProps {
  offer: Offer;
}

const OfferCard = ({ offer }: OfferCardProps) => {
  const navigate = useNavigate();
  const provider = getProviderById(offer.providerId);

  if (!provider) return null;

  return (
    <div
      onClick={() => navigate(`/offer/${offer.id}`)}
      className="card-elevated p-4 flex gap-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 active:scale-[0.99]"
    >
      <img
        src={provider.logoUrl}
        alt={provider.name}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground font-medium">{provider.name}</p>
        <h3 className="font-semibold text-foreground truncate">{offer.title}</h3>
        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{offer.area}</span>
        </div>
      </div>
      <button className="self-center px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
        View
      </button>
    </div>
  );
};

export default OfferCard;
