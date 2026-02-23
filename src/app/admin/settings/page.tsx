'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <AppShell title="Admin Settings">
      <RoleGate allowedRoles={['admin']}>
        <div className="max-w-lg mx-auto py-4 space-y-4">
          <div className="genie-card p-5 space-y-3">
            <h2 className="text-lg font-bold text-white">Platform Controls</h2>
            <label className="flex items-center justify-between text-sm text-gray-300">
              <span>Require identity check for high-value listings</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between text-sm text-gray-300">
              <span>Enable automatic bid anomaly alerts</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between text-sm text-gray-300">
              <span>Allow guest read-only mode</span>
              <input type="checkbox" defaultChecked />
            </label>
            <button onClick={() => setSaved(true)} className="genie-btn w-full py-3">
              Save Settings
            </button>
          </div>

          {saved && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-xl p-3 text-center">
              Demo settings saved.
            </div>
          )}
        </div>
      </RoleGate>
    </AppShell>
  );
}
