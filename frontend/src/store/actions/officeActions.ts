import { Office } from '../models/Office';
import { createAction } from '@reduxjs/toolkit';

export const createOffice = createAction<Office>('');
