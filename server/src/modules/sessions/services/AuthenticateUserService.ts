import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

import User from '@UserModel/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new AppError('Incorrect credentials', 401);
      }

      if (!(await this.hashProvider.compareHash(password, user.password))) {
        throw new AppError('Incorrect credentials', 401);
      }

      const token = sign({}, authConfig.secret, {
        subject: user.id,
        expiresIn: authConfig.expiresIn,
      });

      return { user, token };
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default AuthenticateUserService;
