import React from 'react';

import { LanguageProvider, useLanguage } from './useLanguage';
import { ChangeThemeProvider, useChangeTheme } from './useTheme';
import { AuthProvider, useAuth } from './useAuth';
import { CookieProvider, useCookie } from './useCookie';

const AppProvider: React.FC = ({ children }) => {
  return (
    <CookieProvider>
      <LanguageProvider>
        <ChangeThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ChangeThemeProvider>
      </LanguageProvider>
    </CookieProvider>
  );
};

export { useAuth, useLanguage, useChangeTheme, useCookie };
export default AppProvider;
