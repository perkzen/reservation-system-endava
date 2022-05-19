import { Reservation } from '../models/Reservation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RESERVATION_SLICE } from '../actions/reservationActions';
import { removeUser } from './userSlice';

interface ReservationState {
  reservations: Reservation[];
}

const initialState: ReservationState = {
  reservations: [],
};

export const reservationSlice = createSlice({
  name: RESERVATION_SLICE,
  initialState,
  reducers: {
    fetchReservations: (state, action: PayloadAction<Reservation[]>) => {
      state.reservations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state) => {
      state.reservations = [];
    });
  },
});

export default reservationSlice.reducer;
