import React, { FC, useState } from 'react';
import Office from '../../ui/Office/Office';
import { dummyOffice } from '../../ui/Office/dummyData';
import 'rc-slider/assets/index.css';
import TimeSlider from '../../ui/TimeSlider/TimeSlider';
import classes from '../../ui/TimeSlider/TimeSlider.module.scss';

const Home: FC = () => {
  const [from, setFrom] = useState(7);
  const [to, setTo] = useState(15);

  return (
    <div>
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
