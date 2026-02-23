'use client';

import { useState } from 'react';
import { Settings2 } from 'lucide-react';
import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';
import { InfoBanner, PageWrap, SectionCard, SectionTitle, StatusPill } from '@/components/PageBits';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <AppShell title="Admin Settings">
      <RoleGate allowedRoles={['admin']}>
        <PageWrap className="space-y-4">
          <SectionCard className="space-y-3">
            <SectionTitle title="Platform Controls" icon={Settings2} />
            <label className="flex items-center justify-between text-sm text-gray-300 rounded-xl bg-white/5 border border-white/10 p-3">
              <span>Require identity check for high-value listings</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between text-sm text-gray-300 rounded-xl bg-white/5 border border-white/10 p-3">
              <span>Enable automatic bid anomaly alerts</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between text-sm text-gray-300 rounded-xl bg-white/5 border border-white/10 p-3">
              <span>Allow guest read-only mode</span>
              <input type="checkbox" defaultChecked />
            </label>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-gray-400">Environment</span>
              <StatusPill text="Demo Safe Mode" tone="green" />
            </div>
            <button onClick={() => setSaved(true)} className="genie-btn w-full py-3">
              Save Settings
            </button>
          </SectionCard>

          {saved && (
            <InfoBanner tone="green">
              Demo settings saved.
            </InfoBanner>
          )}
        </PageWrap>
      </RoleGate>
    </AppShell>
  );
}
