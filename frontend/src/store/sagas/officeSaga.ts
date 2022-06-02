import { AxiosError, AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';
import {
  deleteOffice,
  fetchAllOffices,
  fetchAllOfficesSuccess,
  fetchOffice,
  fetchOfficeJSON,
  fetchOffices,
  fetchOfficesSuccess,
  fetchOfficeSuccess,
  saveOffice,
  toggleOffice,
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
      method: action.payload.id ? 'PUT' : 'POST',
      url: action.payload.id
        ? `${ApiRoutes.OFFICES}/${action.payload.id}`
        : ApiRoutes.OFFICES,
      data: action.payload.office,
    })) as AxiosResponse<SuccessResponse>;
    toast.success(data.success);
    yield put(fetchOffices());
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    toast.error(message || message[0] || 'Something went wrong');
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
    yield put(push(routes.OFFICE_NOT_FOUND));
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}

export function* fetchAllOfficesSaga(
  action: ReturnType<typeof fetchAllOffices>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    const { data } = (yield instance.get(
      `${ApiRoutes.OFFICES}/all`
    )) as AxiosResponse<Office[]>;
    yield put(fetchAllOfficesSuccess(data));
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    toast.error(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}

export function* toggleOfficeSaga(
  action: ReturnType<typeof toggleOffice>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    yield instance.put(`${ApiRoutes.OFFICES}/toggle/${action.payload}`);
    yield put(fetchAllOffices());
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

export function* fetchOfficeJSONSaga(
  action: ReturnType<typeof fetchOfficeJSON>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    const { data } = (yield instance.get(
      `${ApiRoutes.OFFICES}/json/${action.payload}`
    )) as AxiosResponse<Office>;
    yield put(fetchOfficeSuccess(data));
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    toast.error(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}
