'use client';

import { useAuth } from '@/store/useAuth';
import { Coins } from 'lucide-react';

export default function CoinBadge() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-2 bg-[#241B35] border border-[#7C3AED]/30 rounded-full px-3 py-1.5">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#F59E0B]/20 text-[#FCD34D]">
        <Coins size={14} />
      </span>
      <span className="text-sm font-bold text-[#FCD34D]">
        {user?.coins?.toLocaleString() ?? 0}
      </span>
    </div>
  );
}
