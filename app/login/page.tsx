'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-96 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" className="mt-4 w-full">Login</Button>
        
        {/* Register Button */}
        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?
          <Button 
            variant="link" 
            className="ml-1 text-blue-500"
            onClick={() => router.push('/register')}
          >
            Register
          </Button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
