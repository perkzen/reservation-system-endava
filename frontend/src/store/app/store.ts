import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import officeReducer from '../features/officeSlice';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    office: officeReducer,
  },
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
