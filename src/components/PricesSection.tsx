'use client';

import { coins } from '@/lib/data';
import PriceCard from '@/components/PriceCard';
import { PriceProvider } from '@/components/PriceProvider';

export default function PricesSection() {
  return (
    <PriceProvider coins={coins.map(c => c.id)}>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {coins.map(coin => (
          <PriceCard key={coin.id} coinId={coin.id} name={coin.name} symbol={coin.symbol} />
        ))}
      </div>
    </PriceProvider>
  );
}
