import React, { createContext, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CookieConsent, { Cookies } from 'react-cookie-consent';

interface CookieContextProps {
  ConsentNotification: () => JSX.Element;
}

const CookieContext = createContext<CookieContextProps>({} as CookieContextProps);

const CookieProvider: React.FC = ({ children }) => {
  const { t } = useTranslation();
  const ConsentNotification = useCallback(() => {
    if (Cookies.get('@GoBarber:cookies') !== 'true')
      return (
        <CookieConsent
          location="bottom"
          buttonText={t('accept')}
          cookieName="enableCookies"
          style={{ background: '#35373a', alignItems: 'center', bottom: '25px' }}
          buttonStyle={{ borderRadius: 5, color: '#fff', backgroundColor: '#7159c1', fontSize: '13px', padding: 12 }}
          expires={150}
          onAccept={() => {
            Cookies.set('@GoBarber:cookies', true);
          }}
          debug
        >
          {t('cookie1')}
          <br />
          <span className="cookie-subtitle">{t('cookie2')}</span>
        </CookieConsent>
      );
    return null;
  }, [t]);
  return <CookieContext.Provider value={{ ConsentNotification }}>{children}</CookieContext.Provider>;
};

const useCookie = (): CookieContextProps => {
  const context = useContext(CookieContext);

  if (!context) {
    throw new Error('useCookie must be used within an CookieProvider');
  }

  return context;
};

export { CookieProvider, useCookie };
