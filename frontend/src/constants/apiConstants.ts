export enum ApiRoutes {
  USERS = '/users',
  OFFICES = '/offices',
  RESERVATIONS = '/reservations',
  OFFICE_RESERVATIONS = '/reservations/office',
  HISTORY = '/reservations/history',
}

export interface SuccessResponse {
  success: string;
}
