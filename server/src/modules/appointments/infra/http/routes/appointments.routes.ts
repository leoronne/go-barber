import express from 'express';
import { celebrate } from 'celebrate';

import AppointmentsController from '@modules/appointments/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/controllers/ProviderAppointmentsController';
import AppointmentsValidator from '@modules/appointments/infra/http/validators/AppointmentsValidator';

import ensureAuthentication from '@shared/infra/http/middlewares/AuthMiddleware';

const appointmentsRouter = express.Router();

appointmentsRouter.use(ensureAuthentication);
appointmentsRouter
  .post('/', celebrate(AppointmentsValidator.store), AppointmentsController.store)

  .get('/me', celebrate(AppointmentsValidator.index), ProviderAppointmentsController.index);

export default appointmentsRouter;
