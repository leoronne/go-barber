import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

require('dotenv/config');

class AppointmentsController {
  async store(req: Request, res: Response) {
    try {
      const { provider_id, date } = req.body;
      const parsedDate = parseISO(date);

      const createAppointment = new CreateAppointmentService();
      const appointment = await createAppointment.execute({ provider_id, date: parsedDate });
      return res.status(200).json(appointment);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const appointmentsRepository = getCustomRepository(AppointmentsRepository);
      const appointments = await appointmentsRepository.find();

      return res.status(200).json(appointments);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

export default new AppointmentsController();
