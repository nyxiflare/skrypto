
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WalletConnect = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const walletOptions = [
    {
      name: "MetaMask",
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
      description: "Connect using browser extension",
    },
    {
      name: "WalletConnect",
      icon: "https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png",
      description: "Scan with your mobile wallet",
    },
    {
      name: "Coinbase Wallet",
      icon: "https://www.svgrepo.com/show/331345/coinbase-v2.svg",
      description: "Connect with Coinbase app",
    },
    {
      name: "Rainbow",
      icon: "https://rainbowkit.com/rainbow.svg",
      description: "Connect with Rainbow app",
    }
  ];

  const connectWallet = (walletName: string) => {
    console.log(`Connecting to ${walletName}...`);
    // Here would be the actual wallet connection logic
    setTimeout(() => {
      setDialogOpen(false);
    }, 1000);
  };

  return (
    <>
      <Button 
        onClick={() => setDialogOpen(true)}
        className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white px-6 py-6 text-lg glow-purple flex items-center gap-2"
      >
        <Wallet size={20} />
        Connect Wallet
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Connect your wallet</DialogTitle>
            <DialogDescription className="text-white/70">
              Select a wallet to connect to Skrypto platform
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.name}
                className="flex items-center p-3 rounded-lg transition-colors hover:bg-white/5 border border-white/10"
                onClick={() => connectWallet(wallet.name)}
              >
                <img src={wallet.icon} alt={wallet.name} className="w-8 h-8 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-white">{wallet.name}</div>
                  <div className="text-sm text-white/60">{wallet.description}</div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-2 text-center text-sm text-white/60">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnect;
