import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            CryptoHub
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/exchanges" className="text-slate-300 hover:text-white transition">
              Exchanges
            </Link>
            <Link href="/coins" className="text-slate-300 hover:text-white transition">
              Cryptocurrencies
            </Link>
            <Link href="/widget" className="text-slate-300 hover:text-white transition">
              Widget
            </Link>
            <Link href="/api-demo" className="text-slate-300 hover:text-white transition">
              API Demo
            </Link>
          </nav>

          <Link
            href="/widget"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            Get Widget
          </Link>
        </div>
      </div>
    </header>
  );
}
