import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FloorPlan from '../../../assets/endava-mb-floor-plan.png';
import classes from './FloorPlanPage.module.scss';
// @ts-ignore
import ImageMap from 'image-map';
import { useTranslation } from 'react-i18next';

const FloorPlanPage: FC = () => {
  const navigate = useNavigate();
  const { location } = useParams();
  const { t } = useTranslation();
  ImageMap('img[usemap]');

  return (
    <>
      {location === 'Maribor' ? (
        <>
          <h1 className={classes.Heading}>{`${location} floor plan`}</h1>
          <img src={FloorPlan} useMap="#image-map" alt={'Floor plan'} />
          <map name="image-map" className={classes.Map}>
            <area
              target=""
              alt="Office 1"
              title="Office 1"
              coords="72,26,235,233"
              shape="rect"
              onClick={() =>
                navigate('/Maribor/62a1e8882f888e7e72e9777b', {
                  state: 'Office 1',
                })
              }
            />
            <area
              target=""
              alt="Office 2"
              title="Office 2"
              coords="365,43,556,252"
              shape="rect"
              onClick={() =>
                navigate('/Maribor/628b837feec9c04913d3482b', {
                  state: 'Office 2',
                })
              }
            />
            <area
              target=""
              alt="Office 3"
              title="Office 3"
              coords="71,471,291,696"
              shape="rect"
              onClick={() =>
                navigate('/Maribor/628bd89b1fcf64e4dadfa95d', {
                  state: 'Office 3',
                })
              }
            />
            <area
              target=""
              alt="Office 4"
              title="Office 4"
              coords="644,62,949,251"
              shape="rect"
              onClick={() =>
                navigate('/Maribor/628bea931a656573ac780e08', {
                  state: 'Office 4',
                })
              }
            />
          </map>
        </>
      ) : (
        <h1 className={classes.Heading}>{t('no_floor_plan_available')}</h1>
      )}
    </>
  );
};

export default FloorPlanPage;
