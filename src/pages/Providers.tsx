import Header from '@/components/Header';
import ProviderCard from '@/components/ProviderCard';
import BottomNav from '@/components/BottomNav';
import { useProviders } from '@/hooks/useData';
import PagePanel from '@/components/layout/PagePanel';

const Providers = () => {
  const { data: providers = [], isLoading } = useProviders();

  return (
    <div className="min-h-screen pb-24">
      <PagePanel className="mx-4 mt-3 mb-6">
        <Header />

        <main className="px-4 pb-6 space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Providers</h1>

          <div className="space-y-3">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="card-elevated p-4 h-20 animate-pulse bg-muted rounded-xl" />
              ))
            ) : (
              providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))
            )}
          </div>
        </main>
      </PagePanel>

      <BottomNav />
    </div>
  );
};

export default Providers;
