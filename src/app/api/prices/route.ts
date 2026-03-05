import { NextResponse } from 'next/server';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Cache the prices in memory
let cachedPrices: Record<string, unknown> | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60000; // 1 minute

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids') || 'bitcoin,ethereum,solana,cardano,polkadot';

    // Check cache
    const now = Date.now();
    if (cachedPrices && now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json(cachedPrices, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      });
    }

    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      // If rate limited, return cached data if available
      if (response.status === 429 && cachedPrices) {
        return NextResponse.json(cachedPrices, {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          },
        });
      }
      throw new Error(`CoinGecko API Error: ${response.status}`);
    }

    const data = await response.json();

    // Update cache
    cachedPrices = data;
    cacheTimestamp = now;

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('API Error:', error);

    // Return cached data on error if available
    if (cachedPrices) {
      return NextResponse.json(cachedPrices, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      });
    }

    return NextResponse.json(
      { error: 'Failed to fetch price data' },
      { status: 500 }
    );
  }
}
