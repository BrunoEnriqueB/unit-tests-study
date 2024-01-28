import { Appointment } from '@/entities/Appointment';
import { AppointmentRepository } from '@/repositories/AppointmentsRepository';

interface CreateAppointmentRequest {
  customerName: string;
  startsAt: Date;
  endsAt: Date;
}

export type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    customerName,
    endsAt,
    startsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    try {
      if (await this.appointmentRepository.findOverlapping(startsAt, endsAt)) {
        throw new Error('Already have a appointment at this time');
      }

      const appointment = new Appointment({
        customerName,
        endsAt,
        startsAt,
      });

      await this.appointmentRepository.create(appointment);

      return appointment;
    } catch (error) {
      throw error;
    }
  }
}
