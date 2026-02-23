'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';

export default function NewSellerListingPage() {
  const [saved, setSaved] = useState(false);

  return (
    <AppShell title="New Listing">
      <RoleGate allowedRoles={['seller']}>
        <div className="max-w-lg mx-auto py-4 space-y-4">
          <div className="genie-card p-5">
            <h2 className="text-lg font-bold text-white">Create Listing Draft</h2>
            <p className="text-sm text-gray-400 mt-1">This demo saves locally only.</p>
          </div>

          {saved && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-xl p-3 text-center">
              Draft listing saved in demo mode.
            </div>
          )}

          <div className="genie-card p-4 space-y-3">
            <input
              className="w-full bg-[#1A1128] border border-[#7C3AED]/20 rounded-xl px-4 py-3 text-white"
              placeholder="Listing title"
            />
            <textarea
              className="w-full bg-[#1A1128] border border-[#7C3AED]/20 rounded-xl px-4 py-3 text-white"
              rows={4}
              placeholder="Short description"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                className="w-full bg-[#1A1128] border border-[#7C3AED]/20 rounded-xl px-4 py-3 text-white"
                placeholder="Reserve price"
              />
              <input
                className="w-full bg-[#1A1128] border border-[#7C3AED]/20 rounded-xl px-4 py-3 text-white"
                placeholder="Start date"
              />
            </div>
            <button onClick={() => setSaved(true)} className="genie-btn w-full py-3">
              Save Draft
            </button>
          </div>
        </div>
      </RoleGate>
    </AppShell>
  );
}
