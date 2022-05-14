export interface User {
  email: string;
  photoURL?: string;
  uid: string;
  accessToken: string;
}

export interface UserDetails {
  uid?: string;
  firstname: string;
  surname: string;
  location: string;
}
