import { t1 } from 'translate';
import Duration from 'schema-form/elements/duration/smaller-than-one-day';
import { durationDisplayFormats } from 'schema-form/elements/duration/smaller-than-one-day/common/constants';

export const itemDuration = ({
  defaultValue = '03:00',
  formatTime = durationDisplayFormats.MINUTES_AND_SECONDS,
  title,
  classWrapper,
  valueIsNumberOfSeconds,
  valueIsNumberOfMinutes,
  validate,
}) => {
  return {
    type: Duration,
    label: `${title || t1('recommended_learning_duration')} (${formatTime})`,
    formatTime,
    defaultValue,
    classWrapper,
    valueIsNumberOfMinutes,
    valueIsNumberOfSeconds,
    validate,
  };
};
