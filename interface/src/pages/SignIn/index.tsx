/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
import { Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import { InputAdornment } from '@material-ui/core';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { ButtonContent } from '../../components';

import { useAuth, useLanguage } from '../../hooks';

import Schemas from '../../validators';

import { TextField, ButtonOutlined } from '../../styles/MaterialUI';

import { Content, LogInIcon, RegisterIcon, ForgotPassIcon, AnimationContainer } from './styles';

const SignIn: React.FC = () => {
  const { signIn, handleForgotPassword, loading } = useAuth();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [flippedCard, setFlippedCard] = useState(false);
  const [isCaptchaValidated, setCaptchaValidated] = useState(null);
  const [hasScriptError, setHasScriptError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const recaptchaRef: any = useRef({});

  const { transform, opacity } = useSpring({
    opacity: flippedCard ? 1 : 0,
    transform: `perspective(600px) rotateX(${flippedCard ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleCaptcha = useCallback(
    async (value: string | null): Promise<void> => {
      if (value) {
        setCaptchaValidated(true);
        if (flippedCard) await handleForgotPassword(email);
        else await signIn(email, password);
      } else setCaptchaValidated(false);
    },
    [email, flippedCard, handleForgotPassword, password, signIn]
  );

  const handleFlipCard = useCallback(() => {
    if (!loading) {
      setEmail('');
      setPassword('');
      setFlippedCard(!flippedCard);
      setShowPassword(false);
    }
  }, [flippedCard, loading]);

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
        <animated.div style={{ display: !flippedCard ? '' : 'none', opacity: opacity.interpolate(o => 1 - Number(o)), transform }}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Schemas('login')}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              setEmail(values.email);
              setPassword(values.password);
              if (isCaptchaValidated || hasScriptError || process.env.NODE_ENV === 'test') {
                await signIn(values.email, values.password);
              } else await recaptchaRef.current?.execute();
              setSubmitting(false);
            }}
          >
            {}
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form className="loginForm" onSubmit={handleSubmit}>
                <h1>{t('sessionStart')}</h1>
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
                    inputProps={{
                      'data-testid': 'email-input',
                    }}
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
                    inputProps={{
                      'data-testid': 'password-input',
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
                          <i className="eye-span">{showPassword ? <FaEyeSlash /> : <FaEye />}</i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className="submit-button">
                  <ButtonOutlined data-testid="login-button" type={!loading ? 'submit' : 'button'} disabled={loading} style={{ display: flippedCard ? 'none' : '' }}>
                    <ButtonContent loading={loading} text="login" />
                  </ButtonOutlined>
                </div>

                <div className="bottom-links">
                  <button type="button" className="back-link" onClick={handleFlipCard} data-testid="flip-forgotpassword">
                    <ForgotPassIcon />
                    {t('forgotpassword')}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </animated.div>

        <animated.div style={{ display: flippedCard ? '' : 'none', opacity, transform: transform.interpolate(trans => `${trans} rotateX(180deg)`) }}>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={Schemas('forgotPassword')}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              setEmail(values.email);
              if (isCaptchaValidated || hasScriptError || process.env.NODE_ENV === 'test') {
                await handleForgotPassword(values.email);
              } else await recaptchaRef.current?.execute();
              setSubmitting(false);
            }}
          >
            {}
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form className="loginForm" onSubmit={handleSubmit}>
                <h1>{t('forgotpassword')}</h1>

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
                    inputProps={{
                      'data-testid': 'email-input-forgotpassword',
                    }}
                  />
                </div>

                <div className="password-reset-message">{t('passwordResetMessage')}</div>

                <div className="submit-button">
                  <ButtonOutlined data-testid="forgotpassword-button" type={!loading ? 'submit' : 'button'} disabled={loading} style={{ display: !flippedCard ? 'none' : '' }}>
                    <ButtonContent loading={loading} text="send" />
                  </ButtonOutlined>
                </div>

                <div className="bottom-links">
                  <button type="button" className="back-link" onClick={handleFlipCard}>
                    <LogInIcon />
                    {t('login')}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </animated.div>

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

        <Link to="/register" className="back-link">
          <RegisterIcon />
          {t('register')}
        </Link>
      </AnimationContainer>
    </Content>
  );
};

export default SignIn;
