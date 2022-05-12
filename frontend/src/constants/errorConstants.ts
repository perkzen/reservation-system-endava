export enum Errors {
  UNKNOWN_ERROR = 'Unknown error',
  PASSWORDS_DONT_MATCH = 'Passwords do not match!',
  SHORT_PASSWORD = 'Password should be at least 6 characters long!',
  EMAIL_TAKE = 'Email is already taken!',
  INVALID_EMAIL = 'Invalid email!',
}

export enum FirebaseErrors {
  SHORT_PASSWORD = 'Firebase: Password should be at least 6 characters (auth/weak-password).',
  EMAIL_TAKE = 'Firebase: Error (auth/email-already-in-use).',
  INVALID_MAIL = 'Firebase: Error (auth/invalid-email).',
}
