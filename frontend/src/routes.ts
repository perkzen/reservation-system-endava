export enum routes {
  LOGIN = '/',
  REGISTER = '/sign-up',
  HOME = '/home',
  PAGE_NOT_FOUND = '/404',
}

interface NavigationItem {
  path: routes;
  name: string;
}

export const navigation: NavigationItem[] = [
  { path: routes.HOME, name: 'Home' },
];
