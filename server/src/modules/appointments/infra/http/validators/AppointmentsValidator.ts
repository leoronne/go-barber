import { Segments, Joi } from 'celebrate';

export default {
  store: {
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required().error(new Error('Invalid ID')),
      date: Joi.date().error(new Error('Invalid date')),
    },
  },
};
