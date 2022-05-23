import React, { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderSettings } from '../../../utils/slider';
import classes from './Carousel.module.css';

interface CarouselPros {
  children: any;
}
const Carousel: FC<CarouselPros> = (props) => {
  return (
    <Slider {...sliderSettings} className={classes.Container}>
      {props.children}
    </Slider>
  );
};

export default Carousel;
