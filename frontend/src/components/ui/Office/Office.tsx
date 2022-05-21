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

interface OfficeProps {
  office: OfficeModel;
  currentDate: Date;
  from: number;
  to: number;
}

const Office: FC<OfficeProps> = ({ office, currentDate, from, to }) => {
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
          workspaceId: workspaceId,
          office: office._id,
        },
      })
    );
  };

  return (
    <div className={classes.Container} style={grid(office.cols, office.rows)}>
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
  );
};

export default Office;
