import { takeLatest } from 'redux-saga/effects';
import { fetchUserDetails, saveUserDetails } from '../actions/userActions';
import { fetchUserDetailsSaga, saveUserDetailsSaga } from './userSaga';
import {
  deleteOfficeSaga,
  fetchOfficeSaga,
  fetchOfficesSaga,
  saveOfficeSaga,
} from './officeSaga';
import {
  deleteOffice,
  fetchOffice,
  fetchOffices,
  saveOffice,
} from '../actions/officeActions';

export function* watchUser(): Generator {
  yield takeLatest(saveUserDetails.type, saveUserDetailsSaga);
  yield takeLatest(fetchUserDetails.type, fetchUserDetailsSaga);
}

export function* watchOffice(): Generator {
  yield takeLatest(saveOffice.type, saveOfficeSaga);
  yield takeLatest(deleteOffice.type, deleteOfficeSaga);
  yield takeLatest(fetchOffices.type, fetchOfficesSaga);
  yield takeLatest(fetchOffice.type, fetchOfficeSaga);
}
