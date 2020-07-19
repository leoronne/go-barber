import express from 'express';
import { celebrate } from 'celebrate';

import SessionController from '@modules/sessions/controllers/SessionController';

import SessionsValidator from '@modules/sessions/infra/http/validators/SessionsValidator';

const sessionRouter = express.Router();

sessionRouter.post('/', celebrate(SessionsValidator.store), SessionController.store);

export default sessionRouter;
