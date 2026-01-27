import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Instagram, MapPin } from 'lucide-react';
import { getProviderById, getOffersByProvider } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import OfferCard from '@/components/OfferCard';
import BottomNav from '@/components/BottomNav';
import PagePanel from '@/components/layout/PagePanel';

const ProviderPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const provider = id ? getProviderById(id) : undefined;
  const providerOffers = id ? getOffersByProvider(id).filter((o) => o.isActive) : [];

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Provider not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-background sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b border-border">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-semibold text-foreground truncate">{provider.name}</h1>
      </header>

      <PagePanel className="mx-4 mt-4 mb-6">
        <main className="px-4 py-6 space-y-6">
          {/* Provider Header */}
          <div className="flex items-start gap-4">
            <img
              src={provider.logoUrl}
              alt={provider.name}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{provider.name}</h2>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {provider.description}
              </p>
            </div>
          </div>

          {/* Contact Buttons */}
          {(provider.phone || provider.instagram) && (
            <div className="flex gap-3">
              {provider.phone && (
                <Button
                  variant="outline"
                  onClick={() => window.open(`tel:${provider.phone}`, '_self')}
                  className="flex-1 gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
              )}
              {provider.instagram && (
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://instagram.com/${provider.instagram}`, '_blank')}
                  className="flex-1 gap-2"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Button>
              )}
            </div>
          )}

          {/* Locations */}
          <div className="card-elevated p-5">
            <h4 className="font-semibold text-foreground mb-3">Locations</h4>
            <ul className="space-y-3">
              {provider.locations.map((location, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{location}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Offers */}
          {providerOffers.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Offers from {provider.name}
              </h4>
              <div className="space-y-3">
                {providerOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </div>
          )}
        </main>
      </PagePanel>

      <BottomNav />
    </div>
  );
};

export default ProviderPage;
