'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';

const sellerStats = [
  { label: 'Active Listings', value: 8, icon: '📦' },
  { label: 'Pending Orders', value: 3, icon: '🧾' },
  { label: 'This Month Revenue', value: '$1,842', icon: '💵' },
  { label: 'Payouts Ready', value: '$640', icon: '🏦' },
];

export default function SellerDashboardPage() {
  return (
    <AppShell title="Seller Hub">
      <RoleGate allowedRoles={['seller']}>
        <div className="max-w-lg mx-auto space-y-6 py-4">
          <div className="genie-card p-5">
            <h2 className="text-xl font-bold text-white">Seller Dashboard</h2>
            <p className="text-sm text-gray-400 mt-1">
              Manage listings, monitor orders, and track your payouts.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {sellerStats.map((item) => (
              <div key={item.label} className="genie-card p-4 text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-lg font-bold text-white">{item.value}</div>
                <div className="text-xs text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/seller/listings" className="genie-btn text-center py-4 block">
              Listings
            </Link>
            <Link href="/seller/orders" className="genie-btn text-center py-4 block">
              Orders
            </Link>
            <Link href="/seller/payouts" className="genie-btn genie-btn-gold text-center py-4 block">
              Payouts
            </Link>
            <Link href="/seller/listings/new" className="genie-btn text-center py-4 block">
              New Listing
            </Link>
          </div>
        </div>
      </RoleGate>
    </AppShell>
  );
}
