interface ICalendarMonth {
  monthName: string;
  days: string[];
}

export function getCalendarMonth(year: number, month: number): ICalendarMonth {
  const date = new Date(year, month - 1); 
  const monthName = date.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(year, month, 0).getDate(); 
  const days = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

  return {
      monthName,
      days,
  };
}