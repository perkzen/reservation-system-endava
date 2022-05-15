import React, { FC } from 'react';
import classes from './Office.module.scss';
import Workspace from '../Workspace/Workspace';
import { grid, gridToArray } from '../../../utils/grid';
import { Office as OfficeModel } from '../../../store/models/Office';
import { findWorkspace, positionDesk } from '../../../utils/workspace';
import { v4 } from 'uuid';

interface OfficeProps {
  office: OfficeModel;
}

const Office: FC<OfficeProps> = ({ office }) => {
  return (
    <div className={classes.Container} style={grid(office.cols, office.rows)}>
      {gridToArray(office.cols, office.rows).map((pos) =>
        positionDesk(pos, office.workspaces) ? (
          <Workspace
            key={v4()}
            workspace={findWorkspace(pos, office.workspaces)}
          />
        ) : (
          <div key={v4()} />
        )
      )}
    </div>
  );
};

export default Office;
