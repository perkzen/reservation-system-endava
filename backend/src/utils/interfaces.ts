export interface ReservationQuery {
  from: number;
  to: number;
}

export interface SuccessResponse {
  success: string;
}

export interface Settings {
  showWeekends: boolean;
  activeReservations: number;
  numOfDaysDisplayed: number;
  numOfExpiredReservations: number;
  //from, to, max reservation time
}
