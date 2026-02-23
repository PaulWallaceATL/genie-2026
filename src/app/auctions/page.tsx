'use client';

import { useState, useEffect, useCallback } from 'react';
import AppShell from '@/components/AppShell';
import { useAuth } from '@/store/useAuth';

interface Auction {
  id: string;
  title: string;
  description: string;
  retail_price: number;
  current_price: number;
  bid_increment: number;
  bid_cost: number;
  total_bids: number;
  last_bidder_id: string | null;
  last_bidder_name: string | null;
  status: string;
  ends_at: string;
  timer_seconds: number;
}

function CountdownTimer({ endsAt }: { endsAt: string }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [urgent, setUrgent] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const end = new Date(endsAt).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('ENDED');
        setUrgent(false);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${seconds}s`);
      }

      setUrgent(diff < 60000); // less than 1 minute
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  return (
    <span className={`font-mono font-bold ${urgent ? 'text-red-400 animate-pulse' : 'text-[#A78BFA]'}`}>
      {timeLeft}
    </span>
  );
}

export default function AuctionsPage() {
  const { user, setCoins } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [bidding, setBidding] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchAuctions = useCallback(async () => {
    try {
      const res = await fetch('/api/auctions');
      const data = await res.json();
      setAuctions(data.auctions || []);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchAuctions();
    const interval = setInterval(fetchAuctions, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [fetchAuctions]);

  const handleBid = async (auctionId: string) => {
    if (bidding) return;
    setBidding(auctionId);
    setMessage(null);

    try {
      const res = await fetch('/api/auctions/bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auctionId }),
      });

      const data = await res.json();

      if (res.ok) {
        setCoins(data.user_coins);
        setMessage({ text: data.message, type: 'success' });
        // Update the specific auction
        setAuctions(prev => prev.map(a => a.id === auctionId ? data.auction : a));
      } else {
        setMessage({ text: data.error, type: 'error' });
      }
    } catch {
      setMessage({ text: 'Failed to place bid', type: 'error' });
    } finally {
      setBidding(null);
    }
  };

  const activeAuctions = auctions.filter(a => a.status === 'active');
  const upcomingAuctions = auctions.filter(a => a.status === 'upcoming');

  return (
    <AppShell title="Auctions">
      <div className="max-w-lg mx-auto space-y-6 py-4">
        {/* Header */}
        <div className="genie-card p-5 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <h2 className="text-xl font-bold text-white">Penny Auctions</h2>
          <p className="text-gray-400 text-sm mt-1">
            Each bid costs coins and raises the price by $0.01
          </p>
        </div>

        {message && (
          <div className={`text-sm rounded-xl p-3 text-center count-up ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Active Auctions */}
        {activeAuctions.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-white mb-3">🔴 Live Auctions</h3>
            <div className="space-y-4">
              {activeAuctions.map(auction => {
                const savings = Math.round((1 - auction.current_price / auction.retail_price) * 100);
                const isMyBid = auction.last_bidder_id === user?.id;

                return (
                  <div key={auction.id} className={`genie-card overflow-hidden ${isMyBid ? 'border-green-500/40' : ''}`}>
                    {/* Auction Header */}
                    <div className="bg-gradient-to-r from-[#7C3AED]/20 to-[#F59E0B]/10 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-white text-lg">{auction.title}</h4>
                          <p className="text-gray-400 text-xs mt-0.5">{auction.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400">Retail</div>
                          <div className="text-sm text-gray-500 line-through">${auction.retail_price.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Price & Timer */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-xs text-gray-400">Current Price</div>
                          <div className="text-3xl font-bold text-[#FCD34D]">
                            ${auction.current_price.toFixed(2)}
                          </div>
                          {savings > 0 && (
                            <div className="text-xs text-green-400 mt-0.5">
                              Save up to {savings}%
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400 mb-1">Time Left</div>
                          <CountdownTimer endsAt={auction.ends_at} />
                        </div>
                      </div>

                      {/* Bid Info */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <span>{auction.total_bids} total bids</span>
                        {auction.last_bidder_name && (
                          <span className={isMyBid ? 'text-green-400 font-medium' : 'text-[#A78BFA]'}>
                            {isMyBid ? '✅ You are winning!' : `Last: ${auction.last_bidder_name}`}
                          </span>
                        )}
                      </div>

                      {/* Bid Button */}
                      <button
                        onClick={() => handleBid(auction.id)}
                        disabled={bidding === auction.id}
                        className={`w-full py-3.5 rounded-xl font-bold text-base transition-all ${
                          bidding === auction.id
                            ? 'bg-[#241B35] text-gray-500'
                            : 'genie-btn pulse-glow'
                        }`}
                      >
                        {bidding === auction.id
                          ? 'Placing bid...'
                          : `🪙 Bid Now (${auction.bid_cost} coin${auction.bid_cost > 1 ? 's' : ''})`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcomingAuctions.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-white mb-3">⏰ Coming Soon</h3>
            <div className="space-y-3">
              {upcomingAuctions.map(auction => (
                <div key={auction.id} className="genie-card p-4 opacity-70">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#241B35] flex items-center justify-center text-2xl">
                      🎁
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{auction.title}</h4>
                      <div className="text-sm text-gray-400">
                        Retail: ${auction.retail_price.toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-[#241B35] text-[#A78BFA] text-xs font-medium px-3 py-1.5 rounded-full">
                      Soon
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {auctions.length === 0 && (
          <div className="genie-card p-8 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-400">Loading auctions...</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
