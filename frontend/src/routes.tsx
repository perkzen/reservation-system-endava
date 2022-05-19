import { ReactElement } from 'react';
import Home from './components/pages/Home/Home';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import OfficePage from './components/pages/OfficePage/OfficePage';

export enum routes {
  LOGIN = '/sign-in',
  REGISTER = '/sign-up',
  HOME = '/',
  PAGE_NOT_FOUND = '*',
  PROFILE = '/profile',
  OFFICE = '/office',
}

interface Route {
  path: string;
  element: ReactElement;
}

export const layoutRoutes: Route[] = [
  { path: routes.HOME, element: <Home /> },
  { path: routes.PROFILE, element: <ProfilePage /> },
  { path: routes.OFFICE, element: <OfficePage /> },
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
