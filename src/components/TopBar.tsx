'use client';

import Link from 'next/link';
import CoinBadge from './CoinBadge';
import { useAuth } from '@/store/useAuth';
import { GenieLogo } from './BrandIcons';

export default function TopBar({ title }: { title?: string }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between border-b border-white/5 backdrop-blur-sm"
      style={{ background: 'linear-gradient(to bottom, #0F0A1A, rgba(15, 10, 26, 0.95))' }}>
      <div className="flex items-center gap-3">
        <GenieLogo size="sm" />
        <h1 className="text-lg font-bold gradient-text">
          {title || 'Genie'}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {user?.demo && (
          <Link
            href="/demo"
            className="text-[10px] uppercase tracking-wide bg-[#241B35] border border-[#7C3AED]/30 rounded-full px-2 py-1 text-[#A78BFA]"
          >
            {user.role}
          </Link>
        )}
        <CoinBadge />
      </div>
    </header>
  );
}
