import { Office } from './Office';

interface ReservationModel {
  workspaceId: string;
  userId: string;
  comment: string;
  from: string;
  to: string;
}

export interface CreateReservation extends ReservationModel {
  office: string;
}

export interface Reservation extends ReservationModel {
  office: Office;
}

// office is officeId
export interface ReservationTable {
  office: Office;
  workspaceId: string;
  comment: string;
  from: number;
  to: number;
}
