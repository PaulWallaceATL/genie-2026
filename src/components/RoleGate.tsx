'use client';

import Link from 'next/link';
import { useAuth, type UserRole } from '@/store/useAuth';

export default function RoleGate({
  allowedRoles,
  children,
}: {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <div className="genie-card p-6 text-center">
        <h3 className="text-lg font-bold text-white mb-2">Sign in required</h3>
        <p className="text-sm text-gray-400 mb-4">Choose a demo account to continue.</p>
        <Link href="/demo" className="genie-btn inline-block px-5 py-2.5">
          Go to Demo Accounts
        </Link>
      </div>
    );
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="genie-card p-6 text-center">
        <h3 className="text-lg font-bold text-white mb-2">This area is role-restricted</h3>
        <p className="text-sm text-gray-400 mb-4">
          You are signed in as <span className="text-[#A78BFA] font-semibold">{user.role}</span>.
        </p>
        <Link href="/demo" className="genie-btn inline-block px-5 py-2.5">
          Switch Demo Role
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
