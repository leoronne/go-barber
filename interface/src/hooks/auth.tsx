import React, { createContext, useState, useCallback, useContext } from 'react';

import api from '../services/api';
import notify from '../services/toast';

interface AuthContextProps {
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
  loading: boolean;
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        const response = await api.post('/session', { email, password });

        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });
      } catch (err) {
        signOut();
        notify(err?.response?.data?.message ? err.response.data.message : err.message, 'error');
      } finally {
        setLoading(false);
      }
    },
    [signOut]
  );

  return <AuthContext.Provider value={{ signIn, loading, user: data.user, signOut }}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
