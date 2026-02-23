'use client';

import { useState, useEffect, useCallback } from 'react';
import AppShell from '@/components/AppShell';
import { useAuth } from '@/store/useAuth';

const AD_DURATION = 5; // seconds for mock ad

const mockAds = [
  { title: 'Premium Headphones', brand: 'SoundMax Pro', color: 'from-blue-600 to-purple-600' },
  { title: 'Smart Watch Ultra', brand: 'TechWear', color: 'from-green-600 to-teal-600' },
  { title: 'Gaming Console', brand: 'PlayZone', color: 'from-red-600 to-orange-600' },
  { title: 'Wireless Earbuds', brand: 'AudioPure', color: 'from-pink-600 to-rose-600' },
  { title: 'Fitness Tracker', brand: 'FitLife', color: 'from-yellow-600 to-amber-600' },
  { title: 'Portable Speaker', brand: 'BoomBox', color: 'from-indigo-600 to-blue-600' },
];

export default function WatchPage() {
  const { user, setCoins, setAdsWatched, isDemoMode } = useAuth();
  const [watching, setWatching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [reward, setReward] = useState<number | null>(null);
  const [currentAd, setCurrentAd] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const isGuest = user?.role === 'guest';

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    if (watching && progress < 100) {
      const interval = setInterval(() => {
        setProgress(p => {
          const next = p + (100 / AD_DURATION);
          if (next >= 100) {
            clearInterval(interval);
            return 100;
          }
          return next;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [watching, progress]);

  const claimReward = useCallback(async () => {
    if (isDemoMode) {
      const earned = 2;
      setReward(earned);
      setCoins((user?.coins ?? 0) + earned);
      setAdsWatched((user?.total_ads_watched ?? 0) + 1);
      setTotalEarned((prev) => prev + earned);
      setCooldown(10);
      setWatching(false);
      setProgress(0);
      return;
    }

    try {
      const res = await fetch('/api/coins/watch-ad', { method: 'POST' });
      const data = await res.json();

      if (res.ok) {
        setReward(data.coins_earned);
        setCoins(data.total_coins);
        setTotalEarned(prev => prev + data.coins_earned);
        setCooldown(10);
      } else if (res.status === 429) {
        setCooldown(data.cooldown || 10);
      }
    } catch {
      // ignore
    } finally {
      setWatching(false);
      setProgress(0);
    }
  }, [isDemoMode, setAdsWatched, setCoins, user?.coins, user?.total_ads_watched]);

  useEffect(() => {
    if (progress >= 100 && watching) {
      claimReward();
    }
  }, [progress, watching, claimReward]);

  const startWatching = () => {
    if (watching || cooldown > 0 || isGuest) return;
    setReward(null);
    setCurrentAd(Math.floor(Math.random() * mockAds.length));
    setWatching(true);
    setProgress(0);
  };

  const ad = mockAds[currentAd];

  return (
    <AppShell title="Watch & Earn">
      <div className="max-w-lg mx-auto space-y-6 py-4">
        {/* Earnings Summary */}
        <div className="genie-card p-5 text-center">
          <div className="text-3xl mb-2">📺</div>
          <h2 className="text-xl font-bold text-white">Watch Ads, Earn Coins</h2>
          <p className="text-gray-400 text-sm mt-1">Each ad earns you 2 Genie Coins</p>
          {totalEarned > 0 && (
            <div className="mt-3 inline-flex items-center gap-1.5 bg-[#241B35] rounded-full px-4 py-1.5">
              <span>🪙</span>
              <span className="text-[#FCD34D] font-bold">{totalEarned} earned this session</span>
            </div>
          )}
        </div>

        {/* Ad Player */}
        <div className="genie-card overflow-hidden">
          {watching ? (
            <div>
              {/* Mock Ad Display */}
              <div className={`bg-gradient-to-br ${ad.color} p-8 text-center`}>
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-white">{ad.title}</h3>
                <p className="text-white/70 text-sm mt-1">by {ad.brand}</p>
                <div className="mt-4 bg-white/20 rounded-full px-4 py-2 inline-block">
                  <span className="text-white font-semibold text-sm">Sponsored Ad</span>
                </div>
              </div>

              {/* Progress */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Watching ad...</span>
                  <span className="text-sm font-bold text-[#A78BFA]">{Math.min(Math.round(progress), 100)}%</span>
                </div>
                <div className="w-full bg-[#241B35] rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-linear"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      background: 'linear-gradient(90deg, #7C3AED, #F59E0B)',
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Please watch the full ad to earn your coins
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              {reward !== null ? (
                <div className="count-up">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className="text-xl font-bold text-white">You earned {reward} coins!</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Your balance: {user?.coins?.toLocaleString()} coins
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-5xl mb-3 float-animation">▶️</div>
                  <h3 className="text-lg font-bold text-white">Ready to watch?</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Watch a short ad to earn Genie Coins
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Watch Button */}
        {isGuest && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm rounded-xl p-3 text-center">
            Guest mode is read-only. Switch to Buyer in demo accounts to earn coins.
          </div>
        )}

        <button
          onClick={startWatching}
          disabled={watching || cooldown > 0 || isGuest}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
            watching || isGuest
              ? 'bg-[#241B35] text-gray-500 cursor-not-allowed'
              : cooldown > 0
              ? 'bg-[#241B35] text-gray-400 cursor-not-allowed'
              : 'genie-btn pulse-glow'
          }`}
        >
          {isGuest
            ? 'Guest Mode (Read-only)'
            : watching
            ? '⏳ Watching...'
            : cooldown > 0
            ? `⏱️ Wait ${cooldown}s`
            : '▶️ Watch Ad (+2 Coins)'}
        </button>

        {/* Info */}
        <div className="genie-card p-4">
          <h4 className="font-semibold text-white text-sm mb-2">💡 Tips</h4>
          <ul className="space-y-1.5 text-xs text-gray-400">
            <li>• Watch the full ad to receive your coins</li>
            <li>• There&apos;s a short cooldown between ads</li>
            <li>• Use your coins to bid in penny auctions</li>
            <li>• The more you watch, the more you can bid!</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
