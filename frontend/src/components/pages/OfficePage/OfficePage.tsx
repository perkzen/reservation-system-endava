import React, { useState } from 'react';
import { generateDates } from '../../../utils/date';
import classes from '../Home/Home.module.scss';
import DateCard from '../../ui/DateCard/DateCard';
import { format, isToday } from 'date-fns';
import TimeSlider from '../../ui/TimeSlider/TimeSlider';
import { workingHours } from '../../../constants/timeConstants';
import Details from '../../ui/Details/Details';
import Office from '../../ui/Office/Office';
import { dummyOffice } from '../../ui/Office/dummyData';
import Table from '../../ui/Table/Table';

const OfficePage = () => {
  const [from, setFrom] = useState<number>(8);
  const [to, setTo] = useState<number>(17);
  const [dates] = useState<Date[]>(generateDates());

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
      <Details />
      <Office office={dummyOffice} />
      <Table data={[]} headers={[]} title={''} />
    </div>
  );
};

export default OfficePage;
