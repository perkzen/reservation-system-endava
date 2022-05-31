import { createAction } from '@reduxjs/toolkit';
import { Settings } from '../models/Settings';

export const SETTINGS_SLICE = 'settings';

export const fetchSettings = createAction(`${SETTINGS_SLICE}/fetchSettings`);
export const fetchSettingsSuccess = createAction<Settings>(
  `${SETTINGS_SLICE}/fetchSettingsSuccess`
);

export const saveSettings = createAction<Settings>(
  `${SETTINGS_SLICE}/saveSettings`
);
