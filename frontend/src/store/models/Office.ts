import { DeskOrientation } from '../../utils/deskOrientation';

export interface Office {
  name: string;
  cols: number;
  rows: number;
  workspaces: Workspace[];
}

export interface Workspace {
  id: string;
  orientation: DeskOrientation;
  position: number;
  reserved: boolean;
}
