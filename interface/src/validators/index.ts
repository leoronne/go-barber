import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function Schemas(schema: string): Yup.ObjectSchema {
  const { t } = useTranslation();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email(t('validmail')).trim(t('validmail')).nullable(false).required(t('requiredemail')),
    password: Yup.string().trim(t('requiredpassword')).required(t('requiredpassword')),
  });

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email(t('validmail')).trim(t('validmail')).nullable(false).required(t('requiredemail')),
  });

  const registerSchema = Yup.object().shape({
    name: Yup.string().trim(t('validname')).nullable(false).required(t('requiredename')),
    email: Yup.string().email(t('validmail')).trim(t('validmail')).nullable(false).required(t('requiredemail')),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9\S]{6,}$/, t('validpassword'))
      .required(t('requiredpassword')),
  });

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9\S]{6,}$/, t('validpassword'))
      .required(t('requiredpassword')),
    password_confirmation: Yup.string()
      .trim(t('validPassword'))
      .required(t('requiredpassword'))
      .oneOf([Yup.ref('password')], t('matchPassword')),
  });
  // const schema = Yup.object().shape({
  //   name: Yup.string().required('Nome obrigatório'),
  //   email: Yup.string()
  //     .email('Digite email válido')
  //     .required('Email obrigatório'),
  //   oldPassword: Yup.string(),
  //   password: Yup.string().when('oldPassword', {
  //     is: String,
  //     then: Yup.string().min(6),
  //     otherwise: Yup.string(),
  //   }),
  //   passwordConfirmation: Yup.string()
  //     .when('oldPassword', {
  //       is: String,
  //       then: Yup.string().required('Campo obrigatório'),
  //       otherwise: Yup.string(),
  //     })
  //     .oneOf([Yup.ref('password')], 'Senhas diferentes'),
  // });

  switch (schema) {
    case 'login':
      return loginSchema;
    case 'forgotPassword':
      return forgotPasswordSchema;
    case 'register':
      return registerSchema;
    case 'resetPassword':
      return resetPasswordSchema;
    default:
      break;
  }
}
