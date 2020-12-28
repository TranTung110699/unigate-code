import React from 'react';
import { convertListOfValuesIntoOptionsForFormElement } from 'common/utils/form';
import { range } from 'common/utils/Array';

export const convertJSMonthDayToRRuleMonthDay = (day) => day;

export const dayInMonthOptions = (month) => {
  const numberOfDays = {
    1: 31,
    2: 28, // we not support leap years yet
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  }[month];
  return convertListOfValuesIntoOptionsForFormElement(range(1, numberOfDays));
};
