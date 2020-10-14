/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useState, useContext } from 'react';
import { Cookies } from 'react-cookie-consent';

import { ThemeName, themes } from '../styles/themes';

interface ChangeThemeContextProps {
  themeName: 'light' | 'dark';
  handleChangeTheme: () => void;
  currentTheme: Object;
}

const ChangeThemeContext = createContext<ChangeThemeContextProps>({} as ChangeThemeContextProps);

const ChangeThemeProvider: React.FC = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>(Cookies.get('@GoBarber:theme') === 'dark' ? 'dark' : 'light');
  const currentTheme = themes[themeName];

  const handleChangeTheme = () => {
    const theme = themeName === 'light' ? 'dark' : 'light';
    setThemeName(theme);
    Cookies.set('@GoBarber:theme', theme);
  };

  return <ChangeThemeContext.Provider value={{ themeName, handleChangeTheme, currentTheme }}>{children}</ChangeThemeContext.Provider>;
};

const useChangeTheme = (): ChangeThemeContextProps => {
  const context = useContext(ChangeThemeContext);

  if (!context) {
    throw new Error('useChangeTheme must be used within an ChangeThemeProvider');
  }

  return context;
};

export { ChangeThemeProvider, useChangeTheme };
