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
          workspaceId: workspaceId,
          office: office._id,
        },
      })
    );
  };

  return (
    <>
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
    </>
  );
};

export default Office;
