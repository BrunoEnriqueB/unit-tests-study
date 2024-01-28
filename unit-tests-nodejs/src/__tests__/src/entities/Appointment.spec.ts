import { describe, expect, it } from 'vitest';

import { Appointment } from '@/entities/Appointment';
import getFutureDateInDays from '@/__tests__/utils/getFutureDateInDays';

describe('test appointment class', () => {
  const appointment = new Appointment({
    customerName: 'John Doe',
    startsAt: getFutureDateInDays(1),
    endsAt: getFutureDateInDays(2),
  });

  it('should create a new appointment', () => {
    expect(appointment).toBeInstanceOf(Appointment);
  });

  it('should not be able to create because startAt is equal to now and endsAt', () => {
    expect(() => {
      return new Appointment({
        customerName: 'John Doe',
        startsAt: new Date(),
        endsAt: new Date(),
      });
    }).toThrow(Error);
  });

  it('should not be able to create because startAt is equal to endsAt', () => {
    expect(() => {
      return new Appointment({
        customerName: 'John Doe',
        startsAt: getFutureDateInDays(1),
        endsAt: getFutureDateInDays(1),
      });
    }).toThrow(Error);
  });

  it('should not be able to create because startAt is later than endsAt', () => {
    expect(() => {
      return new Appointment({
        customerName: 'John Doe',
        startsAt: getFutureDateInDays(3),
        endsAt: getFutureDateInDays(2),
      });
    }).toThrow(Error);
  });
});
