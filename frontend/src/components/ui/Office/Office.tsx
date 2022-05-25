import React, { FC, useEffect } from 'react';
import classes from './Office.module.scss';
import Workspace from '../Workspace/Workspace';
import { grid, gridToArray } from '../../../utils/grid';
import { Office as OfficeModel } from '../../../store/models/Office';
import { findWorkspace, positionWorkspace } from '../../../utils/workspace';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { addModal } from '../../../store/features/globalSlice';
import { ModalType } from '../../../store/models/Modal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { fetchOfficeReservations } from '../../../store/actions/reservationActions';
import { dateToUTC } from '../../../utils/date';

interface OfficeProps {
  office?: OfficeModel;
  currentDate?: Date;
  from?: number;
  to?: number;
  loading?: boolean;
  emptyText?: string;
}

const Office: FC<OfficeProps> = ({
  office,
  currentDate,
  from,
  to,
  loading,
  emptyText,
}) => {
  const dispatch = useAppDispatch();

  const { reservations } = useAppSelector((state) => state.reservation);

  useEffect(() => {
    if (office?._id && from && to && currentDate) {
      dispatch(
        fetchOfficeReservations({
          _id: office._id,
          from: dateToUTC(currentDate, from),
          to: dateToUTC(currentDate, from),
        })
      );
    }
  }, [currentDate, dispatch, from, office, to]);

  const handleClick = (workspaceId: string) => {
    if (!office) return;
    dispatch(
      addModal({
        type: ModalType.RESERVATION,
        title: 'Confirm reservation',
        data: {
          date: currentDate,
          from: from,
          to: to,
          workspaceId: [workspaceId],
          office: office._id,
        },
      })
    );
  };

  // const checkIfMine = (workspace: WorkspaceModel): boolean => {
  //   if (workspace.reserved) {
  //     for (const reservation of reservations) {
  //       if (
  //         reservation.workspaceId === workspace.id &&
  //         reservation.from === dateToUTC(currentDate!, from!) &&
  //         reservation.to === dateToUTC(currentDate!, to!)
  //       )
  //         return true;
  //     }
  //   }
  //   return false;
  // };

  return (
    <div className={classes.Background}>
      {loading ? (
        <div className={classes.EmptyContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {office ? (
            <div
              className={classes.Container}
              style={grid(office.cols, office.rows)}
            >
              {gridToArray(office.cols, office.rows).map((pos) =>
                positionWorkspace(pos, office.workspaces) ? (
                  <Workspace
                    key={v4()}
                    workspace={findWorkspace(pos, office.workspaces)}
                    onClick={handleClick}
                    //  isMine={checkIfMine(findWorkspace(pos, office.workspaces))}
                  />
                ) : (
                  <div key={v4()} />
                )
              )}
            </div>
          ) : (
            <div className={classes.EmptyContainer}>
              <h1>{emptyText}</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Office;
