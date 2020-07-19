import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user;

      const listProviders = container.resolve(ListProvidersService);

      const providers = await listProviders.execute({
        user_id,
      });

      return response.status(200).json(classToClass(providers));
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default new ProvidersController();
