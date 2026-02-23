'use client';

import CoinBadge from './CoinBadge';

export default function TopBar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
      style={{ background: 'linear-gradient(to bottom, #0F0A1A, rgba(15, 10, 26, 0.95))' }}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">🧞</span>
        <h1 className="text-lg font-bold gradient-text">
          {title || 'Genie'}
        </h1>
      </div>
      <CoinBadge />
    </header>
  );
}
