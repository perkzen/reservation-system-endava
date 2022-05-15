import { AxiosError } from 'axios';
import { put } from 'redux-saga/effects';
import { deleteOffice, saveOffice } from '../actions/officeActions';
import { startLoading, stopLoading } from '../features/globalSlice';
import instance from '../../axios';
import { ApiRoutes } from '../../constants/apiConstants';

export function* saveOfficeSaga(
  action: ReturnType<typeof saveOffice>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    yield instance({
      method: action.payload._id ? 'PATCH' : 'POST',
      url: action.payload._id
        ? `${ApiRoutes.OFFICES}/${action.payload._id}`
        : ApiRoutes.OFFICES,
      data: action.payload,
    });
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    console.log(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}

export function* deleteOfficeSaga(
  action: ReturnType<typeof deleteOffice>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    yield instance.delete(`${ApiRoutes.OFFICES}/${action.payload}`);
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    console.log(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}
