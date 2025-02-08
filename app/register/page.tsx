'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const { register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user'); // Default role: user

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(email, password, role);
    router.push('/login'); // Redirect to login after successful registration
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-96 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        
        <Input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <Input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        {/* Role Selection */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Select Role:</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as 'user' | 'admin')} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button type="submit" className="mt-4 w-full">Register</Button>

        {/* Login Button */}
        <p className="text-sm text-center mt-4">
          Already have an account?  
          <Button 
            variant="link" 
            className="ml-1 text-blue-500"
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
