import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './Schemas/reservation.schema';
import { ReservationRepository } from './repository/reservation.repository';
import { Errors } from '../../utils/errors';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async create(data: CreateReservationDto) {
    // active reservations from user
    const active = await this.findAllByUser(data.userId);

    if (active.length > 3) {
      throw new HttpException(
        Errors.RESERVATION_LIMIT,
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    // get all reservations for this workspace
    const reservations = await this.reservationRepository.find({
      workspaceId: data.workspaceId,
    });

    // this workspace has not been reserved yet
    if (!reservations) {
      return await this.reservationRepository.create(data);
    }

    // check if workspace is available
    const available = reservations.filter((reservation) => {
      return !(
        (data.from < reservation.from && data.to < reservation.from) ||
        (data.from > reservation.to && data.to > reservation.to)
      );
    });

    if (available.length > 0) {
      throw new HttpException(
        Errors.WORKSPACE_TAKEN,
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return await this.reservationRepository.create(data);
  }

  async findAllByUser(userId: string): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.find({
      userId: userId,
    });

    const currentDate = Date.now();

    return reservations.filter((reservation) => reservation.to >= currentDate);
  }

  async remove(id: string, userId: string) {
    return await this.reservationRepository.deleteOne({
      _id: id,
      userId: userId,
    });
  }
}
