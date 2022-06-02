import { addMinutes, eachDayOfInterval, format, isWeekend } from 'date-fns';
import add from 'date-fns/add';
import getHours from 'date-fns/getHours';
import { DATE } from '../constants/dateFormats';

export const generateDates = (
  numOfDaysDisplayed: number,
  showWeekends: boolean
): Date[] => {
  const currentDate = new Date();
  let result = eachDayOfInterval({
    start: currentDate,
    end: add(currentDate, { days: numOfDaysDisplayed }),
  });
  if (!showWeekends) result = result.filter((date) => !isWeekend(date));

  return result;
};

export const dateToUTC = (date: Date, hours?: number): number => {
  date.setHours(0, 0, 0, 0);
  let myDate = add(date, { hours: hours });
  return Date.UTC(
    myDate.getFullYear(),
    myDate.getMonth(),
    myDate.getDate(),
    myDate.getHours()
  );
};

export const getTime = (unix: number) => {
  const date = new Date(unix);
  return getHours(addMinutes(date, date.getTimezoneOffset()));
};

export const getDate = (unix: number) => {
  const date = new Date(unix);
  return format(date, DATE);
};

export const getDateFromUnix = (unix: number) => {
  return new Date(unix);
};
