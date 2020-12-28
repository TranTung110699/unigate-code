import RRule from 'rrule';
import { weekdayToText } from './byweekday';
import lodashGet from 'lodash.get';
import { t1, t } from 'translate';

export const recurringRuleToTranslatedText = (rrule) => {
  const rruleOptions = lodashGet(rrule, 'origOptions');
  const freq = lodashGet(rruleOptions, 'freq');
  const byMonth = lodashGet(rruleOptions, 'bymonth');
  const byMonthDay = lodashGet(rruleOptions, 'bymonthday');
  const byWeekday = lodashGet(rruleOptions, 'byweekday');

  switch (freq) {
    case RRule.YEARLY: {
      return `${t1('yearly_%s_%s', [t(`month_${byMonth}`), byMonthDay])}`;
    }
    case RRule.WEEKLY: {
      return `${t1('weekly_%s', [
        (byWeekday || []).map((wd) => weekdayToText(wd)).join(', '),
      ])}`;
    }
    case RRule.DAILY: {
      return t1('daily');
    }
  }
};

export default RRule;
