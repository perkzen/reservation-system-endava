import {
  createReservation,
  deleteReservation,
  fetchReservationHistory,
  fetchReservationHistorySuccess,
  fetchReservations,
  fetchReservationsSuccess,
} from '../actions/reservationActions';
import { startLoading, stopLoading } from '../features/globalSlice';
import { put } from 'redux-saga/effects';
import instance from '../../axios';
import { ApiRoutes, SuccessResponse } from '../../constants/apiConstants';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Reservation } from '../models/Reservation';
import { fetchOffice } from '../actions/officeActions';

export function* createReservationSaga(
  action: ReturnType<typeof createReservation>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    const { data } = (yield instance.post(
      ApiRoutes.RESERVATIONS,
      action.payload
    )) as AxiosResponse<SuccessResponse>;
    yield toast.success(data.success);
    yield put(
      fetchOffice({
        _id: action.payload.office,
        from: action.payload.from,
        to: action.payload.to,
      })
    );
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    toast.error(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}

export function* fetchReservationsSaga(
  action: ReturnType<typeof fetchReservations>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    const { data } = (yield instance.get(
      ApiRoutes.RESERVATIONS
    )) as AxiosResponse<Reservation[]>;
    yield put(fetchReservationsSuccess(data));
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    toast.error(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}

export function* fetchReservationHistorySaga(
  action: ReturnType<typeof fetchReservationHistory>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    const { data } = (yield instance.get(ApiRoutes.HISTORY)) as AxiosResponse<
      Reservation[]
    >;
    yield put(fetchReservationHistorySuccess(data));
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    toast.error(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}

export function* deleteReservationsSaga(
  action: ReturnType<typeof deleteReservation>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    const { data } = (yield instance.delete(
      `${ApiRoutes.RESERVATIONS}/${action.payload}`
    )) as AxiosResponse<SuccessResponse>;
    yield toast.success(data.success);
    yield put(fetchReservationHistory());
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    toast.error(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}
