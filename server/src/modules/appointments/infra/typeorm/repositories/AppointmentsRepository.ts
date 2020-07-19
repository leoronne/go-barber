import { getRepository, Repository, Raw } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    try {
      const findAppointment = await this.ormRepository.findOne({
        where: { date, provider_id },
      });

      return findAppointment;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    try {
      const parsedMonth = String(month).padStart(2, '0');

      const appointments = await this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`),
        },
      });

      return appointments;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    try {
      const parsedDay = String(day).padStart(2, '0');
      const parsedMonth = String(month).padStart(2, '0');

      const appointments = await this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`),
        },
        relations: ['user'],
      });

      return appointments;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    try {
      const appointment = this.ormRepository.create({
        provider_id,
        user_id,
        date,
      });

      await this.ormRepository.save(appointment);

      return appointment;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default AppointmentsRepository;
