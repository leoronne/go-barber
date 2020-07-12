import express from 'express';

import AppointmentsController from '../app/controllers/AppointmentsController';

const appointmentsRouter = express.Router();

appointmentsRouter.post('/', AppointmentsController.store);
appointmentsRouter.get('/', AppointmentsController.index);

export default appointmentsRouter;
