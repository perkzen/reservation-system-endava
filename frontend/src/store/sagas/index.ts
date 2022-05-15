import { takeLatest } from 'redux-saga/effects';
import { fetchUserDetails, saveUserDetails } from '../actions/userActions';
import { fetchUserDetailsSaga, saveUserDetailsSaga } from './userSaga';
import { saveOfficeSaga } from './officeSaga';
import { saveOffice } from '../actions/officeActions';

export function* watchUser(): Generator {
  yield takeLatest(saveUserDetails.type, saveUserDetailsSaga);
  yield takeLatest(fetchUserDetails.type, fetchUserDetailsSaga);
}

export function* watchOffice(): Generator {
  yield takeLatest(saveOffice.type, saveOfficeSaga);
}
