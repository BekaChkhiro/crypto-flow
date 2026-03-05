/**
 * Static data for SEO pages
 * This data drives the programmatic SEO page generation
 */

export interface Exchange {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  founded: number;
  headquarters: string;
  tradingPairs: number;
  dailyVolume: string;
  fees: string;
  rating: number;
  features: string[];
  supportedCoins: string[];
  pros: string[];
  cons: string[];
  website: string;
  logo: string;
}

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  description: string;
  category: string;
  consensus: string;
  launchYear: number;
  exchanges: string[];
}

export const exchanges: Exchange[] = [
  {
    id: 'binance',
    name: 'Binance',
    description: "World's largest cryptocurrency exchange by trading volume",
    longDescription: "Binance is the world's largest cryptocurrency exchange by trading volume, offering a comprehensive platform for trading digital assets. Founded by Changpeng Zhao (CZ), Binance has grown to become the dominant force in crypto trading, processing billions of dollars in transactions daily.",
    founded: 2017,
    headquarters: 'Cayman Islands',
    tradingPairs: 1500,
    dailyVolume: '$76B',
    fees: '0.1%',
    rating: 4.8,
    features: ['Spot Trading', 'Futures Trading', 'Margin Trading', 'Staking', 'NFT Marketplace', 'Launchpad', 'P2P Trading'],
    supportedCoins: ['bitcoin', 'ethereum', 'solana', 'cardano', 'polkadot'],
    pros: ['Lowest trading fees', 'Highest liquidity', 'Wide selection of coins', 'Advanced trading features'],
    cons: ['Regulatory concerns in some countries', 'Complex interface for beginners'],
    website: 'https://binance.com',
    logo: '/exchanges/binance.svg',
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    description: 'Most trusted cryptocurrency exchange in the United States',
    longDescription: 'Coinbase is a publicly traded cryptocurrency exchange headquartered in San Francisco. As one of the most regulated exchanges, it offers a secure and user-friendly platform for buying, selling, and storing cryptocurrencies.',
    founded: 2012,
    headquarters: 'San Francisco, USA',
    tradingPairs: 500,
    dailyVolume: '$4.2B',
    fees: '0.5%',
    rating: 4.5,
    features: ['Spot Trading', 'Staking', 'Coinbase Card', 'Coinbase Pro', 'Institutional Services', 'Learn & Earn'],
    supportedCoins: ['bitcoin', 'ethereum', 'solana', 'cardano'],
    pros: ['US regulated & insured', 'Beginner-friendly', 'Strong security', 'Educational resources'],
    cons: ['Higher fees than competitors', 'Limited altcoin selection'],
    website: 'https://coinbase.com',
    logo: '/exchanges/coinbase.svg',
  },
  {
    id: 'kraken',
    name: 'Kraken',
    description: 'Secure cryptocurrency exchange founded in 2011',
    longDescription: 'Kraken is one of the oldest cryptocurrency exchanges, known for its robust security measures and professional trading features. It offers a wide range of cryptocurrencies and fiat currency pairs.',
    founded: 2011,
    headquarters: 'San Francisco, USA',
    tradingPairs: 700,
    dailyVolume: '$1.8B',
    fees: '0.16%',
    rating: 4.6,
    features: ['Spot Trading', 'Futures Trading', 'Margin Trading', 'Staking', 'OTC Desk'],
    supportedCoins: ['bitcoin', 'ethereum', 'solana', 'polkadot'],
    pros: ['Excellent security record', 'Competitive fees', 'Good for advanced traders'],
    cons: ['Interface can be complex', 'Slower verification process'],
    website: 'https://kraken.com',
    logo: '/exchanges/kraken.svg',
  },
  {
    id: 'kucoin',
    name: 'KuCoin',
    description: 'Popular exchange known for listing new altcoins early',
    longDescription: 'KuCoin is a global cryptocurrency exchange known for its extensive selection of altcoins and new token listings. It offers various trading options and has built a strong community following.',
    founded: 2017,
    headquarters: 'Seychelles',
    tradingPairs: 1200,
    dailyVolume: '$2.1B',
    fees: '0.1%',
    rating: 4.4,
    features: ['Spot Trading', 'Futures Trading', 'Margin Trading', 'Trading Bots', 'Lending'],
    supportedCoins: ['bitcoin', 'ethereum', 'solana', 'cardano', 'polkadot'],
    pros: ['Early access to new coins', 'Low fees', 'Trading bots included'],
    cons: ['Not available in US', 'Some regulatory uncertainty'],
    website: 'https://kucoin.com',
    logo: '/exchanges/kucoin.svg',
  },
];

export const coins: Coin[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    description: 'The first and most valuable cryptocurrency, created by Satoshi Nakamoto in 2009. Bitcoin is a decentralized digital currency that operates without a central authority.',
    category: 'Store of Value',
    consensus: 'Proof of Work',
    launchYear: 2009,
    exchanges: ['binance', 'coinbase', 'kraken', 'kucoin'],
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    description: 'The leading smart contract platform powering DeFi, NFTs, and thousands of decentralized applications. Created by Vitalik Buterin.',
    category: 'Smart Contract Platform',
    consensus: 'Proof of Stake',
    launchYear: 2015,
    exchanges: ['binance', 'coinbase', 'kraken', 'kucoin'],
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    description: 'High-performance blockchain known for fast transactions and low fees. Popular for DeFi and NFT applications.',
    category: 'Smart Contract Platform',
    consensus: 'Proof of History',
    launchYear: 2020,
    exchanges: ['binance', 'coinbase', 'kraken', 'kucoin'],
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    description: 'Research-driven blockchain platform focused on sustainability and scalability. Founded by Ethereum co-founder Charles Hoskinson.',
    category: 'Smart Contract Platform',
    consensus: 'Proof of Stake',
    launchYear: 2017,
    exchanges: ['binance', 'coinbase', 'kucoin'],
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    description: 'Multi-chain protocol enabling different blockchains to connect and communicate. Created by Ethereum co-founder Gavin Wood.',
    category: 'Interoperability',
    consensus: 'Nominated Proof of Stake',
    launchYear: 2020,
    exchanges: ['binance', 'kraken', 'kucoin'],
  },
];

export const tradingPairs = [
  { base: 'bitcoin', quote: 'usdt', baseSymbol: 'BTC', quoteSymbol: 'USDT' },
  { base: 'ethereum', quote: 'usdt', baseSymbol: 'ETH', quoteSymbol: 'USDT' },
  { base: 'bitcoin', quote: 'ethereum', baseSymbol: 'BTC', quoteSymbol: 'ETH' },
  { base: 'solana', quote: 'usdt', baseSymbol: 'SOL', quoteSymbol: 'USDT' },
  { base: 'cardano', quote: 'usdt', baseSymbol: 'ADA', quoteSymbol: 'USDT' },
];

export function getExchangeById(id: string): Exchange | undefined {
  return exchanges.find(e => e.id === id);
}

export function getCoinById(id: string): Coin | undefined {
  return coins.find(c => c.id === id);
}

export function getExchangesForCoin(coinId: string): Exchange[] {
  const coin = getCoinById(coinId);
  if (!coin) return [];
  return exchanges.filter(e => coin.exchanges.includes(e.id));
}

export function getCoinsForExchange(exchangeId: string): Coin[] {
  const exchange = getExchangeById(exchangeId);
  if (!exchange) return [];
  return coins.filter(c => exchange.supportedCoins.includes(c.id));
}
