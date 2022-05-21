import { Office } from './Office';

interface ReservationModel {
  workspaceId: string;
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

export interface ReservationTable {
  office: string;
  workspaceId: string;
  comment?: string;
  from: string;
  to: string;
}

export interface ReservationModalData extends CreateReservation {
  date: Date;
}
