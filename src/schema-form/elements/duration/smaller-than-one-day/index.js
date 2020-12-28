import { t1 } from 'translate';
import React from 'react';
import moment from 'moment';
import Form from 'antd/lib/form';
import TimePicker from 'antd/lib/time-picker';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import { durationDisplayFormats } from 'schema-form/elements/duration/smaller-than-one-day/common/constants';
import './stylesheet.scss';

const extractTimeElementsFromMomentObject = (momentObject, formatTime) => {
  const formatResultToReturn = ({ hours = 0, minutes = 0, seconds = 0 }) => ({
    hours,
    minutes,
    seconds,
  });

  if (!momentObject) {
    return formatResultToReturn({});
  }

  const hours = momentObject.hours();
  const minutes = momentObject.minutes();
  const seconds = momentObject.seconds();

  switch (formatTime) {
    case durationDisplayFormats.TIME_FORMAT:
      return formatResultToReturn({ hours, minutes });
    case durationDisplayFormats.TIME_IN_SECOND_FORMAT:
      return formatResultToReturn({ hours, minutes, seconds });
    case durationDisplayFormats.MINUTES_AND_SECONDS:
      return formatResultToReturn({ minutes, seconds });
    default:
      return formatResultToReturn({});
  }
};

/**
 * @param valueIsNumberOfSeconds
 * @param valueIsNumberOfMinutes
 *    by default value is string (Ex: 16:05)
 *
 *    if (valueIsNumberOfSeconds), value will be the number of seconds
 *      Ex:
 *        "16:05" string in "HH:mm" format will be 16 * 60 * 60 + 5 * 60 = 57900
 *        "16:05" string in "mm:ss" format will be 16 * 60 + 5 = 965
 *
 *    if (valueIsNumberOfMinutes), value will be the number of minutes
 *      Ex:
 *        "16:05" string in "HH:mm" format will be 16 * 60 + 5 = 965
 *        "16:05" string in "mm:ss" format will be 16 + 5 / 60 = 16.0833333333
 *
 *
 * @param onChange
 * @param onBlur
 * @param formatTime
 * @param value
 * @param fullWidth
 * @param label
 * @param errorText
 * @param hidden
 * @param className
 *
 * @return {null|*}
 * @constructor
 */
const Duration = ({
  onChange,
  valueIsNumberOfSeconds,
  valueIsNumberOfMinutes,
  onBlur,
  formatTime,
  value,
  fullWidth,
  label = t1('duration_time_picker'),
  errorText,
  hidden,
  className,
}) => {
  const valueIsString = !valueIsNumberOfSeconds && !valueIsNumberOfMinutes;

  const handleChange = React.useCallback(
    (newValue) => {
      if (typeof onChange === 'function') {
        onChange(newValue);
      }
    },
    [onChange],
  );

  const handleBlur = React.useCallback(
    () => {
      onBlur();
    },
    [onBlur],
  );

  const handleTimePickerChange = React.useCallback(
    (momentObject, timeString) => {
      if (!momentObject) {
        handleChange(null);
        return;
      }

      if (valueIsString) {
        handleChange(timeString);
        return;
      }

      const { hours, minutes, seconds } = extractTimeElementsFromMomentObject(
        momentObject,
        formatTime,
      );
      const totalSeconds = seconds + minutes * 60 + hours * 60 * 60;

      if (valueIsNumberOfSeconds) {
        handleChange(totalSeconds);
        return;
      }

      if (valueIsNumberOfMinutes) {
        handleChange(totalSeconds / 60);
        return;
      }
    },
    [
      handleChange,
      valueIsNumberOfSeconds,
      valueIsNumberOfMinutes,
      valueIsString,
      formatTime,
    ],
  );

  const getValueAsMomentObject = React.useCallback(
    () => {
      if ([undefined, null, ''].includes(value)) return undefined;

      if (valueIsString) {
        return moment(value, formatTime);
      }

      let seconds;
      if (valueIsNumberOfSeconds) {
        seconds = value;
      }
      if (valueIsNumberOfMinutes) {
        seconds = value * 60;
      }

      if (typeof seconds !== 'undefined') {
        let res = moment({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        res.seconds(seconds);
        return res;
      }

      return undefined;
    },
    [
      value,
      formatTime,
      valueIsNumberOfSeconds,
      valueIsNumberOfMinutes,
      valueIsString,
    ],
  );

  const valueAsMomentObject = getValueAsMomentObject();

  if (hidden) return null;

  return (
    <div className="ant-duration-time-picker-wrapper">
      <Form.Item
        validateStatus={errorText ? 'error' : ''}
        help={errorText || ''}
        label={label}
        colon={false}
      >
        <TimePicker
          onBlur={handleBlur}
          popupClassName="popup-ant-duration-time-picker"
          format={formatTime}
          className={fullWidth ? `full-width ${className}` : className}
          onChange={handleTimePickerChange}
          value={valueAsMomentObject}
        />
      </Form.Item>
    </div>
  );
};

export default makeReduxFormCompatible({})(Duration);
