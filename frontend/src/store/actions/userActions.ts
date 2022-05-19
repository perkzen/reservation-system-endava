import { createAction } from '@reduxjs/toolkit';
import { SaveDetails, UserDetails } from '../models/User';

export const USER_SLICE = 'user';

export const saveUserDetails = createAction<SaveDetails>(
  `${USER_SLICE}/saveUserDetails`
);

export const saveUserDetailsSuccess = createAction(
  `${USER_SLICE}/saveUserDetailsSuccess`
);

export const fetchUserDetails = createAction(`${USER_SLICE}/fetchUserDetails`);

export const fetchUserDetailsSuccess = createAction<UserDetails>(
  `${USER_SLICE}/fetchUserDetailsSuccess`
);
