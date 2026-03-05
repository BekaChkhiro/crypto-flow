import Link from 'next/link';
import { Metadata } from 'next';
import { coins } from '@/lib/data';
import PriceCard from '@/components/PriceCard';

export const metadata: Metadata = {
  title: 'Cryptocurrency Prices | Live Bitcoin, Ethereum & Altcoin Data',
  description: 'Track live cryptocurrency prices. Get real-time data for Bitcoin, Ethereum, Solana, and more popular cryptocurrencies.',
  keywords: ['cryptocurrency prices', 'bitcoin price', 'ethereum price', 'crypto market'],
};

export default function CoinsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-white">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-white">Cryptocurrencies</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Cryptocurrency Prices</h1>
        <p className="text-slate-300 text-lg max-w-3xl">
          Track live prices, market caps, and trading volumes for popular cryptocurrencies.
          Click on any coin for detailed information and where to buy.
        </p>
      </div>

      {/* Price Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {coins.map(coin => (
          <div key={coin.id}>
            <PriceCard coinId={coin.id} name={coin.name} symbol={coin.symbol} />
            <Link href={`/coins/${coin.id}`}>
              <div className="mt-2 text-center text-blue-400 hover:text-blue-300 text-sm">
                View Details →
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Coins Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-700/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Coin</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Symbol</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Consensus</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Launched</th>
            </tr>
          </thead>
          <tbody>
            {coins.map(coin => (
              <tr key={coin.id} className="border-t border-slate-700 hover:bg-slate-700/30">
                <td className="px-6 py-4">
                  <Link href={`/coins/${coin.id}`} className="text-white font-medium hover:text-blue-400">
                    {coin.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-slate-400">{coin.symbol}</td>
                <td className="px-6 py-4 text-slate-400">{coin.category}</td>
                <td className="px-6 py-4 text-slate-400">{coin.consensus}</td>
                <td className="px-6 py-4 text-slate-400">{coin.launchYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SEO Content */}
      <section className="mt-16 prose prose-invert max-w-none">
        <h2>Understanding Cryptocurrency Markets</h2>
        <p>
          Cryptocurrency markets operate 24/7, unlike traditional stock markets.
          Prices are determined by supply and demand across numerous exchanges worldwide.
        </p>

        <h3>Market Capitalization</h3>
        <p>
          Market cap is calculated by multiplying the current price by the circulating supply.
          It&apos;s a key metric for comparing the relative size of different cryptocurrencies.
        </p>

        <h3>Trading Volume</h3>
        <p>
          24-hour trading volume shows how much of a cryptocurrency has been traded in the last day.
          Higher volume generally indicates more liquidity and market interest.
        </p>
      </section>
    </div>
  );
}
