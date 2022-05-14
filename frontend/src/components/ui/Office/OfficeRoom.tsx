import React, { FC } from 'react';
import classes from './OfficeRoom.module.scss';
import Workspace from '../Workspace/Workspace';

interface OfficeProps {
  column: number;
  row: number;
}

const applyGridSize = (col: number, row: number): object => {
  return {
    gridTemplateColumns: `repeat(${col}, 1fr)`,
    gridTemplateRows: `repeat(${row}, 1fr)`,
  };
};

const OfficeRoom: FC<OfficeProps> = ({ column, row }) => {
  return (
    <>
      <div className={classes.Office} style={applyGridSize(column, row)}>
        <Workspace free={true} orientation={'left'} />
        <Workspace free={true} orientation={'right'} />
        <div></div>
        <Workspace free={true} orientation={'left'} />
        <Workspace free={true} orientation={'right'} />
        <Workspace free={true} orientation={'left'} />
        <Workspace free={false} orientation={'right'} />
      </div>
    </>
  );
};

export default OfficeRoom;
