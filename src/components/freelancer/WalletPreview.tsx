
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Eye, EyeOff } from 'lucide-react';

interface WalletPreviewProps {
  walletAddress?: string;
  hasHiredBefore?: boolean;
}

const WalletPreview: React.FC<WalletPreviewProps> = ({ 
  walletAddress, 
  hasHiredBefore = false 
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const displayWallet = () => {
    if (!walletAddress) return 'Not connected';
    
    if (hasHiredBefore || isRevealed) {
      return walletAddress;
    }
    
    return `${walletAddress.slice(0, 6)}${'•'.repeat(26)}${walletAddress.slice(-4)}`;
  };

  const canReveal = walletAddress && !hasHiredBefore && !isRevealed;

  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Wallet size={20} />
          Wallet Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="font-mono text-sm text-white/80 break-all bg-white/5 p-3 rounded">
            {displayWallet()}
          </div>
          
          {canReveal && (
            <Button
              onClick={() => setIsRevealed(true)}
              variant="outline"
              className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white flex items-center gap-2 w-full"
            >
              {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
              Reveal Full Address
            </Button>
          )}
          
          {hasHiredBefore && (
            <p className="text-xs text-skrypto-green">
              ✓ You've hired this freelancer before
            </p>
          )}
          
          {!hasHiredBefore && !walletAddress && (
            <p className="text-xs text-white/50">
              Wallet address will be revealed after hiring
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletPreview;
