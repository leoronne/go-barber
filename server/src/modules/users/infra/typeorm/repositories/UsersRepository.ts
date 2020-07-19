import { getRepository, Repository, Not } from 'typeorm';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    try {
      const user = this.ormRepository.create({ name, email, password });

      await this.ormRepository.save(user);

      return user;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  public async save(user: User): Promise<User> {
    try {
      return this.ormRepository.save(user);
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  public async findById(id: string): Promise<User | undefined> {
    try {
      const user = await this.ormRepository.findOne(id);

      return user;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.ormRepository.findOne({ where: { email } });

      return user;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
    try {
      let users: User[];

      if (except_user_id) {
        users = await this.ormRepository.find({
          where: { id: Not(except_user_id) },
        });
      } else {
        users = await this.ormRepository.find();
      }

      return users;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default UsersRepository;
