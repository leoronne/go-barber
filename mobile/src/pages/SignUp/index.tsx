import React, { useRef, useCallback } from 'react';
import { Image, View, KeyboardAvoidingView, ScrollView, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

import i18n from '../../i18n';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/img/logo.png';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().trim(i18n.t('validname')).required(i18n.t('requiredename')),
          email: Yup.string().email(i18n.t('validmail')).trim(i18n.t('validmail')).nullable(false).required(i18n.t('requiredemail')),
          password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9\S]{6,}$/, i18n.t('validpassword'))
            .required(i18n.t('requiredpassword')),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/user', data);

        Alert.alert(i18n.t('userCreated'), i18n.t('userCanLogin'));
        navigation.goBack();
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        Alert.alert('Erro na criação', 'Ocorreu um erro ao tentar criar a conta');
      }
    },
    [navigation]
  );

  return (
    <>
      <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>{i18n.t('createAccount')}</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp} style={{ width: '100%' }}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder={i18n.t('name')}
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder={i18n.t('email')}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder={i18n.t('password')}
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>{i18n.t('register')}</Button>
            </Form>
          </Container>

          <BackToSignIn
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>{i18n.t('sessionStart')}</BackToSignInText>
          </BackToSignIn>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
