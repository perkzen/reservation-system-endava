export interface Office {
  name: string;
  col: number;
  row: number;
  workspaces: Workspace[];
}

export type Orientation = 'left' | 'top' | 'bottom' | 'right';

export interface Workspace {
  name: string;
  orientation: Orientation;
  x: number;
  y: number;
}
