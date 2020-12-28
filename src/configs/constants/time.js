import { t1 } from 'translate/index';
import { convertListOfValuesIntoOptionsForFormElement } from 'common/utils/form';

export const timeUnits = {
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year',
};

export const timeUnitToText = (unit) => {
  switch (unit) {
    case timeUnits.DAY:
      return t1('day');
    case timeUnits.MONTH:
      return t1('month');
    case timeUnits.YEAR:
      return t1('year');
    default:
      return '';
  }
};

export const timeUnitOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    Object.values(timeUnits),
    timeUnitToText,
  );
