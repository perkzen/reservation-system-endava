import React, { FC } from 'react';
import classes from './Workspace.module.scss';
import { classNames } from '../../../utils/classNames';
import WorkspaceFreeSvg from '../../../assets/workspace-free.svg';
import WorkspaceReservedSvg from '../../../assets/workspace-reserved.svg';
import { deskOrientation } from '../../../utils/deskOrientation';
import { Workspace as WorkspaceModel } from '../../../store/models/Office';

interface WorkspaceProps {
  workspace: WorkspaceModel;
}

const Workspace: FC<WorkspaceProps> = ({ workspace }) => {
  return (
    <img
      className={classNames(
        deskOrientation(workspace.orientation),
        classes.Table
      )}
      src={workspace.reserved ? WorkspaceReservedSvg : WorkspaceFreeSvg}
      alt="workspace"
    />
  );
};

export default Workspace;
