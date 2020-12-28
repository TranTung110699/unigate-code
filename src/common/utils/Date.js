import { t1, t3, t4 } from 'translate';
import { max, min } from 'configs/applicableSchoolYears';
import store from 'store';
import { monthOptions } from 'configs/constants';

let config;

const getConfDateTimeFormat = () => {
  if (config) return config;

  const { domainInfo } = store.getState();
  config = domainInfo.conf;
  return config;
};
//TODO: tạm thời thay monthsSelect bằng monthOptions
export const monthsSelect = [
  { value: 1, primaryText: t1('january'), label: t1('january') },
  { value: 2, primaryText: t1('february'), label: t1('february') },
  { value: 3, primaryText: t1('march'), label: t1('march') },
  { value: 4, primaryText: t1('april'), label: t1('april') },
  { value: 5, primaryText: t1('may'), label: t1('may') },
  { value: 6, primaryText: t1('june'), label: t1('june') },
  { value: 7, primaryText: t1('july'), label: t1('july') },
  { value: 8, primaryText: t1('august'), label: t1('august') },
  { value: 9, primaryText: t1('september'), label: t1('september') },
  { value: 10, primaryText: t1('october'), label: t1('october') },
  { value: 11, primaryText: t1('november'), label: t1('november') },
  { value: 12, primaryText: t1('december'), label: t1('december') },
];

const exactNumberDateString = (number) => {
  const n = parseInt(number, 10);
  return n < 10 ? `0${n}` : number;
};

/**
 * Will display time in 10:30:23 format from timestamp
 * @param ts
 * @returns {string}
 */
export const timeStampToTime = (ts) => {
  const date = new Date(ts * 1000);
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  const seconds = `0${date.getSeconds()}`;

  // Will display time in 10:30:23 format
  return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
};

/**
 * Example: convert date to 12:22 AM
 * @param date
 * @param timeFormat
 * @returns {string}
 */
const dateToTimeString = (date, timeFormat) => {
  const hour = String(date.getHours()).padStart(2, '0');
  const minus = String(date.getMinutes()).padStart(2, '0');
  if (timeFormat === 'AM/PM') {
    const h = parseInt(hour, 10);
    if (h < 13) {
      return `${exactNumberDateString(h)}:${exactNumberDateString(minus)} ${t3(
        'AM',
      )}`;
    }
    return `${exactNumberDateString(h - 12)}:${exactNumberDateString(
      minus,
    )} ${t3('PM')}`;
  }
  return `${exactNumberDateString(hour)}:${exactNumberDateString(minus)}`;
};

/**
 * @param ts
 * @type is long_date, short_date, full_date
 * Example:
 *  - long_date: 02/05/2018
 *  - short_date: 02/05/18
 *  - full_date: always 02 May, 2018
 * @param options it is unix ts, usually from server, else , it is js time stamp from new Date().now()
 *  - unixEpoch it is unix ts, usually from server, else , it is js time stamp from new Date().now()
 *  - isoDate it is format YYYY/MM/DD
 * @returns {*}
 */
export const timestampToDateString = (
  ts,
  options = {
    isoDate: false,
    showDate: true,
    showTime: false,
    type: 'long_date',
    unixEpoch: true,
  },
) => {
  const defaultOptions = {
    isoDate: false,
    showDate: true,
    showTime: false,
    type: 'long_date',
    unixEpoch: true,
  };

  const conf = getConfDateTimeFormat();
  if (!conf || !ts) return '';

  const {
    isoDate,
    showDate,
    showTime,
    hiddenDay,
    unixEpoch,
    type,
  } = Object.assign(defaultOptions, options);
  const date = new Date(unixEpoch ? parseInt(ts, 10) * 1000 : parseInt(ts, 10));

  let res = '';
  if (showDate) {
    res = isoDate ? conf.iso_date : conf.date_format;
    if (!res) {
      res = 'DD-MM-YYYY';
    }
    if (hiddenDay) {
      res = res.replace('DD-', '');
    }

    switch (type) {
      case 'short_date': {
        res = res.replace('MM', exactNumberDateString(date.getMonth() + 1));
        res = res.replace('DD', exactNumberDateString(date.getDate()));
        res = res.replace('YYYY', date.getFullYear() % 100);
        break;
      }
      case 'long_date': {
        res = res.replace('MM', exactNumberDateString(date.getMonth() + 1));
        res = res.replace('DD', exactNumberDateString(date.getDate()));
        res = res.replace('YYYY', date.getFullYear());
        break;
      }
      case 'full_date': {
        const monthSelected = monthOptions().find(
          (row) => row.value === date.getMonth() + 1,
        );

        res = `${exactNumberDateString(date.getDate())} ${monthSelected &&
          (monthSelected.primaryText ||
            monthSelected.value)}, ${date.getFullYear()}`;
        break;
      }
      default:
        res = '';
        break;
    }
  }

  if (showTime) {
    res = `${dateToTimeString(date, conf.time_format)}, ${
      res ? `${res} ` : ''
    }`;
  }

  return res;
};

export const getTimestampTheStartADay = (timestamp) => {
  const date = timestamp ? new Date(timestamp * 1000) : new Date();
  date.toLocaleTimeString('vi-VN');
  date.setHours(0, 0, 0, 0);
  return date.getTime() / 1000;
};

