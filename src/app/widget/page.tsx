import { Metadata } from 'next';
import CryptoWidget from '@/components/CryptoWidget';

export const metadata: Metadata = {
  title: 'Embeddable Crypto Widget | Add Live Prices to Your Website',
  description: 'Free embeddable cryptocurrency widget. Display live Bitcoin, Ethereum prices on your website with a simple HTML snippet.',
  keywords: ['crypto widget', 'bitcoin widget', 'cryptocurrency widget', 'embed crypto prices'],
};

export default function WidgetPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
          Free Widget
        </span>
        <h1 className="text-4xl font-bold mb-4">Embeddable Crypto Widget</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Add live cryptocurrency prices to any website with a simple HTML snippet.
          Fully configurable through data attributes.
        </p>
      </div>

      {/* Live Demo Section */}
      <div className="bg-slate-800/50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Live Widget Examples</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dark Theme Bitcoin */}
          <div>
            <div className="text-sm text-slate-400 mb-2">Dark Theme + Exchange</div>
            <CryptoWidget coin="bitcoin" theme="dark" exchange="Binance" />
          </div>

          {/* Light Theme Ethereum */}
          <div>
            <div className="text-sm text-slate-400 mb-2">Light Theme</div>
            <CryptoWidget coin="ethereum" theme="light" />
          </div>

          {/* Minimal */}
          <div>
            <div className="text-sm text-slate-400 mb-2">Minimal (no stats)</div>
            <CryptoWidget coin="solana" theme="dark" showVolume={false} showMarketCap={false} />
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <p className="text-slate-300 mb-6">
            Copy and paste this code into your HTML file to display a Bitcoin price widget:
          </p>

          <div className="bg-slate-950 rounded-xl p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-slate-300 whitespace-pre-wrap">
{`<!-- Widget Container -->
<div
  data-widget="crypto-exchange"
  data-coin="bitcoin"
  data-currency="usd"
  data-theme="dark"
  data-exchange="Binance">
</div>

<!-- Include Script (before </body>) -->
<script src="https://your-domain.com/widget.js"></script>`}
            </pre>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Configuration Options</h2>

          <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-700/50">
                  <th className="px-4 py-3 text-left text-slate-300">Attribute</th>
                  <th className="px-4 py-3 text-left text-slate-300">Values</th>
                  <th className="px-4 py-3 text-left text-slate-300">Default</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { attr: 'data-coin', values: 'bitcoin, ethereum, solana...', def: 'bitcoin' },
                  { attr: 'data-currency', values: 'usd, eur, gbp', def: 'usd' },
                  { attr: 'data-theme', values: 'light, dark', def: 'dark' },
                  { attr: 'data-exchange', values: 'Any exchange name', def: 'none' },
                  { attr: 'data-show-volume', values: 'true, false', def: 'true' },
                  { attr: 'data-show-market-cap', values: 'true, false', def: 'true' },
                  { attr: 'data-refresh-interval', values: 'milliseconds', def: '60000' },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-slate-700">
                    <td className="px-4 py-3 font-mono text-cyan-400">{row.attr}</td>
                    <td className="px-4 py-3 text-slate-400">{row.values}</td>
                    <td className="px-4 py-3 text-slate-500">{row.def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* More Examples */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">More Examples</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Example 1 */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="font-semibold mb-3">Multiple Coins</h3>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs mb-4 overflow-x-auto">
              <pre className="text-slate-300 whitespace-pre-wrap">
{`<div data-widget="crypto-exchange" data-coin="bitcoin"></div>
<div data-widget="crypto-exchange" data-coin="ethereum"></div>
<div data-widget="crypto-exchange" data-coin="solana"></div>`}
              </pre>
            </div>
            <div className="space-y-3">
              <CryptoWidget coin="bitcoin" theme="dark" showVolume={false} showMarketCap={false} />
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="font-semibold mb-3">Light Theme for White Backgrounds</h3>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs mb-4 overflow-x-auto">
              <pre className="text-slate-300 whitespace-pre-wrap">
{`<div
  data-widget="crypto-exchange"
  data-coin="ethereum"
  data-theme="light">
</div>`}
              </pre>
            </div>
            <div className="bg-white rounded-lg p-4">
              <CryptoWidget coin="ethereum" theme="light" />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: '⚡',
            title: 'Real-time Data',
            description: 'Prices update automatically every minute using the CoinGecko API.',
          },
          {
            icon: '🎨',
            title: 'Customizable',
            description: 'Light/dark themes, show/hide stats, custom exchange branding.',
          },
          {
            icon: '📱',
            title: 'Responsive',
            description: 'Looks great on desktop, tablet, and mobile devices.',
          },
        ].map((feature, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
