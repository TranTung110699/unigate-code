import React from 'react';
import {
  getCurrentUnixTimestamp,
  secondsToTimeString,
  timestampToDateString,
} from 'common/utils/Date';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import { SECONDS_TO_START_ALERT_ABOUT_COURSE_DEADLINE } from 'configs/constants';

const Deadline = ({
  showLongVersion,
  changeStyleWhenUrgent = true,
  endDate,
  countDown,
  timeLeft,
  className = 'm-r-10',
  notShowIcon,
  text,
}) => {
  const now = getCurrentUnixTimestamp();

  if (typeof timeLeft === 'undefined') {
    timeLeft = endDate - now;
  }

  const longVersionOfEndDateString = text
    ? text
    : timeLeft <= 0
    ? t1('finished_at_%s', timestampToDateString(endDate))
    : t1('must_finish_before_%s', timestampToDateString(endDate));

  const longVersionOfTimeLeftString = t1(
    'will_end_in_%s',
    secondsToTimeString(timeLeft),
  );

  const urgentStyle = {
    color: 'red',
  };

  return endDate ? (
    <span
      style={
        timeLeft <= SECONDS_TO_START_ALERT_ABOUT_COURSE_DEADLINE &&
        changeStyleWhenUrgent
          ? urgentStyle
          : undefined
      }
      title={
        countDown ? longVersionOfTimeLeftString : longVersionOfEndDateString
      }
    >
      {notShowIcon ? null : <Icon icon="time" className={className} />}
      {Boolean(countDown && showLongVersion) && longVersionOfTimeLeftString}
      {Boolean(countDown && !showLongVersion) && secondsToTimeString(timeLeft)}
      {Boolean(!countDown && showLongVersion) && longVersionOfEndDateString}
      {Boolean(!countDown && !showLongVersion) &&
        timestampToDateString(endDate)}
    </span>
  ) : null;
};

export default Deadline;
