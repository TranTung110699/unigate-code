import React from 'react';
import RRule from 'rrule';
import { convertListOfValuesIntoOptionsForFormElement } from 'common/utils/form';
import { t1 } from 'translate';

export const availableFrequencies = [
  RRule.YEARLY,
  // RRule.MONTHLY,
  RRule.WEEKLY,
  RRule.DAILY,
];

export const frequencyToText = (freq) => {
  return {
    [RRule.DAILY]: t1('daily'),
    [RRule.WEEKLY]: t1('weekly'),
    [RRule.MONTHLY]: t1('monthly'),
    [RRule.YEARLY]: t1('yearly'),
  }[freq];
};

export const frequencyOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    availableFrequencies,
    frequencyToText,
  );
