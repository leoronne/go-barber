import express from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UsersController from '../app/controllers/UsersController';

import AuthMiddleware from '../middlewares/AuthMiddleware';

const userRouter = express.Router();
const upload = multer(uploadConfig);

userRouter.post('/', UsersController.store);
userRouter.use(AuthMiddleware);
userRouter.patch('/avatar', upload.single('avatar'), UsersController.updateAvatar);

export default userRouter;
