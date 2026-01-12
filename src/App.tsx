import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import OfferDetail from "./pages/OfferDetail";
import RedeemOffer from "./pages/RedeemOffer";
import ProviderPage from "./pages/ProviderPage";
import Providers from "./pages/Providers";
import ProviderLanding from "./pages/ProviderLanding";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/offer/:id" element={<OfferDetail />} />
            <Route path="/redeem/:id" element={<RedeemOffer />} />
            <Route path="/provider/:id" element={<ProviderPage />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/for-providers" element={<ProviderLanding />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
