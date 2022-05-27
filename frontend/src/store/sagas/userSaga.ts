import {
  fetchUserDetails,
  fetchUserDetailsSuccess,
  saveUserDetails,
  saveUserDetailsSuccess,
} from '../actions/userActions';
import { put } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';
import instance from '../../axios';
import { ApiRoutes, SuccessResponse } from '../../constants/apiConstants';
import { Role, UserDetails } from '../models/User';
import { startLoading, stopLoading } from '../features/globalSlice';
import { toast } from 'react-toastify';
import { push } from 'redux-first-history';
import { routes } from '../../routes';

export function* saveUserDetailsSaga(
  action: ReturnType<typeof saveUserDetails>
): Generator {
  const data =
    action.payload.method === 'POST'
      ? { ...action.payload, role: Role.USER }
      : action.payload;
  try {
    yield put(startLoading({ actionType: action.type }));
    const res = (yield instance({
      method: action.payload.method,
      url: ApiRoutes.USERS,
      data,
    })) as AxiosResponse<SuccessResponse>;
    yield put(saveUserDetailsSuccess());
    yield put(fetchUserDetails());
    toast.success(res.data.success);
  } catch (e) {
    const error = e as AxiosError;
    // @ts-ignore
    const message = error.response?.data?.message;
    toast.error(message);
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
    toast.warning(message);
    yield put(push(routes.PROFILE));
  } finally {
    yield put(stopLoading({ actionType: action.type }));
  }
}
