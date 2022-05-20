import React, { useEffect, useState } from 'react';
import { generateDates } from '../../../utils/date';
import classes from '../Home/Home.module.scss';
import DateCard from '../../ui/DateCard/DateCard';
import { format } from 'date-fns';
import TimeSlider from '../../ui/TimeSlider/TimeSlider';
import { workingHours } from '../../../constants/timeConstants';
import OfficeLegend from '../../ui/OfficeLegend/OfficeLegend';
import Office from '../../ui/Office/Office';

// @ts-ignore
import Slider from 'react-slick';
import { sliderSettings } from '../../../utils/slider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useAppDispatch, useAppSelector } from '../../../store/app/hooks';
import { fetchOffice } from '../../../store/actions/officeActions';

const OfficePage = () => {
  const [from, setFrom] = useState<number>(8);
  const [to, setTo] = useState<number>(17);
  const [dates] = useState<Date[]>(generateDates());
  const [selectedDay, setSelectedDay] = useState<string>(
    format(new Date(), 'dd.MM.yyyy')
  );

  const dispatch = useAppDispatch();
  const { currentOffice } = useAppSelector((state) => state.office);

  useEffect(() => {
    dispatch(fetchOffice({ _id: '62873f5aa4f4785f032ad232', from: 4, to: 10 }));
  }, [dispatch]);

  const handleChange = (value: number | number[]) => {
    if (value instanceof Array) {
      setFrom(value[0]);
      setTo(value[1]);
    }
  };

  return (
    <div className={classes.Container}>
      <Slider {...sliderSettings}>
        {dates.map((date: Date, index: number) => {
          return (
            <DateCard
              key={index}
              day={format(date, 'EEEE')}
              date={format(date, 'dd.MM.yyyy')}
              selected={format(date, 'dd.MM.yyyy') === selectedDay}
              onClick={() => setSelectedDay(format(date, 'dd.MM.yyyy'))}
            />
          );
        })}
      </Slider>

      <TimeSlider
        min={8}
        max={17}
        marks={workingHours}
        defaultValue={[8, 17]}
        tipFormatter={(value) => `${value}`}
        tipProps={{}}
        onChange={handleChange}
      />
      <OfficeLegend />
      {currentOffice && <Office office={currentOffice} />}
    </div>
  );
};

export default OfficePage;
