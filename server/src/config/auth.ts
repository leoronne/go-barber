import { AUTH_KEY, TOKEN_EXPIRATION_TIME } from '@shared/utils/environment';

interface IAuthConfig {
  secret: string;
  expiresIn: string;
}

export default {
  secret: AUTH_KEY,
  expiresIn: TOKEN_EXPIRATION_TIME,
} as IAuthConfig;
