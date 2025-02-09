'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      console.error("Login error:", err); // Logs the error
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-sm md:max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login to Your Account</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button 
              type="button" 
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full mt-4 flex items-center justify-center" 
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : 'Login'}
        </Button>

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
