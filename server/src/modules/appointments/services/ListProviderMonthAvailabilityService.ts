import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter, endOfDay } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    try {
      const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
        provider_id,
        month,
        year,
      });

      const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

      const eachDayArray = Array.from({ length: numberOfDaysInMonth }, (_, index) => index + 1);

      const availability = eachDayArray.map(day => {
        const compareDate = endOfDay(new Date(year, month - 1, day));

        const appointmentsInDay = appointments.filter(appointment => {
          return getDate(appointment.date) === day;
        });

        return {
          day,
          available: isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
        };
      });

      return availability;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default ListProviderMonthAvailabilityService;
