'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import { PageLoader } from '@/components/ui/spinner';
import { adminApi } from '@/lib/api/admin';
import { tokenStorage } from '@/lib/auth/token';
import type { Admin } from '@/types';

interface AuthContextValue {
  admin: Admin;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth faqat AuthProvider ichida ishlatiladi');
  return context;
}

/** Admin sahifalarini himoyalaydi: token bo'lmasa yoki yaroqsiz bo'lsa login sahifasiga yuboradi */
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const token = tokenStorage.get();
    setHasToken(Boolean(token));
    if (!token) router.replace('/admin/login');
  }, [router]);

  const { data: admin } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: adminApi.me,
    enabled: hasToken === true,
    staleTime: Infinity,
  });

  const logout = useCallback(() => {
    tokenStorage.clear();
    queryClient.clear();
    router.replace('/admin/login');
  }, [queryClient, router]);

  if (!admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <PageLoader />
      </div>
    );
  }

  return <AuthContext.Provider value={{ admin, logout }}>{children}</AuthContext.Provider>;
}
