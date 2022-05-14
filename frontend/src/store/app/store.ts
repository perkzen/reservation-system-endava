import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import globalReducer from '../features/globalSlice';
import userReducer from '../features/userSlice';
import { watchUser } from '../sagas';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
  },
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
  ],
});

watchUser();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
