import { LogOut, Mail } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';
import { useState } from 'react';

const Account = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-wavy-pattern pb-24">
      <Header />
      
      <main className="px-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Account</h1>
        
        {isAuthenticated ? (
          <div className="card-elevated p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Signed in as</p>
                <p className="font-medium text-foreground">{user?.email}</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={logout}
              className="w-full gap-2"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        ) : (
          <div className="card-elevated p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center">
              <Mail className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Not signed in</h3>
              <p className="text-sm text-muted-foreground">
                Sign in to track your redemptions and access exclusive offers.
              </p>
            </div>
            <Button onClick={() => setShowLogin(true)} className="w-full">
              Sign In
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};

export default Account;
