import React, { FC } from 'react';
import classes from './TableLoading.module.scss';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const TableLoading: FC = () => {
  return (
    <div className={classes.Container}>
      <LoadingSpinner />
    </div>
  );
};

export default TableLoading;
