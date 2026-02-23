'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Coins, PlayCircle, Trophy, ArrowRight, ShieldCheck, Clock3, Sparkles } from 'lucide-react';
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
    },
    {
      title: 'Bid in Real Time',
      text: 'Use your coins to place penny bids on premium products before countdown ends.',
      icon: Coins,
      tone: 'gold' as const,
    },
    {
      title: 'Win More for Less',
      text: 'Take home high-value items at a fraction of retail cost when you time bids right.',
      icon: Trophy,
      tone: 'green' as const,
    },
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
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-[#0F0A1A] text-white">
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
                The most fun way to <span className="gradient-text">watch, earn, and win</span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-7 sm:mb-8">
                Genie turns your spare moments into rewards. Watch short ads, collect coins,
                and place live bids on products you actually want.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={user ? '/dashboard' : '/auth/register'} className="genie-btn-gold genie-btn inline-flex items-center justify-center gap-2 text-sm sm:text-base px-5 sm:px-6 py-3 w-full sm:w-auto">
                  Start Free <ArrowRight size={18} />
                </Link>
                <Link href="/demo" className="inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-xl border border-white/15 hover:border-white/30 text-gray-200 hover:text-white transition-colors w-full sm:w-auto">
                  Explore Demo
                </Link>
              </div>
            </div>
            <div className="genie-card p-5 sm:p-6 md:p-8">
              <GenieLogo size="lg" className="mx-auto mb-6 float-animation" />
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <IconChip icon={Clock3} tone="purple" />
                  <div>
                    <h3 className="font-semibold">Quick Sessions</h3>
                    <p className="text-sm text-gray-400">Earn in minutes, not hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconChip icon={ShieldCheck} tone="green" />
                  <div>
                    <h3 className="font-semibold">Secure Accounts</h3>
                    <p className="text-sm text-gray-400">Protected login and account controls.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconChip icon={Trophy} tone="gold" />
                  <div>
                    <h3 className="font-semibold">Real Winners</h3>
                    <p className="text-sm text-gray-400">Live auctions with transparent countdowns.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-28 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 md:py-18">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[#A78BFA] font-medium mb-2">Features</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Everything you need to play smart</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built to be simple, exciting, and rewarding from your first session.
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
              <p className="text-sm text-gray-400">Sign up in seconds and receive free starter coins.</p>
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
        </section>

        <section id="faq" className="scroll-mt-28 mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 md:py-18">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[#A78BFA] font-medium mb-2">FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Common questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="genie-card p-5">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-14 sm:pb-20">
          <div className="genie-card p-6 sm:p-8 md:p-10 text-center border-[#F59E0B]/30">
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
