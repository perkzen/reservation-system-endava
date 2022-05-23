import React, { useEffect, useState } from 'react';
import { dateToUTC, generateDates } from '../../../utils/date';
import classes from '../Home/Home.module.scss';
import DateCard from '../../ui/DateCard/DateCard';
import { format } from 'date-fns';
import TimeSlider from '../../ui/TimeSlider/TimeSlider';
import { workingHours } from '../../../constants/timeConstants';
import OfficeLegend from '../../ui/OfficeLegend/OfficeLegend';
import Office from '../../ui/Office/Office';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { fetchOffice } from '../../../store/actions/officeActions';
import { useParams } from 'react-router-dom';
import Carousel from '../../ui/Carousel/Carousel';

const OfficePage = () => {
  const [from, setFrom] = useState<number>(8);
  const [to, setTo] = useState<number>(17);
  const [dates] = useState<Date[]>(generateDates());
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { currentOffice } = useAppSelector((state) => state.office);

  useEffect(() => {
    if (id) {
      dispatch(
        fetchOffice({
          _id: id,
          from: dateToUTC(selectedDay, from),
          to: dateToUTC(selectedDay, to),
        })
      );
    }
  }, [dispatch, selectedDay, from, to, id]);

  const handleChange = (value: number | number[]) => {
    if (value instanceof Array) {
      setFrom(value[0]);
      setTo(value[1]);
    }
  };

  return (
    <div className={classes.Container}>
      <Carousel>
        {dates.map((date: Date, index: number) => {
          return (
            <DateCard
              key={index}
              day={format(date, 'EEEE')}
              date={date}
              selected={
                format(date, 'dd.MM.yyyy') === format(selectedDay, 'dd.MM.yyyy')
              }
              onClick={() => setSelectedDay(date)}
            />
          );
        })}
      </Carousel>

      <TimeSlider
        min={8}
        max={17}
        marks={workingHours}
        defaultValue={[8, 17]}
        tipFormatter={(value) => `${value}h`}
        tipProps={{}}
        onChange={handleChange}
      />
      <OfficeLegend />
      {currentOffice && (
        <Office
          office={currentOffice}
          currentDate={selectedDay}
          from={from}
          to={to}
        />
      )}
    </div>
  );
};

export default OfficePage;
