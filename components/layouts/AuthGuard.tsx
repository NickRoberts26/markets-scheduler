'use client'

import useAuth from '@/auth/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicPaths = ['/login', '/signup', '/admin-signup'];

  useEffect(() => {
    if (!user && !publicPaths.includes(pathname)) {
      router.push('/login');
    }
  }, [user, router]);

  if (user || publicPaths.includes(pathname)) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
