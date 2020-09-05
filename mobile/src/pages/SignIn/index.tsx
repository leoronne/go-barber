import React, { useCallback, useRef } from 'react';
import { Image, View, KeyboardAvoidingView, ScrollView, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

import i18n from '../../i18n';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/img/logo.png';
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().email(i18n.t('validmail')).trim(i18n.t('validmail')).nullable(false).required(i18n.t('requiredemail')),
          password: Yup.string().trim(i18n.t('requiredpassword')).required(i18n.t('requiredpassword')),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        console.log(err.response);

        Alert.alert('Erro na autenticação', `Ocorreu um erro ao fazer login: ${err.response && err.response.data ? err.response.data.message : err.message}`);
      }
    },
    [signIn]
  );

  return (
    <>
      <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>{i18n.t('sessionStart')}</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn} style={{ width: '100%' }}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder={i18n.t('email')}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder={i18n.t('password')}
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>{i18n.t('sessionStartButton')}</Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText>{i18n.t('forgotpassword')}</ForgotPasswordText>
            </ForgotPassword>
          </Container>

          <CreateAccountButton
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <Icon name="log-in" size={20} color="#7159c1" />
            <CreateAccountButtonText>{i18n.t('register')}</CreateAccountButtonText>
          </CreateAccountButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
