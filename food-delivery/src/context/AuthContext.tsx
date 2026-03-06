import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CustomerProfile } from '../data/types';
import { api } from '../services/api';

interface AuthState {
  token: string | null;
  customer: CustomerProfile | null;
  isLoggedIn: boolean;
  loginWithGoogle: (googleData: { googleId: string; email: string; name: string; avatarUrl: string }) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      api.get<CustomerProfile>('/customer/profile').then(setCustomer).catch(() => {
        setToken(null);
        setCustomer(null);
      });
    } else {
      localStorage.removeItem('token');
      setCustomer(null);
    }
  }, [token]);

  const loginWithGoogle = async (googleData: { googleId: string; email: string; name: string; avatarUrl: string }) => {
    const res = await api.post<{ token: string; customer: CustomerProfile }>('/auth/google', googleData);
    setToken(res.token);
    setCustomer(res.customer);
  };

  const logout = () => setToken(null);

  const refreshProfile = async () => {
    if (token) {
      const profile = await api.get<CustomerProfile>('/customer/profile');
      setCustomer(profile);
    }
  };

  return (
    <AuthContext.Provider value={{ token, customer, isLoggedIn: !!token, loginWithGoogle, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be within AuthProvider');
  return ctx;
}
