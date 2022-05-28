import React, { FC, ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderSettings } from '../../../utils/slider';
import classes from './Carousel.module.css';

interface CarouselPros {
  children: ReactNode;
}

const Carousel: FC<CarouselPros> = (props) => {
  return (
    <div className={classes.Container}>
      <Slider {...sliderSettings} className={classes.WidthFull}>
        {props.children}
      </Slider>
    </div>
  );
};

export default Carousel;
