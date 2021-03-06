import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import globalReducer from '../features/globalSlice';
import userReducer from '../features/userSlice';
import officeReducer from '../features/officeSlice';
import reservationReducer from '../features/reservationsSlice';
import settingsReducer from '../features/settingsSlice';
import {
  watchOffice,
  watchReservation,
  watchSettings,
  watchUser,
} from '../sagas';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    office: officeReducer,
    reservation: reservationReducer,
    settings: settingsReducer,
    router: routerReducer,
  },
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
    routerMiddleware,
  ],
});

sagaMiddleware.run(watchUser);
sagaMiddleware.run(watchOffice);
sagaMiddleware.run(watchReservation);
sagaMiddleware.run(watchSettings);

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
