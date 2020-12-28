import React from 'react';
import RRule from 'rrule';
import { t1 } from 'translate';

export const weekdayToText = (wd) => {
  return {
    [RRule.SU]: t1('sunday'),
    [RRule.MO]: t1('monday'),
    [RRule.TU]: t1('tuesday'),
    [RRule.WE]: t1('wednesday'),
    [RRule.TH]: t1('thursday'),
    [RRule.FR]: t1('friday'),
    [RRule.SA]: t1('saturday'),
  }[wd];
};

export const convertJSWeekdayToRRuleWeekday = (wd) => {
  return {
    0: RRule.SU,
    1: RRule.MO,
    2: RRule.TU,
    3: RRule.WE,
    4: RRule.TH,
    5: RRule.FR,
    6: RRule.SA,
  }[wd];
};

export const weekdayOptions = (readOnlyWeekdays) =>
  [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU].map(
    (wd) => ({
      value: wd,
      label: weekdayToText(wd),
      readOnly: (readOnlyWeekdays || []).includes(wd),
    }),
  );
