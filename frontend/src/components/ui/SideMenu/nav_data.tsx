import { routes } from '../../../routes';

export const NavigationData = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Maribor',
  },
  {
    id: 2,
    parent: 1,
    droppable: true,
    text: 'First Floor',
  },
  {
    id: 3,
    parent: 1,
    droppable: true,
    text: 'Second Floor',
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: 'Ljubljana',
  },
  {
    id: 5,
    parent: 4,
    droppable: true,
    text: 'First Floor',
  },
  {
    id: 6,
    parent: 4,
    droppable: true,
    text: 'Second Floor',
  },
  {
    id: 7313213131,
    parent: 5,
    droppable: false,
    text: 'Pisarna1',
    data: routes.PROFILE,
  },
  {
    id: 842141,
    parent: 6,
    droppable: false,
    text: 'Pisarna2',
    data: routes.PROFILE,
  },
  {
    id: 9312313231,
    parent: 2,
    droppable: false,
    text: 'Pisarna3',
    data: routes.PROFILE,
  },
  {
    id: 103131331231,
    parent: 3,
    droppable: false,
    text: 'Pisarna4',
    data: routes.PROFILE,
  },
];
