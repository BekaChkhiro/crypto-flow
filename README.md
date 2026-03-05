# CryptoFlow

Programmatic SEO platform with embeddable cryptocurrency widgets and live API integrations.

## Features

- **SEO-Optimized Pages** - Dynamic pages for exchanges and cryptocurrencies with proper meta tags and JSON-LD
- **Embeddable Widget** - Standalone vanilla JS widget that works on any website
- **Live Data** - Real-time cryptocurrency prices via CoinGecko API
- **Modern Stack** - Next.js 16, TypeScript, Tailwind CSS

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Widget Usage

Embed the widget on any website:

```html
<div
  data-widget="crypto-price"
  data-coin="bitcoin"
  data-theme="dark">
</div>
<script src="https://your-domain.vercel.app/widget.js"></script>
```

### Widget Options

| Attribute | Values | Default |
|-----------|--------|---------|
| `data-coin` | bitcoin, ethereum, solana... | bitcoin |
| `data-theme` | dark, light | dark |
| `data-currency` | usd, eur, gbp | usd |
| `data-exchange` | Binance, Coinbase... | none |
| `data-show-volume` | true, false | true |
| `data-show-market-cap` | true, false | true |

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes (CoinGecko proxy)
│   ├── coins/        # Cryptocurrency pages
│   ├── exchanges/    # Exchange pages
│   └── widget/       # Widget demo page
├── components/       # React components
├── lib/              # Utilities and data
public/
├── widget.js         # Standalone embeddable widget
└── widget-test.html  # Widget integration demo
```

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- CoinGecko API

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BekaChkhiro/crypto-flow)
