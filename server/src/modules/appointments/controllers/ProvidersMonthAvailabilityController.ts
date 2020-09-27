import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProvidersMonthAvailabilitycontroller {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id } = request.params;
      const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } = request.query;

      const listProviderMonthAvailabiltiy = container.resolve(ListProviderMonthAvailabilityService);

      const availability = await listProviderMonthAvailabiltiy.execute({
        provider_id,
        month: Number(month),
        year: Number(year),
      });

      return response.status(200).json(availability);
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default new ProvidersMonthAvailabilitycontroller();
