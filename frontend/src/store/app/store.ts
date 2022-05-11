import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import globalReducer from '../features/globalSlice';
import authReducer from '../features/authSlice';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
  },
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
