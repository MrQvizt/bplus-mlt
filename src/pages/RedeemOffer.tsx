import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getOfferById, getProviderById } from '@/data/mockData';
import CodeRevealWithTimer from '@/components/CodeRevealWithTimer';
import BottomNav from '@/components/BottomNav';

const RedeemOffer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const offer = id ? getOfferById(id) : undefined;
  const provider = offer ? getProviderById(offer.providerId) : undefined;

  if (!offer || !provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Offer not found</p>
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
        <h1 className="font-semibold text-foreground truncate">Redeem Offer</h1>
      </header>

      <main className="px-4 py-8">
        {/* Offer Summary */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src={provider.logoUrl}
            alt={provider.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="text-sm text-muted-foreground">{provider.name}</p>
            <p className="font-semibold text-foreground">{offer.title}</p>
          </div>
        </div>

        <CodeRevealWithTimer baseCode={offer.baseCode} />
      </main>

      <BottomNav />
    </div>
  );
};

export default RedeemOffer;
