import { Segments, Joi } from 'celebrate';

export default {
  montAvailability: {
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required().error(new Error('Invalid ID')),
    },
  },

  dayAvailability: {
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required().error(new Error('Invalid ID')),
    },
  },
};
