import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class UsersController {
  async store(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const createUser = new CreateUserService();
      const user = await createUser.execute({ name, email, password });
      delete user.password;
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateAvatar(req: Request, res: Response) {
    try {
      const updateAvatar = new UpdateUserAvatarService();
      const user = await updateAvatar.execute({
        user_id: req.user.id,
        filename: req.file.filename,
      });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

export default new UsersController();
