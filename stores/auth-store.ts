import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logoutAction } from '@/features/auth';
import { User } from '@/types';
interface AuthState {
  user: Pick<User, 'id' | 'username' | 'email' | 'role'> | null;
  isAuthenticated: boolean;
  setAuth: (user: Pick<User, 'id' | 'username' | 'email' | 'role'> | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuth: (user) => set({ user, isAuthenticated: !!user }),
      logout: async () => {
        await logoutAction();
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
