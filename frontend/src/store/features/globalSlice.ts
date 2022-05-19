import { Modal } from '../models/Modal';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingAction } from '../models/Actions';

export interface GlobalState {
  modal: Modal | null;
  loading: LoadingAction[];
}

const initialState: GlobalState = {
  modal: null,
  loading: [],
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
      state.loading = state.loading.filter((savedAction) =>
        filterAction(savedAction, action)
      );
    },
  },
});

const filterAction = (
  currAction: LoadingAction,
  action: PayloadAction<LoadingAction>
) => {
  return currAction.actionType !== action.payload?.actionType;
};

export const { addModal, removeModal, startLoading, stopLoading } =
  globalSlice.actions;
export default globalSlice.reducer;
