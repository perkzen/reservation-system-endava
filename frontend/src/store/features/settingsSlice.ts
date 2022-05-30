import { Settings } from '../models/Settings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SETTINGS_SLICE } from '../actions/settingsActions';

export interface SettingsState {
  settings: Settings | null;
}

const initialState: SettingsState = {
  settings: null,
};

const settingsSlice = createSlice({
  name: SETTINGS_SLICE,
  initialState,
  reducers: {
    fetchSettingsSuccess: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload;
    },
  },
});

export const { fetchSettingsSuccess } = settingsSlice.actions;
export default settingsSlice.reducer;
