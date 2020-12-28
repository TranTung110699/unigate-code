import { getDayOfWeek } from './DayOfWeek';

// const prefixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
const prefixes = ['Week 01', 'Week 02', 'Week 03', 'Week 04', 'Week 05'];

export const getDateArray = (st, tt, vdow) => {
  // input standardize
  const validDaysOfWeek = vdow || [0, 1, 2, 3, 4, 5, 6];
  let startTime = st;
  let toTime = tt;
  if (!startTime) {
    startTime = new Date();
  } else {
    startTime = new Date(startTime);
  }

  if (!toTime) {
    toTime = incrementDayByTime(startTime, 7);
  } else {
    toTime = new Date(toTime);
  }

  startTime = new Date(startTime.toDateString());
  toTime = new Date(toTime.toDateString());

  const result = [];
  let startConvertDate = startTime;
  while (startConvertDate.getTime() <= toTime.getTime()) {
    const dayOfWeek = getDayOfWeek(startConvertDate);
    const isAllowByDefault =
      validDaysOfWeek.includes(`${dayOfWeek.value}`) ||
      validDaysOfWeek.includes(dayOfWeek.value);
    let day = startConvertDate.getDate();
    if (day < 10) day = `0${day}`;
    result.push({
      ...dayOfWeek,
      isAllowByDefault,
      week: prefixes[0 | (startConvertDate.getDate() / 7)],
      month: startConvertDate.getMonth() + 1,
      dateAsString: formatDate(startConvertDate),
      day,
      year: startConvertDate.getFullYear(),
    });
    startConvertDate = incrementDayByTime(startConvertDate, 1);
  }
  return result;
};

export const incrementDayByTime = (date, day) => {
  if (!day) {
    day = 0;
  }
  const newDate = new Date(date.getTime());
  newDate.setDate(newDate.getDate() + day);
  return newDate;
};

export const getStartTimeOfDay = (date) => {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export const formatDate = (d) => {
  const pad = (s) => (s < 10 ? `0${s}` : s);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
};

export const getWeekNumberOfYear = (d) => {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return weekNo;
};
