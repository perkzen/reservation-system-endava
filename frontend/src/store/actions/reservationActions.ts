import { createAction } from '@reduxjs/toolkit';
import { CreateReservation, Reservation } from '../models/Reservation';
import { OfficeQuery } from '../models/Office';

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

export const fetchOfficeReservations = createAction<OfficeQuery>(
  `${RESERVATION_SLICE}/fetchOfficeReservations`
);

export const fetchOfficeReservationsSuccess = createAction<Reservation[]>(
  `${RESERVATION_SLICE}/fetchOfficeReservationsSuccess`
);

export const fetchReservationHistory = createAction(
  `${RESERVATION_SLICE}/fetchReservationHistory`
);

export const fetchReservationHistorySuccess = createAction<Reservation[]>(
  `${RESERVATION_SLICE}/fetchReservationHistorySuccess`
);

export const deleteReservation = createAction<string>(
  `${RESERVATION_SLICE}/cancelReservation`
);
