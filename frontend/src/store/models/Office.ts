import { Orientation } from '../../utils/workspace';

export interface Office {
  _id?: string;
  name: string;
  location: string;
  cols: number;
  rows: number;
  workspaces: Workspace[];
}

export interface Workspace {
  id: string;
  orientation: Orientation;
  position: number;
  reserved: boolean;
}
