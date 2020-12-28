import React from 'react';
import { t1 } from 'translate';

export const daysOfWeek = {
  0: {
    label: t1('sunday'),
    short_label: t1('su'),
  },
  1: {
    label: t1('monday'),
    short_label: t1('mo'),
  },
  2: {
    label: t1('tuesday'),
    short_label: t1('tu'),
  },
  3: {
    label: t1('wednesday'),
    short_label: t1('we'),
  },
  4: {
    label: t1('thursday'),
    short_label: t1('th'),
  },
  5: {
    label: t1('friday'),
    short_label: t1('fr'),
  },
  6: {
    label: t1('saturday'),
    short_label: t1('sa'),
  },
};

/**
 * get the config of name of day in week
 *
 * @param day
 * @returns {{time: *|number}}
 */
export const getDayNameConfigsByDay = (day) => {
  return daysOfWeek[day];
};

/**
 * get the config of name of day in week
 *
 * @param date
 * @returns {{time: *|number}}
 */
export const getDayNameConfigs = (date) => {
  return daysOfWeek[date.getDay()];
};

/**
 * Increment date to n day
 * @param date
 * @param day
 * @returns {Date}
 */
export const incrementDayByTimeStamp = (unixTimestamp, dayToIncrement) => {
  if (!unixTimestamp) {
    console.error('unixTimestamp to incrementDayByTime is invalide');
    return null;
  }

  const newDate = new Date(unixTimestamp * 1000);
  newDate.setDate(newDate.getDate() + dayToIncrement);
  return newDate;
};

/**
 *
 * @returns {*}
 */
export const getThisMondayTimeStampOfWeekByDate = (date) => {
  return getThisMondayOfWeekByUnixTimestamp(date.getTime() / 1000);
};

/**
 *
 * @returns {*}
 */
export const getThisMondayOfWeekByUnixTimestamp = (unixTimestamp) => {
  if (!unixTimestamp) return;
  const date = new Date(unixTimestamp * 1000);
  const day = date.getDay();
  let monday = incrementDayByTimeStamp(unixTimestamp, -day + 1);
  return Math.round(monday.getTime() / 1000);
};

/**
 * format date as dd/mm/yyy
 *
 * @param d
 * @returns {string}
 */
export const formatDate = (d) => {
  const pad = (s) => (s < 10 ? `0${s}` : s);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
};

/**
 * format date as dd/mm/yyy
 *
 * @param d
 * @returns {string}
 */
export const formatDateAsTableHeader = (d) => {
  const pad = (s) => (s < 10 ? `0${s}` : s);
  return (
    <div className="date-header">
      <div className="month-year">{`${getDayNameConfigs(d).label} - ${[
        pad(d.getMonth() + 1),
        d.getFullYear(),
      ].join('/')}`}</div>
      <div className="day-number">{pad(d.getDate())}</div>
    </div>
  );
};

/**
 * Hàm  này sẽ lấy ra thời gian trong 1 tuần để view. Nếu ko truyền gì vào, mặc định sẽ là  ngày hiện tại.
 *
 * @param dateToView
 * @returns {{start_date: Date, end_date: Date}}
 */
export const getViewerTimeframeOnCourse = (dateToView) => {
  if (!dateToView) {
    dateToView = new Date().getTime() / 1000;
  }
  const firstMondayUnixTimestamp = getThisMondayOfWeekByUnixTimestamp(
    dateToView,
  );
  const startTime = new Date(firstMondayUnixTimestamp * 1000);
  const endTime = incrementDayByTimeStamp(firstMondayUnixTimestamp, 7);
  return {
    start_date: startTime,
    end_date: endTime,
  };
};

/**
 * return all of day between 2 timestamp
 *
 * @param startTimeOfCourse
 * @param endTimeOfCourse
 */
export const getAllTheDayBetweenUnixTimestamp = (
  startTimeOfCourse,
  endTimeOfCourse,
) => {
  let startTime = new Date(
    getThisMondayOfWeekByUnixTimestamp(startTimeOfCourse) * 1000,
  );
  let endTime = new Date(endTimeOfCourse * 1000);
  const result = [];
  let currentDate = startTime;
  while (currentDate.getTime() <= endTime.getTime()) {
    result.push(currentDate);
    currentDate = incrementDayByTimeStamp(currentDate.getTime() / 1000, 1);
  }
  return result;
};
