import { ReactElement } from 'react';
import Home from './components/pages/Home/Home';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import OfficePage from './components/pages/OfficePage/OfficePage';
import CreateOfficePage from './components/pages/CreateOfficePage/CreateOfficePage';
import FloorPlanPage from './components/pages/FloorPlanPage/FloorPlanPage';
import SettingsPage from './components/pages/SettingsPage/SettingsPage';

export enum routes {
  LOGIN = '/sign-in',
  REGISTER = '/sign-up',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  HOME = '/',
  PAGE_NOT_FOUND = '*',
  PROFILE = '/Profile',
  OFFICE = ':location/:id',
  CREATE_OFFICE = '/create-office',
  SETTINGS = '/settings',
  FLOOR_PLAN = '/:location',
}

interface Route {
  path: string;
  element: ReactElement;
}

export const protectedRoutes: Route[] = [
  { path: routes.HOME, element: <Home /> },
  { path: routes.OFFICE, element: <OfficePage /> },
  { path: routes.PROFILE, element: <ProfilePage /> },
  { path: routes.PROFILE, element: <ProfilePage /> },
  { path: routes.FLOOR_PLAN, element: <FloorPlanPage /> },
];

export const adminRoutes: Route[] = [
  { path: routes.CREATE_OFFICE, element: <CreateOfficePage /> },
  { path: routes.SETTINGS, element: <SettingsPage /> },
];
