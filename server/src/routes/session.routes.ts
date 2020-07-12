import express from 'express';

import SessionController from '../app/controllers/SessionController';

const sessionRouter = express.Router();

sessionRouter.post('/', SessionController.store);

export default sessionRouter;
