import React, { FC } from 'react';
import classes from './TableLoading.module.scss';
import loading from '../../../../assets/loading.gif';

const TableLoading: FC = () => {
  return (
    <div className={classes.Container}>
      <img src={loading} alt={'...Loading'} />
      <p>... loading</p>
    </div>
  );
};

export default TableLoading;
