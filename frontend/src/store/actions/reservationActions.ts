import { createAction } from '@reduxjs/toolkit';
import {
  CreateReservation,
  Reservation,
  ReservationHistory,
} from '../models/Reservation';

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

export const fetchReservationHistory = createAction(
  `${RESERVATION_SLICE}/fetchReservationHistory`
);

export const fetchReservationHistorySuccess = createAction<
  ReservationHistory[]
>(`${RESERVATION_SLICE}/fetchReservationHistorySuccess`);

export const deleteReservation = createAction<string>(
  `${RESERVATION_SLICE}/cancelReservation`
);
