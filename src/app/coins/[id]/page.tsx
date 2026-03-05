import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { coins, getCoinById, getExchangesForCoin } from '@/lib/data';
import CryptoWidget from '@/components/CryptoWidget';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return coins.map((coin) => ({
    id: coin.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const coin = getCoinById(id);
  if (!coin) return { title: 'Coin Not Found' };

  return {
    title: `${coin.name} (${coin.symbol}) Price | Live Data & Where to Buy`,
    description: `${coin.description}. Live ${coin.name} price, market cap, and trading information.`,
    keywords: [coin.name, coin.symbol, `${coin.name} price`, `buy ${coin.symbol}`, 'cryptocurrency'],
  };
}

export default async function CoinPage({ params }: Props) {
  const { id } = await params;
  const coin = getCoinById(id);

  if (!coin) {
    notFound();
  }

  const supportedExchanges = getExchangesForCoin(coin.id);
  const otherCoins = coins.filter(c => c.id !== coin.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-white">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/coins" className="hover:text-white">Cryptocurrencies</Link>
        <span className="mx-2">›</span>
        <span className="text-white">{coin.name}</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold mb-2">
          {coin.name} <span className="text-slate-400">({coin.symbol})</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl">{coin.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Live Price Widget */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Live {coin.name} Price</h2>
            <CryptoWidget coin={coin.id} theme="dark" />
          </section>

          {/* About Section */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">About {coin.name}</h2>
            <p className="text-slate-300 mb-6">{coin.description}</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-slate-400 text-sm mb-1">Category</div>
                <div className="text-white font-medium">{coin.category}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-slate-400 text-sm mb-1">Consensus Mechanism</div>
                <div className="text-white font-medium">{coin.consensus}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-slate-400 text-sm mb-1">Symbol</div>
                <div className="text-white font-medium">{coin.symbol}</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="text-slate-400 text-sm mb-1">Launch Year</div>
                <div className="text-white font-medium">{coin.launchYear}</div>
              </div>
            </div>
          </section>

          {/* Where to Buy */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Where to Buy {coin.name}</h2>
            <p className="text-slate-400 mb-4">You can trade {coin.symbol} on these exchanges:</p>
            <div className="space-y-3">
              {supportedExchanges.map(exchange => (
                <Link key={exchange.id} href={`/exchanges/${exchange.id}`}>
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition">
                    <div>
                      <span className="font-medium text-white">{exchange.name}</span>
                      <span className="text-slate-400 ml-3 text-sm">Fee: {exchange.fees}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-amber-400 text-sm">★ {exchange.rating}</span>
                      <span className="text-blue-400">Trade →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Trading Pairs */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Popular {coin.symbol} Trading Pairs</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['USDT', 'USD', 'EUR', 'BTC'].map(quote => (
                <div key={quote} className="bg-slate-700/50 rounded-lg p-3 text-center">
                  <span className="text-white font-medium">{coin.symbol}/{quote}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Quick Info</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">Symbol</td>
                  <td className="py-2 text-white text-right">{coin.symbol}</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">Category</td>
                  <td className="py-2 text-white text-right">{coin.category}</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">Consensus</td>
                  <td className="py-2 text-white text-right">{coin.consensus}</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">Launched</td>
                  <td className="py-2 text-white text-right">{coin.launchYear}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Other Cryptocurrencies</h3>
            <div className="space-y-2">
              {otherCoins.map(c => (
                <Link key={c.id} href={`/coins/${c.id}`}>
                  <div className="flex items-center justify-between p-2 hover:bg-slate-700 rounded-lg transition">
                    <span className="text-slate-300">{c.name}</span>
                    <span className="text-slate-500">{c.symbol}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: coin.name,
            description: coin.description,
            category: 'Cryptocurrency',
          }),
        }}
      />
    </div>
  );
}
