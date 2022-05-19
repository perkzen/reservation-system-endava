import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import globalReducer from '../features/globalSlice';
import userReducer from '../features/userSlice';
import officeReducer from '../features/officeSlice';
import reservationReducer from '../features/reservationsSlice';
import { watchOffice, watchReservation, watchUser } from '../sagas';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    office: officeReducer,
    reservation: reservationReducer,
  },
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(watchUser);
sagaMiddleware.run(watchOffice);
sagaMiddleware.run(watchReservation);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
