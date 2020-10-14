import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import { InputAdornment } from '@material-ui/core';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { ButtonContent } from '../../components';

import api from '../../services/api';
import notify from '../../services/toast';
import { useLanguage } from '../../hooks';

import Schemas from '../../validators';

import { TextField, ButtonOutlined } from '../../styles/MaterialUI';

import { Content, AnimationContainer } from './styles';

const ResetPassword: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [isCaptchaValidated, setCaptchaValidated] = useState(null);
  const [hasScriptError, setHasScriptError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCDPassword, setShowCDPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [CDpassword, setCDPassword] = useState<string>('');

  const recaptchaRef: any = useRef({});

  const { search } = window.location;
  const params = new URLSearchParams(search);
  const token = params.get('token');

  if (!token) {
    history.push('/');
    notify(t('noToken'), 'error');
  }

  const handlePasswordReset = useCallback(
    async (pass: string, password_confirmation: string): Promise<void> => {
      try {
        setLoading(true);
        const body = {
          password: pass,
          password_confirmation,
          token,
        };
        await api.post('user/password/reset', body);
        notify(t('passwordCreated'), 'success');

        history.push('/');
      } catch (err) {
        notify(err.response && err.response.data ? err.response.data.message : err.message, 'error');
      } finally {
        setLoading(false);
      }
    },
    [t, history, token]
  );

  const handleCaptcha = useCallback(
    async (value: string | null): Promise<void> => {
      if (value) {
        setCaptchaValidated(true);
        await handlePasswordReset(password, CDpassword);
      } else setCaptchaValidated(false);
    },
    [password, CDpassword, handlePasswordReset]
  );

  const loadRecaptcha = useCallback(() => {
    try {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://www.google.com/recaptcha/api.js';
      document.body.appendChild(script);
      script.onerror = () => {
        setHasScriptError(true);
      };
    } catch (err) {
      setHasScriptError(true);
    }
  }, []);

  useEffect(() => {
    loadRecaptcha();
  }, [loadRecaptcha]);

  return (
    <Content>
      <AnimationContainer>
        <Formik
          initialValues={{
            password: '',
            password_confirmation: '',
          }}
          validationSchema={Schemas('resetPassword')}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            setPassword(values.password);
            setCDPassword(values.password_confirmation);

            if (isCaptchaValidated || hasScriptError) {
              await handlePasswordReset(values.password, values.password_confirmation);
            } else await recaptchaRef.current?.execute();
            setSubmitting(false);
          }}
        >
          {}
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form className="loginForm" onSubmit={handleSubmit}>
              <h1>{t('newPassword')}</h1>

              <div className="field">
                <TextField
                  error={!!(touched.password && errors.password)}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  required
                  label={t('password')}
                  helperText={touched.password && errors.password ? errors.password : ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
                        <i className="eye-span">{showPassword ? <FaEyeSlash /> : <FaEye />}</i>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="field">
                <TextField
                  error={!!(touched.password_confirmation && errors.password_confirmation)}
                  name="password_confirmation"
                  type={showCDPassword ? 'text' : 'password'}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_confirmation}
                  required
                  label={t('passwordConfirmation')}
                  helperText={touched.password_confirmation && errors.password_confirmation ? errors.password_confirmation : ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={() => setShowCDPassword(!showCDPassword)}>
                        <i className="eye-span">{showCDPassword ? <FaEyeSlash /> : <FaEye />}</i>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="captcha">
                <ReCAPTCHA
                  hl={language}
                  size="invisible"
                  sitekey={String(process.env.REACT_APP_RECAPTCHA_SITEKEY)}
                  ref={recaptchaRef}
                  onChange={handleCaptcha}
                  onErrored={() => setHasScriptError(true)}
                />
              </div>

              <div className="submit-button">
                <ButtonOutlined type={!loading ? 'submit' : 'button'} disabled={loading}>
                  <ButtonContent loading={loading} text="confirm" />
                </ButtonOutlined>
              </div>
            </form>
          )}
        </Formik>
      </AnimationContainer>
    </Content>
  );
};

export default ResetPassword;
