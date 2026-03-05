'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { type CoinPrice } from '@/lib/coingecko';

interface PriceContextType {
  prices: CoinPrice | null;
  loading: boolean;
  error: string | null;
}

const PriceContext = createContext<PriceContextType>({
  prices: null,
  loading: true,
  error: null,
});

export function usePrices() {
  return useContext(PriceContext);
}

interface PriceProviderProps {
  children: ReactNode;
  coins?: string[];
}

export function PriceProvider({ children, coins = ['bitcoin', 'ethereum', 'solana', 'cardano', 'polkadot'] }: PriceProviderProps) {
  const [prices, setPrices] = useState<CoinPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        setError(null);
        const response = await fetch(`/api/prices?ids=${coins.join(',')}`);
        if (!response.ok) throw new Error('Failed to fetch prices');
        const data = await response.json();
        setPrices(data);
      } catch (err) {
        setError('Failed to load prices');
        console.error('Price fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();

    // Refresh every 60 seconds
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [coins]);

  return (
    <PriceContext.Provider value={{ prices, loading, error }}>
      {children}
    </PriceContext.Provider>
  );
}
