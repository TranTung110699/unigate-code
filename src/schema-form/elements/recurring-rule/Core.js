import React from 'react';
import RecurringRule from 'common/recurring-rule';
import { convertJSMonthToRRuleMonth } from 'common/recurring-rule/bymonth';
import { convertJSMonthDayToRRuleMonthDay } from 'common/recurring-rule/bymonthday';
import { convertJSWeekdayToRRuleWeekday } from 'common/recurring-rule/byweekday';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import { Freq } from './freq';
import { ByMonth } from './bymonth';
import { ByMonthDay } from './bymonthday';
import { ByWeekday } from './byweekday';
import usePrevious from 'components/common/hook/usePrevious';

const RRuleComponent = ({
  value: rruleString,
  onChange,
  startDateUnixTimestamp,
  errorText,
}) => {
  const rruleOptions = rruleString
    ? lodashGet(RecurringRule.fromString(rruleString), 'origOptions')
    : null;

  const freq = lodashGet(rruleOptions, 'freq');
  const byMonth = lodashGet(rruleOptions, 'bymonth');
  const byMonthDay = lodashGet(rruleOptions, 'bymonthday');
  const byWeekday = lodashGet(rruleOptions, 'byweekday');

  const startDate = startDateUnixTimestamp
    ? new Date(startDateUnixTimestamp * 1000)
    : undefined;

  const updateRRuleOptions = React.useCallback(
    (
      updateValues,
      reset = false,
      shouldPopulateInfoBasedOnStartDate = false,
    ) => {
      let newRRuleOptions = Object.assign(
        {},
        !reset ? rruleOptions : {},
        updateValues,
      );

      if (shouldPopulateInfoBasedOnStartDate && startDate) {
        const newFreq = lodashGet(newRRuleOptions, 'freq');
        switch (newFreq) {
          case RecurringRule.YEARLY: {
            newRRuleOptions = {
              ...newRRuleOptions,
              bymonth: convertJSMonthToRRuleMonth(startDate.getMonth()),
              bymonthday: convertJSMonthDayToRRuleMonthDay(startDate.getDate()),
            };
            break;
          }
          case RecurringRule.WEEKLY: {
            const newByWeekday = lodashGet(newRRuleOptions, 'byweekday');
            const weekdayOfStartDate = convertJSWeekdayToRRuleWeekday(
              startDate.getDay(),
            );

            if (!(newByWeekday || []).includes(weekdayOfStartDate)) {
              newRRuleOptions = {
                ...newRRuleOptions,
                byweekday: (newByWeekday || []).concat([weekdayOfStartDate]),
              };
            }

            break;
          }
        }
      }

      const newRule = new RecurringRule(newRRuleOptions);
      onChange(newRule.toString());
    },
    [onChange, rruleOptions, startDate],
  );

  const previousStartDateUnixTimestamp = usePrevious(startDateUnixTimestamp);

  React.useEffect(
    () => {
      if (
        rruleOptions &&
        previousStartDateUnixTimestamp &&
        previousStartDateUnixTimestamp !== startDateUnixTimestamp
      ) {
        updateRRuleOptions(null, true, false);
      }
    },
    [
      startDateUnixTimestamp,
      previousStartDateUnixTimestamp,
      rruleOptions,
      updateRRuleOptions,
    ],
  );

  const freqReadOnly = false;
  const byMonthReadOnly = Boolean(startDate);
  const byMonthDayReadOnly = Boolean(startDate);
  const byWeekdayReadOnlyWeekdays = Boolean(startDate)
    ? [convertJSWeekdayToRRuleWeekday(startDate.getDay())]
    : undefined;

  const handleFreqChange = (newFreq) => {
    updateRRuleOptions(
      {
        freq: newFreq,
      },
      true,
      true,
    );
  };

  const handleByMonthChange = (newByMonth) => {
    updateRRuleOptions({
      bymonth: newByMonth,
      bymonthday: 1,
    });
  };

  const handleByMonthDayChange = (newByMonthDay) => {
    updateRRuleOptions({
      bymonthday: newByMonthDay,
    });
  };

  const handleByWeekdayChange = (newByWeekday) => {
    updateRRuleOptions({
      byweekday: newByWeekday,
    });
  };

  return (
    <React.Fragment>
      <div className="container-fluid p-l-0 p-r-0 p-b-10">
        <div className="row">
          <div className="col-xs-12">
            <div>
              <label>{t1('repeat')}</label>
            </div>
            <Freq
              value={freq}
              onChange={handleFreqChange}
              readOnly={freqReadOnly}
            />
          </div>
        </div>
        {freq === RecurringRule.YEARLY && (
          <div className="row p-t-10">
            <div className="col-xs-2">
              <div>
                <label>{t1('on_month')}</label>
              </div>
              <ByMonth
                value={byMonth}
                onChange={handleByMonthChange}
                readOnly={byMonthReadOnly}
              />
            </div>
            <div className="col-xs-2">
              <div>
                <label>{t1('on_day')}</label>
              </div>
              <ByMonthDay
                month={byMonth}
                value={byMonthDay}
                onChange={handleByMonthDayChange}
                readOnly={byMonthDayReadOnly}
              />
            </div>
          </div>
        )}
        {freq === RecurringRule.WEEKLY && (
          <div className="row p-t-10">
            <div className="col-xs-12">
              <div>
                <label>{t1('on_weekdays')}</label>
              </div>
              <ByWeekday
                value={byWeekday}
                onChange={handleByWeekdayChange}
                readOnlyWeekdays={byWeekdayReadOnlyWeekdays}
              />
            </div>
          </div>
        )}
        {errorText && (
          <div className="row p-t-10" style={{ color: 'red', fontSize: 12 }}>
            <div className="col-xs-12">{errorText}</div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default RRuleComponent;
