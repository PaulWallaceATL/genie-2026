'use client';

import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';
import { PageWrap, SectionCard, StatusPill } from '@/components/PageBits';

const auctionChecks = [
  { id: 'a-2001', title: 'MacBook Air M6', status: 'Live', integrity: 'Healthy' },
  { id: 'a-2002', title: 'PS6 Bundle', status: 'Paused', integrity: 'Bid Spike Review' },
  { id: 'a-2003', title: 'Rolex Oyster', status: 'Scheduled', integrity: 'Identity Check Pending' },
];

export default function AdminAuctionsPage() {
  return (
    <AppShell title="Auction Ops">
      <RoleGate allowedRoles={['admin']}>
        <PageWrap className="space-y-3">
          {auctionChecks.map((auction) => (
            <SectionCard key={auction.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{auction.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {auction.id} • {auction.status}
                  </p>
                </div>
                <StatusPill
                  text={auction.integrity}
                  tone={auction.integrity === 'Healthy' ? 'green' : auction.integrity.includes('Pending') ? 'amber' : 'red'}
                />
              </div>
            </SectionCard>
          ))}
        </PageWrap>
      </RoleGate>
    </AppShell>
  );
}
