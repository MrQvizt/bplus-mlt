import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import logo from '@/assets/benefitplus-logo.svg';
import PagePanel from '@/components/layout/PagePanel';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <PagePanel className="w-full max-w-sm p-6">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Benefitplus" className="h-16 w-auto" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-1">
            {isSignUp ? 'Create Account' : 'Login Account'}
          </h1>
          <p className="text-muted-foreground mb-8">Unlock your potential</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border-2 border-primary/30 bg-background placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border-2 border-primary/30 bg-background placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {!isSignUp && (
              <button
                type="button"
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot Password?
              </button>
            )}

            {error && <p className="text-sm text-destructive text-center">{error}</p>}

            <Button
              type="submit"
              className="w-full h-12 rounded-lg font-semibold mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary font-medium hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </PagePanel>
      </div>

      {/* Footer links */}
      <div className="flex items-center justify-center gap-8 pb-8">
        <a
          href="https://benefitplus.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
        >
          <Globe className="h-5 w-5" />
          <span className="text-sm font-medium">Visit Benefit plus</span>
        </a>
        <button className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Support</span>
        </button>
      </div>
    </div>
  );
};

export default Auth;
