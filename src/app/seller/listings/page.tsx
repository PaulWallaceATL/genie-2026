'use client';

import Link from 'next/link';
import { PackagePlus } from 'lucide-react';
import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';
import { PageWrap, SectionCard, SectionTitle, StatusPill } from '@/components/PageBits';

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
        <PageWrap className="space-y-4">
          <div className="flex items-center justify-between">
            <SectionTitle title="Your Listings" icon={PackagePlus} />
            <Link href="/seller/listings/new" className="genie-btn px-4 py-2 text-sm">
              + New
            </Link>
          </div>

          {listings.map((listing) => (
            <SectionCard key={listing.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{listing.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Reserve {listing.reserve} • {listing.bids} bids
                  </p>
                </div>
                <StatusPill
                  text={listing.status}
                  tone={
                    listing.status === 'Active'
                      ? 'green'
                      : listing.status === 'Draft'
                      ? 'gray'
                      : 'purple'
                  }
                />
              </div>
            </SectionCard>
          ))}
        </PageWrap>
      </RoleGate>
    </AppShell>
  );
}
