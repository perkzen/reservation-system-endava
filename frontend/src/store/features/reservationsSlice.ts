import { Reservation, ReservationHistory } from '../models/Reservation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RESERVATION_SLICE } from '../actions/reservationActions';
import { removeUser } from './userSlice';

interface ReservationState {
  history: ReservationHistory[];
  reservations: Reservation[];
  reservedWorkspaces: string[];
  multipleReservations: boolean;
}

const initialState: ReservationState = {
  history: [],
  reservations: [],
  reservedWorkspaces: [],
  multipleReservations: false,
};

export const reservationSlice = createSlice({
  name: RESERVATION_SLICE,
  initialState,
  reducers: {
    fetchReservationHistorySuccess: (
      state,
      action: PayloadAction<ReservationHistory[]>
    ) => {
      state.history = action.payload;
    },
    fetchOfficeReservationsSuccess: (
      state,
      action: PayloadAction<Reservation[]>
    ) => {
      state.reservations = action.payload;
    },
    addWorkspaceToReservation: (state, action: PayloadAction<string>) => {
      state.reservedWorkspaces = [...state.reservedWorkspaces, action.payload];
    },
    removeWorkspaceFromReservation: (state, action: PayloadAction<string>) => {
      state.reservedWorkspaces = state.reservedWorkspaces.filter(
        (workspace) => workspace !== action.payload
      );
    },
    removeAllWorkspaceFromReservations: (state) => {
      state.reservedWorkspaces = [];
    },
    toggleMultipleReservations: (state) => {
      state.multipleReservations = !state.multipleReservations;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state) => {
      state.history = [];
      state.reservedWorkspaces = [];
    });
  },
});

export const {
  addWorkspaceToReservation,
  removeWorkspaceFromReservation,
  removeAllWorkspaceFromReservations,
  toggleMultipleReservations,
} = reservationSlice.actions;
export default reservationSlice.reducer;
