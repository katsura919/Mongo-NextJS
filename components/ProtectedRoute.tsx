'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (user === null) return; // Wait for auth to be initialized

    if (!allowedRoles.includes(user.role)) {
      router.replace('/dashboard');
    } else {
      setAuthChecked(true);
    }
  }, [user, allowedRoles, router]);

  if (!authChecked) return <p>Loading...</p>; // Prevent flickering while checking auth state

  return <>{children}</>;
};

export default ProtectedRoute;
