import React, { FC } from 'react';
import classes from './Workspace.module.scss';
import { classNames } from '../../../utils/classNames';
import WorkspaceFreeSvg from '../../../assets/workspace-free.svg';
import WorkspaceReservedSvg from '../../../assets/workspace-reserved.svg';
import WorkspaceMySvg from '../../../assets/workspace-my.svg';
import { Workspace as WorkspaceModel } from '../../../store/models/Office';
import { workspaceOrientation } from '../../../utils/workspace';
import { useAppSelector } from '../../../store/app/hooks';

interface WorkspaceProps {
  workspace: WorkspaceModel;
  onClick: (workspaceId: string) => void;
}

const Workspace: FC<WorkspaceProps> = ({ workspace, onClick }) => {
  const { user } = useAppSelector((state) => state.user);

  const showWorkspace = (): string => {
    if (workspace.userId === user?.uid) return WorkspaceMySvg;
    if (!workspace.reserved) return WorkspaceFreeSvg;
    return WorkspaceReservedSvg;
  };

  return (
    <img
      className={classNames(
        workspaceOrientation(workspace.orientation),
        classes.Table,
        workspace.reserved ? 'hover:cursor-not-allowed' : ''
      )}
      src={showWorkspace()}
      alt="workspace"
      onClick={() => !workspace.reserved && onClick(workspace.id)}
    />
  );
};

export default Workspace;
