import { Segments, Joi } from 'celebrate';

export default {
  store: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().error(new Error('Invalid email')),
      password: Joi.string().required().error(new Error('Invalid password')),
    }),
  },
};
