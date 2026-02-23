'use client';

import Link from 'next/link';
import { Flag, Radio, Shield, Users } from 'lucide-react';
import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';
import { ActionTile, PageWrap, SectionCard, StatTile } from '@/components/PageBits';

const adminStats = [
  { label: 'Active Users', value: '14,284', icon: Users },
  { label: 'Live Auctions', value: '63', icon: Radio },
  { label: 'Open Reports', value: '12', icon: Flag },
  { label: 'Queued Reviews', value: '7', icon: Shield },
];

export default function AdminDashboardPage() {
  return (
    <AppShell title="Admin Console">
      <RoleGate allowedRoles={['admin']}>
        <PageWrap>
          <SectionCard>
            <h2 className="text-xl font-bold text-white">Operations Overview</h2>
            <p className="text-sm text-gray-400 mt-1">
              Monitor users, auctions, and moderation from one place.
            </p>
          </SectionCard>

          <div className="grid grid-cols-2 gap-3">
            {adminStats.map((item) => (
              <StatTile key={item.label} label={item.label} value={item.value} icon={item.icon} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ActionTile href="/admin/users" title="Users" />
            <ActionTile href="/admin/auctions" title="Auctions" />
            <ActionTile href="/admin/reports" title="Reports" gold />
            <ActionTile href="/admin/settings" title="Settings" />
          </div>
        </PageWrap>
      </RoleGate>
    </AppShell>
  );
}
