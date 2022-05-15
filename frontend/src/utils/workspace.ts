import { Workspace } from '../store/models/Office';

export const positionDesk = (position: number, array: Workspace[]): boolean => {
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
