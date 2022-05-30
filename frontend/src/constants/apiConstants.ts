export enum ApiRoutes {
  USERS = '/users',
  OFFICES = '/offices',
  RESERVATIONS = '/reservations',
  OFFICE_RESERVATIONS = '/reservations/office',
  HISTORY = '/reservations/history',
  SETTINGS = '/settings',
}

export interface SuccessResponse {
  success: string;
}
