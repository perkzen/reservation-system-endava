import React, { FC, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/outline';
import classes from './Details.module.scss';
import { useTranslation } from 'react-i18next';

const Details: FC = () => {
  const { t } = useTranslation();
  const [showLegend, setShowLegend] = useState<boolean>(false);

  return (
    <div className={classes.Container}>
      <InformationCircleIcon onClick={() => setShowLegend(!showLegend)} />
      {showLegend ? (
        <div className={classes.Info}>
          <div className={classes.Available}>{t('available')}</div>
          <div className={classes.Unavailable}>{t('unavailable')}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Details;
