'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, Coins, Hammer, History, RotateCcw, Sparkles, Tv, Trophy, Wallet } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { useAuth } from '@/store/useAuth';
import { IconChip } from '@/components/BrandIcons';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  created_at: string;
}

const demoTransactions: Transaction[] = [
  {
    id: 't-demo-1',
    type: 'ad_reward',
    amount: 2,
    description: 'Watched sponsored demo ad',
    created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: 't-demo-2',
    type: 'bid',
    amount: -1,
    description: 'Placed bid on PlayStation 6 Bundle',
    created_at: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
  },
];

export default function ProfilePage() {
  const { user, logout, isDemoMode } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const visibleTransactions = isDemoMode ? demoTransactions : transactions;

  useEffect(() => {
    if (!showTransactions || isDemoMode) return;

    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data.transactions || []))
      .catch(() => {});
  }, [isDemoMode, showTransactions]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ad_reward': return Tv;
      case 'purchase': return Wallet;
      case 'bid': return Hammer;
      case 'auction_win': return Trophy;
      case 'refund': return RotateCcw;
      default: return Coins;
    }
  };

  const getTypeColor = (amount: number) => {
    return amount > 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <AppShell title="Profile">
      <div className="max-w-lg mx-auto space-y-6 py-4">
        {/* Profile Card */}
        <div className="genie-card p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#F59E0B] flex items-center justify-center text-3xl mx-auto mb-3">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-white">{user?.username}</h2>
          <p className="text-gray-400 text-sm">{user?.email}</p>
          <p className="text-gray-500 text-xs mt-1">
            Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'today'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="genie-card p-4 text-center">
            <div className="mb-2 flex justify-center">
              <IconChip icon={Coins} size="sm" tone="gold" />
            </div>
            <div className="text-2xl font-bold text-[#FCD34D]">{user?.coins?.toLocaleString() ?? 0}</div>
            <div className="text-xs text-gray-400 mt-1">Genie Coins</div>
          </div>
          <div className="genie-card p-4 text-center">
            <div className="mb-2 flex justify-center">
              <IconChip icon={Tv} size="sm" tone="purple" />
            </div>
            <div className="text-2xl font-bold text-[#A78BFA]">{user?.total_ads_watched ?? 0}</div>
            <div className="text-xs text-gray-400 mt-1">Ads Watched</div>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <button
            onClick={() => setShowTransactions(!showTransactions)}
            className="w-full genie-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <IconChip icon={History} size="sm" tone="slate" />
              <span className="font-semibold text-white">Transaction History</span>
            </div>
            <span className="text-gray-400 text-sm">
              {showTransactions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>

          {showTransactions && (
            <div className="mt-2 space-y-2">
              {visibleTransactions.length === 0 ? (
                <div className="genie-card p-4 text-center text-gray-400 text-sm">
                  No transactions yet
                </div>
              ) : (
                visibleTransactions.map(tx => (
                  <div key={tx.id} className="genie-card p-3 flex items-center gap-3">
                    <IconChip icon={getTypeIcon(tx.type)} size="sm" tone={tx.amount > 0 ? 'green' : 'red'} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{tx.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(tx.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span className={`font-bold text-sm ${getTypeColor(tx.amount)}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full py-3.5 rounded-xl font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <p className="text-center text-xs text-gray-600">
          <span className="inline-flex items-center gap-1">
            <Sparkles size={12} />
            Genie v1.0.0
          </span>
        </p>
      </div>
    </AppShell>
  );
}
