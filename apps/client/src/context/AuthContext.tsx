import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  phone: string;
  name: string;
  zone: string;
  isNewUser: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string) => void;
  completeProfile: (name: string, zone: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (phone: string) => {
    // Check if returning user (mock: numbers ending in 1 are returning users)
    const isNewUser = !phone.endsWith('1');
    if (!isNewUser) {
      setUser({ phone, name: 'Sarra B.', zone: 'Ariana', isNewUser: false });
    } else {
      setUser({ phone, name: '', zone: '', isNewUser: true });
    }
  };

  const completeProfile = (name: string, zone: string) => {
    setUser(prev => prev ? { ...prev, name, zone, isNewUser: false } : null);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user && !user.isNewUser, login, completeProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
