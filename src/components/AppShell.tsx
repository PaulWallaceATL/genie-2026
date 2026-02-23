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
    <div className="min-h-screen flex flex-col">
      <TopBar title={title} />
      <main className="flex-1 px-4 pb-24 overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
