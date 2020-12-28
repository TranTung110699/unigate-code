// sort staff by importance of role
import { t1 } from 'translate';

export const sortStaff = (staff) => {
  staff.sort((staffA, staffB) => {
    if (staffA.roles && staffA.roles.indexOf('root') !== 1) return -1;
    else if (staffB.roles && staffB.roles.indexOf('root') !== 1) return 1;

    if (staffA.roles && staffA.roles.indexOf('headmaster') !== 1) return -1;
    else if (staffB.roles && staffB.roles.indexOf('headmaster') !== 1) return 1;
  });
  return staff;
};

export const isStringInteger = (str) => {
  const n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str;
};

/**
 * return a select options to select
 * level could be 0
 * @type {*|string}
 */
export const generateLevelOptions = (level, forSearch = false) => {
  let i = 0;
  let options = [];

  if (!forSearch) {
    options = [
      {
        value: 0,
        primaryText: '--',
        label: '--',
      },
    ];
  }

  for (i = 1; i <= level; i++) {
    options.push({
      value: i,
      primaryText: i,
      label: i,
    });
  }
  return options;
};

export const returnIfTrue = (value, func) => (value ? func(value) : undefined);
