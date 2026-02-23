'use client';

import { create } from 'zustand';

export type UserRole = 'guest' | 'buyer' | 'seller' | 'admin';

export interface User {
  id: string;
  email: string;
  username: string;
  coins: number;
  total_ads_watched: number;
  created_at?: string;
  role: UserRole;
  demo?: boolean;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isDemoMode: boolean;
  setUser: (user: User | null) => void;
  setCoins: (coins: number) => void;
  setAdsWatched: (total_ads_watched: number) => void;
  demoLogin: (role: UserRole) => void;
  demoLogout: () => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const demoProfiles: Record<UserRole, Omit<User, 'id'>> = {
  guest: {
    email: 'guest@demo.genie',
    username: 'Guest Viewer',
    coins: 0,
    total_ads_watched: 0,
    created_at: new Date().toISOString(),
    role: 'guest',
    demo: true,
  },
  buyer: {
    email: 'buyer@demo.genie',
    username: 'Ava Buyer',
    coins: 120,
    total_ads_watched: 17,
    created_at: '2026-01-15T10:30:00.000Z',
    role: 'buyer',
    demo: true,
  },
  seller: {
    email: 'seller@demo.genie',
    username: 'Sam Seller',
    coins: 45,
    total_ads_watched: 6,
    created_at: '2025-11-02T12:00:00.000Z',
    role: 'seller',
    demo: true,
  },
  admin: {
    email: 'admin@demo.genie',
    username: 'Alex Admin',
    coins: 999,
    total_ads_watched: 42,
    created_at: '2025-07-01T08:00:00.000Z',
    role: 'admin',
    demo: true,
  },
};

const normalizeUser = (user: Partial<User> & Pick<User, 'id' | 'email' | 'username'>): User => ({
  id: user.id,
  email: user.email,
  username: user.username,
  coins: user.coins ?? 0,
  total_ads_watched: user.total_ads_watched ?? 0,
  created_at: user.created_at,
  role: user.role ?? 'buyer',
  demo: user.demo ?? false,
});

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  isDemoMode: false,
  setUser: (user) => set({ user: user ? normalizeUser(user) : null, loading: false }),
  setCoins: (coins) => set((state) => state.user ? { user: { ...state.user, coins } } : {}),
  setAdsWatched: (total_ads_watched) => set((state) => state.user ? { user: { ...state.user, total_ads_watched } } : {}),
  demoLogin: (role) => {
    const profile = demoProfiles[role];
    set({
      user: {
        id: `demo-${role}`,
        ...profile,
      },
      loading: false,
      isDemoMode: true,
    });
  },
  demoLogout: () => set({ user: null, loading: false, isDemoMode: false }),
  fetchUser: async () => {
    if (get().isDemoMode) {
      set({ loading: false });
      return;
    }

    try {
      set({ loading: true });
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        set({ user: normalizeUser(data.user), loading: false, isDemoMode: false });
      } else {
        set({ user: null, loading: false, isDemoMode: false });
      }
    } catch {
      set({ user: null, loading: false, isDemoMode: false });
    }
  },
  logout: async () => {
    if (get().isDemoMode) {
      set({ user: null, loading: false, isDemoMode: false });
      return;
    }

    await fetch('/api/auth/logout', { method: 'POST' });
    set({ user: null, loading: false, isDemoMode: false });
  },
}));
