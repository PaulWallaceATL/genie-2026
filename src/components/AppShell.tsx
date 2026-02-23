'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/useAuth';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import { GenieLogo } from './BrandIcons';

export default function AppShell({ children, title }: { children: React.ReactNode; title?: string }) {
  const { user, loading, fetchUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/demo');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <GenieLogo size="lg" className="float-animation mx-auto" />
          <p className="text-[#A78BFA] font-medium">Loading Genie...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0A1A]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-8 h-48 w-48 rounded-full bg-[#7C3AED]/15 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-56 w-56 rounded-full bg-[#F59E0B]/10 blur-3xl" />
      </div>
      <TopBar title={title} />
      <main className="flex-1 px-4 pb-24 overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
