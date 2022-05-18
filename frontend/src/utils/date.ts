import { addBusinessDays, eachDayOfInterval, format } from 'date-fns';

export const generateDates = (): Date[] => {
  const currentDate = new Date();
  const dates = [];
  const result = eachDayOfInterval({
    start: currentDate,
    end: addBusinessDays(currentDate, 7),
  });
  for (const date of result) {
    if (
      format(date, 'EEEE') !== 'Saturday' &&
      format(date, 'EEEE') !== 'Sunday'
    ) {
      dates.push(date);
    }
  }

  return dates;
};
