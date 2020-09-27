import express from 'express';
import multer from 'multer';
import { celebrate } from 'celebrate';

import uploadConfig from '@config/upload';

import UsersController from '@modules/users/controllers/UsersController';
import UsersValidator from '@modules/users/infra/http/validators/UsersValidator';

import ensureAuthentication from '@shared/infra/http/middlewares/AuthMiddleware';

const userRouter = express.Router();
const upload = multer(uploadConfig.multer);

userRouter
  .post('/', celebrate(UsersValidator.store), UsersController.store)
  .post('/forgotpassword', celebrate(UsersValidator.forgotpassword), UsersController.forgotPassword)
  .post('/password/reset', celebrate(UsersValidator.resetpassword), UsersController.resetPassword)
  .use(ensureAuthentication)
  .patch('/avatar', upload.single('avatar'), UsersController.updateAvatar);

export default userRouter;
