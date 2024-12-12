import { useState } from 'react';
import { getDaysInMonth } from '../utils/dateUtils';

export const useCalendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const days = getDaysInMonth(currentDate);

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  return {
    days,
    month: currentDate.toLocaleString('default', { month: 'long' }),
    year: currentDate.getFullYear(),
    changeMonth,
  };
};
