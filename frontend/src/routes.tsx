import { ReactElement } from 'react';
import Home from './components/pages/Home/Home';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import OfficePage from './components/pages/OfficePage/OfficePage';

export enum routes {
  LOGIN = '/sign-in',
  REGISTER = '/sign-up',
  HOME = '/',
  PAGE_NOT_FOUND = '*',
  PROFILE = '/Profile',
  OFFICE_MB = '/Maribor/:id',
  OFFICE_LJ = '/Ljubljana/:id',
}

interface Route {
  path: string;
  element: ReactElement;
}

export const protectedRoutes: Route[] = [
  { path: routes.HOME, element: <Home /> },
  { path: routes.OFFICE_MB, element: <OfficePage /> },
  { path: routes.OFFICE_LJ, element: <OfficePage /> },
  { path: routes.PROFILE, element: <ProfilePage /> },
];

interface NavigationItem {
  path: string;
  name: string;
}

export const navigation: NavigationItem[] = [
  // { path: routes.HOME, name: 'Home' },
  { path: '', name: 'Maribor' },
  { path: '', name: 'Ljubljana' },
  { path: routes.PROFILE, name: 'Profile' },
];
