export enum Errors {
  UNKNOWN_ERROR = 'Unknown error',
  PASSWORDS_DONT_MATCH = 'Passwords do not match!',
  SHORT_PASSWORD = 'Password should be at least 6 characters long!',
  EMAIL_TAKE = 'Email is already taken!',
  INVALID_EMAIL = 'Invalid email!',
  WRONG_CREDENTIALS = 'User with this email or password does not exist!',
  INVALID_ACTION = 'Invalid action',
  INVALID_NUMBER = 'Number should be positive!',
}

export enum FirebaseErrors {
  SHORT_PASSWORD = 'Firebase: Password should be at least 6 characters (auth/weak-password).',
  EMAIL_TAKE = 'Firebase: Error (auth/email-already-in-use).',
  INVALID_MAIL = 'Firebase: Error (auth/invalid-email).',
  WRONG_PASSWORD = 'Firebase: Error (auth/wrong-password).',
  WRONG_EMAIL = 'Firebase: Error (auth/invalid-email).',
  USER_NOT_FOUND = 'Firebase: Error (auth/user-not-found).',
  INVALID_ACTION = 'Firebase: Error (auth/invalid-action-code).',
}
