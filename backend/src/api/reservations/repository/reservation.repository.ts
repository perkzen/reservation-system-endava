import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  Reservation,
  ReservationDocument,
} from '../Schemas/reservation.schema';
import { CreateReservationDto } from '../dto/create-reservation.dto';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async findOne(
    reservationFilterQuery: FilterQuery<Reservation>,
  ): Promise<Reservation> {
    return this.reservationModel.findOne(reservationFilterQuery);
  }

  async find(
    reservationFilterQuery: FilterQuery<Reservation>,
  ): Promise<Reservation[]> {
    return this.reservationModel
      .find(reservationFilterQuery)
      .populate('office');
  }

  async create(office: CreateReservationDto): Promise<Reservation> {
    const newOffice = new this.reservationModel(office);
    return newOffice.save();
  }

  async findOneAndUpdate(
    reservationFilterQuery: FilterQuery<Reservation>,
    reservation: Partial<Reservation>,
  ) {
    return this.reservationModel.findOneAndUpdate(
      reservationFilterQuery,
      reservation,
    );
  }

  async deleteOne(reservationFilterQuery: FilterQuery<Reservation>) {
    return this.reservationModel.deleteOne(reservationFilterQuery);
  }
}
