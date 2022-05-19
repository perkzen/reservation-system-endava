import React, { FC, ReactNode } from 'react';
import classes from './EmptyTable.module.scss';
import { TableIcon } from '@heroicons/react/outline';

interface EmptyTableProps {
  title: ReactNode;
}

const EmptyTable: FC<EmptyTableProps> = ({ title }) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Icon}>
        <TableIcon width={70} height={70} />
      </div>
      <div className={classes.Title}>{title}</div>
    </div>
  );
};

export default EmptyTable;
