import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';

import { Content, EyeIcon, EyeSlashIcon, MailIcon, KeyIcon, UserIcon } from './styles';

interface Props {
  touched: boolean;
  errors: string;
  value: string;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  };
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  shoowTooltip?: boolean;
}

export interface IconProps {
  color: string;
}

const NameInput: React.FC<Props> = ({ touched, errors, value, handleChange, handleBlur }) => {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);

  const iconColor = () => {
    if (touched && errors) return 'var(--error)';
    if (focused) return 'var(--primary)';
    return 'var(--light-gray)';
  };

  return (
    <Content>
      <label>{t('name')}</label>
      <input
        name="name"
        type="text"
        placeholder={t('name')}
        onChange={handleChange}
        onBlur={e => {
          handleBlur(e);
          setFocused(false);
        }}
        onFocus={() => setFocused(true)}
        value={value}
        className={touched && errors ? 'error' : null}
        autoComplete="off"
      />
      <i className="placeholder-icon">
        <UserIcon color={iconColor()} />
      </i>
      {touched && errors ? <div className="error-message">{errors}</div> : null}
    </Content>
  );
};

const EmailInput: React.FC<Props> = ({ touched, errors, value, handleChange, handleBlur }) => {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);

  const iconColor = () => {
    if (touched && errors) return 'var(--error)';
    if (focused) return 'var(--primary)';
    return 'var(--light-gray)';
  };

  return (
    <Content>
      <label>{t('email')}</label>
      <input
        name="email"
        type="email"
        placeholder={t('email')}
        onChange={handleChange}
        onBlur={e => {
          handleBlur(e);
          setFocused(false);
        }}
        onFocus={() => setFocused(true)}
        value={value}
        className={touched && errors ? 'error' : null}
        autoComplete="off"
      />
      <i className="placeholder-icon">
        <MailIcon color={iconColor()} />
      </i>
      {touched && errors ? <div className="error-message">{errors}</div> : null}
    </Content>
  );
};

const PasswordInput: React.FC<Props> = ({ touched, errors, value, handleChange, handleBlur, shoowTooltip }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  if (touched && errors) ReactTooltip.show(t('passwordtooltip'));

  const iconColor = () => {
    if (touched && errors) return 'var(--error)';
    if (focused) return 'var(--primary)';
    return 'var(--light-gray)';
  };

  function ShowPassword() {
    return (
      <>
        {!showPassword && (
          <i className="eye-span">
            <EyeIcon onClick={() => setShowPassword(!showPassword)} />
          </i>
        )}
        {showPassword && (
          <i className="eye-span">
            <EyeSlashIcon onClick={() => setShowPassword(!showPassword)} />
          </i>
        )}
      </>
    );
  }

  return (
    <Content>
      <label>{t('password')}</label>
      <input
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder={t('password')}
        onChange={handleChange}
        onBlur={e => {
          handleBlur(e);
          setFocused(false);
        }}
        onFocus={() => setFocused(true)}
        value={value}
        className={touched && errors ? 'error' : null}
        autoComplete="off"
        data-tip={shoowTooltip ? t('passwordtooltip') : null}
      />
      <i className="placeholder-icon">
        <KeyIcon color={iconColor()} />
      </i>
      <ShowPassword />
      {touched && errors ? <div className="error-message">{errors}</div> : null}
      <ReactTooltip type="dark" effect="solid" place="bottom" />
    </Content>
  );
};

export { PasswordInput, EmailInput, NameInput };
