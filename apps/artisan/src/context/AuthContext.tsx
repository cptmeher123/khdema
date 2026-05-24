import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Artisan {
  phone: string;
  name: string;
  service: string;
  zone: string;
  isNewUser: boolean;
}

interface AuthContextType {
  artisan: Artisan | null;
  isAuthenticated: boolean;
  login: (phone: string) => void;
  completeProfile: (name: string, service: string, zone: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [artisan, setArtisan] = useState<Artisan | null>(null);

  const login = (phone: string) => {
    const isNewUser = !phone.endsWith('1');
    if (!isNewUser) {
      setArtisan({ phone, name: 'Mohamed Sassi', service: 'Plombier', zone: 'Ariana', isNewUser: false });
    } else {
      setArtisan({ phone, name: '', service: '', zone: '', isNewUser: true });
    }
  };

  const completeProfile = (name: string, service: string, zone: string) => {
    setArtisan(prev => prev ? { ...prev, name, service, zone, isNewUser: false } : null);
  };

  const logout = () => setArtisan(null);

  return (
    <AuthContext.Provider value={{ artisan, isAuthenticated: !!artisan && !artisan.isNewUser, login, completeProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
