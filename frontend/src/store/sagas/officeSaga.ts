import { AxiosError, AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';
import {
  deleteOffice,
  fetchOffice,
  fetchOffices,
  fetchOfficesSuccess,
  fetchOfficeSuccess,
  saveOffice,
} from '../actions/officeActions';
import { startLoading, stopLoading } from '../features/globalSlice';
import instance from '../../axios';
import { ApiRoutes, SuccessResponse } from '../../constants/apiConstants';
import { Office } from '../models/Office';
import { toast } from 'react-toastify';
import { push } from 'redux-first-history';
import { routes } from '../../routes';

export function* saveOfficeSaga(
  action: ReturnType<typeof saveOffice>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    const { data } = (yield instance({
      method: action.payload._id ? 'PUT' : 'POST',
      url: action.payload._id
        ? `${ApiRoutes.OFFICES}/${action.payload._id}`
        : ApiRoutes.OFFICES,
      data: action.payload,
    })) as AxiosResponse<SuccessResponse>;
    toast.success(data.success);
    yield put(fetchOffices());
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    toast.error(message);
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
    toast.error(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}

export function* fetchOfficesSaga(
  action: ReturnType<typeof fetchOffices>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    const { data } = (yield instance.get(ApiRoutes.OFFICES)) as AxiosResponse<
      Office[]
    >;
    yield put(fetchOfficesSuccess(data));
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    toast.error(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}

export function* fetchOfficeSaga(
  action: ReturnType<typeof fetchOffice>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    const { data } = (yield instance.get(
      `${ApiRoutes.OFFICES}/${action.payload._id}?from=${action.payload.from}&to=${action.payload.to}`
    )) as AxiosResponse<Office>;
    yield put(fetchOfficeSuccess(data));
  } catch (e) {
    yield put(push(`${routes.OFFICE}/office-not-found`));
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}
