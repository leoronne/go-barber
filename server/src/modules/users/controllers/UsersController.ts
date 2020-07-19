import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class UsersController {
  async store(req: Request, res: Response) {
    try {
      const createUser = container.resolve(CreateUserService);
      const { name, email, password } = req.body;

      const user = await createUser.execute({ name, email, password });
      return res.status(200).json(classToClass(user));
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  async updateAvatar(req: Request, res: Response) {
    try {
      const updateAvatar = container.resolve(UpdateUserAvatarService);

      const user = await updateAvatar.execute({
        user_id: req.user.id,
        filename: req.file.filename,
      });
      return res.status(200).json(classToClass(user));
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService);

      await sendForgotPasswordEmail.execute({
        email,
      });

      return res.status(204).json();
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { password, token } = req.body;

      const resetPassword = container.resolve(ResetPasswordService);

      await resetPassword.execute({
        password,
        token,
      });

      return res.status(204).json();
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default new UsersController();
