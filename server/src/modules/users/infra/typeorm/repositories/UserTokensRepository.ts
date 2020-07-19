import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    try {
      const userToken = await this.ormRepository.findOne({
        where: { token },
      });

      return userToken;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  public async generate(user_id: string): Promise<UserToken> {
    try {
      const userToken = this.ormRepository.create({
        user_id,
      });

      await this.ormRepository.save(userToken);

      return userToken;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default UserTokensRepository;
