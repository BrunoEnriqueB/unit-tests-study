import { Appointment } from '@/entities/Appointment';

export interface AppointmentRepository {
  findAll(): Promise<Appointment[]>;
  create(appointment: Appointment): Promise<void>;
  findOverlapping(startsAt: Date, endsAt: Date): Promise<Appointment | null>;
}
