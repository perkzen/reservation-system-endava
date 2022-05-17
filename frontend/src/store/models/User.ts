import { User as Firebase } from '@firebase/auth-types';

export interface User {
  email: string | null;
  photoURL: string | null;
  uid: string;
}

export interface FirebaseUser extends Firebase {}

export interface UserDetails {
  uid?: string;
  firstname: string;
  surname: string;
  location: string;
}

export interface SaveDetails extends UserDetails {
  method: 'POST' | 'PATCH';
}
