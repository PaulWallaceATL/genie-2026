'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, Package, Shield, ShoppingBag, FlaskConical, CheckCircle2 } from 'lucide-react';
import { useAuth, type UserRole } from '@/store/useAuth';
import { IconChip } from '@/components/BrandIcons';
import { PageWrap, SectionCard } from '@/components/PageBits';

const demoCards: Array<{
  role: UserRole;
  title: string;
  subtitle: string;
  icon: typeof Eye;
  destination: string;
  perks: string[];
}> = [
  {
    role: 'guest',
    title: 'Guest',
    subtitle: 'Read-only storefront preview',
    icon: Eye,
    destination: '/dashboard',
    perks: ['Browse auctions', 'Preview pages', 'No purchases/bids'],
  },
  {
    role: 'buyer',
    title: 'Buyer',
    subtitle: 'Shop, watch ads, and bid',
    icon: ShoppingBag,
    destination: '/dashboard',
    perks: ['Spend coins', 'Watch ads', 'Join auctions'],
  },
  {
    role: 'seller',
    title: 'Seller',
    subtitle: 'Manage listings and payouts',
    icon: Package,
    destination: '/seller',
    perks: ['View listings', 'Create draft listing', 'Track payouts'],
  },
  {
    role: 'admin',
    title: 'Admin',
    subtitle: 'Moderation and operations',
    icon: Shield,
    destination: '/admin',
    perks: ['Review users', 'Audit auctions', 'System overview'],
  },
];

export default function DemoPage() {
  const router = useRouter();
  const { demoLogin } = useAuth();

  const enterDemo = (role: UserRole, destination: string) => {
    demoLogin(role);
    router.push(destination);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="mb-3 flex justify-center">
            <IconChip icon={FlaskConical} size="lg" tone="purple" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">Choose a Demo Account</h1>
          <p className="text-gray-400 mt-2">
            Click any role to jump into a full demo flow. No database setup required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {demoCards.map((card) => (
            <button
              key={card.role}
              onClick={() => enterDemo(card.role, card.destination)}
              className="genie-card p-5 text-left hover:border-[#A78BFA]/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <IconChip icon={card.icon} tone="slate" />
                <span className="text-xs uppercase tracking-wide text-[#A78BFA]">{card.role}</span>
              </div>
              <h2 className="text-lg font-bold text-white">{card.title}</h2>
              <p className="text-sm text-gray-400 mt-1 mb-3">{card.subtitle}</p>
              <ul className="space-y-1.5 text-xs text-gray-400">
                {card.perks.map((perk) => (
                  <li key={perk} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-[#A78BFA]" />
                    {perk}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <PageWrap className="max-w-2xl mt-6">
          <SectionCard className="p-4">
            <p className="text-xs sm:text-sm text-gray-300 text-center">
              Demo mode simulates full app behavior for each role. Buyer mode is interactive, while Guest mode stays read-only.
            </p>
          </SectionCard>
        </PageWrap>

        <div className="text-center mt-8 text-sm text-gray-500">
          Want real auth instead?{' '}
          <Link href="/auth/login" className="text-[#A78BFA] hover:text-white transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
