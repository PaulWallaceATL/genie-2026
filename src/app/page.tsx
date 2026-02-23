'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  Coins,
  PlayCircle,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Clock3,
  Sparkles,
  CheckCircle2,
  Users,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/store/useAuth';
import { GenieLogo, IconChip } from '@/components/BrandIcons';

export default function LandingPage() {
  const { user, loading, fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GenieLogo size="lg" className="float-animation" />
      </div>
    );
  }

  const features = [
    {
      title: 'Watch & Earn',
      text: 'Watch short ads and instantly collect Genie Coins with every completed view.',
      icon: PlayCircle,
      tone: 'purple' as const,
      detail: 'No complicated setup. Start earning in minutes.',
    },
    {
      title: 'Bid in Real Time',
      text: 'Use your coins to place penny bids on premium products before countdown ends.',
      icon: Coins,
      tone: 'gold' as const,
      detail: 'Live timers and activity keep every auction exciting.',
    },
    {
      title: 'Win More for Less',
      text: 'Take home high-value items at a fraction of retail cost when you time bids right.',
      icon: Trophy,
      tone: 'green' as const,
      detail: 'Smart bids can unlock huge value on popular products.',
    },
  ];

  const stats = [
    { label: 'Active players', value: '120K+' },
    { label: 'Auctions completed', value: '2.4M+' },
    { label: 'Items won', value: '680K+' },
    { label: 'Avg. session', value: '8 min' },
  ];

  const trustPoints = [
    'Fast signup and easy onboarding',
    'Transparent real-time auction countdowns',
    'Secure account and payout controls',
  ];

  const faqs = [
    {
      q: 'How do I get Genie Coins?',
      a: 'You can earn coins by watching ads and get additional coins through in-app coin bundles.',
    },
    {
      q: 'Is it free to start?',
      a: 'Yes. New users receive free starter coins so they can explore auctions immediately.',
    },
    {
      q: 'What happens if I win an auction?',
      a: 'If you win, you complete checkout and shipping details in your account to claim your item.',
    },
  ];

  const navItems = [
    { id: 'features', label: 'Features' },
    { id: 'why-genie', label: 'Why Genie' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-[#0F0A1A] text-white overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-120px] left-[-80px] h-[260px] w-[260px] rounded-full bg-[#7C3AED]/25 blur-3xl" />
        <div className="absolute top-[20%] right-[-120px] h-[320px] w-[320px] rounded-full bg-[#F59E0B]/20 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[25%] h-[280px] w-[280px] rounded-full bg-[#6D28D9]/20 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-md bg-[#0F0A1A]/85">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <GenieLogo size="sm" />
            <span className="font-bold tracking-wide">Genie</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/auth/login" className="hidden sm:inline-flex px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
              {user ? 'Dashboard' : 'Sign In'}
            </Link>
            <Link href={user ? '/dashboard' : '/auth/register'} className="genie-btn px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
              {user ? 'Open App' : 'Get Started'}
            </Link>
          </div>
        </div>
        <div className="md:hidden border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-2 flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 text-xs rounded-full border border-white/15 px-3 py-1.5 text-gray-300 hover:text-white hover:border-white/35 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-12 sm:pt-14 sm:pb-14 md:pt-24 md:pb-20">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-14 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-3 py-1 text-xs text-[#C4B5FD] mb-5">
                <Sparkles size={14} /> New users get free starter coins
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Turn everyday screen time into <span className="gradient-text">real wins</span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-7 sm:mb-8">
                Genie gives you a faster, more rewarding way to engage: watch quick ads,
                earn coins instantly, and compete in live penny auctions for premium products.
              </p>
              <div className="space-y-2 mb-7 sm:mb-8">
                {trustPoints.map((point) => (
                  <p key={point} className="flex items-center gap-2 text-sm text-gray-200">
                    <CheckCircle2 size={16} className="text-[#A78BFA] shrink-0" />
                    <span>{point}</span>
                  </p>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={user ? '/dashboard' : '/auth/register'} className="genie-btn-gold genie-btn inline-flex items-center justify-center gap-2 text-sm sm:text-base px-5 sm:px-6 py-3 w-full sm:w-auto">
                  {user ? 'Go to Dashboard' : 'Start Free'} <ArrowRight size={18} />
                </Link>
                <Link href="/demo" className="inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-xl border border-white/15 hover:border-white/30 text-gray-200 hover:text-white transition-colors w-full sm:w-auto">
                  Explore Demo
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="genie-card p-5 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <GenieLogo size="sm" />
                    <span className="text-sm font-semibold text-gray-200">Live Auction Snapshot</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-[#FCD34D]">
                    <Zap size={14} />
                    Trending
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-sm font-medium">Wireless Earbuds Pro</p>
                        <p className="text-xs text-gray-400">Current bid: 348 coins</p>
                      </div>
                      <p className="text-xs text-[#A78BFA]">00:42 left</p>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[78%] bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-sm font-medium">Gaming Console Bundle</p>
                        <p className="text-xs text-gray-400">Current bid: 812 coins</p>
                      </div>
                      <p className="text-xs text-[#A78BFA]">01:27 left</p>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[62%] bg-gradient-to-r from-[#F59E0B] to-[#FCD34D]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="genie-card p-4">
                  <div className="flex items-center gap-2 text-gray-300 mb-1">
                    <Clock3 size={15} />
                    <p className="text-xs">Average Session</p>
                  </div>
                  <p className="font-semibold">8 minutes</p>
                </div>
                <div className="genie-card p-4">
                  <div className="flex items-center gap-2 text-gray-300 mb-1">
                    <ShieldCheck size={15} />
                    <p className="text-xs">Account Safety</p>
                  </div>
                  <p className="font-semibold">Protected</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why-genie" className="scroll-mt-28 mx-auto max-w-6xl px-4 sm:px-6 py-4 sm:py-6 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((item) => (
              <div key={item.label} className="genie-card p-4 sm:p-5 text-center">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text mb-1">{item.value}</p>
                <p className="text-xs sm:text-sm text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="scroll-mt-28 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 md:py-18">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[#A78BFA] font-medium mb-2">Features</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Everything you need to play smart</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Designed for fast onboarding, clear rewards, and high-energy auction moments.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature) => (
              <article key={feature.title} className="genie-card p-6">
                <div className="mb-4">
                  <IconChip icon={feature.icon} tone={feature.tone} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.text}</p>
                <p className="text-xs text-gray-500 mt-3">{feature.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-28 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 md:py-18">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[#A78BFA] font-medium mb-2">How It Works</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Start winning in 3 simple steps</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="genie-card p-6">
              <p className="text-[#FCD34D] font-semibold mb-2">Step 1</p>
              <h3 className="text-lg font-semibold mb-2">Create your account</h3>
              <p className="text-sm text-gray-400">Sign up in seconds and receive free starter coins instantly.</p>
            </div>
            <div className="genie-card p-6">
              <p className="text-[#FCD34D] font-semibold mb-2">Step 2</p>
              <h3 className="text-lg font-semibold mb-2">Grow your coin balance</h3>
              <p className="text-sm text-gray-400">Watch ad slots and stack up coins whenever you want.</p>
            </div>
            <div className="genie-card p-6">
              <p className="text-[#FCD34D] font-semibold mb-2">Step 3</p>
              <h3 className="text-lg font-semibold mb-2">Bid and win</h3>
              <p className="text-sm text-gray-400">Use coins in live auctions and secure big deals.</p>
            </div>
          </div>
        </section>

        <section id="testimonials" className="scroll-mt-28 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 md:py-18">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[#A78BFA] font-medium mb-2">Player Reviews</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">People are already winning with Genie</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <blockquote className="genie-card p-6">
              <p className="text-gray-200 mb-4">“I won my first item in week one. The flow is super easy.”</p>
              <footer className="text-sm text-gray-400">- Jasmine R.</footer>
            </blockquote>
            <blockquote className="genie-card p-6">
              <p className="text-gray-200 mb-4">“Watching short ads between breaks and then bidding is actually fun.”</p>
              <footer className="text-sm text-gray-400">- Marco T.</footer>
            </blockquote>
            <blockquote className="genie-card p-6">
              <p className="text-gray-200 mb-4">“Best rewards app I have tried. Great design and smooth auctions.”</p>
              <footer className="text-sm text-gray-400">- Priya K.</footer>
            </blockquote>
          </div>
          <div className="mt-6 genie-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-gray-200">
              <Users size={16} className="text-[#A78BFA]" />
              <p className="text-sm">Loved by a growing community of bidders</p>
            </div>
            <p className="text-sm text-[#FCD34D]">4.8/5 average player rating</p>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28 mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 md:py-18">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[#A78BFA] font-medium mb-2">FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Common questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item) => (
              <details key={item.q} className="genie-card p-5 group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between gap-3">
                  <span>{item.q}</span>
                  <span className="text-[#A78BFA] text-sm group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-gray-400 mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-14 sm:pb-20">
          <div className="genie-card p-6 sm:p-8 md:p-10 text-center border-[#F59E0B]/30 bg-gradient-to-br from-white/[0.02] to-[#7C3AED]/[0.08]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Ready to start your first win?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-6">
              Join Genie now, claim your free coins, and jump into live penny auctions today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href={user ? '/dashboard' : '/auth/register'} className="genie-btn-gold genie-btn inline-flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto">
                Create Free Account <ArrowRight size={18} />
              </Link>
              <Link href={user ? '/dashboard' : '/auth/login'} className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/15 hover:border-white/30 text-gray-200 hover:text-white transition-colors w-full sm:w-auto">
                {user ? 'Go to Dashboard' : 'I Already Have an Account'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center justify-between">
          <p>© {new Date().getFullYear()} Genie. All rights reserved.</p>
          <p>Watch smart. Bid smarter.</p>
        </div>
      </footer>
    </div>
  );
}
