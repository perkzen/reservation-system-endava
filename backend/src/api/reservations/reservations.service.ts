import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './Schemas/reservation.schema';
import { ReservationRepository } from './repository/reservation.repository';
import { Errors } from '../../utils/errors';
import { ReservationQuery, SuccessResponse } from '../../utils/interfaces';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async create(data: CreateReservationDto): Promise<SuccessResponse> {
    // active reservations from user
    const active = await this.findAllByUser(data.userId);

    if (active.length >= 3) {
      throw new HttpException(
        Errors.RESERVATION_LIMIT,
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const NINE_HOURS = 32400000;

    if (data.to - data.from > NINE_HOURS) {
      throw new HttpException(
        Errors.TO_LONG_RESERVATION_TIME,
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    // get all reservations for this workspace
    const reservations = await this.reservationRepository.find({
      // workspaceId: data.workspaceId,
      workspaceId: { $in: data.workspaceId },
    });

    // this workspace has not been reserved yet
    if (!reservations) {
      await this.reservationRepository.create(data);
      return { success: 'Reservation created successfully' };
    }

    // check if workspace is available
    const available = reservations.filter((reservation) => {
      return !(
        (data.from <= reservation.from && data.to <= reservation.from) ||
        (data.from >= reservation.to && data.to >= reservation.to)
      );
    });

    if (available.length > 0) {
      throw new HttpException(
        Errors.WORKSPACE_TAKEN,
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    await this.reservationRepository.create(data);
    return { success: 'Reservation created successfully' };
  }

  async findAllByUser(userId: string): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.find({
      userId: userId,
    });

    const currentDate = Date.now();

    return reservations.filter((reservation) => reservation.to >= currentDate);
  }

  async findOfficeReservationsByDate(
    officeId: string,
    { from, to }: ReservationQuery,
  ): Promise<Reservation[]> {
    // all reservations
    const all = await this.reservationRepository.find({
      office: { _id: officeId },
    });

    const currentDate = Date.now();
    // all active
    const active = all.filter((reservation) => reservation.to >= currentDate);
    // return all on [from,to] interval
    return active.filter(
      (reservation) => reservation.to > from && reservation.from < to,
    );
  }

  async findAllReservationsByUser(userId: string): Promise<Reservation[]> {
    return await this.reservationRepository.find({ userId: userId });
  }

  async remove(id: string, userId: string): Promise<SuccessResponse> {
    await this.reservationRepository.deleteOne({
      _id: id,
      userId: userId,
    });
    return { success: 'Reservation cancelled successfully' };
  }
}
