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
import {
  createReservation,
  deleteReservation,
  fetchReservationHistory,
  fetchReservations,
} from '../actions/reservationActions';
import {
  createReservationSaga,
  deleteReservationsSaga,
  fetchReservationHistorySaga,
  fetchReservationsSaga,
} from './reservationSaga';
import { fetchSettings, saveSettings } from '../actions/settingsActions';
import { fetchSettingsSaga, saveSettingsSaga } from './settingsSaga';

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

export function* watchReservation(): Generator {
  yield takeLatest(createReservation.type, createReservationSaga);
  yield takeLatest(fetchReservations.type, fetchReservationsSaga);
  yield takeLatest(deleteReservation.type, deleteReservationsSaga);
  yield takeLatest(fetchReservationHistory.type, fetchReservationHistorySaga);
}

export function* watchSettings(): Generator {
  yield takeLatest(fetchSettings.type, fetchSettingsSaga);
  yield takeLatest(saveSettings.type, saveSettingsSaga);
}
