import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, ExternalLink, ChevronRight, Flag, Bell } from 'lucide-react';
import { getOfferById, getProviderById } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import BottomNav from '@/components/BottomNav';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import PagePanel from '@/components/layout/PagePanel';

const OfferDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, setPendingAction } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [notifyEnabled, setNotifyEnabled] = useState(false);

  const offer = id ? getOfferById(id) : undefined;
  const provider = offer ? getProviderById(offer.providerId) : undefined;

  if (!offer || !provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Offer not found</p>
      </div>
    );
  }

  const handleRedeem = () => {
    if (isAuthenticated) {
      navigate(`/redeem/${offer.id}`);
    } else {
      setPendingAction(() => () => navigate(`/redeem/${offer.id}`));
      setShowLogin(true);
    }
  };

  const openMaps = () => {
    const query = encodeURIComponent(`${offer.address}, Malta`);
    // Use maps.google.com which works better across regions
    window.open(`https://maps.google.com/maps?q=${query}`, '_blank');
  };

  const handleReport = () => {
    // For now, just show a toast or alert - can be expanded later
    alert('Thank you for your report. We will review this offer.');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Generate OpenStreetMap embed URL with better zoom for the location
  const getMapEmbedUrl = () => {
    // Use Nominatim search for better location targeting with high zoom level (18 = street level)
    const query = encodeURIComponent(`${offer.address}, Malta`);
    return `https://www.openstreetmap.org/export/embed.html?bbox=14.505%2C35.895%2C14.525%2C35.905&layer=mapnik&marker=35.9%2C14.515`;
  };

  return (
    <div className="min-h-screen pb-32">
      <header className="bg-background sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b border-border">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-semibold text-foreground truncate flex-1">Offer Details</h1>
      </header>

      <PagePanel className="mx-4 mt-4 mb-6">
        <main className="px-4 py-6 space-y-6">
          {/* Provider Header */}
          <button
            onClick={() => navigate(`/provider/${provider.id}`)}
            className="flex items-center gap-3 w-full text-left group"
          >
            <img
              src={provider.logoUrl}
              alt={provider.name}
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Provider</p>
              <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {provider.name}
              </h2>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>

          {/* Offer Info */}
          <div className="card-elevated p-5 space-y-4">
            <h3 className="text-xl font-bold text-foreground">{offer.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{offer.description}</p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Valid until {formatDate(offer.expiryDate)}</span>
            </div>
          </div>

          {/* Terms */}
          <div className="card-elevated p-5">
            <h4 className="font-semibold text-foreground mb-3">Terms & Conditions</h4>
            <ul className="space-y-2">
              {offer.terms.map((term, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location with Map Preview */}
          <div className="card-elevated p-5">
            <h4 className="font-semibold text-foreground mb-3">Location</h4>
            <div className="flex items-start gap-2 text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{offer.address}</span>
            </div>

            {/* Map Preview */}
            <div className="relative rounded-xl overflow-hidden mb-4 bg-muted">
              <iframe
                src={getMapEmbedUrl()}
                className="w-full h-40 border-0"
                title="Location map"
                loading="lazy"
              />
              <button
                onClick={openMaps}
                className="absolute inset-0 bg-transparent hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Open in Google Maps"
              />
            </div>

            <Button variant="outline" onClick={openMaps} className="w-full gap-2">
              <ExternalLink className="h-4 w-4" />
              Open in Google Maps
            </Button>
          </div>

          {/* Notification Toggle */}
          <div className="card-elevated px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Notify me of similar offers</span>
              </div>
              <Switch checked={notifyEnabled} onCheckedChange={setNotifyEnabled} />
            </div>
          </div>

          {/* Report Option */}
          <button
            onClick={handleReport}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Flag className="h-3.5 w-3.5" />
            <span>Report a problem</span>
          </button>
        </main>
      </PagePanel>

      {/* Fixed CTA */}
      <div className="fixed bottom-16 left-0 right-0 bg-background border-t border-border p-4 safe-area-pb">
        <Button onClick={handleRedeem} className="w-full h-12 rounded-xl font-semibold text-base">
          Redeem
        </Button>
      </div>

      <BottomNav />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};

export default OfferDetail;
