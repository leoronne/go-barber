import React, { createContext, useState, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Cookies } from 'react-cookie-consent';

import api from '../services/api';
// import history from '../services/history';
import notify from '../services/toast';

interface AuthContextProps {
  signIn(email: string, password: string): Promise<void>;
  handleForgotPassword: (email: string) => Promise<void>;
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

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('@GoBarber:token');
    const user = Cookies.get('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    Cookies.remove('@GoBarber:token');
    Cookies.remove('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        setLoading(true);
        const response = await api.post('/session', { email, password });

        const { token, user } = response.data;

        Cookies.set('@GoBarber:token', token);
        Cookies.set('@GoBarber:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });

        // history.push('/dashboard');
      } catch (err) {
        notify(err?.response?.data?.message ? err.response.data.message : err.message, 'error');
        signOut();
      } finally {
        setLoading(false);
      }
    },
    [signOut]
  );

  const handleForgotPassword = useCallback(
    async (email: string): Promise<void> => {
      try {
        setLoading(true);
        await api.post('/user/forgotpassword', { email });
        notify(t('passwordEmail'), 'success');
      } catch (err) {
        notify(err?.response?.data?.message ? err.response.data.message : err.message, 'error');
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  return <AuthContext.Provider value={{ signIn, handleForgotPassword, loading, user: data.user, signOut }}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
