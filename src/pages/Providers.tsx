import Header from '@/components/Header';
import ProviderCard from '@/components/ProviderCard';
import BottomNav from '@/components/BottomNav';
import { providers } from '@/data/mockData';

const Providers = () => {
  return (
    <div className="min-h-screen pb-24">
      <Header />
      
      <main className="px-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Providers</h1>
        
        <div className="space-y-3">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Providers;
