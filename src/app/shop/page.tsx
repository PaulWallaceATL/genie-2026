'use client';

import { useState, useEffect } from 'react';
import { CircleHelp, Coins, Crown, Gem, Sparkles, Trophy, Wallet } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { useAuth } from '@/store/useAuth';
import { IconChip } from '@/components/BrandIcons';

interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  bonus_coins: number;
  popular: number;
}

const demoPackages: CoinPackage[] = [
  { id: 'demo-mini', name: 'Mini Pack', coins: 50, price: 4.99, bonus_coins: 5, popular: 0 },
  { id: 'demo-plus', name: 'Plus Pack', coins: 120, price: 9.99, bonus_coins: 20, popular: 1 },
  { id: 'demo-max', name: 'Max Pack', coins: 300, price: 19.99, bonus_coins: 70, popular: 0 },
];

export default function ShopPage() {
  const { user, setCoins, isDemoMode } = useAuth();
  const [packages, setPackages] = useState<CoinPackage[]>([]);
  const [buying, setBuying] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const isGuest = user?.role === 'guest';

  useEffect(() => {
    if (isDemoMode) {
      setPackages(demoPackages);
      return;
    }

    fetch('/api/coins/buy')
      .then(res => res.json())
      .then(data => setPackages(data.packages || []))
      .catch(() => {});
  }, [isDemoMode]);

  const handleBuy = async (pkg: CoinPackage) => {
    if (buying) return;
    if (isGuest) return;

    if (isDemoMode) {
      const current = user?.coins ?? 0;
      setCoins(current + pkg.coins + pkg.bonus_coins);
      setSuccess(`Demo purchase complete: +${pkg.coins + pkg.bonus_coins} coins`);
      return;
    }

    setBuying(pkg.id);
    setSuccess(null);

    try {
      const res = await fetch('/api/coins/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: pkg.id }),
      });

      const data = await res.json();

      if (res.ok) {
        setCoins(data.total_coins);
        setSuccess(data.message);
      }
    } catch {
      // ignore
    } finally {
      setBuying(null);
    }
  };

  const getPackageIcon = (index: number) => {
    const icons = [Coins, Wallet, Crown, Gem, Trophy];
    return icons[index] || Coins;
  };

  return (
    <AppShell title="Coin Shop">
      <div className="max-w-lg mx-auto space-y-6 py-4">
        {/* Balance */}
        <div className="genie-card p-5 text-center">
          <div className="text-sm text-gray-400 mb-1">Your Balance</div>
          <div className="flex items-center justify-center gap-2">
            <IconChip icon={Coins} tone="gold" />
            <span className="text-3xl font-bold text-[#FCD34D]">
              {user?.coins?.toLocaleString() ?? 0}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Genie Coins</div>
        </div>

        {isGuest && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm rounded-xl p-3 text-center">
            Guest mode is read-only. Switch to Buyer in demo accounts to purchase coins.
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-xl p-3 text-center count-up">
            <span className="inline-flex items-center gap-2">
              <Sparkles size={15} />
              {success}
            </span>
          </div>
        )}

        {/* Packages */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3 inline-flex items-center gap-2">
            <Wallet size={18} className="text-[#FCD34D]" />
            Coin Packages
          </h3>
          <div className="space-y-3">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`genie-card p-4 relative ${pkg.popular ? 'border-[#F59E0B]/50 ring-1 ring-[#F59E0B]/20' : ''}`}
              >
                {pkg.popular === 1 && (
                  <div className="absolute -top-2.5 left-4 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white text-xs font-bold px-3 py-0.5 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <IconChip icon={getPackageIcon(index)} tone={pkg.popular ? 'gold' : 'purple'} />
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{pkg.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[#FCD34D] font-semibold">{pkg.coins.toLocaleString()} coins</span>
                      {pkg.bonus_coins > 0 && (
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">
                          +{pkg.bonus_coins} bonus
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleBuy(pkg)}
                    disabled={buying === pkg.id || isGuest}
                    className={`genie-btn-gold genie-btn px-5 py-2.5 text-sm whitespace-nowrap ${(buying === pkg.id || isGuest) ? 'opacity-50' : ''}`}
                  >
                    {isGuest ? 'Read-only' : buying === pkg.id ? '...' : `$${pkg.price.toFixed(2)}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="genie-card p-4">
          <h4 className="font-semibold text-white text-sm mb-2 inline-flex items-center gap-2">
            <CircleHelp size={16} className="text-[#A78BFA]" />
            About Purchases
          </h4>
          <ul className="space-y-1.5 text-xs text-gray-400">
            <li>• Coins are added to your account instantly</li>
            <li>• Bonus coins are included at no extra cost</li>
            <li>• Use coins to bid in penny auctions</li>
            <li>• Payments are processed securely via Stripe</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
