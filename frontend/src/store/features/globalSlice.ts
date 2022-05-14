import { Modal } from '../models/Modal';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorAction, LoadingAction } from '../models/Actions';

export interface GlobalState {
  modal: Modal | null;
  loading: LoadingAction[];
  errors: ErrorAction[];
}

const initialState: GlobalState = {
  modal: null,
  loading: [],
  errors: [],
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
    startLoading: (state, action: PayloadAction<LoadingAction>) => {
      state.loading.push(action.payload);
    },
    stopLoading: (state, action: PayloadAction<LoadingAction>) => {
      state.loading.filter((el) => el.actionType !== action.payload.actionType);
    },
    addError: (state, action: PayloadAction<ErrorAction>) => {
      state.errors.push(action.payload);
    },
    removeError: (state, action: PayloadAction<ErrorAction>) => {
      state.errors.filter((el) => el.actionType !== action.payload.actionType);
    },
  },
});

export const {
  addModal,
  removeModal,
  startLoading,
  stopLoading,
  addError,
  removeError,
} = globalSlice.actions;
export default globalSlice.reducer;
