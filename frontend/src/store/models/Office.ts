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
  userId?: string;
  reservationId?: string;
  from?: number;
  to?: number;
}

export interface OfficeQuery {
  _id: string;
  from: number;
  to: number;
}
