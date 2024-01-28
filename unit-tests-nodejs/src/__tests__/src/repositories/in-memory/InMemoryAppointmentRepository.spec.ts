import getFutureDateInDays from '@/__tests__/utils/getFutureDateInDays';
import { Appointment } from '@/entities/Appointment';
import { InMemoryAppointmentRepository } from '@/repositories/in-memory/InMemoryAppointmentsRepository';
import { describe, expect, it } from 'vitest';

describe('test find overlapping method', () => {
  it('should add appointments that has not schedule conflicts', () => {
    const inMemoryAppointmentRepository = new InMemoryAppointmentRepository();

    inMemoryAppointmentRepository.create(
      new Appointment({
        customerName: 'John Doe',
        startsAt: getFutureDateInDays(3),
        endsAt: getFutureDateInDays(4),
      })
    );

    expect(
      inMemoryAppointmentRepository.findOverlapping(
        getFutureDateInDays(1),
        getFutureDateInDays(2)
      )
    ).resolves.toBeNull();

    expect(
      inMemoryAppointmentRepository.findOverlapping(
        getFutureDateInDays(5),
        getFutureDateInDays(6)
      )
    ).resolves.toBeNull();
  });

  it('should add appointsments that has schedule conflicts', () => {
    const inMemoryAppointmentRepository = new InMemoryAppointmentRepository();

    inMemoryAppointmentRepository.create(
      new Appointment({
        customerName: 'John Doe',
        startsAt: getFutureDateInDays(2),
        endsAt: getFutureDateInDays(3),
      })
    );

    expect(
      inMemoryAppointmentRepository.findOverlapping(
        getFutureDateInDays(1),
        getFutureDateInDays(3)
      )
    ).resolves.toBeInstanceOf(Appointment);

    expect(
      inMemoryAppointmentRepository.findOverlapping(
        getFutureDateInDays(2),
        getFutureDateInDays(4)
      )
    ).resolves.toBeInstanceOf(Appointment);
  });
});

describe('test create and findAll method', () => {
  const inMemoryAppointmentRepository = new InMemoryAppointmentRepository();

  it('should have 1 appointment', () => {
    const newAppointment = new Appointment({
      customerName: 'John Doe',
      startsAt: getFutureDateInDays(1),
      endsAt: getFutureDateInDays(2),
    });
    const appointments = [newAppointment];

    inMemoryAppointmentRepository.create(newAppointment);
    expect(inMemoryAppointmentRepository.findAll()).resolves.toStrictEqual(
      appointments
    );
    expect(inMemoryAppointmentRepository.findAll()).resolves.toHaveLength(1);
  });
});
