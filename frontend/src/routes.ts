export enum routes {
  LOGIN = '/',
  REGISTER = '/sign-up',
  HOME = '/home',
  PAGE_NOT_FOUND = '/404',
}

interface NavigationItem {
  path: string;
  name: string;
}

export const navigation: NavigationItem[] = [
  { path: routes.HOME, name: 'Home' },
  { path: '', name: 'Maribor' },
  { path: '', name: 'Ljubljana' },
];
