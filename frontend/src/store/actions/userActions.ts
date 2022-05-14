import { createAction } from '@reduxjs/toolkit';
import { UserDetails } from '../models/User';

const USER_SLICE = 'user';

export const saveUserDetails = createAction<UserDetails>(
  `${USER_SLICE}/saveUserDetails`
);

export const saveUserDetailsStart = createAction(
  `${USER_SLICE}/saveUserDetailsStart`
);

export const saveUserDetailsSuccess = createAction(
  `${USER_SLICE}/saveUserDetailsSuccess`
);

export const saveUserDetailsError = createAction<string>(
  `${USER_SLICE}/saveUserDetailsError`
);

export const fetchUserDetails = createAction(`${USER_SLICE}/fetchUserDetails`);

export const fetchUserDetailsStart = createAction(
  `${USER_SLICE}/fetchUserDetailsStart`
);

export const fetchUserDetailsSuccess = createAction<UserDetails>(
  `${USER_SLICE}/fetchUserDetailsSuccess`
);

export const fetchUserDetailsError = createAction<string>(
  `${USER_SLICE}/fetchUserDetailsError`
);
