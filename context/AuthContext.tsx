'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { registerUser, loginUser } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: { email: string; role: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginUser(email, password);
      const userData = { email, role: data.role };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      router.push(data.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const register = async (email: string, password: string, role: string) => {
    try {
      await registerUser(email, password, role);
      await login(email, password);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
