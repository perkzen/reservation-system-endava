import React, { FC, useState } from 'react';
import Office from '../../ui/Office/Office';
import { dummyOffice } from '../../ui/Office/dummyData';
import 'rc-slider/assets/index.css';
import TimeSlider from '../../ui/TimeSlider/TimeSlider';
import classes from './Home.module.scss';
import DateCard from '../../ui/DateCard/DateCard';
import { format, isToday } from 'date-fns';
import { workingHours } from '../../../constants/timeConstants';
import { avaiableDates } from '../../../utils/date';

const Home: FC = () => {
  const [from, setFrom] = useState<number>(8);
  const [to, setTo] = useState<number>(17);
  const [dates, setDates] = useState<Date[]>(avaiableDates);

  const handleChange = (value: number | number[]) => {
    if (value instanceof Array) {
      setFrom(value[0]);
      setTo(value[1]);
    }
  };

  return (
    <div className={classes.Container}>
      <div className={classes.DateContainer}>
        {dates.map((date: Date, index: number) => {
          return (
            <DateCard
              key={index}
              day={format(date, 'EEEE')}
              date={format(date, 'dd.MM.yyyy')}
              selected={isToday(date)}
            />
          );
        })}
      </div>

      <TimeSlider
        min={8}
        max={17}
        marks={workingHours}
        defaultValue={[8, 17]}
        tipFormatter={(value) => `${value}`}
        tipProps={{}}
        onChange={handleChange}
      />
      <Office office={dummyOffice} />
    </div>
  );
};

export default Home;
