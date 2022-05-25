import { Reservation } from '../models/Reservation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchReservationHistorySuccess,
  RESERVATION_SLICE,
} from '../actions/reservationActions';
import { removeUser } from './userSlice';

interface ReservationState {
  history: Reservation[];
}

const initialState: ReservationState = {
  history: [],
};

export const reservationSlice = createSlice({
  name: RESERVATION_SLICE,
  initialState,
  reducers: {
    fetchReservationHistorySuccess: (
      state,
      action: PayloadAction<Reservation[]>
    ) => {
      state.history = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state) => {
      state.history = [];
    });
  },
});

export default reservationSlice.reducer;
