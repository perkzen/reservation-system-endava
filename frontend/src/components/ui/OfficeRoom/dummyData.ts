import { Office } from '../../../store/models/Office';
import { DeskOrientation } from '../../../utils/deskOrientation';

export const dummyOffice: Office = {
  name: 'Endava',
  cols: 5,
  rows: 5,
  workspaces: [
    {
      id: '1',
      orientation: DeskOrientation.TOP,
      position: 0,
      reserved: false,
    },
    {
      id: '2',
      orientation: DeskOrientation.TOP,
      position: 1,
      reserved: true,
    },
    {
      id: '3',
      orientation: DeskOrientation.BOTTOM,
      position: 5,
      reserved: false,
    },
    {
      id: '3',
      orientation: DeskOrientation.BOTTOM,
      position: 6,
      reserved: true,
    },
  ],
};
