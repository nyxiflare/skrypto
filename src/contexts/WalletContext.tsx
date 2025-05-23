
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connect: (address: string) => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connect = (walletAddress: string) => {
    setAddress(walletAddress);
    setIsConnected(true);
    // In a real app, we could also store this in localStorage
    // localStorage.setItem('walletAddress', walletAddress);
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    // localStorage.removeItem('walletAddress');
  };

  return (
    <WalletContext.Provider value={{ address, isConnected, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
