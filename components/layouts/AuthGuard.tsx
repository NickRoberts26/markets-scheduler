'use client'

import useAuth from '@/auth/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import BeatLoader from "react-spinners/BeatLoader";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false); // New flag to indicate auth is fully checked
  const pathname = usePathname();

  useEffect(() => {
    // Wait until `loading` is false to ensure authentication status is confirmed
    if (!loading) {
      setAuthChecked(true);
      if (!user && !['/login', '/signup'].includes(pathname)) {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  // Render a loading state until the authentication check is complete
  if (!authChecked) {
    return (
      <div className='flex h-[100vh] justify-center items-center'>
        <BeatLoader
          size={20}
          color='#4caf50'
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>
    );
  }

  // Once authentication check is done, allow rendering of the protected children
  return <>{children}</>;
};

export default AuthGuard;