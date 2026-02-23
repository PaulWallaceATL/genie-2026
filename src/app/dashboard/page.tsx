'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Coins, Flame, Gift, Tv, ChevronRight } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { useAuth } from '@/store/useAuth';
import { ActionTile, EmptyState, PageHero, PageWrap, StatTile } from '@/components/PageBits';

interface Auction {
  id: string;
  title: string;
  current_price: number;
  retail_price: number;
  total_bids: number;
  ends_at: string;
  timer_seconds: number;
  last_bidder_name: string | null;
  status: string;
}

const demoAuctions: Auction[] = [
  {
    id: 'd1',
    title: 'iPhone 17 Pro',
    current_price: 24.61,
    retail_price: 1299,
    total_bids: 2461,
    ends_at: '',
    timer_seconds: 0,
    last_bidder_name: 'Taylor K',
    status: 'active',
  },
  {
    id: 'd2',
    title: 'PlayStation 6 Bundle',
    current_price: 15.37,
    retail_price: 699,
    total_bids: 1537,
    ends_at: '',
    timer_seconds: 0,
    last_bidder_name: 'Jordan P',
    status: 'active',
  },
  {
    id: 'd3',
    title: 'MacBook Air M6',
    current_price: 40.12,
    retail_price: 1199,
    total_bids: 4012,
    ends_at: '',
    timer_seconds: 0,
    last_bidder_name: 'Ava B',
    status: 'active',
  },
];

export default function DashboardPage() {
  const { user, isDemoMode } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const visibleAuctions = isDemoMode ? demoAuctions : auctions;

  useEffect(() => {
    if (isDemoMode) return;

    fetch('/api/auctions')
      .then(res => res.json())
      .then(data => setAuctions(data.auctions?.slice(0, 3) || []))
      .catch(() => setAuctions(demoAuctions));
  }, [isDemoMode]);

  return (
    <AppShell title="Dashboard">
      <PageWrap>
        {/* Welcome */}
        <PageHero title={`Hey, ${user?.username}`} subtitle="Ready to win something amazing today?" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatTile label="Genie Coins" value={user?.coins?.toLocaleString() ?? 0} icon={Coins} tone="gold" />
          <StatTile label="Ads Watched" value={user?.total_ads_watched ?? 0} icon={Tv} tone="purple" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <ActionTile href="/watch" title="Watch Ads" subtitle="Earn 2 coins each" />
          <ActionTile href="/shop" title="Buy Coins" subtitle="Get bonus coins" gold />
        </div>

        {/* Hot Auctions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white inline-flex items-center gap-2">
              <Flame size={18} className="text-orange-300" />
              Hot Auctions
            </h3>
            <Link href="/auctions" className="text-sm text-[#A78BFA] hover:text-white transition-colors">
              <span className="inline-flex items-center gap-1">
                View all <ChevronRight size={14} />
              </span>
            </Link>
          </div>
          <div className="space-y-3">
            {visibleAuctions.map(auction => (
              <Link key={auction.id} href="/auctions" className="genie-card p-4 flex items-center gap-4 block">
                <div className="w-12 h-12 rounded-xl bg-[#241B35] flex items-center justify-center">
                  <Gift size={22} className="text-[#C4B5FD]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-sm truncate">{auction.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#FCD34D] font-bold text-sm">
                      ${auction.current_price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-xs line-through">
                      ${auction.retail_price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">{auction.total_bids} bids</div>
                  {auction.last_bidder_name && (
                    <div className="text-xs text-[#A78BFA] mt-0.5">{auction.last_bidder_name}</div>
                  )}
                </div>
              </Link>
            ))}
            {visibleAuctions.length === 0 && (
              <EmptyState title="Loading auctions..." subtitle="Finding the hottest live deals for you." />
            )}
          </div>
        </div>
      </PageWrap>
    </AppShell>
  );
}
