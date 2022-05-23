import React, { FC } from 'react';
import classes from './DateCard.module.scss';
import { CalendarIcon } from '@heroicons/react/outline';
import { classNames } from '../../../utils/classNames';
import { format } from 'date-fns';
import isWeekend from 'date-fns/isWeekend';

interface DateCardProps {
  day: string;
  date: Date;
  selected: boolean;
  onClick: () => void;
}

const DateCard: FC<DateCardProps> = ({ date, day, selected, onClick }) => {
  return (
    <div
      className={classNames(
        classes.Container,
        selected ? 'bg-primary' : 'bg-secondary',
        selected ? 'text-white' : 'text-black',
        isWeekend(date) && !selected ? 'bg-slate-200' : ''
      )}
      onClick={onClick}
    >
      <CalendarIcon height={25} width={25} />
      <p>{day}</p>
      <small>{format(date, 'dd.MM.yyyy')}</small>
    </div>
  );
};

export default DateCard;
