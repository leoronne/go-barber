import { Router } from 'express';
import { celebrate } from 'celebrate';

import ensureAuthentication from '@shared/infra/http/middlewares/AuthMiddleware';
import ProvidersController from '@modules/appointments/controllers/ProvidersController';
import ProvidersMonthAvailabilitycontroller from '@modules/appointments/controllers/ProvidersMonthAvailabilityController';
import ProvidersDayAvailabilityController from '@modules/appointments/controllers/ProvidersDayAvailabilityController';

import ProvidersValidator from '@modules/appointments/infra/http/validators/ProvidersValidator';

const providersRouter = Router();

providersRouter.use(ensureAuthentication);

providersRouter
  .get('/', ProvidersController.index)
  .get('/:provider_id/month-availability', celebrate(ProvidersValidator.monthAvailability), ProvidersMonthAvailabilitycontroller.index)
  .get('/:provider_id/day-availability', celebrate(ProvidersValidator.dayAvailability), ProvidersDayAvailabilityController.index);

export default providersRouter;
