import { MapPin } from 'lucide-react';
import { Provider } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/provider/${provider.id}`)}
      className="card-elevated p-4 flex gap-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 active:scale-[0.99]"
    >
      <img
        src={provider.logoUrl}
        alt={provider.name}
        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground">{provider.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{provider.areas.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
