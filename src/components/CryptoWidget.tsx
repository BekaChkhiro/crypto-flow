'use client';

import { useEffect, useState } from 'react';
import { formatPrice, formatLargeNumber, type CoinData } from '@/lib/coingecko';

interface CryptoWidgetProps {
  coin?: string;
  theme?: 'light' | 'dark';
  showVolume?: boolean;
  showMarketCap?: boolean;
  exchange?: string;
  className?: string;
}

export default function CryptoWidget({
  coin = 'bitcoin',
  theme = 'dark',
  showVolume = true,
  showMarketCap = true,
  exchange,
  className = '',
}: CryptoWidgetProps) {
  const [data, setData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        // Use our internal API route instead of calling CoinGecko directly
        const response = await fetch(`/api/coin/${coin}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const coinData = await response.json();
        setData(coinData);
      } catch {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [coin]);

  const isDark = theme === 'dark';

  if (loading) {
    return (
      <div className={`rounded-xl p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border ${className}`}>
        <div className="flex items-center justify-center">
          <div className={`w-8 h-8 border-4 rounded-full animate-spin ${isDark ? 'border-slate-600 border-t-cyan-400' : 'border-gray-200 border-t-blue-500'}`} style={{ borderTopColor: isDark ? '#22d3ee' : '#3b82f6' }} />
          <span className={`ml-3 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`rounded-xl p-6 ${isDark ? 'bg-slate-800 border-red-500/50' : 'bg-white border-red-300'} border ${className}`}>
        <p className="text-red-500 text-center">{error || 'No data available'}</p>
      </div>
    );
  }

  const price = data.market_data.current_price.usd;
  const change24h = data.market_data.price_change_percentage_24h;
  const marketCap = data.market_data.market_cap.usd;
  const volume = data.market_data.total_volume.usd;
  const isPositive = change24h >= 0;

  return (
    <div className={`rounded-xl p-5 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-slate-900'} border ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img src={data.image.small} alt={data.name} className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{data.name}</h3>
          <span className={`text-sm uppercase ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{data.symbol}</span>
        </div>
        <span className={`px-2 py-1 rounded text-sm font-medium ${
          isPositive
            ? 'bg-emerald-500/20 text-emerald-400'
            : 'bg-red-500/20 text-red-400'
        }`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change24h).toFixed(2)}%
        </span>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="text-3xl font-bold">{formatPrice(price)}</div>
      </div>

      {/* Stats */}
      {(showMarketCap || showVolume) && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {showMarketCap && (
            <div className={`rounded-lg p-3 ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
              <div className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Market Cap</div>
              <div className="font-semibold">{formatLargeNumber(marketCap)}</div>
            </div>
          )}
          {showVolume && (
            <div className={`rounded-lg p-3 ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
              <div className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>24h Volume</div>
              <div className="font-semibold">{formatLargeNumber(volume)}</div>
            </div>
          )}
        </div>
      )}

      {/* Exchange CTA */}
      {exchange && (
        <div className={`rounded-lg p-3 text-center ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
          <a href="#" className="text-blue-500 font-medium hover:underline">
            Trade on {exchange} →
          </a>
        </div>
      )}

      {/* Footer */}
      <div className={`mt-4 pt-3 border-t flex justify-between text-xs ${isDark ? 'border-slate-700 text-slate-500' : 'border-gray-100 text-gray-400'}`}>
        <span>Data by CoinGecko</span>
        <span>Updated {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
