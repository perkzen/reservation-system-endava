import { createAction } from '@reduxjs/toolkit';
import { UserDetails } from '../models/User';

const USER_SLICE = 'user';

export const saveUserDetails = createAction<UserDetails>(
  `${USER_SLICE}/saveUserDetails`
);

export const saveUserDetailsSuccess = createAction(
  `${USER_SLICE}/saveUserDetailsSuccess`
);

export const fetchUserDetails = createAction(`${USER_SLICE}/fetchUserDetails`);

export const fetchUserDetailsSuccess = createAction<UserDetails>(
  `${USER_SLICE}/fetchUserDetailsSuccess`
);
