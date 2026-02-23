'use client';

import type { LucideIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';

type Size = 'sm' | 'md' | 'lg';

const sizeMap: Record<Size, string> = {
  sm: 'h-8 w-8',
  md: 'h-11 w-11',
  lg: 'h-16 w-16',
};

const iconMap: Record<Size, number> = {
  sm: 16,
  md: 20,
  lg: 28,
};

export function GenieLogo({ size = 'md', className = '' }: { size?: Size; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#F59E0B] shadow-[0_8px_30px_rgba(124,58,237,0.35)] ${sizeMap[size]} ${className}`}
    >
      <Sparkles size={iconMap[size]} className="text-white" strokeWidth={2.4} />
    </span>
  );
}

export function IconChip({
  icon: Icon,
  size = 'md',
  tone = 'purple',
  className = '',
}: {
  icon: LucideIcon;
  size?: Size;
  tone?: 'purple' | 'gold' | 'green' | 'red' | 'slate';
  className?: string;
}) {
  const toneMap: Record<string, string> = {
    purple: 'bg-[#7C3AED]/18 text-[#C4B5FD] border-[#7C3AED]/35',
    gold: 'bg-[#F59E0B]/16 text-[#FCD34D] border-[#F59E0B]/35',
    green: 'bg-green-500/14 text-green-300 border-green-500/35',
    red: 'bg-red-500/14 text-red-300 border-red-500/35',
    slate: 'bg-[#241B35] text-slate-200 border-white/10',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl border ${sizeMap[size]} ${toneMap[tone]} ${className}`}
    >
      <Icon size={iconMap[size]} strokeWidth={2.2} />
    </span>
  );
}
