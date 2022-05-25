import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Office } from '../models/Office';
import { removeUser } from './userSlice';
import { fetchOfficeSuccess, OFFICE_SLICE } from '../actions/officeActions';
import { Reservation } from '../models/Reservation';
import { fetchOfficeReservationsSuccess } from '../actions/reservationActions';

interface OfficeState {
  offices: Office[];
  currentOffice?: Office;
  reservations: Reservation[];
}

const initialState: OfficeState = {
  offices: [],
  currentOffice: undefined,
  reservations: [],
};

export const officeSlice = createSlice({
  name: OFFICE_SLICE,
  initialState,
  reducers: {
    fetchOfficesSuccess: (state, action: PayloadAction<Office[]>) => {
      state.offices = action.payload;
    },
    fetchOfficeSuccess: (state, action: PayloadAction<Office>) => {
      state.currentOffice = action.payload;
    },
    fetchOfficeReservationsSuccess: (
      state,
      action: PayloadAction<Reservation[]>
    ) => {
      state.reservations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state) => {
      state.offices = [];
      state.currentOffice = undefined;
      state.reservations = [];
    });
  },
});

export default officeSlice.reducer;
