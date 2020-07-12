import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUser = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (checkUser) {
      throw Error('Email address is already in use');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({ name, email, password: hashedPassword });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
