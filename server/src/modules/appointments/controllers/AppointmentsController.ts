import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  async store(req: Request, res: Response) {
    try {
      const { provider_id, date } = req.body;
      const { id: user_id } = req.user;

      const createAppointment = container.resolve(CreateAppointmentService);

      const appointment = await createAppointment.execute({ provider_id, user_id, date });
      return res.status(200).json(appointment);
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default new AppointmentsController();
