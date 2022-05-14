import React, { FC } from 'react';
import classes from './Workspace.module.scss';
import { classNames } from '../../../utils/classNames';
import { Orientation } from '../../../store/models/Office';
import WorkspaceFreeSvg from '../../../assets/workspace-free.svg';
import WorkspaceReservedSvg from '../../../assets/workspace-reserved.svg';

interface WorkspaceProps {
  orientation: Orientation;
  free: boolean;
}

const chooseDeskOrientation = (
  orientation: Orientation
): string | undefined => {
  if (orientation === 'left') return classes.Left;
  else if (orientation === 'top') return classes.Top;
  else if (orientation === 'bottom') return classes.Bottom;
};

const Workspace: FC<WorkspaceProps> = ({ orientation, free }) => {
  return (
    <img
      className={classNames(
        chooseDeskOrientation(orientation) as string,
        classes.Table
      )}
      src={free ? WorkspaceFreeSvg : WorkspaceReservedSvg}
      alt="workspace"
    />
  );
};

export default Workspace;

/*
    <div
      className={classNames(
        classes.Table,
        chooseDeskOrientation(orientation) as string,
        free ? classes.Free : classes.Reserved
      )}
    >
      <div></div>
    </div>
 */
