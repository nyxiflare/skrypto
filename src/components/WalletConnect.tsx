
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, CheckCircle } from "lucide-react";
import { useWallet } from '@/contexts/WalletContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ethers } from 'ethers';

const WalletConnect = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { address, isConnected, connect, disconnect, isConnecting } = useWallet();

  const walletOptions = [
    {
      name: "MetaMask",
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
      description: "Connect using browser extension",
      type: "injected"
    },
    {
      name: "WalletConnect",
      icon: "https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png",
      description: "Scan with your mobile wallet",
      type: "walletconnect"
    },
    {
      name: "Coinbase Wallet",
      icon: "https://www.svgrepo.com/show/331345/coinbase-v2.svg",
      description: "Connect with Coinbase app",
      type: "coinbase"
    },
    {
      name: "Rainbow",
      icon: "https://rainbowkit.com/rainbow.svg",
      description: "Connect with Rainbow app",
      type: "rainbow"
    }
  ];

  const connectWallet = async (walletName: string, type: string) => {
    try {
      // For now, we only support injected wallets like MetaMask
      if (type === "injected" && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await connect(provider);
        setDialogOpen(false);
      } else {
        console.log(`${walletName} connection not implemented yet`);
        // In a real app, we would handle different wallet types
      }
    } catch (error) {
      // Error handling is now done in the WalletContext
      console.error(`Error connecting to ${walletName}:`, error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <>
      {isConnected ? (
        <div className="flex items-center gap-2">
          <Button 
            className="bg-skrypto-purple/20 hover:bg-skrypto-purple/30 text-white border border-skrypto-purple/50 flex items-center gap-2"
            variant="outline"
          >
            <CheckCircle size={16} className="text-green-500" />
            {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
          </Button>
          <Button
            onClick={handleDisconnect}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5"
            size="icon"
          >
            <LogOut size={18} />
          </Button>
        </div>
      ) : (
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white px-6 py-6 text-lg glow-purple flex items-center gap-2"
          disabled={isConnecting}
        >
          <Wallet size={20} />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}

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
                className="flex items-center p-3 rounded-lg transition-colors hover:bg-white/5 border border-white/10 disabled:opacity-50"
                onClick={() => connectWallet(wallet.name, wallet.type)}
                disabled={isConnecting}
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
