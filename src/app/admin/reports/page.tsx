'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';

const reports = [
  { id: 'r-9001', subject: 'Suspicious rapid bids', target: 'Auction a-2002', priority: 'High' },
  { id: 'r-9002', subject: 'Chargeback warning', target: 'User u-1003', priority: 'Medium' },
  { id: 'r-9003', subject: 'Content policy check', target: 'Listing l-441', priority: 'Low' },
];

export default function AdminReportsPage() {
  const [resolved, setResolved] = useState<string[]>([]);

  return (
    <AppShell title="Reports">
      <RoleGate allowedRoles={['admin']}>
        <div className="max-w-lg mx-auto py-4 space-y-3">
          {reports.map((report) => {
            const isResolved = resolved.includes(report.id);
            return (
              <div key={report.id} className="genie-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{report.subject}</h3>
                    <p className="text-xs text-gray-400 mt-1">{report.target}</p>
                    <p className="text-xs text-[#A78BFA] mt-1">Priority: {report.priority}</p>
                  </div>
                  <button
                    onClick={() => !isResolved && setResolved((prev) => [...prev, report.id])}
                    disabled={isResolved}
                    className={`text-xs px-3 py-1.5 rounded-lg ${
                      isResolved ? 'bg-green-500/10 text-green-400' : 'bg-[#241B35] text-gray-300'
                    }`}
                  >
                    {isResolved ? 'Resolved' : 'Resolve'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </RoleGate>
    </AppShell>
  );
}
