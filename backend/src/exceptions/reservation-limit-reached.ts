import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationLimitReached extends HttpException {
  constructor(numOfAllowedReservations: number) {
    super(
      `You can only have ${numOfAllowedReservations} active reservations`,
      HttpStatus.PRECONDITION_FAILED,
    );
  }
}
