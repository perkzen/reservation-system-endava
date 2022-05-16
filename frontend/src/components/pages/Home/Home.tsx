import React, { FC, useState, useEffect } from 'react';
import Office from '../../ui/Office/Office';
import { dummyOffice } from '../../ui/Office/dummyData';
import 'rc-slider/assets/index.css';
import TimeSlider from '../../ui/TimeSlider/TimeSlider';
import classes from '../../ui/TimeSlider/TimeSlider.module.scss';
import classesHome from './Home.module.scss';
import DateCard from '../../ui/DateCard/DateCard';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import addBusinessDays from 'date-fns/addBusinessDays';
import { format } from 'date-fns';
import isToday from 'date-fns/isToday';

const Home: FC = () => {
  const [from, setFrom] = useState<number>(7);
  const [to, setTo] = useState<number>(15);
  const [dates, setDates] = useState<Date[]>([]);

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
      <div className={classesHome.Cointainer}>
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
        className={classes.Slider}
        dotStyle={{ borderColor: '#31363B' }}
        activeDotStyle={{ borderColor: '#31363B' }}
        trackStyle={{ backgroundColor: '#31363B' }}
        handleStyle={{ backgroundColor: '#DE411B' }}
        range
        pushable
        min={7}
        max={15}
        marks={{
          7: '7am',
          8: '8am',
          9: '9am',
          10: '10am',
          11: '11am',
          12: '12am',
          13: '1pm',
          14: '2pm',
          15: '3pm',
        }}
        defaultValue={[7, 15]}
        tipFormatter={(value) => `${value}`}
        tipProps={{}}
        onChange={(value) => {
          if (value instanceof Array) {
            setFrom(value[0]);
            setTo(value[1]);
          }
        }}
      />
      <Office office={dummyOffice} />
    </div>
  );
};

export default Home;

//<Slider range min={0} max={20} defaultValue={3} handleRender={handleRender} />
