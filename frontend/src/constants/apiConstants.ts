export enum ApiRoutes {
  USERS = '/users',
  OFFICES = '/offices',
  RESERVATIONS = '/reservations',
  HISTORY = '/reservations/history',
  SETTINGS = '/settings',
}

export interface SuccessResponse {
  success: string;
}
