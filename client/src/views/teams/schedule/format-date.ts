export function getFormattedWeek(weekDaysStart: Date, weekDaysEnd: Date) {
  const startOfWeek = new Date(weekDaysStart);
  const endOfWeek = new Date(weekDaysEnd);
  const range = dateRange(startOfWeek, endOfWeek);

  return {
    dateStart: startOfWeek,
    dateEnd: endOfWeek,
    dateRange: range,
    weeks: range.map((el) => formatDayOfWeek(el)),
    formattedDate: `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`,
  };
}

function dateRange(start: Date, end: Date) {
  const dates = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export function formatDate(date: Date): string {
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function formatDayOfWeek(date: Date): string {
  const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  return daysOfWeek[date.getDay()];
}

export function getMonday(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}
