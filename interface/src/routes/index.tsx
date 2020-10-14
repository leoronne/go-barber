import React from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from 'react-router-dom';

import Route from './Route';

import { SignIn, SignUp, Dashboard, ResetPassword, Profile } from '../pages';

const Routes: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Switch>
      <Route path="/" title={t('login')} direction="right" exact component={SignIn} />
      <Route path="/register" title={t('register')} direction="left" component={SignUp} />
      <Route path="/reset-password" title={t('createPassword')} direction="left" component={ResetPassword} />

      <Route path="/dashboard" title={t('dashboard')} component={Dashboard} isPrivate />
      {/* <Route path="/profile" title={t('profile')} component={Profile} isPrivate /> */}
    </Switch>
  );
};

export default Routes;
