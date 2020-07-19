import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({ user_id }: IRequest): Promise<User[]> {
    try {
      const users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      return users;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default ListProvidersService;
