import { Office } from './Office';

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

export interface Reservation extends ReservationModel {
  office: Office;
}

export interface ReservationModalData extends CreateReservation {
  date: Date;
}

export interface ReservationHistory extends ReservationModel, Reservation {
  active: boolean;
}

export interface ReservationTable {
  _id: string;
  id: string | undefined;
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
