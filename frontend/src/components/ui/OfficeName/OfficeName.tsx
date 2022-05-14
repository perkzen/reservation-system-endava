import React, { FC } from 'react';
import classes from './OfficeName.module.scss';

interface OfficeNameProps {
  officeName: String;
}

const OfficeName: FC<OfficeNameProps> = ({ officeName }) => {
  return (
    <div className={classes.Container}>
      <p>{officeName}</p>
    </div>
  );
};

export default OfficeName;
