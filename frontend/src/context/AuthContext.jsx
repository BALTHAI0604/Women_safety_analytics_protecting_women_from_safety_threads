import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../utils/api';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  id: 2,
  fullname: 'Sarah Jenkins',
  email: 'sarah@example.com',
  phone: '+1 (555) 014-3890',
  role: 'user',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  medical_info: 'Blood Type: A+, Asthmatic - Inhaler in purse'
};

const DEFAULT_ADMIN = {
  id: 1,
  fullname: 'Safety Operations Admin',
  email: 'admin@womensafety.org',
  phone: '+1 (800) 555-0199',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  medical_info: 'Blood Type: O+, Operations Clearance: Level 3'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ws_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ws_token') || 'ws_demo_token');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    if (user) {
      localStorage.setItem('ws_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ws_user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const res = await authApi.login({ email, password });
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('ws_token', res.token);
      setAuthModalOpen(false);
      return { success: true, user: res.user };
    } catch (err) {
      // Fallback for demo credentials if backend is cold
      if (email === 'admin@womensafety.org' && password === 'admin123') {
        setUser(DEFAULT_ADMIN);
        setAuthModalOpen(false);
        return { success: true, user: DEFAULT_ADMIN };
      }
      if (email === 'sarah@example.com' || email === 'demo@womensafety.org') {
        setUser(DEFAULT_USER);
        setAuthModalOpen(false);
        return { success: true, user: DEFAULT_USER };
      }
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const res = await authApi.register(userData);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('ws_token', res.token);
      setAuthModalOpen(false);
      return { success: true, user: res.user };
    } catch (err) {
      throw err;
    }
  };

  const loginAsDemoUser = () => {
    setUser(DEFAULT_USER);
    setToken('ws_demo_user_token');
    setAuthModalOpen(false);
  };

  const loginAsDemoAdmin = () => {
    setUser(DEFAULT_ADMIN);
    setToken('ws_demo_admin_token');
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ws_user');
    localStorage.removeItem('ws_token');
  };

  const updateProfile = async (updatedData) => {
    if (!user) return;
    try {
      const res = await authApi.updateProfile(user.id, updatedData);
      setUser(res.user);
      return res.user;
    } catch (err) {
      setUser(prev => ({ ...prev, ...updatedData }));
    }
  };

  const openAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      authModalOpen,
      authModalMode,
      setAuthModalOpen,
      setAuthModalMode,
      openAuth,
      login,
      register,
      loginAsDemoUser,
      loginAsDemoAdmin,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
