import React, { FC } from 'react';
import classes from './Workspace.module.scss';
import { classNames } from '../../../utils/classNames';
import WorkspaceFreeSvg from '../../../assets/workspace-free.svg';
import WorkspaceReservedSvg from '../../../assets/workspace-reserved.svg';
import WorkspaceMySvg from '../../../assets/workspace-my.svg';
import WorkspaceSelectedSvg from '../../../assets/workspace-selected.svg';
import { Workspace as WorkspaceModel } from '../../../store/models/Office';
import {
  workspaceOrientation,
  workspaceTimeOrientation,
} from '../../../utils/workspace';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import {
  addWorkspaceToReservation,
  removeWorkspaceFromReservation,
} from '../../../store/features/reservationsSlice';
import { addModal, removeModal } from '../../../store/features/globalSlice';
import { ModalType } from '../../../store/models/Modal';
import { deleteReservationAndFetchOffice } from '../../../store/actions/reservationActions';
import { getTime } from '../../../utils/date';
import { useSearchParams } from 'react-router-dom';

interface WorkspaceProps {
  workspace: WorkspaceModel;
  onClick?: (workspaceId: string) => void;
}

const Workspace: FC<WorkspaceProps> = ({ workspace, onClick }) => {
  const { user } = useAppSelector((state) => state.user);
  const { currentOffice } = useAppSelector((state) => state.office);
  const { multipleReservations, reservedWorkspaces } = useAppSelector(
    (state) => state.reservation
  );
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const showWorkspace = (): string => {
    if (reservedWorkspaces.includes(workspace.id) && !workspace.reserved)
      return WorkspaceSelectedSvg;
    if (workspace.userId === user?.uid) return WorkspaceMySvg;
    if (!workspace.reserved) return WorkspaceFreeSvg;
    return WorkspaceReservedSvg;
  };

  const handleOnClick = () => {
    if (!onClick) return;
    if (!multipleReservations && !workspace.reserved) {
      onClick(workspace.id);
      return;
    }
    if (!multipleReservations && workspace.userId === user?.uid) {
      dispatch(
        addModal({
          type: ModalType.DELETE,
          title: 'Delete reservation',
          body: 'Are you sure you want to delete your reservation?',
          primaryActionText: 'Delete',
          primaryAction: () =>
            dispatch(
              deleteReservationAndFetchOffice({
                reservationId: workspace.reservationId as string,
                query: {
                  _id: currentOffice?._id as string,
                  from: Number(searchParams.get('from')),
                  to: Number(searchParams.get('to')),
                },
              })
            ),
          secondaryButtonText: 'Close',
          secondaryAction: () => dispatch(removeModal()),
        })
      );
      return;
    }
    if (reservedWorkspaces.includes(workspace.id) && !workspace.reserved) {
      dispatch(removeWorkspaceFromReservation(workspace.id));
    } else if (
      !reservedWorkspaces.includes(workspace.id) &&
      !workspace.reserved
    ) {
      dispatch(addWorkspaceToReservation(workspace.id));
    }
  };

  return (
    <div className={classes.Container}>
      {workspace.reserved && (
        <p
          className={classNames(
            classes.Time,
            workspaceTimeOrientation(workspace.orientation)
          )}
        >{`${getTime(workspace.from as number)}h - ${getTime(
          workspace.to as number
        )}h`}</p>
      )}
      <img
        className={classNames(
          workspaceOrientation(workspace.orientation),
          classes.Table,
          workspace.reserved && workspace.userId !== user?.uid
            ? 'hover:cursor-not-allowed'
            : ''
        )}
        src={showWorkspace()}
        alt="workspace"
        onClick={handleOnClick}
      />
    </div>
  );
};
export default Workspace;
