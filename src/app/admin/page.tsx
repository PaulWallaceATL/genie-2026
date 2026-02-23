'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';

const adminStats = [
  { label: 'Active Users', value: '14,284', icon: '👥' },
  { label: 'Live Auctions', value: '63', icon: '🔴' },
  { label: 'Open Reports', value: '12', icon: '🚩' },
  { label: 'Queued Reviews', value: '7', icon: '🛡️' },
];

export default function AdminDashboardPage() {
  return (
    <AppShell title="Admin Console">
      <RoleGate allowedRoles={['admin']}>
        <div className="max-w-lg mx-auto space-y-6 py-4">
          <div className="genie-card p-5">
            <h2 className="text-xl font-bold text-white">Operations Overview</h2>
            <p className="text-sm text-gray-400 mt-1">
              Monitor users, auctions, and moderation from one place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {adminStats.map((item) => (
              <div key={item.label} className="genie-card p-4 text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-lg font-bold text-white">{item.value}</div>
                <div className="text-xs text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/users" className="genie-btn text-center py-4 block">
              Users
            </Link>
            <Link href="/admin/auctions" className="genie-btn text-center py-4 block">
              Auctions
            </Link>
            <Link href="/admin/reports" className="genie-btn genie-btn-gold text-center py-4 block">
              Reports
            </Link>
            <Link href="/admin/settings" className="genie-btn text-center py-4 block">
              Settings
            </Link>
          </div>
        </div>
      </RoleGate>
    </AppShell>
  );
}
