import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSpring, animated as a } from 'react-spring';
import { Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';

import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';
import { PasswordInput, EmailInput } from '../../components/Inputs';

import Schemas from '../../validators';

import { Container, Content, Background, LogInIcon, RegisterIcon, ForgotPassIcon, AnimationContainer } from './styles';

import logo from '~/assets/svg/logo.svg';

const SignIn: React.FC = () => {
  const { signIn, loading } = useAuth();
  const { t } = useTranslation();
  const [flippedCard, setFlippedCard] = useState(false);
  const [isCaptchaValidated, setCaptchaValidated] = useState(null);

  const { transform, opacity } = useSpring({
    opacity: flippedCard ? 1 : 0,
    transform: `perspective(600px) rotateX(${flippedCard ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://www.google.com/recaptcha/api.js';
    document.body.appendChild(script);
  }, []);

  function verifyCallback(recaptchaToken) {
    setCaptchaValidated(recaptchaToken);
  }

  const handleFlippedCard = () => {
    if (!loading) {
      setFlippedCard(!flippedCard);
      setCaptchaValidated(null);
    }
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Go Barber" />

          <a.div style={{ display: !flippedCard ? '' : 'none', opacity: opacity.interpolate(o => 1 - Number(o)), transform }}>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Schemas('login')}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                signIn(values.email, values.password);
                setSubmitting(false);
              }}
            >
              {}
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Content>
                  <form className="loginForm" onSubmit={handleSubmit}>
                    <h1>{t('sessionStart')}</h1>

                    <EmailInput handleBlur={handleBlur} handleChange={handleChange} value={values.email} errors={errors.email} touched={touched.email} />

                    <PasswordInput handleBlur={handleBlur} handleChange={handleChange} value={values.password} errors={errors.password} touched={touched.password} />

                    <Button disableCond={!loading ? false : true} defaultText={t('sessionStartButton')} loading={loading} size={14} />

                    <div className="bottom-links">
                      <span className="back-link" onClick={handleFlippedCard}>
                        <ForgotPassIcon />
                        {t('forgotpassword')}
                      </span>
                    </div>
                  </form>
                </Content>
              )}
            </Formik>
          </a.div>

          <a.div style={{ display: flippedCard ? '' : 'none', opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={Schemas('login')}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                setSubmitting(false);
              }}
            >
              {}
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Content>
                  <form className="loginForm" onSubmit={handleSubmit}>
                    <h1>{t('forgotpassword')}</h1>

                    <EmailInput handleBlur={handleBlur} handleChange={handleChange} value={values.email} errors={errors.email} touched={touched.email} />

                    <div className="captcha">
                      <ReCAPTCHA size="normal" render="explicit" sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY} onChange={verifyCallback} />
                    </div>

                    <Button disableCond={loading || !isCaptchaValidated ? true : false} defaultText={t('sessionStartButton')} loading={loading} size={14} />

                    <div className="bottom-links">
                      <span className="back-link" onClick={handleFlippedCard}>
                        <LogInIcon />
                        {t('sessionStartButton')}
                      </span>
                    </div>
                  </form>
                </Content>
              )}
            </Formik>
          </a.div>

          <Link to="/register" className="back-link">
            <RegisterIcon />
            {t('register')}
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
