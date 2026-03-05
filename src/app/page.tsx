import Link from 'next/link';
import { exchanges } from '@/lib/data';
import PricesSection from '@/components/PricesSection';
import CryptoWidget from '@/components/CryptoWidget';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-600/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-6">
              AI-Assisted Development Demo
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              Programmatic SEO Platform
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              AI-generated SEO pages, embeddable crypto widgets, and live API integrations.
              Built with Next.js, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/widget"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                See Widget Demo
              </Link>
              <Link
                href="/exchanges"
                className="px-8 py-3 border border-slate-600 text-white rounded-lg font-semibold hover:bg-slate-800 transition"
              >
                Browse Pages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'SEO Pages Capacity' },
              { value: '4', label: 'Page Types' },
              { value: '5', label: 'API Integrations' },
              { value: '1', label: 'Embeddable Widget' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Prices */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Live Cryptocurrency Prices</h2>
          <PricesSection />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '📄',
                title: 'AI-Generated SEO Pages',
                description: 'Template-based page generation with proper meta tags, structured data, and internal linking.',
              },
              {
                icon: '🔗',
                title: 'Smart Internal Linking',
                description: 'Automatic link structure connecting exchanges, coins, and trading pairs for better SEO.',
              },
              {
                icon: '🧩',
                title: 'Embeddable Widget',
                description: 'Configurable JavaScript widget with data attributes. Display live crypto prices anywhere.',
              },
              {
                icon: '🔌',
                title: 'API Integrations',
                description: 'CoinGecko for live data, BestChange parsing, ready for custom internal APIs.',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Widget Demo */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Embeddable Crypto Widget</h2>
              <p className="text-slate-300 mb-6">
                Add live cryptocurrency prices to any website with a simple HTML snippet.
                Fully configurable through data attributes.
              </p>

              <div className="bg-slate-950 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-slate-300">
                  <span className="text-slate-500">{'<!-- Add widget container -->'}</span>{'\n'}
                  <span className="text-blue-400">{'<div'}</span>{'\n'}
                  {'  '}<span className="text-cyan-400">data-widget</span>=<span className="text-amber-400">&quot;crypto-price&quot;</span>{'\n'}
                  {'  '}<span className="text-cyan-400">data-coin</span>=<span className="text-amber-400">&quot;bitcoin&quot;</span>{'\n'}
                  {'  '}<span className="text-cyan-400">data-theme</span>=<span className="text-amber-400">&quot;dark&quot;</span>{'\n'}
                  {'  '}<span className="text-cyan-400">data-exchange</span>=<span className="text-amber-400">&quot;Binance&quot;</span><span className="text-blue-400">{'>'}</span>{'\n'}
                  <span className="text-blue-400">{'</div>'}</span>{'\n\n'}
                  <span className="text-slate-500">{'<!-- Include script -->'}</span>{'\n'}
                  <span className="text-blue-400">{'<script'}</span> <span className="text-cyan-400">src</span>=<span className="text-amber-400">&quot;https://crypto-flow-delta.vercel.app/widget.js&quot;</span><span className="text-blue-400">{'></script>'}</span>
                </pre>
              </div>

              <Link
                href="/widget"
                className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
              >
                View Full Widget Demo →
              </Link>
            </div>

            <div className="space-y-4">
              <CryptoWidget coin="bitcoin" theme="dark" exchange="Binance" />
              <CryptoWidget coin="ethereum" theme="light" />
            </div>
          </div>
        </div>
      </section>

      {/* Exchanges */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Top Exchanges</h2>
            <Link href="/exchanges" className="text-blue-400 hover:text-blue-300">
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exchanges.map(exchange => (
              <Link key={exchange.id} href={`/exchanges/${exchange.id}`}>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition h-full">
                  <h3 className="text-xl font-semibold text-white mb-2">{exchange.name}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{exchange.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Volume: {exchange.dailyVolume}</span>
                    <span className="text-amber-400">★ {exchange.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-10">Technology Stack</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              'Next.js 16',
              'TypeScript',
              'Tailwind CSS',
              'React Server Components',
              'CoinGecko API',
              'BestChange Parser',
              'SEO Optimized',
              'JSON-LD Schema',
            ].map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
