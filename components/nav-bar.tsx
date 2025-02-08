'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  


  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Left side (Brand + Nav Links) */}
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-bold text-white">Moody Blues</h1>
        <div className="flex space-x-6">
          <Link href="/" className="text-white hover:text-black">Home</Link>
          <Link href="/about" className="text-white hover:text-black">About</Link>
          <Link href="/features" className="text-white hover:text-black">Features</Link>
          <Link href="/contact" className="text-white hover:text-black">Contact</Link>
        </div>
      </div>

      {/* Right side (Login/Logout Button) */}
      {user ? (
        <Button onClick={logout} className="px-6 py-2 bg-white text-black hover:bg-gray-200">
          Logout
        </Button>
      ) : (
        <Link href="/">
          <Button className="px-6 py-2 bg-white text-black hover:bg-gray-200">
            Login
          </Button>
        </Link>
      )}
    </nav>
  );
}
