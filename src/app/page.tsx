'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/store/useAuth';

export default function LandingPage() {
  const { user, loading, fetchUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-5xl float-animation">🧞</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <div className="text-7xl mb-6 float-animation">🧞</div>
        <h1 className="text-4xl font-extrabold mb-3 gradient-text">Genie</h1>
        <p className="text-lg text-gray-400 max-w-sm mx-auto">
          Watch ads, earn coins, and win incredible prizes in penny auctions!
        </p>
      </div>

      <div className="grid gap-4 w-full max-w-sm mb-10">
        <div className="genie-card p-4 flex items-center gap-4">
          <span className="text-3xl">📺</span>
          <div className="text-left">
            <h3 className="font-semibold text-white">Watch &amp; Earn</h3>
            <p className="text-sm text-gray-400">Watch short ads to earn Genie Coins</p>
          </div>
        </div>
        <div className="genie-card p-4 flex items-center gap-4">
          <span className="text-3xl">🪙</span>
          <div className="text-left">
            <h3 className="font-semibold text-white">Collect Coins</h3>
            <p className="text-sm text-gray-400">Earn or buy coins to use in auctions</p>
          </div>
        </div>
        <div className="genie-card p-4 flex items-center gap-4">
          <span className="text-3xl">🏆</span>
          <div className="text-left">
            <h3 className="font-semibold text-white">Win Big</h3>
            <p className="text-sm text-gray-400">Bid on premium items for pennies</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-3">
        <Link href="/demo" className="genie-btn-gold genie-btn block w-full text-center text-lg py-4">
          Enter Demo
        </Link>
        <Link href="/auth/register" className="genie-btn block w-full text-center text-lg py-4">
          Get Started Free
        </Link>
        <Link href="/auth/login" className="block w-full text-center text-[#A78BFA] font-medium py-3 hover:text-white transition-colors">
          Already have an account? Sign in
        </Link>
      </div>

      <p className="mt-8 text-xs text-gray-600">
        Sign up now and get 10 free Genie Coins!
      </p>
    </div>
  );
}
