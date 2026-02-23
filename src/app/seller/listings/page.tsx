'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';

const listings = [
  { id: 'l1', title: 'PlayStation 6 Bundle', status: 'Active', bids: 132, reserve: '$399' },
  { id: 'l2', title: 'iPhone 17 Pro Max', status: 'Active', bids: 98, reserve: '$599' },
  { id: 'l3', title: 'MacBook Air M6', status: 'Draft', bids: 0, reserve: '$899' },
  { id: 'l4', title: 'AirPods Max 2', status: 'Scheduled', bids: 0, reserve: '$249' },
];

export default function SellerListingsPage() {
  return (
    <AppShell title="Listings">
      <RoleGate allowedRoles={['seller']}>
        <div className="max-w-lg mx-auto space-y-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Your Listings</h2>
            <Link href="/seller/listings/new" className="genie-btn px-4 py-2 text-sm">
              + New
            </Link>
          </div>

          {listings.map((listing) => (
            <div key={listing.id} className="genie-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{listing.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Reserve {listing.reserve} • {listing.bids} bids
                  </p>
                </div>
                <span className="text-xs bg-[#241B35] text-[#A78BFA] px-2.5 py-1 rounded-full">
                  {listing.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </RoleGate>
    </AppShell>
  );
}
