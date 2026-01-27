import Header from '@/components/Header';
import ProviderCard from '@/components/ProviderCard';
import BottomNav from '@/components/BottomNav';
import { providers } from '@/data/mockData';
import PagePanel from '@/components/layout/PagePanel';

const Providers = () => {
  return (
    <div className="min-h-screen pb-24">
      <PagePanel className="mx-4 mt-3 mb-6">
        <Header />

        <main className="px-4 pb-6 space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Providers</h1>

          <div className="space-y-3">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </main>
      </PagePanel>

      <BottomNav />
    </div>
  );
};

export default Providers;
