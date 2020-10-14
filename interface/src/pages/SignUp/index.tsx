import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import { InputAdornment } from '@material-ui/core';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import api from '../../services/api';
import notify from '../../services/toast';
import { useLanguage } from '../../hooks';

import { ButtonContent } from '../../components';

import Schemas from '../../validators';

import { TextField, ButtonOutlined } from '../../styles/MaterialUI';

import { Content, LogInIcon, AnimationContainer } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [isCaptchaValidated, setCaptchaValidated] = useState(null);
  const [hasScriptError, setHasScriptError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const recaptchaRef: any = useRef({});

  const handleRegister = useCallback(
    async (request: SignUpFormData): Promise<void> => {
      try {
        setLoading(true);
        await api.post('/user', request);
        notify(t('userCreated'), 'success');

        history.push('/');
      } catch (err) {
        notify(err.response && err.response.data ? err.response.data.message : err.message, 'error');
      } finally {
        setLoading(false);
      }
    },
    [t, history]
  );

  const handleCaptcha = useCallback(
    async (value: string | null): Promise<void> => {
      if (value) {
        setCaptchaValidated(true);
        await handleRegister({ name, email, password });
      } else setCaptchaValidated(false);
    },
    [email, name, password, handleRegister]
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
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={Schemas('register')}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            setName(values.name);
            setEmail(values.email);
            setPassword(values.password);

            if (isCaptchaValidated || hasScriptError) {
              await handleRegister(values);
            } else await recaptchaRef.current?.execute();
            setSubmitting(false);
          }}
        >
          {}
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form className="loginForm" onSubmit={handleSubmit}>
              <h1>{t('createAccount')}</h1>
              <div className="field">
                <TextField
                  error={!!(touched.name && errors.name)}
                  name="name"
                  type="text"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  required
                  label={t('name')}
                  helperText={touched.name && errors.name ? errors.name : ''}
                />
              </div>

              <div className="field">
                <TextField
                  error={!!(touched.email && errors.email)}
                  name="email"
                  type="email"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  required
                  label={t('email')}
                  helperText={touched.email && errors.email ? errors.email : ''}
                />
              </div>

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
                  <ButtonContent loading={loading} text="register" />
                </ButtonOutlined>
              </div>
            </form>
          )}
        </Formik>

        <Link to="/" className="back-link">
          <LogInIcon />
          {t('login')}
        </Link>
      </AnimationContainer>
    </Content>
  );
};

export default SignUp;
