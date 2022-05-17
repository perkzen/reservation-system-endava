import { FirebaseUser, UserDetails } from '../models/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: FirebaseUser | null;
  details: UserDetails | null;
  isAuth: boolean;
  accessToken: string;
}

const initialState: AuthState = {
  user: null,
  details: null,
  isAuth: false,
  accessToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.details = null;
      state.isAuth = false;
      state.accessToken = '';
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    fetchUserDetailsSuccess: (state, action: PayloadAction<UserDetails>) => {
      state.details = action.payload;
    },
  },
});

export const { setUser, removeUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
