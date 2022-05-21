import React, { FC } from 'react';
import classes from './Workspace.module.scss';
import { classNames } from '../../../utils/classNames';
import WorkspaceFreeSvg from '../../../assets/workspace-free.svg';
import WorkspaceReservedSvg from '../../../assets/workspace-reserved.svg';
import { Workspace as WorkspaceModel } from '../../../store/models/Office';
import { workspaceOrientation } from '../../../utils/workspace';

interface WorkspaceProps {
  workspace: WorkspaceModel;
  onClick: (workspaceId: string) => void;
}

const Workspace: FC<WorkspaceProps> = ({ workspace, onClick }) => {
  return (
    <img
      className={classNames(
        workspaceOrientation(workspace.orientation),
        classes.Table,
        workspace.reserved ? 'hover:cursor-not-allowed' : ''
      )}
      src={workspace.reserved ? WorkspaceReservedSvg : WorkspaceFreeSvg}
      alt="workspace"
      onClick={() => !workspace.reserved && onClick(workspace.id)}
    />
  );
};

export default Workspace;
