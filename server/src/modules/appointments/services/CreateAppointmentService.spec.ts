import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date().getTime();
    });
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(2050, 4, 11, 15),
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create appointments in the same date', async () => {
    const appointmentDate = new Date(2050, 4, 11, 15);

    await createAppointmentService.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        user_id: 'user-id',
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments with yourself', async () => {
    await expect(
      createAppointmentService.execute({
        date: new Date(2050, 4, 11, 15),
        user_id: 'user-id',
        provider_id: 'user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments in past dates', async () => {
    const appointmentDate = new Date(1995, 4, 11, 15);

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        user_id: 'user-id',
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments outside of commercial time', async () => {
    await expect(
      createAppointmentService.execute({
        date: new Date(2050, 4, 11, 23),
        user_id: 'user-id',
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2050, 4, 11, 23),
        user_id: 'user-id',
        provider_id: 'provider-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
