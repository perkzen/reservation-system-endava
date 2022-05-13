import React, { FC } from 'react';
import classes from './Workspace.module.scss';
import { classNames } from '../../../utils/classNames';
type Orientation = 'left' | 'top' | 'bottom';
interface WorkspaceProps {
  orientation: Orientation;
  free: boolean;
}

const chooseDeskOrientation = (
  orientation: Orientation
): string | undefined => {
  if (orientation == 'left') return classes.Left;
  else if (orientation == 'top') return classes.Top;
  else if (orientation == 'bottom') return classes.Bottom;
};

const Workspace: FC<WorkspaceProps> = ({ orientation, free }) => {
  return (
    <div
      className={classNames(
        classes.Table,
        chooseDeskOrientation(orientation) as string,
        free ? classes.Free : classes.Reserved
      )}
    >
      <div></div>
    </div>
  );
};

export default Workspace;
