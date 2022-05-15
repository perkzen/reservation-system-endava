import { Office } from '../models/Office';
import { createAction } from '@reduxjs/toolkit';

const OFFICE_SLICE = 'office';

export const saveOffice = createAction<Office>(`${OFFICE_SLICE}/saveOffice`);

export const saveOfficeSuccess = createAction(
  `${OFFICE_SLICE}/saveOfficeSuccess`
);
