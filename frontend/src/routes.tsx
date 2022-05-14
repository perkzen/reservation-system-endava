import { ReactElement } from 'react';
import Home from './components/pages/Home/Home';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';

export enum routes {
  LOGIN = '/',
  REGISTER = '/sign-up',
  HOME = '/home',
  PAGE_NOT_FOUND = '*',
  PROFILE = '/profile',
}

interface Route {
  path: string;
  element: ReactElement;
}

export const layoutRoutes: Route[] = [
  { path: routes.HOME, element: <Home /> },
  { path: routes.PROFILE, element: <ProfilePage /> },
];

interface NavigationItem {
  path: string;
  name: string;
}

export const navigation: NavigationItem[] = [
  { path: routes.HOME, name: 'Home' },
  { path: '', name: 'Maribor' },
  { path: '', name: 'Ljubljana' },
];
