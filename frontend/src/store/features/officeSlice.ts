import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Office } from '../models/Office';
import { removeUser } from './userSlice';

interface OfficeState {
  offices: Office[];
  currentOffice: Office | null;
}

const initialState: OfficeState = {
  offices: [],
  currentOffice: null,
};

export const officeSlice = createSlice({
  name: 'office',
  initialState,
  reducers: {
    fetchOfficesSuccess: (state, action: PayloadAction<Office[]>) => {
      state.offices = action.payload;
    },
    fetchOfficeSuccess: (state, action: PayloadAction<Office>) => {
      state.currentOffice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state) => {
      state.offices = [];
      state.currentOffice = null;
    });
  },
});

export default officeSlice.reducer;
