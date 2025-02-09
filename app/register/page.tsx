'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    // Email validation (basic)
    if (!email.includes('@')) {
      newErrors.email = 'Invalid email address';
    }

    // Password validation
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (password !== confirmPassword) {
      newErrors.password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register(username, email, password, role);
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
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
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create an Account</h2>
        
        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <Input 
            type="text" 
            placeholder="Enter username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

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
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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

        {/* Confirm Password Input */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <Input 
            type={showPassword ? "text" : "password"} 
            placeholder="Confirm password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as 'user' | 'admin')} 
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full mt-4" 
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>

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
