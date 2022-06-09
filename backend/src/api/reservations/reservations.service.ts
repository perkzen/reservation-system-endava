import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './Schemas/reservation.schema';
import { ReservationRepository } from './repository/reservation.repository';
import { Errors } from '../../utils/errors';
import { ReservationQuery, SuccessResponse } from '../../utils/interfaces';
import { SettingsService } from '../settings/settings.service';
import { ReservationLimitReached } from '../../exceptions/reservation-limit-reached';
import { NINE_HOURS_IN_MILLISECONDS } from '../../utils/constants';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly settingsService: SettingsService,
  ) {}

  async create(data: CreateReservationDto): Promise<SuccessResponse> {
    if (data.workspaceId.length === 0) {
      throw new HttpException(
        Errors.PLEASE_SELECT_WORKSPACE,
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentDate = Date.now();

    if (data.to < currentDate) {
      throw new HttpException(
        Errors.INVALID_RESERVATION_TIME,
        HttpStatus.BAD_REQUEST,
      );
    }

    // active reservations from user
    const active = await this.findAllByUser(data.userId);

    if (
      active.length >= this.settingsService.getSettings().activeReservations
    ) {
      throw new ReservationLimitReached(
        this.settingsService.getSettings().activeReservations,
      );
    }

    if (data.to - data.from > NINE_HOURS_IN_MILLISECONDS) {
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

  async findReservationHistory(userId: string): Promise<Reservation[]> {
    const settings = this.settingsService.getSettings();

    const reservations = await this.reservationRepository.find({
      userId: userId,
    });

    const currentDate = Date.now();

    const history = reservations.map((reservation) => {
      const updateReservation = reservation;
      updateReservation.active = reservation.to >= currentDate;
      return updateReservation;
    });

    const activeReservations = history
      .filter((reservation) => reservation.active)
      .slice(0, settings.activeReservations);
    const expiredReservations = history
      .filter((reservation) => !reservation.active)
      .slice(0, settings.numOfExpiredReservations);

    return [...activeReservations, ...expiredReservations];
  }

  async renewReservation(
    data: Reservation,
    userId: string,
  ): Promise<SuccessResponse> {
    const reservation = await this.reservationRepository.findOneAndUpdate(
      { _id: data._id, userId: userId },
      data,
    );

    if (!reservation) {
      throw new HttpException(
        Errors.RESERVATION_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return { success: 'Reservation renewed successfully' };
  }

  async remove(id: string, userId: string): Promise<SuccessResponse> {
    await this.reservationRepository.deleteOne({
      _id: id,
      userId: userId,
    });
    return { success: 'Reservation cancelled successfully' };
  }
}
