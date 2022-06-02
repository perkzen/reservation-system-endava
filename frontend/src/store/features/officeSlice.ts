import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Office, Query } from '../models/Office';
import { removeUser } from './userSlice';
import { OFFICE_SLICE } from '../actions/officeActions';
import { dateToUTC } from '../../utils/date';

interface OfficeState {
  offices: Office[];
  dashboardOffices: Office[];
  currentOffice?: Office;
  query: Query;
}

const initialState: OfficeState = {
  offices: [],
  dashboardOffices: [],
  currentOffice: undefined,
  query: {
    date: new Date(),
    from: dateToUTC(new Date(), 8),
    to: dateToUTC(new Date(), 17),
  },
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
    fetchAllOfficesSuccess: (state, action: PayloadAction<Office[]>) => {
      state.dashboardOffices = action.payload;
    },
    updateQuery: (state, action: PayloadAction<Query>) => {
      state.query = action.payload;
    },
    clearQuery: (state) => {
      state.query = {
        date: new Date(),
        from: dateToUTC(new Date(), 8),
        to: dateToUTC(new Date(), 17),
      };
    },
    clearOffice: (state) => {
      state.currentOffice = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state) => {
      state.offices = [];
      state.dashboardOffices = [];
      state.currentOffice = undefined;
      state.query = {
        date: new Date(),
        from: dateToUTC(new Date(), 8),
        to: dateToUTC(new Date(), 17),
      };
    });
  },
});

export const { updateQuery, clearQuery, clearOffice } = officeSlice.actions;
export default officeSlice.reducer;
