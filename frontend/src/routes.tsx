import { ReactElement } from 'react';
import Home from './components/pages/Home/Home';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import OfficePage from './components/pages/OfficePage/OfficePage';
import CreateOfficePage from './components/pages/CreateOfficePage/CreateOfficePage';
import FloorPlanPage from './components/pages/FloorPlanPage/FloorPlanPage';
import SettingsPage from './components/pages/SettingsPage/SettingsPage';
import AdminDashboard from './components/pages/AdminDashboard/AdminDashboard';

export enum routes {
  LOGIN = '/sign-in',
  REGISTER = '/sign-up',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  HOME = '/',
  PAGE_NOT_FOUND = '*',
  OFFICE_NOT_FOUND = '/office-not-found',
  PROFILE = '/profile',
  OFFICE = ':location/:id',
  CREATE_OFFICE = '/dashboard/office',
  EDIT_OFFICE = '/dashboard/office',
  SETTINGS = '/settings',
  FLOOR_PLAN = '/:location',
  DASHBOARD = '/dashboard',
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
  { path: `${routes.CREATE_OFFICE}`, element: <CreateOfficePage /> },
  { path: `${routes.EDIT_OFFICE}/:id`, element: <CreateOfficePage /> },
  { path: routes.SETTINGS, element: <SettingsPage /> },
  { path: routes.DASHBOARD, element: <AdminDashboard /> },
];
