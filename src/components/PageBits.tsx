'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { IconChip } from './BrandIcons';

type Tone = 'purple' | 'gold' | 'green' | 'red' | 'slate';

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function PageWrap({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('max-w-lg mx-auto space-y-6 py-4', className)}>{children}</div>;
}

export function SectionCard({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cx('genie-card p-5', className)}>{children}</section>;
}

export function PageHero({
  title,
  subtitle,
  icon,
  tone = 'purple',
}: {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  tone?: Tone;
}) {
  return (
    <SectionCard className="bg-gradient-to-r from-[#7C3AED]/10 to-transparent">
      <div className="flex items-center gap-2 mb-2">
        {icon ? <IconChip icon={icon} size="sm" tone={tone} /> : null}
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </SectionCard>
  );
}

export function SectionTitle({
  title,
  subtitle,
  icon,
  tone = 'purple',
}: {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  tone?: Tone;
}) {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2">
        {icon ? <IconChip icon={icon} size="sm" tone={tone} /> : null}
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      {subtitle ? <p className="text-sm text-gray-400 mt-1">{subtitle}</p> : null}
    </div>
  );
}

export function InfoBanner({
  children,
  tone = 'purple',
}: {
  children: ReactNode;
  tone?: 'purple' | 'green' | 'amber' | 'red';
}) {
  const toneClass =
    tone === 'green'
      ? 'bg-green-500/10 border border-green-500/30 text-green-400'
      : tone === 'amber'
      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
      : tone === 'red'
      ? 'bg-red-500/10 border border-red-500/30 text-red-400'
      : 'bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[#C4B5FD]';

  return <div className={cx('rounded-xl p-3 text-sm text-center', toneClass)}>{children}</div>;
}

export function StatTile({
  label,
  value,
  icon,
  tone = 'slate',
}: {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  tone?: Tone;
}) {
  return (
    <div className="genie-card p-4 text-center">
      {icon ? (
        <div className="mb-2 flex justify-center">
          <IconChip icon={icon} size="sm" tone={tone} />
        </div>
      ) : null}
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}

export function ActionTile({
  href,
  title,
  subtitle,
  gold,
}: {
  href: string;
  title: string;
  subtitle?: string;
  gold?: boolean;
}) {
  return (
    <Link href={href} className={cx('genie-btn text-center py-4 block', gold && 'genie-btn-gold')}>
      <div className="text-sm font-semibold">{title}</div>
      {subtitle ? <div className="text-xs opacity-80 mt-0.5">{subtitle}</div> : null}
    </Link>
  );
}

export function StatusPill({
  text,
  tone = 'purple',
}: {
  text: string;
  tone?: 'purple' | 'green' | 'amber' | 'red' | 'gray';
}) {
  const toneClass =
    tone === 'green'
      ? 'bg-green-500/10 text-green-400 border-green-500/30'
      : tone === 'amber'
      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
      : tone === 'red'
      ? 'bg-red-500/10 text-red-400 border-red-500/30'
      : tone === 'gray'
      ? 'bg-white/5 text-gray-300 border-white/10'
      : 'bg-[#241B35] text-[#A78BFA] border-[#7C3AED]/20';

  return <span className={cx('text-xs border px-2.5 py-1 rounded-full', toneClass)}>{text}</span>;
}

export function EmptyState({
  icon,
  title,
  subtitle,
}: {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
}) {
  return (
    <SectionCard className="p-6 text-center">
      {icon ? (
        <div className="mb-3 flex justify-center">
          <IconChip icon={icon} size="lg" tone="slate" />
        </div>
      ) : null}
      <p className="text-sm text-white font-medium">{title}</p>
      {subtitle ? <p className="text-xs text-gray-400 mt-1">{subtitle}</p> : null}
    </SectionCard>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="block text-sm font-medium text-gray-300 mb-1.5">{children}</label>;
}

export function FieldInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cx(
        'w-full bg-[#1A1128] border border-[#7C3AED]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED]/60 transition-colors',
        props.className
      )}
    />
  );
}

export function FieldTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cx(
        'w-full bg-[#1A1128] border border-[#7C3AED]/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED]/60 transition-colors',
        props.className
      )}
    />
  );
}

