import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  filename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({ user_id, filename }: IRequest): Promise<User> {
    try {
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('Only authenticated users can change avatar', 401);
      }

      if (user.avatar) {
        await this.storageProvider.deleteFile(user.avatar);
      }

      const hashedFilename = await this.storageProvider.saveFile(filename);

      user.avatar = hashedFilename;

      await this.usersRepository.save(user);

      return user;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default UpdateUserAvatarService;
