import React, { FC } from 'react';
import classes from './Office.module.scss';
import Workspace from '../Workspace/Workspace';
import { grid, gridToArray } from '../../../utils/grid';
import { Office as OfficeModel } from '../../../store/models/Office';
import { findWorkspace, positionWorkspace } from '../../../utils/workspace';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../../store/app/hooks';
import { addModal } from '../../../store/features/globalSlice';
import { ModalType } from '../../../store/models/Modal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import OfficeLegend from '../OfficeLegend/OfficeLegend';
import { ReservationType } from '../../../store/models/Reservation';

interface OfficeProps {
  office?: OfficeModel;
  currentDate?: Date;
  from?: number;
  to?: number;
  loading?: boolean;
  emptyText?: string;
  edit?: boolean;
}

const Office: FC<OfficeProps> = ({
  office,
  currentDate,
  from,
  to,
  loading,
  emptyText,
  edit,
}) => {
  const dispatch = useAppDispatch();

  const handleClick = (workspaceId: string) => {
    dispatch(
      addModal({
        type: ModalType.RESERVATION,
        title: 'Confirm reservation',
        data: {
          date: currentDate,
          from: from,
          to: to,
          workspaceId: [workspaceId],
          office: office?._id,
          type: ReservationType.NEW,
        },
      })
    );
  };

  return (
    <div className={classes.Background}>
      {loading ? (
        <div className={classes.EmptyContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {office ? (
            <div className={classes.OfficeContainer}>
              <OfficeLegend />
              <div className={classes.Office}>
                <div
                  className={classes.Container}
                  style={grid(office.cols, office.rows)}
                >
                  {gridToArray(office.cols, office.rows).map((pos) =>
                    positionWorkspace(pos, office.workspaces) ? (
                      <Workspace
                        key={v4()}
                        workspace={findWorkspace(pos, office.workspaces)}
                        onClick={!edit ? handleClick : undefined}
                      />
                    ) : (
                      <div key={v4()} />
                    )
                  )}
                </div>
              </div>
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
