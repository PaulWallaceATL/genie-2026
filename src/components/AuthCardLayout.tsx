'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { GenieLogo } from './BrandIcons';

export default function AuthCardLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7C3AED]/20 blur-3xl" />
      </div>
      <div className="w-full max-w-sm genie-card p-6 sm:p-7">
        <div className="text-center mb-8">
          <GenieLogo size="md" className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold gradient-text">{title}</h1>
          <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
        </div>

        {children}
        {footer}
      </div>
      <p className="text-center mt-4 text-xs text-gray-500">
        Want a quick preview?{' '}
        <Link href="/demo" className="text-[#FCD34D] hover:text-white transition-colors font-medium">
          Enter demo accounts
        </Link>
      </p>
    </div>
  );
}

