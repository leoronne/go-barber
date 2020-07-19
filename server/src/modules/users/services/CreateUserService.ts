import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    try {
      if (await this.usersRepository.findByEmail(email)) {
        throw new AppError('Email address is already in use', 401);
      }

      const hash_password = await this.hashProvider.generateHash(password);

      const user = await this.usersRepository.create({
        name,
        email,
        password: hash_password,
      });

      return user;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default CreateUserService;
