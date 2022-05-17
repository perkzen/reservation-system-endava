import { Workspace } from '../store/models/Office';
import classes from '../components/ui/Workspace/Workspace.module.scss';

export enum Orientation {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export const workspaceOrientation = (orientation: Orientation): string => {
  switch (orientation) {
    case Orientation.TOP:
      return classes.Top;
    case Orientation.BOTTOM:
      return classes.Bottom;
    case Orientation.LEFT:
      return classes.Left;
    case Orientation.RIGHT:
      return '';
  }
};

export const positionWorkspace = (
  position: number,
  array: Workspace[]
): boolean => {
  for (let desk of array) {
    if (position === desk.position) return true;
  }
  return false;
};

export const findWorkspace = (
  pos: number,
  workspaces: Workspace[]
): Workspace => {
  return workspaces.find((w) => w.position === pos)!;
};
