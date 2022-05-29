import React, { FC } from 'react';
import classes from './OfficeLegend.module.scss';
import { useTranslation } from 'react-i18next';

const OfficeLegend: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.Container}>
      <div>
        <div className={classes.Available}></div>
        <p>{t('available')}</p>
      </div>
      <div>
        <div className={classes.Unavailable}></div>
        <p>{t('unavailable')}</p>
      </div>
      <div>
        <div className={classes.Yours}></div>
        <p>{t('your_desk')}</p>
      </div>
    </div>
  );
};

export default OfficeLegend;
