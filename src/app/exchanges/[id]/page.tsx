import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { exchanges, getExchangeById, getCoinsForExchange } from '@/lib/data';
import CryptoWidget from '@/components/CryptoWidget';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return exchanges.map((exchange) => ({
    id: exchange.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const exchange = getExchangeById(id);
  if (!exchange) return { title: 'Exchange Not Found' };

  return {
    title: `${exchange.name} Review 2024 | Fees, Features & Trading Guide`,
    description: `${exchange.description}. Complete ${exchange.name} review with fees (${exchange.fees}), features, and trading guide.`,
    keywords: [exchange.name, `${exchange.name} review`, `${exchange.name} fees`, 'cryptocurrency exchange'],
  };
}

export default async function ExchangePage({ params }: Props) {
  const { id } = await params;
  const exchange = getExchangeById(id);

  if (!exchange) {
    notFound();
  }

  const supportedCoins = getCoinsForExchange(exchange.id);
  const otherExchanges = exchanges.filter(e => e.id !== exchange.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-white">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/exchanges" className="hover:text-white">Exchanges</Link>
        <span className="mx-2">›</span>
        <span className="text-white">{exchange.name}</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 mb-12">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold">{exchange.name} Exchange Review 2024</h1>
          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-lg">
            ★ {exchange.rating}/5
          </span>
        </div>
        <p className="text-xl text-slate-300 max-w-3xl">{exchange.longDescription}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: '24h Volume', value: exchange.dailyVolume },
          { label: 'Trading Pairs', value: `${exchange.tradingPairs}+` },
          { label: 'Trading Fee', value: exchange.fees },
          { label: 'Founded', value: exchange.founded },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Features */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <div className="flex flex-wrap gap-2">
              {exchange.features.map((feature, i) => (
                <span key={i} className="px-4 py-2 bg-slate-700 text-white rounded-lg">
                  {feature}
                </span>
              ))}
            </div>
          </section>

          {/* Pros & Cons */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">Pros</h3>
              <ul className="space-y-2">
                {exchange.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="text-emerald-400">✓</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-400 mb-4">Cons</h3>
              <ul className="space-y-2">
                {exchange.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="text-red-400">✗</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Supported Coins */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Supported Cryptocurrencies</h2>
            <p className="text-slate-400 mb-4">Trade these popular cryptocurrencies on {exchange.name}:</p>
            <div className="space-y-2">
              {supportedCoins.map(coin => (
                <Link key={coin.id} href={`/coins/${coin.id}`}>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition">
                    <div>
                      <span className="font-medium text-white">{coin.name}</span>
                      <span className="text-slate-400 ml-2">({coin.symbol})</span>
                    </div>
                    <span className="text-blue-400">View →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Widget */}
          <section className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Live Price Widget</h2>
            <p className="text-slate-400 mb-4">Embed this widget on your website:</p>
            <CryptoWidget coin="bitcoin" theme="dark" exchange={exchange.name} />
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Quick Facts</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">Founded</td>
                  <td className="py-2 text-white text-right">{exchange.founded}</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">Headquarters</td>
                  <td className="py-2 text-white text-right">{exchange.headquarters}</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">Trading Fee</td>
                  <td className="py-2 text-white text-right">{exchange.fees}</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-400">Rating</td>
                  <td className="py-2 text-amber-400 text-right">★ {exchange.rating}/5</td>
                </tr>
              </tbody>
            </table>

            <a
              href={exchange.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center rounded-lg font-medium hover:opacity-90 transition"
            >
              Visit {exchange.name} →
            </a>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Compare Exchanges</h3>
            <div className="space-y-2">
              {otherExchanges.map(ex => (
                <Link key={ex.id} href={`/exchanges/${ex.id}`}>
                  <div className="flex items-center justify-between p-2 hover:bg-slate-700 rounded-lg transition">
                    <span className="text-slate-300">{ex.name}</span>
                    <span className="text-slate-500">→</span>
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
            '@type': 'Organization',
            name: exchange.name,
            description: exchange.description,
            foundingDate: exchange.founded,
            url: exchange.website,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: exchange.rating,
              bestRating: 5,
              worstRating: 1,
            },
          }),
        }}
      />
    </div>
  );
}
