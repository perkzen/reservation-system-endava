import React, { FC } from 'react';
import classes from './Workspace.module.scss';
import { classNames } from '../../../utils/classNames';
import WorkspaceFreeSvg from '../../../assets/workspace-free.svg';
import WorkspaceReservedSvg from '../../../assets/workspace-reserved.svg';
import WorkspaceMySvg from '../../../assets/workspace-my.svg';
import WorkspaceSelectedSvg from '../../../assets/workspace-selected.svg';
import { Workspace as WorkspaceModel } from '../../../store/models/Office';
import { workspaceOrientation } from '../../../utils/workspace';
import { useAppSelector } from '../../../store/app/hooks';

interface WorkspaceProps {
  workspace: WorkspaceModel;
  onClick: (workspaceId: string) => void;
  multipleReservations?: boolean;
  setWorkspacesIds?: (ids: string[]) => void;
  workspacesIds?: string[];
}

const Workspace: FC<WorkspaceProps> = ({
  workspace,
  onClick,
  multipleReservations,
  setWorkspacesIds,
  workspacesIds,
}) => {
  const { user } = useAppSelector((state) => state.user);

  const showWorkspace = (): string => {
    if (workspace.userId === user?.uid) return WorkspaceMySvg;
    if (!workspace.reserved) return WorkspaceFreeSvg;
    return WorkspaceReservedSvg;
  };

  const handleClick = () => {
    if (setWorkspacesIds && workspacesIds && !workspace.reserved) {
      if (workspacesIds?.includes(workspace.id)) {
        setWorkspacesIds(workspacesIds.filter((id) => id !== workspace.id));
      } else {
        setWorkspacesIds([...workspacesIds, workspace.id]);
      }
    }
  };

  return (
    <img
      className={classNames(
        workspaceOrientation(workspace.orientation),
        classes.Table,
        workspace.reserved ? 'hover:cursor-not-allowed' : ''
      )}
      src={
        workspacesIds?.includes(workspace.id) && !workspace.reserved
          ? WorkspaceSelectedSvg
          : showWorkspace()
      }
      alt="workspace"
      onClick={() =>
        !workspace.reserved && !multipleReservations
          ? onClick(workspace.id)
          : handleClick()
      }
    />
  );
};

export default Workspace;
