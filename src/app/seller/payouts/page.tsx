'use client';

import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';
import { PageWrap, SectionCard, StatusPill } from '@/components/PageBits';

const payouts = [
  { id: 'p-2402', period: 'Feb 1 - Feb 15', gross: '$982.40', fee: '$34.12', net: '$948.28', status: 'Processing' },
  { id: 'p-2401', period: 'Jan 16 - Jan 31', gross: '$1,250.00', fee: '$42.90', net: '$1,207.10', status: 'Paid' },
];

export default function SellerPayoutsPage() {
  return (
    <AppShell title="Payouts">
      <RoleGate allowedRoles={['seller']}>
        <PageWrap className="space-y-3">
          {payouts.map((payout) => (
            <SectionCard key={payout.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{payout.period}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Gross {payout.gross} • Fees {payout.fee}
                  </p>
                </div>
                <StatusPill text={payout.status} tone={payout.status === 'Paid' ? 'green' : 'amber'} />
              </div>
              <div className="mt-3 text-sm">
                <span className="text-gray-400">Net payout:</span>{' '}
                <span className="font-bold text-[#FCD34D]">{payout.net}</span>
              </div>
            </SectionCard>
          ))}
        </PageWrap>
      </RoleGate>
    </AppShell>
  );
}
