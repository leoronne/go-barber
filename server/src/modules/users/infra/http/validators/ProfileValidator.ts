import { Segments, Joi } from 'celebrate';

export default {
  store: {
    [Segments.BODY]: {
      name: Joi.string().required().error(new Error('Invalid name')),
      email: Joi.string().required().email().error(new Error('Invalid email')),
      oldPassword: Joi.string().required().regex(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})`)).error(new Error('Invalid password!')),
      password: Joi.string().when('oldPassword', {
        is: String,
        then: Joi.string().required().regex(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})`)).error(new Error('Invalid password!')),
      }),
      passwordConfirmation: Joi.string().when('oldPassword', {
        is: String,
        then: Joi.string().required().valid(Joi.ref('password')),
      }),
    },
  },
};
