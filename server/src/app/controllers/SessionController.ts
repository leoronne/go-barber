import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionController {
  async store(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const createSession = new AuthenticateUserService();
      const { user, token } = await createSession.execute({ email, password });

      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

export default new SessionController();
