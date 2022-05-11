import { Modal } from '../models/Modal';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GlobalState {
  modal: Modal | null;
}

const initialState: GlobalState = {
  modal: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    addModal: (state, action: PayloadAction<Modal>) => {
      state.modal = action.payload;
    },
    removeModal: (state) => {
      state.modal = null;
    },
  },
});

export const { addModal, removeModal } = globalSlice.actions;
export default globalSlice.reducer;
