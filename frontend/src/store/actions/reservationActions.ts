import { createAction } from '@reduxjs/toolkit';
import { CreateReservation, Reservation } from '../models/Reservation';

export const RESERVATION_SLICE = 'reservation';

export const createReservation = createAction<CreateReservation>(
  `${RESERVATION_SLICE}/createReservation`
);

export const fetchReservations = createAction(
  `${RESERVATION_SLICE}/fetchReservation`
);

export const fetchReservationsSuccess = createAction<Reservation[]>(
  `${RESERVATION_SLICE}/fetchReservationSuccess`
);

export const deleteReservation = createAction<string>(
  `${RESERVATION_SLICE}/cancelReservation`
);