export const getTimestampTheEndADay = (timestamp) => {
  const date = timestamp ? new Date(timestamp * 1000) : new Date();
  date.toLocaleTimeString('vi-VN');
  date.setHours(23, 59, 59, 999);
  return date.getTime() / 1000;
};

export const timestampToDateTimeString = (
  ts,
  options = {
    isDate: false,
    showTime: true,
    type: 'full_date',
    unixEpoch: true,
  },
) => timestampToDateString(ts, options);

export const jsTimestampToDateString = (
  ts,
  options = {
    isDate: false,
    showTime: false,
    type: 'full_date',
    unixEpoch: false,
  },
) => timestampToDateString(ts, options);

export const jsTimestampToDateTimeString = (
  ts,
  options = {
    isDate: false,
    showTime: true,
    type: 'full_date',
    unixEpoch: false,
  },
) => timestampToDateTimeString(ts, options);

export const timestampToTimeString = (
  ts,
  options = {
    isDate: false,
    showDate: false,
    showTime: true,
    unixEpoch: true,
  },
) => timestampToDateString(ts, options);

/**
 * @param timeString with format 'HH:MM:SS'
 */
export const timeStringToSeconds = (timeString) => {
  const parts = timeString.split(':');
  return parts.reduce((result, part) => result * 60 + parseInt(part, 10), 0);
};

/**
 * @return string with format 'HH:MM:SS'
 */
export const secondsToTimeString = (
  seconds,
  shouldRoundSecond = true,
  callback,
) => {
  if ([undefined, null].includes(seconds) || isNaN(seconds)) {
    return '';
  }

  let remain = seconds;
  const d = Math.floor(remain / (3600 * 24));
  remain %= 3600 * 24;
  const h = Math.floor(remain / 3600);
  remain %= 3600;
  const m = String(Math.floor(remain / 60)).padStart(2, '0');
  remain %= 60;
  if (shouldRoundSecond) {
    remain = Math.floor(remain);
  }
  const s = String(remain).padStart(2, '0');
  if (callback) {
    return callback(d, h, m, s);
  }

  if (d) {
    return `${t4('%d_day', [d])} - ${h}:${m}:${s}`;
  }
  return h ? `${h}:${m}:${s}` : `${m}:${s}`;
};

/**
 * convert string 'HH:MM:SS' to seconds
 * if already a number -> do nothing
 * @param time
 */
export const getTimeInSeconds = (time) => {
  if (typeof time === 'string') {
    return timeStringToSeconds(time);
  } else if (typeof time === 'number') {
    return time;
  }
  return NaN;
};

/**
 * Display the number of years, months, days since the unix timestamp ts
 * For example
 * - 1 year, 2 months
 * - 1 month 2 days
 * - 6 days
 * @param time
 * @returns {string}
 */
export const displayDurationSinceEpochTime = (ts) => {
  const current = new Date().getTime();
  const previous = parseInt(ts, 10) * 1000;

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    const seconds = Math.round(elapsed / 1000);
    return `${seconds} ${t4(seconds > 1 ? 'seconds' : 'second')}`;
  } else if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed / msPerMinute);
    return `${minutes} ${t4(minutes > 1 ? 'minutes' : 'minute')}`;
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    return `${hours} ${t4(hours > 1 ? 'hours' : 'hour')}`;
  } else if (elapsed < msPerMonth) {
    const days = Math.round(elapsed / msPerDay);
    return `${days} ${t4(days > 1 ? 'days' : 'day')}`;
  } else if (elapsed < msPerYear) {
    const months = Math.round(elapsed / msPerMonth);
    return `${months} ${t4(months > 1 ? 'months' : 'month')}`;
  }

  const years = Math.round(elapsed / msPerYear);
  return `${years} ${t4(years > 1 ? 'years' : 'year')}`;
};

export const dateToTimestamp = (strDate) => {
  const date = new Date(strDate);
  date.setHours(0, 0, 0, 0);
  return Math.floor(date.getTime() / 1000);
};

export const getCurrentUnixTimestamp = () => {
  const date = new Date();
  return Math.floor(date.getTime() / 1000);
};

export const yearsOptions = () => {
  const yearOptions = [];
  for (let i = min; i <= max; i++) {
    yearOptions.push({ value: i, primaryText: i });
  }

  return yearOptions;
};

export const timestampToDate = (dateValue, unixTimeStamp) => {
  if (!dateValue) {
    return undefined;
  }

  if (dateValue instanceof Date) {
    return dateValue;
  }

  return new Date(unixTimeStamp ? dateValue * 1000 : dateValue);
};

/**
 * Lay khoang thoi gian bat dau va ket thuc cua mot ngay 00:00:00 -> 23:59:59
 * @param date
 * @returns {*}
 */
export const getRoundTimestampOfDayByDate = (date = new Date()) => {
  if (!date) {
    return null;
  }

  date.setHours(0, 0, 0, 0);
  const startTime = date.getTime() / 1000;

  date.setHours(23, 59, 59, 0);
  const endTime = date.getTime() / 1000;

  return { startTime, endTime };
};

/**
 * because new Date().getMonth() return a number from 0 to 11 (January is 0)
 * while the server use 1 to 12 (January is 1)
 *
 * @param jsMonth
 * @return {*}
 */
export const jsMonthToServerMonthNumber = (jsMonth) => jsMonth + 1;

export const getCurrentMonth = () => {
  const jsMonth = new Date().getMonth();
  return jsMonthToServerMonthNumber(jsMonth);
};
