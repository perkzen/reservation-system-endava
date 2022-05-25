import { eachDayOfInterval } from 'date-fns';
import add from 'date-fns/add';

export const generateDates = (): Date[] => {
  const currentDate = new Date();
  const dates = [];
  const result = eachDayOfInterval({
    start: currentDate,
    end: add(currentDate, { days: 13 }),
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
