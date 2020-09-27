import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { id: provider_id } = request.user;
      const { day = new Date().getDate(), month = new Date().getMonth() + 1, year = new Date().getFullYear() } = request.query;

      const listProviderAppointments = container.resolve(ListProviderAppointmentsService);

      const appointments = await listProviderAppointments.execute({
        provider_id,
        day: Number(day),
        month: Number(month),
        year: Number(year),
      });

      return response.status(200).json(classToClass(appointments));
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default new ProviderAppointmentsController();
