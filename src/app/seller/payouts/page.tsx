'use client';

import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';

const payouts = [
  { id: 'p-2402', period: 'Feb 1 - Feb 15', gross: '$982.40', fee: '$34.12', net: '$948.28', status: 'Processing' },
  { id: 'p-2401', period: 'Jan 16 - Jan 31', gross: '$1,250.00', fee: '$42.90', net: '$1,207.10', status: 'Paid' },
];

export default function SellerPayoutsPage() {
  return (
    <AppShell title="Payouts">
      <RoleGate allowedRoles={['seller']}>
        <div className="max-w-lg mx-auto py-4 space-y-3">
          {payouts.map((payout) => (
            <div key={payout.id} className="genie-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{payout.period}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Gross {payout.gross} • Fees {payout.fee}
                  </p>
                </div>
                <span className="text-xs bg-[#241B35] text-[#A78BFA] px-2.5 py-1 rounded-full">
                  {payout.status}
                </span>
              </div>
              <div className="mt-3 text-sm">
                <span className="text-gray-400">Net payout:</span>{' '}
                <span className="font-bold text-[#FCD34D]">{payout.net}</span>
              </div>
            </div>
          ))}
        </div>
      </RoleGate>
    </AppShell>
  );
}
