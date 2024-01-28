import getFutureDateInDays from '@/__tests__/utils/getFutureDateInDays';
import { Appointment } from '@/entities/Appointment';
import { InMemoryAppointmentRepository } from '@/repositories/in-memory/InMemoryAppointmentsRepository';
import { CreateAppointment } from '@/services/CreateAppointment';
import { describe, expect, it } from 'vitest';

describe('test create appointment service', async () => {
  it('should create a new appointment', () => {
    const createAppointment = new CreateAppointment(
      new InMemoryAppointmentRepository()
    );

    const appointment = createAppointment.execute({
      customerName: 'John Doe',
      startsAt: getFutureDateInDays(1),
      endsAt: getFutureDateInDays(2),
    });

    expect(appointment).resolves.toBeInstanceOf(Appointment);
  });

  it('should throw schedule conflitcts error', async () => {
    const createAppointment = new CreateAppointment(
      new InMemoryAppointmentRepository()
    );

    await createAppointment.execute({
      customerName: 'John Doe',
      startsAt: getFutureDateInDays(3),
      endsAt: getFutureDateInDays(4),
    });

    expect(
      createAppointment.execute({
        customerName: 'John Doe',
        startsAt: getFutureDateInDays(1),
        endsAt: getFutureDateInDays(4),
      })
    ).rejects.toThrow();

    expect(
      createAppointment.execute({
        customerName: 'John Doe',
        startsAt: getFutureDateInDays(3),
        endsAt: getFutureDateInDays(5),
      })
    ).rejects.toThrow();
  });
});
