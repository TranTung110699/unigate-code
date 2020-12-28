export function getTimeInterval(date, syntheticEvent) {
  if (!date) return null;
  let from;
  let to;
  const year = parseInt(date.getFullYear(), 0);
  const month = parseInt(date.getMonth(), 0);
  const day = parseInt(date.getDate(), 0);

  switch (syntheticEvent) {
    case 'month':
      from = new Date(year, month, 1);
      to = new Date(year, month, 31);
      break;
    case 'week':
      from = new Date(year, month, day);
      to = new Date(year, month, day + 7);
      break;
    case 'day':
      from = new Date(year, month, day, 0, 0);
      to = new Date(year, month, day, 23, 59);
      break;
    default:
      break;
  }
  if (!from || !to) return null;

  return { from, to };
}

/**
 * lay string time
 */
export function getTimeStringCalendarOfDate(date, view) {
  if (!date) {
    return '';
  }
  let month = date.getMonth() + 1;
  let day = date.getDate();
  const year = date.getFullYear();
  const weekOfMonth = 0 | (day / 7 + 1);
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  switch (view) {
    case 'month': {
      return `${month}/${year}`;
    }
    case 'day': {
      return `${day}/${month}/${year}`;
    }
    case 'week': {
      return `${day}/${month}/${year}-${weekOfMonth}`;
    }
  }
  return '';
}
