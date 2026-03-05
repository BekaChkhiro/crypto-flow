import Link from 'next/link';
import { Metadata } from 'next';
import { exchanges } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Best Cryptocurrency Exchanges 2024 | Compare & Review',
  description: 'Compare the top cryptocurrency exchanges. Detailed reviews of Binance, Coinbase, Kraken, KuCoin with fees, features, and supported coins.',
  keywords: ['cryptocurrency exchange', 'crypto exchange', 'best exchange', 'binance', 'coinbase'],
};

export default function ExchangesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-white">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-white">Exchanges</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Cryptocurrency Exchanges</h1>
        <p className="text-slate-300 text-lg max-w-3xl">
          Compare the best cryptocurrency exchanges. Find the right platform based on fees,
          features, security, and supported coins.
        </p>
      </div>

      {/* Exchange Cards */}
      <div className="space-y-6">
        {exchanges.map((exchange, index) => (
          <Link key={exchange.id} href={`/exchanges/${exchange.id}`}>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">{exchange.name}</h2>
                    <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-sm">
                      ★ {exchange.rating}
                    </span>
                  </div>
                  <p className="text-slate-300 mb-4">{exchange.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-slate-500 text-sm">Daily Volume</div>
                      <div className="text-white font-semibold">{exchange.dailyVolume}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-sm">Trading Pairs</div>
                      <div className="text-white font-semibold">{exchange.tradingPairs}+</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-sm">Trading Fee</div>
                      <div className="text-white font-semibold">{exchange.fees}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-sm">Founded</div>
                      <div className="text-white font-semibold">{exchange.founded}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exchange.features.slice(0, 4).map((feature, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                    {exchange.features.length > 4 && (
                      <span className="px-3 py-1 text-slate-400 text-sm">
                        +{exchange.features.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="hidden md:block">
                  <span className="text-blue-400 font-medium">View Details →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* SEO Content */}
      <section className="mt-16 prose prose-invert max-w-none">
        <h2>How to Choose a Cryptocurrency Exchange</h2>
        <p>
          Choosing the right cryptocurrency exchange is crucial for your trading success.
          Consider factors like security, fees, supported cryptocurrencies, and ease of use.
        </p>

        <h3>Security First</h3>
        <p>
          Look for exchanges with strong security measures including two-factor authentication,
          cold storage for funds, and insurance against hacks.
        </p>

        <h3>Compare Fees</h3>
        <p>
          Trading fees can significantly impact your profits. Most exchanges charge between
          0.1% to 0.5% per trade. Some offer discounts for using their native tokens.
        </p>
      </section>
    </div>
  );
}
