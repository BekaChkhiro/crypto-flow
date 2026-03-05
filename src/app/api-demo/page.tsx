'use client';

import { useState, useEffect } from 'react';
import { formatPrice, formatLargeNumber, type MarketCoin } from '@/lib/coingecko';

export default function ApiDemoPage() {
  const [markets, setMarkets] = useState<MarketCoin[]>([]);
  const [globalStats, setGlobalStats] = useState<{
    active_cryptocurrencies: number;
    markets: number;
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number; eth: number };
  } | null>(null);
  const [trending, setTrending] = useState<Array<{
    item: { id: string; name: string; symbol: string; thumb: string; market_cap_rank: number };
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'markets' | 'global' | 'trending'>('markets');

  useEffect(() => {
    async function fetchData() {
      try {
        // Use internal API routes
        const [marketsRes, globalRes, trendingRes] = await Promise.all([
          fetch('/api/markets?per_page=20'),
          fetch('/api/global'),
          fetch('/api/trending'),
        ]);

        const [marketsData, globalData, trendingData] = await Promise.all([
          marketsRes.json(),
          globalRes.json(),
          trendingRes.json(),
        ]);

        setMarkets(marketsData);
        setGlobalStats(globalData.data);
        setTrending(trendingData.coins || []);
      } catch (error) {
        console.error('Failed to fetch API data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">
          API Integration Demo
        </span>
        <h1 className="text-4xl font-bold mb-4">CoinGecko API Integration</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Live demonstration of CoinGecko API integration. All data fetched in real-time
          with caching and error handling.
        </p>
      </div>

      {/* API Status */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-slate-300">
              {loading ? 'Fetching data...' : 'API Connected'}
            </span>
          </div>
          <div className="text-slate-500 text-sm">
            Data Source: CoinGecko API (via Next.js API Routes)
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {[
          { id: 'markets', label: 'Market Data' },
          { id: 'global', label: 'Global Stats' },
          { id: 'trending', label: 'Trending' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
          <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" style={{ borderTopColor: '#3b82f6' }} />
          <p className="text-slate-400">Loading API data...</p>
        </div>
      ) : (
        <>
          {/* Markets Tab */}
          {activeTab === 'markets' && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-700">
                <h2 className="text-lg font-semibold">Top 20 Cryptocurrencies by Market Cap</h2>
                <p className="text-slate-400 text-sm">Real-time data from /api/markets endpoint</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-700/30">
                      <th className="px-4 py-3 text-left text-sm text-slate-400">#</th>
                      <th className="px-4 py-3 text-left text-sm text-slate-400">Coin</th>
                      <th className="px-4 py-3 text-right text-sm text-slate-400">Price</th>
                      <th className="px-4 py-3 text-right text-sm text-slate-400">24h</th>
                      <th className="px-4 py-3 text-right text-sm text-slate-400">Market Cap</th>
                      <th className="px-4 py-3 text-right text-sm text-slate-400">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {markets.map((coin) => (
                      <tr key={coin.id} className="border-t border-slate-700 hover:bg-slate-700/30">
                        <td className="px-4 py-3 text-slate-500">{coin.market_cap_rank}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <div className="font-medium text-white">{coin.name}</div>
                              <div className="text-slate-500 text-sm uppercase">{coin.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-white">
                          {formatPrice(coin.current_price)}
                        </td>
                        <td className={`px-4 py-3 text-right font-medium ${
                          coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </td>
                        <td className="px-4 py-3 text-right text-slate-300">
                          {formatLargeNumber(coin.market_cap)}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-400">
                          {formatLargeNumber(coin.total_volume)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Global Stats Tab */}
          {activeTab === 'global' && globalStats && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Market Cap', value: formatLargeNumber(globalStats.total_market_cap.usd) },
                  { label: '24h Volume', value: formatLargeNumber(globalStats.total_volume.usd) },
                  { label: 'Active Cryptocurrencies', value: globalStats.active_cryptocurrencies.toLocaleString() },
                  { label: 'Markets', value: globalStats.markets.toLocaleString() },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <div className="text-slate-400 text-sm mb-1">{stat.label}</div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Market Dominance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Bitcoin (BTC)</span>
                      <span className="text-white">{globalStats.market_cap_percentage.btc.toFixed(1)}%</span>
                    </div>
                    <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${globalStats.market_cap_percentage.btc}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Ethereum (ETH)</span>
                      <span className="text-white">{globalStats.market_cap_percentage.eth.toFixed(1)}%</span>
                    </div>
                    <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${globalStats.market_cap_percentage.eth}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="font-semibold mb-4">API Response Example</h3>
                <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto text-sm text-slate-300">
                  {JSON.stringify(globalStats, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Trending Tab */}
          {activeTab === 'trending' && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Trending Coins (24h)</h2>
                <p className="text-slate-400 text-sm">Most searched coins on CoinGecko</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trending.map((item, index) => (
                  <div
                    key={item.item.id}
                    className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl"
                  >
                    <div className="text-2xl font-bold text-slate-500">#{index + 1}</div>
                    <img src={item.item.thumb} alt={item.item.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="font-medium text-white">{item.item.name}</div>
                      <div className="text-slate-500 text-sm uppercase">{item.item.symbol}</div>
                    </div>
                    <div className="text-slate-400 text-sm">
                      Rank #{item.item.market_cap_rank}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Code Example */}
      <div className="mt-12 bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Integration Code</h2>
        <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto text-sm text-slate-300">
{`// Next.js API Route: /api/markets/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const perPage = searchParams.get('per_page') || '20';

  const response = await fetch(
    \`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=\${perPage}\`,
    { next: { revalidate: 60 } } // Cache for 60 seconds
  );

  const data = await response.json();
  return NextResponse.json(data);
}

// Client-side usage
const [markets, setMarkets] = useState([]);

useEffect(() => {
  fetch('/api/markets?per_page=20')
    .then(res => res.json())
    .then(setMarkets);
}, []);`}
        </pre>
      </div>
    </div>
  );
}
