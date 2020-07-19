import { Segments, Joi } from 'celebrate';

export default {
  store: {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().error(new Error('Invalid name')),
      email: Joi.string().required().email().error(new Error('Invalid email')),
      password: Joi.string().required().regex(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})`)).error(new Error('Invalid password!')),
    }),
  },
  forgotpassword: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().error(new Error('Invalid email')),
    }),
  },
  resetpassword: {
    [Segments.BODY]: {
      token: Joi.string().uuid().required().error(new Error('Invalid token')),
      password: Joi.string().required().regex(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})`)).error(new Error('Invalid password!')),
      passwordConfirmation: Joi.string().required().regex(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})`)).error(new Error('Invalid password!')),
    },
  },
};
