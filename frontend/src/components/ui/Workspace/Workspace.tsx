import React, { FC } from 'react';
import classes from './Workspace.module.scss';
import { classNames } from '../../../utils/classNames';
import WorkspaceFreeSvg from '../../../assets/workspace-free.svg';
import WorkspaceReservedSvg from '../../../assets/workspace-reserved.svg';
import {
  DeskOrientation,
  deskOrientation,
} from '../../../utils/deskOrientation';

interface WorkspaceProps {
  orientation: DeskOrientation;
  reserved: boolean;
}

const Workspace: FC<WorkspaceProps> = ({ orientation, reserved }) => {
  return (
    <img
      className={classNames(deskOrientation(orientation), classes.Table)}
      src={reserved ? WorkspaceReservedSvg : WorkspaceFreeSvg}
      alt="workspace"
    />
  );
};

export default Workspace;
