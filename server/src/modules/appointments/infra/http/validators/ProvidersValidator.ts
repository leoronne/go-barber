import { Segments, Joi } from 'celebrate';

export default {
  monthAvailability: {
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required().error(new Error('Invalid ID')),
    },
    [Segments.QUERY]: {
      month: Joi.number().error(new Error('Invalid month')),
      year: Joi.number().error(new Error('Invalid year')),
    },
  },

  dayAvailability: {
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required().error(new Error('Invalid ID')),
    },
    [Segments.QUERY]: {
      day: Joi.number().error(new Error('Invalid day')),
      month: Joi.number().error(new Error('Invalid month')),
      year: Joi.number().error(new Error('Invalid year')),
    },
  },
};
