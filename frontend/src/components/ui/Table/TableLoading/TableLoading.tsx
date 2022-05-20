import React, { FC } from 'react';
import classes from './TableLoading.module.scss';
import ButtonLoadingSpinner from '../../Button/ButtonLoadingSpinner/ButtonLoadingSpinner';

const TableLoading: FC = () => {
  return (
    <div className={classes.Container}>
      <ButtonLoadingSpinner />
    </div>
  );
};

export default TableLoading;
