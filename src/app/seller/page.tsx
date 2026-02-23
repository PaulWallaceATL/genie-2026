'use client';

import Link from 'next/link';
import { Banknote, Package, ReceiptText, Wallet } from 'lucide-react';
import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';
import { ActionTile, PageWrap, SectionCard, StatTile } from '@/components/PageBits';

const sellerStats = [
  { label: 'Active Listings', value: 8, icon: Package },
  { label: 'Pending Orders', value: 3, icon: ReceiptText },
  { label: 'This Month Revenue', value: '$1,842', icon: Banknote },
  { label: 'Payouts Ready', value: '$640', icon: Wallet },
];

export default function SellerDashboardPage() {
  return (
    <AppShell title="Seller Hub">
      <RoleGate allowedRoles={['seller']}>
        <PageWrap>
          <SectionCard>
            <h2 className="text-xl font-bold text-white">Seller Dashboard</h2>
            <p className="text-sm text-gray-400 mt-1">
              Manage listings, monitor orders, and track your payouts.
            </p>
          </SectionCard>

          <div className="grid grid-cols-2 gap-3">
            {sellerStats.map((item) => (
              <StatTile key={item.label} label={item.label} value={item.value} icon={item.icon} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ActionTile href="/seller/listings" title="Listings" />
            <ActionTile href="/seller/orders" title="Orders" />
            <ActionTile href="/seller/payouts" title="Payouts" gold />
            <ActionTile href="/seller/listings/new" title="New Listing" />
          </div>
        </PageWrap>
      </RoleGate>
    </AppShell>
  );
}
