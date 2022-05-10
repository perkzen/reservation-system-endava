import { createSlice } from '@reduxjs/toolkit';

interface OfficeState {}

const initialState: OfficeState = {};

export const officeSlice = createSlice({
  name: 'office',
  initialState,
  reducers: {},
});

export default officeSlice.reducer;
