import Link from 'next/link';
import { exchanges, coins } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-4">Exchanges</h4>
            <ul className="space-y-2">
              {exchanges.map(exchange => (
                <li key={exchange.id}>
                  <Link href={`/exchanges/${exchange.id}`} className="text-slate-400 hover:text-white transition text-sm">
                    {exchange.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Cryptocurrencies</h4>
            <ul className="space-y-2">
              {coins.map(coin => (
                <li key={coin.id}>
                  <Link href={`/coins/${coin.id}`} className="text-slate-400 hover:text-white transition text-sm">
                    {coin.name} ({coin.symbol})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/widget" className="text-slate-400 hover:text-white transition text-sm">Embed Widget</Link></li>
              <li><Link href="/api-demo" className="text-slate-400 hover:text-white transition text-sm">API Demo</Link></li>
              <li><Link href="/" className="text-slate-400 hover:text-white transition text-sm">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Trading Pairs</h4>
            <ul className="space-y-2">
              <li><Link href="/pairs/btc-usdt" className="text-slate-400 hover:text-white transition text-sm">BTC/USDT</Link></li>
              <li><Link href="/pairs/eth-usdt" className="text-slate-400 hover:text-white transition text-sm">ETH/USDT</Link></li>
              <li><Link href="/pairs/sol-usdt" className="text-slate-400 hover:text-white transition text-sm">SOL/USDT</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>© 2024 CryptoHub. All rights reserved. Data provided by CoinGecko.</p>
          <p className="mt-2">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
