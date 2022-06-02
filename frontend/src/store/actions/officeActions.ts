import { Office, OfficeQuery } from '../models/Office';
import { createAction } from '@reduxjs/toolkit';

export const OFFICE_SLICE = 'office';

export const saveOffice = createAction<{ office: Office; id?: string }>(
  `${OFFICE_SLICE}/saveOffice`
);

export const deleteOffice = createAction<string>(
  `${OFFICE_SLICE}/deleteOffice`
);

export const fetchOffices = createAction(`${OFFICE_SLICE}/fetchOffices`);
export const fetchOfficesSuccess = createAction<Office[]>(
  `${OFFICE_SLICE}/fetchOfficesSuccess`
);

export const fetchOffice = createAction<OfficeQuery>(
  `${OFFICE_SLICE}/fetchOffice`
);
export const fetchOfficeSuccess = createAction<Office>(
  `${OFFICE_SLICE}/fetchOfficeSuccess`
);

export const fetchAllOffices = createAction(`${OFFICE_SLICE}/fetchAllOffices`);
export const fetchAllOfficesSuccess = createAction<Office[]>(
  `${OFFICE_SLICE}/fetchAllOfficesSuccess`
);

export const toggleOffice = createAction<string>(
  `${OFFICE_SLICE}/toggleOffice`
);

export const fetchOfficeJSON = createAction<string>(
  `${OFFICE_SLICE}/fetchOfficeJson`
);
