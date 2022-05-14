import React, { FC } from 'react';
import classes from './OfficeRoom.module.scss';
import Workspace from '../Workspace/Workspace';
import { applyGridSize } from '../../../utils/applyGridSize';
import { Office } from '../../../store/models/Office';
import { positionDesk } from '../../../utils/placeDesk';
import { v4 } from 'uuid';

interface OfficeProps {
  office: Office;
}

const OfficeRoom: FC<OfficeProps> = ({ office }) => {
  return (
    <>
      <div
        className={classes.Office}
        style={applyGridSize(office.cols, office.rows)}
      >
        {office.workspaces.map((table) =>
          positionDesk(office.cols * office.rows, table.position) ? (
            <Workspace
              reserved={table.reserved}
              orientation={table.orientation}
            />
          ) : (
            <div key={v4()} />
          )
        )}
      </div>
    </>
  );
};

export default OfficeRoom;
