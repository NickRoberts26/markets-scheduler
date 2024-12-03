import { parse, format } from 'date-fns';

export const DateSorter = (dates: string[]): string[] => {
  const sortedDates = dates
    .map((date) => parse(date, 'dd/MM/yy', new Date())) // Convert to Date object
    .sort((a: Date, b: Date) => a.getTime() - b.getTime()) // Sort by time in milliseconds
    .map((date) => format(date, 'dd/MM/yy')); // Convert back to dd/MM/yy

  return sortedDates;
};
