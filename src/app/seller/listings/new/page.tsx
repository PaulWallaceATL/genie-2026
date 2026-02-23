'use client';

import { useState } from 'react';
import { FilePlus2 } from 'lucide-react';
import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';
import {
  FieldInput,
  FieldLabel,
  FieldTextarea,
  InfoBanner,
  PageWrap,
  SectionCard,
  SectionTitle,
} from '@/components/PageBits';

export default function NewSellerListingPage() {
  const [saved, setSaved] = useState(false);

  return (
    <AppShell title="New Listing">
      <RoleGate allowedRoles={['seller']}>
        <PageWrap className="space-y-4">
          <SectionCard>
            <SectionTitle title="Create Listing Draft" subtitle="This demo saves locally only." icon={FilePlus2} />
          </SectionCard>

          {saved && (
            <InfoBanner tone="green">
              Draft listing saved in demo mode.
            </InfoBanner>
          )}

          <SectionCard className="p-4 space-y-3">
            <div>
              <FieldLabel>Listing title</FieldLabel>
              <FieldInput placeholder="PlayStation 6 Bundle" />
            </div>
            <div>
              <FieldLabel>Short description</FieldLabel>
              <FieldTextarea rows={4} placeholder="Factory sealed, two controllers included." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Reserve price</FieldLabel>
                <FieldInput placeholder="$399" />
              </div>
              <div>
                <FieldLabel>Start date</FieldLabel>
                <FieldInput placeholder="2026-03-01" />
              </div>
            </div>
            <button onClick={() => setSaved(true)} className="genie-btn w-full py-3">
              Save Draft
            </button>
          </SectionCard>
        </PageWrap>
      </RoleGate>
    </AppShell>
  );
}
