export enum Errors {
  USER_ALREADY_EXISTS = 'This user already exits',
  USER_NOT_FOUND = 'Please fill in your details',
  OFFICE_NOT_FOUND = 'Office not found',
  ACCESS_DENIED = 'Access denied',
  TOKEN_MISSING = 'Access token missing',
  AUTHORIZATION_HEADERS_MISSING = 'Authorization headers missing',
  WORKSPACE_TAKEN = 'This workspace is already taken for this date and time',
  TO_LONG_RESERVATION_TIME = 'You can only reserve this workspace for a maximum of 9 hours',
  PLEASE_SELECT_WORKSPACE = 'Please select at least one workspace',
  RESERVATION_NOT_FOUND = 'Reservation not found',
  INVALID_RESERVATION_TIME = 'This time for reservation already passed',
}
