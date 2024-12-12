export const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = [];
  
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    for (let i = firstDay.getDay(); i > 0; i--) {
      days.push({ date: new Date(year, month, -i + 1), isCurrentMonth: false });
    }
  
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const isToday = year === new Date().getFullYear() && month === new Date().getMonth() && i === new Date().getDate();
      days.push({ date: new Date(year, month, i), isCurrentMonth: true, isToday });
    }
  
    return days;
  };
  