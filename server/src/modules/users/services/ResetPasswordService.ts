import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  password: string;
  token: string;
}
@injectable()
class ResetPasswordService {
  private usersRepository: IUsersRepository;

  private userTokensRepository: IUserTokensRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider
  ) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ token, password }: IRequest): Promise<void> {
    try {
      const userToken = await this.userTokensRepository.findByToken(token);

      if (!userToken) {
        throw new AppError('User token does not exists', 401);
      }
      const user = await this.usersRepository.findById(userToken.user_id);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      const tokenCreatedAt = userToken.created_at;
      const compareDate = addHours(tokenCreatedAt, 2);

      if (isAfter(Date.now(), compareDate)) {
        throw new AppError('Token expired', 401);
      }

      user.password = await this.hashProvider.generateHash(password);

      await this.usersRepository.save(user);
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default ResetPasswordService;
