import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function Schemas(schema: string): Yup.ObjectSchema {
  const { t } = useTranslation();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email(t('validmail')).trim(t('validmail')).nullable(false).required(t('requiredemail')),
    password: Yup.string().required(t('requiredpassword')),
  });

  const registerSchema = Yup.object().shape({
    name: Yup.string().trim(t('validname')).required(t('requiredename')),
    email: Yup.string().email(t('validmail')).trim(t('validmail')).nullable(false).required(t('requiredemail')),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9\S]{6,}$/, t('validpassword'))
      .required(t('requiredpassword')),
  });

  switch (schema) {
    case 'login':
      return loginSchema;
    case 'register':
      return registerSchema;
    default:
      break;
  }
}
