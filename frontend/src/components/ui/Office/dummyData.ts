import { Office } from '../../../store/models/Office';
import { Orientation } from '../../../utils/workspace';

export const dummyOffice: Office = {
  name: 'Endava',
  cols: 5,
  location: 'Maribor',
  rows: 5,
  disabled: false,
  workspaces: [
    {
      id: '1',
      orientation: Orientation.TOP,
      position: 0,
      reserved: false,
    },
    {
      id: '2',
      orientation: Orientation.TOP,
      position: 1,
      reserved: true,
    },
    {
      id: '3',
      orientation: Orientation.BOTTOM,
      position: 5,
      reserved: false,
    },
    {
      id: '3',
      orientation: Orientation.BOTTOM,
      position: 6,
      reserved: true,
    },
  ],
};
