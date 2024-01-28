import { Appointment } from '@/entities/Appointment';
import { AppointmentRepository } from '@/repositories/AppointmentsRepository';

export class InMemoryAppointmentRepository implements AppointmentRepository {
  private appointments: Appointment[] = [];

  async findAll() {
    return this.appointments;
  }

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }

  async findOverlapping(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const appointmentOverLapping = this.appointments.find((a) => {
      if (startsAt < a.startsAt && endsAt <= a.startsAt) return;
      if (startsAt >= a.endsAt && endsAt > a.endsAt) return;

      return a;
    });

    return appointmentOverLapping || null;
  }
}
