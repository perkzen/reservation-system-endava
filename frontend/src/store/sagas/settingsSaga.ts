import {
  fetchSettings,
  fetchSettingsSuccess,
  saveSettings,
} from '../actions/settingsActions';
import { startLoading, stopLoading } from '../features/globalSlice';
import { put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import instance from '../../axios';
import { ApiRoutes, SuccessResponse } from '../../constants/apiConstants';
import { AxiosError, AxiosResponse } from 'axios';
import { Settings } from '../models/Settings';

export function* fetchSettingsSaga(action: ReturnType<typeof fetchSettings>) {
  try {
    yield put(startLoading({ actionType: action.type }));
    const { data } = (yield instance.get(
      ApiRoutes.SETTINGS
    )) as AxiosResponse<Settings>;
    yield put(fetchSettingsSuccess(data));
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    toast.error(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}

export function* saveSettingsSaga(action: ReturnType<typeof saveSettings>) {
  try {
    yield put(startLoading({ actionType: action.type }));
    const { data } = (yield instance.put(
      ApiRoutes.SETTINGS,
      action.payload
    )) as AxiosResponse<SuccessResponse>;
    toast.success(data.success);
    yield put(fetchSettings());
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    toast.error(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}
