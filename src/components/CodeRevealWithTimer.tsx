import { useState, useEffect, useCallback } from 'react';
import { Eye, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeRevealWithTimerProps {
  baseCode: string;
}

const generateCode = (base: string): string => {
  // Simple rotating code based on time and base code
  const now = new Date();
  const seed = now.getMinutes() + now.getHours() * 60 + now.getDate() * 1440;
  const hash = base.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1) * seed, 0);
  const code = (hash % 900000 + 100000).toString();
  return code;
};

const CodeRevealWithTimer = ({ baseCode }: CodeRevealWithTimerProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [code, setCode] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const revealCode = useCallback(() => {
    setCode(generateCode(baseCode));
    setIsRevealed(true);
    setTimeLeft(60);
  }, [baseCode]);

  useEffect(() => {
    if (!isRevealed) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRevealed(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRevealed]);

  const handleUsed = () => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference * (1 - timeLeft / 60);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold text-center mb-6">Show this to staff</h2>

      <div className="card-elevated p-8 w-full max-w-xs flex flex-col items-center">
        {!isRevealed ? (
          <Button
            onClick={revealCode}
            className="h-14 px-8 rounded-xl font-semibold text-lg gap-2"
          >
            <Eye className="h-5 w-5" />
            Tap to reveal code
          </Button>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="45"
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="45"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold tracking-widest text-foreground">{code}</span>
                <span className="text-sm text-muted-foreground mt-1">{timeLeft}s</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground text-center mt-4 max-w-xs">
        Codes refresh regularly. Screenshots may not work.
      </p>

      {isRevealed && (
        <Button
          variant="outline"
          onClick={handleUsed}
          className="mt-6 gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          I used this
        </Button>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-foreground text-background px-6 py-3 rounded-xl shadow-lg animate-in fade-in zoom-in duration-200">
            Thanks! Enjoy your discount 🎉
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeRevealWithTimer;
