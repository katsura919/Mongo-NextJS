'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">


      {/* 🔹 Main Content Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-28">
        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-md">Welcome to TaskVenture</h1>
        <p className="text-lg text-gray-600 mt-3">A Role-Based Authentication System</p>

        {!user ? (
          <div className="mt-6 flex space-x-4">
            <Link href="/login">
              <Button className="px-6 py-3 text-lg">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="px-6 py-3 text-lg">Register</Button>
            </Link>
          </div>
        ) : (
          <p className="mt-4 text-lg text-gray-700">Redirecting...</p>
        )}
      </div>
    </main>
  );
}
