
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ethers } from 'ethers';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  signer: ethers.Signer | null;
  provider: ethers.providers.Web3Provider | null;
  connect: (provider?: ethers.providers.Web3Provider) => Promise<void>;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string | null>;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const { toast } = useToast();

  // Check for existing wallet connection on mount
  useEffect(() => {
    const storedAddress = localStorage.getItem('walletAddress');
    
    if (storedAddress && window.ethereum) {
      // Try to reconnect automatically
      connect().catch(() => {
        // If auto-reconnect fails, clear stored data
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('walletSignature');
      });
    }
  }, []);

  const fetchOrCreateUser = async (walletAddress: string) => {
    try {
      // Try to find existing user
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingUser) {
        // Store user data in localStorage for persistence
        localStorage.setItem('userData', JSON.stringify(existingUser));
        console.log('Existing user found:', existingUser);
        return existingUser;
      } else {
        // Create new user
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert([{ wallet_address: walletAddress }])
          .select()
          .single();

        if (createError) throw createError;

        localStorage.setItem('userData', JSON.stringify(newUser));
        console.log('New user created:', newUser);
        return newUser;
      }
    } catch (error) {
      console.error('Error fetching/creating user:', error);
      toast({
        variant: "destructive",
        title: "Database Error",
        description: "Failed to load user data. Please try again.",
      });
      return null;
    }
  };

  const connect = async (injectedProvider?: ethers.providers.Web3Provider): Promise<void> => {
    setIsConnecting(true);
    try {
      let web3Provider: ethers.providers.Web3Provider;
      
      if (injectedProvider) {
        web3Provider = injectedProvider;
      } else if (window.ethereum) {
        web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        await web3Provider.send("eth_requestAccounts", []);
      } else {
        throw new Error("No wallet extension found. Please install MetaMask or another Web3 wallet.");
      }

      const web3Signer = web3Provider.getSigner();
      const walletAddress = await web3Signer.getAddress();

      // Update state
      setProvider(web3Provider);
      setSigner(web3Signer);
      setAddress(walletAddress);
      setIsConnected(true);

      // Save wallet address
      localStorage.setItem('walletAddress', walletAddress);

      // Fetch or create user in database
      await fetchOrCreateUser(walletAddress);

      toast({
        title: "Wallet Connected Successfully",
        description: `Connected to ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`,
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      let errorMessage = "Wallet connection failed. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes("User rejected")) {
          errorMessage = "Connection cancelled. Please accept the wallet connection to continue.";
        } else if (error.message.includes("No wallet")) {
          errorMessage = "No wallet found. Please install MetaMask or another Web3 wallet.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setProvider(null);
    setSigner(null);
    setIsConnecting(false);
    
    // Clear all stored data
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletSignature');
    localStorage.removeItem('userData');
    localStorage.removeItem('selectedRole');
    
    toast({
      title: "Wallet Disconnected",
      description: "You've been logged out successfully",
    });
  };

  const signMessage = async (message: string): Promise<string | null> => {
    if (!signer) {
      toast({
        variant: "destructive",
        title: "Not Connected",
        description: "Please connect your wallet first",
      });
      return null;
    }

    try {
      const signature = await signer.signMessage(message);
      return signature;
    } catch (error) {
      console.error("Error signing message:", error);
      toast({
        variant: "destructive",
        title: "Signature Failed",
        description: "Failed to sign message with wallet. Please try again.",
      });
      return null;
    }
  };

  return (
    <WalletContext.Provider value={{ 
      address, 
      isConnected, 
      provider, 
      signer, 
      connect, 
      disconnect, 
      signMessage,
      isConnecting
    }}>
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
