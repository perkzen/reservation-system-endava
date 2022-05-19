export interface Reservation {
  officeId: string;
  workspaceId: string;
  userId: string;
  comment: string;
  from: string;
  to: string;
}

export interface ReservationTable {
  office: string;
  workspaceId: string;
  comment: string;
  from: number;
  to: number;
}
