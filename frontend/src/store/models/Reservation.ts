import { Office } from './Office';

export enum ReservationType {
  NEW = 'NEW',
  RENEW = 'RENEW',
}

interface ReservationModel {
  _id: string;
  workspaceId: string[];
  userId: string;
  comment?: string;
  from: number;
  to: number;
}

export interface CreateReservation extends ReservationModel {
  office: string;
}

export interface UpdateReservation extends ReservationModel {
  _id: string;
}

export interface Reservation extends ReservationModel {
  office: Office;
}

export interface ReservationModalData extends CreateReservation {
  date: Date;
  type: ReservationType;
}

export interface ReservationHistory extends ReservationModel, Reservation {
  active: boolean;
}

export interface ReservationTable {
  _id: string;
  officeId?: string;
  office: string;
  workspaceId: string[];
  comment?: string;
  date: string;
  time: string;
  active: boolean;
  from: number;
  to: number;
  location: string;
}
