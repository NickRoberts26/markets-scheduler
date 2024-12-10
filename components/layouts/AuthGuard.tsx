'use client'

import useAuth from '@/auth/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingScreen from '../LoadingScreen';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user && !['/login', '/signup'].includes(pathname)) {
        router.replace('/login');
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  return <>{children}</>;
};

export default AuthGuard;