/**
 * CoinGecko API Integration
 * Professional wrapper with caching and error handling
 */

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export interface CoinPrice {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
    usd_market_cap: number;
    usd_24h_vol: number;
  };
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: { [key: string]: number };
    market_cap: { [key: string]: number };
    total_volume: { [key: string]: number };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number | null;
  };
  description: { en: string };
  links: {
    homepage: string[];
    blockchain_site: string[];
  };
}

export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: { price: number[] };
}

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60000; // 1 minute

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

async function fetchApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryString = new URLSearchParams(params).toString();
  const url = `${COINGECKO_API}${endpoint}${queryString ? '?' + queryString : ''}`;
  const cacheKey = url;

  const cached = getCached<T>(cacheKey);
  if (cached) return cached;

  const response = await fetch(url, {
    next: { revalidate: 60 }, // Next.js cache
  });

  if (!response.ok) {
    throw new Error(`CoinGecko API Error: ${response.status}`);
  }

  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

export async function getCoinPrice(coinIds: string | string[]): Promise<CoinPrice> {
  const ids = Array.isArray(coinIds) ? coinIds.join(',') : coinIds;
  return fetchApi('/simple/price', {
    ids,
    vs_currencies: 'usd',
    include_24hr_change: 'true',
    include_market_cap: 'true',
    include_24hr_vol: 'true',
  });
}

export async function getCoinData(coinId: string): Promise<CoinData> {
  return fetchApi(`/coins/${coinId}`, {
    localization: 'false',
    tickers: 'false',
    community_data: 'false',
    developer_data: 'false',
  });
}

export async function getMarkets(options: {
  perPage?: number;
  page?: number;
  sparkline?: boolean;
} = {}): Promise<MarketCoin[]> {
  return fetchApi('/coins/markets', {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: String(options.perPage || 100),
    page: String(options.page || 1),
    sparkline: String(options.sparkline || false),
  });
}

export async function getTrending(): Promise<{
  coins: Array<{ item: { id: string; name: string; symbol: string; thumb: string; market_cap_rank: number } }>;
}> {
  return fetchApi('/search/trending');
}

export async function getGlobalStats(): Promise<{
  data: {
    active_cryptocurrencies: number;
    markets: number;
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number; eth: number };
  };
}> {
  return fetchApi('/global');
}

// Format helpers
export function formatPrice(price: number): string {
  if (price >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(price);
}

export function formatLargeNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}
