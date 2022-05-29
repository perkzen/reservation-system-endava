import React from 'react';
import { classNames } from './classNames';
import classes from '../components/ui/Carousel/Carousel.module.scss';
import Arrow from '../assets/arrow.svg';

// @ts-ignore
const NextArrow = ({ onClick }) => {
  return (
    <div className={classNames(classes.Arrow, classes.Next)} onClick={onClick}>
      <img src={Arrow} alt={'arrow right'} />
    </div>
  );
};

// @ts-ignore
const PrevArrow = ({ onClick }) => {
  return (
    <div className={classNames(classes.Arrow, classes.Prev)} onClick={onClick}>
      <img src={Arrow} alt={'arrow left'} />
    </div>
  );
};

export const sliderSettings = {
  infinite: false,
  arrows: true,
  speed: 500,
  slidesToShow: 12,
  slidesToScroll: 12,
  nextArrow: <NextArrow onClick={undefined} />,
  prevArrow: <PrevArrow onClick={undefined} />,
  responsive: [
    {
      breakpoint: 1900,
      settings: {
        slidesToShow: 11,
        slidesToScroll: 11,
      },
    },
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 9,
        slidesToScroll: 9,
      },
    },
    {
      breakpoint: 1480,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 8,
      },
    },
    {
      breakpoint: 1350,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
      },
    },
    {
      breakpoint: 1180,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 825,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 766,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 374,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
