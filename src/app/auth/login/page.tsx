'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/store/useAuth';
import AuthCardLayout from '@/components/AuthCardLayout';
import { FieldInput, FieldLabel, InfoBanner } from '@/components/PageBits';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setUser(data.user);
      router.push('/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCardLayout
      title="Welcome Back"
      subtitle="Sign in to your Genie account"
      footer={
        <p className="text-center mt-6 text-gray-400 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-[#A78BFA] hover:text-white transition-colors font-medium">
            Create one
          </Link>
        </p>
      }
    >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <InfoBanner tone="red">
              {error}
            </InfoBanner>
          )}

          <div>
            <FieldLabel>Email</FieldLabel>
            <FieldInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <FieldLabel>Password</FieldLabel>
            <FieldInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="genie-btn w-full py-3.5 text-base disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
    </AuthCardLayout>
  );
}
