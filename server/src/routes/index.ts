import express from 'express';

import uploadConfig from '../config/upload';

import appointmentsRouter from './appointments.routes';
import userRouter from './user.routes';
import sessionRouter from './session.routes';

import AuthMiddleware from '../middlewares/AuthMiddleware';

const routes = express.Router();

const Development = [
  'Go Barber - Go Stack',
  {
    'Made by': 'Leonardo Ronne',
    GitHub: 'https://github.com/leoronne',
  },
];

routes
  // Copyright
  .get('/', (req, res) => {
    res.status(200).send({
      Development,
    });
  })
  .use('/files', express.static(uploadConfig.directory))
  .use('/user', userRouter)
  .use('/session', sessionRouter)
  .use(AuthMiddleware)
  .use('/appointments', appointmentsRouter);

export default routes;
