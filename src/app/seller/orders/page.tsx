'use client';

import AppShell from '@/components/AppShell';
import RoleGate from '@/components/RoleGate';

const orders = [
  { id: 'o1002', item: 'PlayStation 6 Bundle', buyer: 'Ava B', amount: '$422.16', status: 'Awaiting Shipment' },
  { id: 'o1001', item: 'AirPods Pro 3', buyer: 'Leo M', amount: '$189.74', status: 'Shipped' },
  { id: 'o1000', item: 'Nintendo Switch 3', buyer: 'Mia T', amount: '$304.20', status: 'Delivered' },
];

export default function SellerOrdersPage() {
  return (
    <AppShell title="Orders">
      <RoleGate allowedRoles={['seller']}>
        <div className="max-w-lg mx-auto py-4 space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="genie-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">{order.item}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    #{order.id} • Buyer: {order.buyer}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#FCD34D]">{order.amount}</div>
                  <div className="text-xs text-[#A78BFA] mt-1">{order.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RoleGate>
    </AppShell>
  );
}
