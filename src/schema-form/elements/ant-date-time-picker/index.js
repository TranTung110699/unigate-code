import { t1 } from 'translate';
import React from 'react';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import Form from 'antd/lib/form';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import './stylesheet.scss';
import {
  setMomentObjectToEndOfDay,
  setMomentObjectToStartOfDay,
} from 'common/utils/moment';

export const modes = {
  DATE_PICKER: 'date_picker',
};

const isValueEmpty = (value) => {
  return [undefined, null, ''].includes(value); // 0 is still valid timestamp
};

/**
 * This component use to instead of MUDateTimePicker and MUDatePicker, so it has full props of old those components
 */
const AntDateTimePicker = ({
  mode,
  defaultValue,
  minDate,
  maxDate,
  onChange,
  onBlur,
  getStartDate,
  getEndDate,
  errorText,
  fullWidth,
  floatingLabelText,
  value,
  className,
  style,
  disabled,
  allowClear,
  placeholder,
  size,
  formatDate,
}) => {
  const defaultFormatDate = mode && mode === modes.DATE_PICKER ? 'LL' : 'LLL';
  formatDate = formatDate || defaultFormatDate;

  const handleChange = React.useCallback(
    (value) => {
      if (typeof onChange === 'function') {
        onChange(value);
      }
    },
    [onChange],
  );

  const handleBlur = React.useCallback(
    () => {
      if (typeof onBlur === 'function') {
        onBlur();
      }
    },
    [onBlur],
  );

  React.useEffect(
    () => {
      if (!isValueEmpty(defaultValue)) {
        handleChange(defaultValue);
      }
    },
    [defaultValue, handleChange],
  );

  /**
   * check what dates are disabled
   *
   * @param momentObject
   * @returns {*}
   */
  const disabledDate = React.useCallback(
    (momentObject) => {
      const convertToMoment = (timestampOrDate) => {
        if (timestampOrDate instanceof Date) {
          return moment(timestampOrDate);
        }
        // is timestamp
        return moment.unix(timestampOrDate);
      };

      let orConditions = [];

      if (typeof minDate !== 'undefined') {
        const minDateMoment = convertToMoment(minDate);
        if (!minDateMoment) {
          return true;
        }
        setMomentObjectToStartOfDay(minDateMoment);
        orConditions = orConditions.concat([momentObject < minDateMoment]);
      }

      if (typeof maxDate !== 'undefined') {
        const maxDateMoment = convertToMoment(maxDate);
        if (!maxDateMoment) {
          return true;
        }
        setMomentObjectToEndOfDay(maxDateMoment);
        orConditions = orConditions.concat([momentObject > maxDateMoment]);
      }

      return orConditions.some(
        (cond) => cond, // if any one of the conditions is true
      );
    },
    [minDate, maxDate],
  );

  /**
   * Function to convert moment date before submit result when user handle on change
   *
   * @param momentObject
   */
  const handleDatePickerValueChange = React.useCallback(
    (momentObject) => {
      if (momentObject && momentObject.isValid()) {
        if ([modes.DATE_PICKER].includes(mode)) {
          if (getStartDate) {
            setMomentObjectToStartOfDay(momentObject);
          } else if (getEndDate) {
            setMomentObjectToEndOfDay(momentObject);
          }
        }
        const convertedValue = Number.parseInt(momentObject.format('X'), 10);
        handleChange(convertedValue);
      } else {
        handleChange(null);
      }
    },
    [handleChange, getStartDate, getEndDate, mode],
  );

  return (
    <div className="ant-date-time-picker-wrapper">
      <Form.Item
        validateStatus={errorText ? 'error' : ''}
        help={errorText || ''}
      >
        <div className={'date-time-picker-label'}>
          <label>{floatingLabelText || t1('date_time_picker')}</label>
        </div>
        <DatePicker
          className={fullWidth ? `full-width ${className}` : className}
          style={style}
          disabled={disabled}
          allowClear={allowClear}
          placeholder={placeholder}
          size={size}
          format={formatDate}
          disabledDate={disabledDate}
          showTime={![modes.DATE_PICKER].includes(mode)}
          onChange={handleDatePickerValueChange}
          onBlur={handleBlur}
          value={!isValueEmpty(value) ? moment.unix(value) : null}
        />
      </Form.Item>
    </div>
  );
};

export default makeReduxFormCompatible({})(AntDateTimePicker);
