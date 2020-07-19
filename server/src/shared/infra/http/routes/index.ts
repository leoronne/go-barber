import express from 'express';

import uploadConfig from '@config/upload';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import sessionRouter from '@modules/sessions/infra/http/routes/session.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

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
  .use('/files', express.static(uploadConfig.uploadsFolder))
  .use('/user', userRouter)
  .use('/profile', profileRouter)
  .use('/session', sessionRouter)
  .use('/appointments', appointmentsRouter)
  .use('/providers', providersRouter);

export default routes;
