import { slugify } from 'common/utils/string';

export const normalizeYoutubeUrl = (url, prevValue) => {
  if (!url) return '';
  if (url.toLowerCase().indexOf('youtube') === -1) return url;

  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : '';
};

/**
 * url like:
 * https://vimeo.com/280123232
 * https://vimeo.com/channels/staffpicks/280123232
 * will return 280123232
 *
 * @param url
 * @param prevValue
 * @return int : id of the video
 */
export const normalizeVimeoUrl = (url, prevValue) => {
  if (!url) return '';
  if (url.toLowerCase().indexOf('vimeo') === -1) return url;

  const regExp = /^.*?vimeo.com\/.*?(\d+)($|\/)/;

  const match = url.match(regExp);
  // console.log(match);
  return match ? match[1] : '';
};

const padValue = (value) => (value < 10 ? `0${value}` : value);

export const normalizeDate = (dateVal) => {
  const newDate = new Date(dateVal);

  const sMonth = padValue(newDate.getMonth() + 1);
  const sDay = padValue(newDate.getDate());
  const sYear = newDate.getFullYear();

  return `${sMonth}/${sDay}/${sYear}`;
};

export const normalizeDateAsddmmyyy = (dateVal) => {
  const newDate = new Date(dateVal);

  const sMonth = padValue(newDate.getMonth() + 1);
  const sDay = padValue(newDate.getDate());
  const sYear = newDate.getFullYear();

  return `${sDay}/${sMonth}/${sYear}`;
};

export const normalizeDateTime = (dateVal) => {
  const newDate = new Date(dateVal);

  const sMonth = padValue(newDate.getMonth() + 1);
  const sDay = padValue(newDate.getDate());
  const sYear = newDate.getFullYear();
  let sHour = newDate.getHours();
  const sMinute = padValue(newDate.getMinutes());
  let sAMPM = 'AM';

  const iHourCheck = parseInt(sHour, 10);

  if (iHourCheck > 12) {
    sAMPM = 'PM';
    sHour = iHourCheck - 12;
  } else if (iHourCheck === 0) {
    sHour = '12';
  }

  sHour = padValue(sHour);

  return `${sMonth}/${sDay}/${sYear} ${sHour}:${sMinute} ${sAMPM}`;
};

/**
 * if value = "Hello world" , return 'hello_world'
 * used when inserting a new translate key
 * @param value
 * @return {string}
 */
export const translateKeyConverter = (value) => {
  if (!value) return '';
  const key = value.toLowerCase();
  return key.split(' ').join('_');
};

export const apiConverter = (value) => {
  if (!value) return '';
  return value
    .substring(0, value.indexOf('Action'))
    .match(/([A-Z]?[^A-Z]*)/g)
    .slice(0, -1)
    .join('-')
    .toLowerCase();
};

export const convertBooleanValueToInt = (value) => {
  if (!value) return 0;

  return 1;
};

export const convertBooleanValueToString = (value) => {
  if (!value) return 'false';

  return 'true';
};

export const convertFalsyValueToDefault = (defaultValue = 'none') => (value) =>
  value || defaultValue;

export const convertToBoolean = (value) => {
  if (value === 'false') {
    return false;
  } else if (value === 'true') {
    return true;
  } else if (value !== undefined) {
    return !!value;
  }
  return undefined;
};

export const slugifier = (value) => {
  return slugify(value);
};

export const slugifierUppercase = (value) => {
  return slugify(value, 'upper');
};

export const slugifierLowercase = (value) => {
  return slugify(value, 'lower');
};

export const trim = (value) => {
  return typeof value === 'string' ? value.trim() : value;
};
