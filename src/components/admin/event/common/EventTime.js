import React from 'react';
import { eventTypes } from 'configs/constants';
import {
  timestampToDateTimeString,
  timestampToTimeString,
  secondsToTimeString,
} from 'common/utils/Date';
import RecurringRule, {
  recurringRuleToTranslatedText,
} from 'common/recurring-rule';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';

const EventTime = ({ event }) => (
  <div>
    <div>
      {t1('from_%s', [
        timestampToDateTimeString(lodashGet(event, 'start_date')),
      ])}
    </div>
    <div>
      {t1('to_%s', [timestampToDateTimeString(lodashGet(event, 'end_date'))])}
    </div>
    {lodashGet(event, 'type') === eventTypes.RECURRING && (
      <React.Fragment>
        <br />
        <div>
          {recurringRuleToTranslatedText(
            RecurringRule.fromString(lodashGet(event, 'recurring_rule')),
          )}
        </div>
        <div>
          {t1('from_%s', [
            timestampToTimeString(lodashGet(event, 'start_date')),
          ])}
        </div>
        <div>
          {t1('duration')}: {secondsToTimeString(lodashGet(event, 'duration'))}
        </div>
      </React.Fragment>
    )}
  </div>
);

export default EventTime;
