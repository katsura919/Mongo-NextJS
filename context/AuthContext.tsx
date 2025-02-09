'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { registerUser, loginUser } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface UserType {
  _id: string; // Change 'id' to '_id'
  username: string;
  email: string;
  role: string;
  profilePicture: string;
}


interface AuthContextType {
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
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
      console.log('Login Response:', data);
  
      const userData: UserType = {
        _id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        role: data.user.role,
        profilePicture: data.user.profilePicture || '', // Default to empty if not set
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
  
      // Redirect based on role
      router.push(userData.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const register = async (username: string, email: string, password: string, role: string) => {
    try {
      await registerUser(username, email, password, role);
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
