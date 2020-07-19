import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import AuthenticateUserService from '@modules/sessions/services/AuthenticateUserService';

class SessionController {
  async store(req: Request, res: Response) {
    try {
      const createSession = container.resolve(AuthenticateUserService);

      const { email, password } = req.body;

      const { user, token } = await createSession.execute({ email, password });

      return res.status(200).json({ user: classToClass(user), token });
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default new SessionController();
