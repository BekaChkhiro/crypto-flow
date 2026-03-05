'use client';

import Link from 'next/link';
import { usePrices } from './PriceProvider';
import { formatPrice, formatLargeNumber } from '@/lib/coingecko';

interface PriceCardProps {
  coinId: string;
  name: string;
  symbol: string;
}

export default function PriceCard({ coinId, name, symbol }: PriceCardProps) {
  const { prices, loading, error } = usePrices();

  if (loading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 animate-pulse">
        <div className="h-6 bg-slate-700 rounded w-24 mb-3" />
        <div className="h-8 bg-slate-700 rounded w-32 mb-2" />
        <div className="h-4 bg-slate-700 rounded w-20" />
      </div>
    );
  }

  if (error || !prices) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white">{name}</h3>
          <span className="text-slate-400 text-sm">{symbol}</span>
        </div>
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  const coinData = prices[coinId];
  if (!coinData) {
    return (
      <Link href={`/coins/${coinId}`}>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-blue-500/50 transition cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white">{name}</h3>
            <span className="text-slate-400 text-sm">{symbol}</span>
          </div>
          <div className="text-slate-400">Price unavailable</div>
        </div>
      </Link>
    );
  }

  const isPositive = coinData.usd_24h_change >= 0;

  return (
    <Link href={`/coins/${coinId}`}>
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-blue-500/50 transition cursor-pointer">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white">{name}</h3>
          <span className="text-slate-400 text-sm">{symbol}</span>
        </div>
        <div className="text-2xl font-bold text-white mb-2">
          {formatPrice(coinData.usd)}
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{coinData.usd_24h_change.toFixed(2)}%
          </span>
          <span className="text-slate-500 text-sm">
            MCap: {formatLargeNumber(coinData.usd_market_cap)}
          </span>
        </div>
      </div>
    </Link>
  );
}
