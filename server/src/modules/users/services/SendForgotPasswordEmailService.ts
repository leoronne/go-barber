import path from 'path';
import { APP_WEB_URL } from '@shared/utils/environment';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
    this.userTokensRepository = userTokensRepository;
  }

  public async execute({ email }: IRequest): Promise<void> {
    try {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      const { token } = await this.userTokensRepository.generate(user.id);

      await this.mailProvider.sendMail({
        to: user.email,
        subject: '[GoBarber] Recuperação de senha',
        template: {
          file: path.resolve(__dirname, '..', 'views', 'forgot_password.hbs'),
          variables: {
            name: user.name,
            link: `${APP_WEB_URL}/reset-password?token=${token}`,
          },
        },
      });
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default SendForgotPasswordEmailService;
