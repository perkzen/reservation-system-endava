import { Module } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { OfficesController } from './offices.controller';
import { OfficeRepository } from './repository/office.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Office, OfficeSchema } from './schemas/office.schema';
import { UsersRepository } from '../users/repository/users.repository';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import {
  Reservation,
  ReservationSchema,
} from '../reservations/Schemas/reservation.schema';
import { ReservationsService } from '../reservations/reservations.service';
import { ReservationRepository } from '../reservations/repository/reservation.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Office.name, schema: OfficeSchema },
      { name: User.name, schema: UserSchema },
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [OfficesController],
  providers: [
    OfficesService,
    OfficeRepository,
    UsersRepository,
    UsersService,
    ReservationsService,
    ReservationRepository,
  ],
})
export class OfficesModule {}
