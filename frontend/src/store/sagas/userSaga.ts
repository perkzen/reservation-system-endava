import {
  fetchUserDetails,
  fetchUserDetailsSuccess,
  saveUserDetails,
  saveUserDetailsSuccess,
} from '../actions/userActions';
import { put } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';
import instance from '../../axios';
import { ApiRoutes } from '../../constants/apiConstants';
import { Role, UserDetails } from '../models/User';
import { startLoading, stopLoading } from '../features/globalSlice';

export function* saveUserDetailsSaga(
  action: ReturnType<typeof saveUserDetails>
): Generator {
  const data =
    action.payload.method === 'POST'
      ? { ...action.payload, role: Role.USER }
      : action.payload;
  try {
    yield put(startLoading({ actionType: action.type }));
    yield instance({
      method: action.payload.method,
      url: ApiRoutes.USERS,
      data,
    });
    yield put(saveUserDetailsSuccess());
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    console.log(message);
  } finally {
    stopLoading({ actionType: action.type });
  }
}

export function* fetchUserDetailsSaga(
  action: ReturnType<typeof fetchUserDetails>
): Generator {
  try {
    yield put(startLoading({ actionType: action.type }));
    const { data } = (yield instance.get(
      ApiRoutes.USERS
    )) as AxiosResponse<UserDetails>;
    yield put(fetchUserDetailsSuccess(data));
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    console.log(message);
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}
