import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ user_id }: IRequest): Promise<User | undefined> {
    try {
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      return user;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default ShowProfileService;
