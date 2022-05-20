import { addBusinessDays, eachDayOfInterval } from 'date-fns';

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
