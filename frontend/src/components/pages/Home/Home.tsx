import React, { FC, useState, useEffect } from 'react';
import Office from '../../ui/Office/Office';
import { dummyOffice } from '../../ui/Office/dummyData';
import 'rc-slider/assets/index.css';
import TimeSlider from '../../ui/TimeSlider/TimeSlider';
import classesHome from './Home.module.scss';
import DateCard from '../../ui/DateCard/DateCard';
import { format, addBusinessDays, eachDayOfInterval, isToday } from 'date-fns';

const Home: FC = () => {
  const [from, setFrom] = useState<number>(8);
  const [to, setTo] = useState<number>(17);
  const [dates, setDates] = useState<Date[]>([]);

  const handleChange = (value: number | number[]) => {
    if (value instanceof Array) {
      setFrom(value[0]);
      setTo(value[1]);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const dates = [];
    const result = eachDayOfInterval({
      start: currentDate,
      end: addBusinessDays(currentDate, 4),
    });
    for (const date of result) {
      if (
        format(date, 'EEEE') !== 'Saturday' &&
        format(date, 'EEEE') !== 'Sunday'
      ) {
        dates.push(date);
      }
    }

    setDates(dates);
  }, []);

  return (
    <div>
      <div className={classesHome.Container}>
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
        marks={{
          8: '8 am',
          9: '9 am',
          10: '10 am',
          11: '11 am',
          12: '12 am',
          13: '1 pm',
          14: '2 pm',
          15: '3 pm',
          16: '4 pm',
          17: '5 pm',
        }}
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
