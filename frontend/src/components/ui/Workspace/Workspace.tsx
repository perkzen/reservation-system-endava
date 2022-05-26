import React, { FC } from 'react';
import classes from './Workspace.module.scss';
import { classNames } from '../../../utils/classNames';
import WorkspaceFreeSvg from '../../../assets/workspace-free.svg';
import WorkspaceReservedSvg from '../../../assets/workspace-reserved.svg';
import WorkspaceMySvg from '../../../assets/workspace-my.svg';
import WorkspaceSelectedSvg from '../../../assets/workspace-selected.svg';
import { Workspace as WorkspaceModel } from '../../../store/models/Office';
import { workspaceOrientation } from '../../../utils/workspace';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import {
  addWorkspaceToReservation,
  removeWorkspaceFromReservation,
} from '../../../store/features/reservationsSlice';

interface WorkspaceProps {
  workspace: WorkspaceModel;
  onClick: (workspaceId: string) => void;
}

const Workspace: FC<WorkspaceProps> = ({ workspace, onClick }) => {
  const { user } = useAppSelector((state) => state.user);
  const { multipleReservations, reservedWorkspaces } = useAppSelector(
    (state) => state.reservation
  );
  const dispatch = useAppDispatch();

  const showWorkspace = (): string => {
    if (reservedWorkspaces.includes(workspace.id)) return WorkspaceSelectedSvg;
    if (workspace.userId === user?.uid) return WorkspaceMySvg;
    if (!workspace.reserved) return WorkspaceFreeSvg;
    return WorkspaceReservedSvg;
  };

  const handleOnClick = () => {
    if (!multipleReservations && !workspace.reserved) {
      onClick(workspace.id);
      return;
    }
    if (reservedWorkspaces.includes(workspace.id)) {
      dispatch(removeWorkspaceFromReservation(workspace.id));
    } else {
      dispatch(addWorkspaceToReservation(workspace.id));
    }
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
      onClick={handleOnClick}
    />
  );
};
export default Workspace;
