import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import Button from '../../components/Button';
import { PasswordInput, EmailInput, NameInput } from '../../components/Inputs';

import Schemas from '../../validators';

import api from '../../services/api';
import notify from '../../services/toast';

import { Container, Content, Background, LogInIcon, AnimationContainer } from './styles';

import logo from '~/assets/svg/logo.svg';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleRegister = useCallback(
    async (data: SignUpFormData) => {
      try {
        setLoading(true);
        await api.post('/user', data);
        notify(t('userCreated'), 'success');

        history.push('/');
      } catch (err) {
        notify(err.response && err.response.data ? err.response.data.message : err.message, 'error');
      } finally {
        setLoading(false);
      }
    },
    [history, t]
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Go Barber" />
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            validationSchema={Schemas('register')}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              handleRegister(values);
              setSubmitting(false);
            }}
          >
            {}
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <Content>
                <form className="loginForm" onSubmit={handleSubmit}>
                  <h1>{t('createAccount')}</h1>

                  <NameInput handleBlur={handleBlur} handleChange={handleChange} value={values.name} errors={errors.name} touched={touched.name} />

                  <EmailInput handleBlur={handleBlur} handleChange={handleChange} value={values.email} errors={errors.email} touched={touched.email} />

                  <PasswordInput handleBlur={handleBlur} handleChange={handleChange} value={values.password} errors={errors.password} touched={touched.password} shoowTooltip />

                  <Button disableCond={!!loading} defaultText={t('register')} loading={loading} size={14} />
                </form>
              </Content>
            )}
          </Formik>

          <Link to="/" className="back-link">
            <LogInIcon />
            {t('sessionStartButton')}
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
