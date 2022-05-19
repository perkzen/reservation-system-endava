import { Office } from '../models/Office';
import { createAction } from '@reduxjs/toolkit';

export const OFFICE_SLICE = 'office';

export const saveOffice = createAction<Office>(`${OFFICE_SLICE}/saveOffice`);

export const deleteOffice = createAction<string>(
  `${OFFICE_SLICE}/deleteOffice`
);

export const fetchOffices = createAction(`${OFFICE_SLICE}/fetchOffices`);
export const fetchOfficesSuccess = createAction<Office[]>(
  `${OFFICE_SLICE}/fetchOfficesSuccess`
);

export const fetchOffice = createAction<string>(`${OFFICE_SLICE}/fetchOffice`);
export const fetchOfficeSuccess = createAction<Office>(
  `${OFFICE_SLICE}/fetchOfficeSuccess`
);
