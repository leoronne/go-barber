import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProvidersDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id } = request.params;
      const { day = new Date().getDate(), month = new Date().getMonth() + 1, year = new Date().getFullYear() } = request.query;

      const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);
      const availability = await listProviderDayAvailability.execute({
        provider_id,
        day: Number(day),
        month: Number(month),
        year: Number(year),
      });

      return response.status(200).json(availability);
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default new ProvidersDayAvailabilityController();
