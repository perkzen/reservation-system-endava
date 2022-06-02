import { takeLatest } from 'redux-saga/effects';
import { fetchUserDetails, saveUserDetails } from '../actions/userActions';
import { fetchUserDetailsSaga, saveUserDetailsSaga } from './userSaga';
import {
  deleteOfficeSaga,
  fetchAllOfficesSaga,
  fetchOfficeJSONSaga,
  fetchOfficeSaga,
  fetchOfficesSaga,
  saveOfficeSaga,
  toggleOfficeSaga,
} from './officeSaga';
import {
  deleteOffice,
  fetchAllOffices,
  fetchOffice,
  fetchOfficeJSON,
  fetchOffices,
  saveOffice,
  toggleOffice,
} from '../actions/officeActions';
import {
  createReservation,
  deleteReservation,
  deleteReservationAndFetchOffice,
  fetchReservationHistory,
  fetchReservations,
  renewReservation,
} from '../actions/reservationActions';
import {
  createReservationSaga,
  deleteReservationAndFetchOfficeSaga,
  deleteReservationsSaga,
  fetchReservationHistorySaga,
  fetchReservationsSaga,
  renewReservationSaga,
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
  yield takeLatest(fetchAllOffices.type, fetchAllOfficesSaga);
  yield takeLatest(toggleOffice.type, toggleOfficeSaga);
  yield takeLatest(fetchOfficeJSON.type, fetchOfficeJSONSaga);
}

export function* watchReservation(): Generator {
  yield takeLatest(createReservation.type, createReservationSaga);
  yield takeLatest(fetchReservations.type, fetchReservationsSaga);
  yield takeLatest(fetchReservationHistory.type, fetchReservationHistorySaga);
  yield takeLatest(renewReservation.type, renewReservationSaga);
  yield takeLatest(deleteReservation.type, deleteReservationsSaga);
  yield takeLatest(
    deleteReservationAndFetchOffice.type,
    deleteReservationAndFetchOfficeSaga
  );
}

export function* watchSettings(): Generator {
  yield takeLatest(fetchSettings.type, fetchSettingsSaga);
  yield takeLatest(saveSettings.type, saveSettingsSaga);
}
