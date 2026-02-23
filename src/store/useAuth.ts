'use client';

import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  username: string;
  coins: number;
  total_ads_watched: number;
  created_at?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setCoins: (coins: number) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setCoins: (coins) => set((state) => state.user ? { user: { ...state.user, coins } } : {}),
  fetchUser: async () => {
    try {
      set({ loading: true });
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        set({ user: data.user, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch {
      set({ user: null, loading: false });
    }
  },
  logout: async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    set({ user: null });
  },
}));
