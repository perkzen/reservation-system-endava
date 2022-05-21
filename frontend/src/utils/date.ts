import { addBusinessDays, eachDayOfInterval } from 'date-fns';
import add from 'date-fns/add';

export const generateDates = (): Date[] => {
  const currentDate = new Date();
  const dates = [];
  const result = eachDayOfInterval({
    start: currentDate,
    end: addBusinessDays(currentDate, 13),
  });
  for (const date of result) {
    dates.push(date);
  }

  return dates;
};

export const dateToUTC = (date: Date, hours: number): number => {
  date.setHours(0, 0, 0, 0);
  let myDate = add(date, { hours: hours });
  return Date.UTC(
    myDate.getFullYear(),
    myDate.getMonth() + 1,
    myDate.getDate(),
    myDate.getHours()
  );
};

export const convertTo12HourFormat = (hours: number): string => {
  let ampm = hours < 12 || hours === 24 ? 'AM' : 'PM';
  let convertedHour = hours % 12 || 12;
  return convertedHour + ' ' + ampm;
};
