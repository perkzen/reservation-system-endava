import { Office } from '../models/Office';
import { createAction } from '@reduxjs/toolkit';

const OFFICE_SLICE = 'office';

export const saveOffice = createAction<Office>(`${OFFICE_SLICE}/saveOffice`);

export const deleteOffice = createAction<string>(
  `${OFFICE_SLICE}/deleteOffice`
);
