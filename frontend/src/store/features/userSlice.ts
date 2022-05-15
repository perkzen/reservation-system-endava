import { User, UserDetails } from '../models/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: User | null;
  details: UserDetails | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  details: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.details = null;
      state.isAuth = false;
    },
    fetchUserDetailsSuccess: (state, action: PayloadAction<UserDetails>) => {
      state.details = action.payload;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
