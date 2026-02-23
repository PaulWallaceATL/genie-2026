'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Play, ShoppingCart, Gavel, User } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/watch', label: 'Watch', icon: Play },
  { href: '/shop', label: 'Shop', icon: ShoppingCart },
  { href: '/auctions', label: 'Auctions', icon: Gavel },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom"
      style={{ background: 'linear-gradient(to top, #0F0A1A, rgba(15, 10, 26, 0.95))' }}>
      <div className="flex items-center justify-around max-w-lg mx-auto px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#A78BFA] scale-105'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#7C3AED]/20' : ''}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
