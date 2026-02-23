'use client';

import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';

const users = [
  { id: 'u-1001', name: 'Ava Buyer', role: 'buyer', status: 'Active', risk: 'Low' },
  { id: 'u-1002', name: 'Sam Seller', role: 'seller', status: 'Active', risk: 'Medium' },
  { id: 'u-1003', name: 'Nina Demo', role: 'buyer', status: 'Flagged', risk: 'High' },
];

export default function AdminUsersPage() {
  return (
    <AppShell title="User Review">
      <RoleGate allowedRoles={['admin']}>
        <div className="max-w-lg mx-auto py-4 space-y-3">
          {users.map((user) => (
            <div key={user.id} className="genie-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{user.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {user.id} • {user.role}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#A78BFA]">{user.status}</div>
                  <div className="text-xs text-gray-500 mt-1">Risk: {user.risk}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RoleGate>
    </AppShell>
  );
}
