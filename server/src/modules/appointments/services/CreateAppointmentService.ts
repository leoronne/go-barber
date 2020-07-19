import { roundToNearestMinutes, isBefore, getHours, subMinutes } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@AppointmentModel/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({ provider_id, user_id, date }: IRequest): Promise<Appointment> {
    try {
      const appointmentDate = roundToNearestMinutes(date, { nearestTo: 5 });

      if (provider_id === user_id) {
        throw new AppError("You can't book appointments with yourself", 401);
      }

      if (isBefore(appointmentDate, subMinutes(new Date(), 15))) {
        throw new AppError("You can't book appointments in past dates", 400);
      }

      if (getHours(appointmentDate) < 9 || getHours(appointmentDate) > 19) {
        throw new AppError("You can't book appointments outside commercial time", 400);
      }

      const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

      if (findAppointmentInSameDate) {
        throw new AppError('There is another appointment booked on the same date and hour', 401);
      }

      const appointment = await this.appointmentsRepository.create({ provider_id, user_id, date: appointmentDate });

      return appointment;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default CreateAppointmentService;
