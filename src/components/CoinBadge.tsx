'use client';

import { useAuth } from '@/store/useAuth';

export default function CoinBadge() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-1.5 bg-[#241B35] border border-[#7C3AED]/30 rounded-full px-3 py-1.5">
      <span className="text-lg">🪙</span>
      <span className="text-sm font-bold text-[#FCD34D]">
        {user?.coins?.toLocaleString() ?? 0}
      </span>
    </div>
  );
}
