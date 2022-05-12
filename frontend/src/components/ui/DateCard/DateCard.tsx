import React, { FC } from 'react';
import classes from './DateCard.module.scss';
import { CalendarIcon } from '@heroicons/react/outline';
import { classNames } from '../../../utils/classNames';

interface DateCardProps {
  day: string;
  date: string;
  selected: boolean;
}

const DateCard: FC<DateCardProps> = ({ date, day, selected }) => {
  return (
    <div
      className={classNames(
        classes.Container,
        selected ? 'bg-primary' : 'bg-secondary',
        selected ? 'text-white' : 'text-black'
      )}
    >
      <CalendarIcon height={25} width={25} />
      <p>{day}</p>
      <small>{date}</small>
    </div>
  );
};

export default DateCard;
