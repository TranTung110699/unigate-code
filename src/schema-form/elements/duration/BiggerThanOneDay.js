import React from 'react';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import Input from 'antd/lib/input-number';
import { range } from 'common/utils/Array';
import Select from 'schema-form/elements/select/AntdSelectField';
import { t } from 'translate';

const secondsInOneDay = 24 * 60 * 60;
const secondsInOneHour = 60 * 60;
const secondsInOneMinute = 60;

const getPartsFromValue = (value) => {
  let seconds = Math.floor(value);

  const days = Math.floor(seconds / secondsInOneDay);
  seconds = seconds - days * secondsInOneDay;

  const hours = Math.floor(seconds / secondsInOneHour);
  seconds = seconds - hours * secondsInOneHour;

  const minutes = Math.floor(seconds / secondsInOneMinute);
  seconds = seconds - minutes * secondsInOneMinute;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const getValueFromParts = ({ days, hours, minutes, seconds }) => {
  return (
    days * secondsInOneDay +
    hours * secondsInOneHour +
    minutes * secondsInOneMinute +
    seconds
  );
};

const getValueAfterUpdatePart = (value, partName, partValue) => {
  const { days, hours, minutes, seconds } = getPartsFromValue(value);

  return getValueFromParts({
    days,
    hours,
    minutes,
    seconds,
    [partName]: partValue,
  });
};

const hourOptions = range(0, 23).map((v) => ({
  value: v,
  label: t(`%s_h`, [v]),
}));

const minutesOptions = range(0, 59).map((v) => ({
  value: v,
  label: t(`%s_m`, [v]),
}));

const secondsOptions = range(0, 59).map((v) => ({
  value: v,
  label: t(`%s_s`, [v]),
}));

const BiggerThanOneDayDuration = ({
  value,
  onChange,
  floatingLabelText,
  label,
  fieldsToShow = ['days', 'hours', 'minutes', 'seconds'],
  errorText,
}) => {
  const { days, hours, minutes, seconds } = getPartsFromValue(value);

  const displayer = {
    ['days']: ({ className }) => (
      <div className={className}>
        <Input
          value={days}
          onChange={(d) =>
            onChange(getValueAfterUpdatePart(value, 'days', d >= 0 ? d : 0))
          }
          formatter={(d) => t('%s_days', [d])}
          parser={(d) => Number.parseInt(d, 10) || 0}
          style={{
            width: '100%',
          }}
        />
      </div>
    ),
    ['hours']: ({ className }) => (
      <div className={className}>
        <Select
          value={hours}
          onChange={(h) => onChange(getValueAfterUpdatePart(value, 'hours', h))}
          options={hourOptions}
        />
      </div>
    ),
    ['minutes']: ({ className }) => (
      <div className={className}>
        <Select
          value={minutes}
          onChange={(m) =>
            onChange(getValueAfterUpdatePart(value, 'minutes', m))
          }
          options={minutesOptions}
        />
      </div>
    ),
    ['seconds']: ({ className }) => (
      <div className={className}>
        <Select
          value={seconds}
          onChange={(s) =>
            onChange(getValueAfterUpdatePart(value, 'seconds', s))
          }
          options={secondsOptions}
        />
      </div>
    ),
  };

  return (
    <div className="container-fluid p-l-0 p-r-0">
      <div className="row">
        <div className="col-xs-12">
          <label>{label || floatingLabelText}</label>
        </div>
      </div>
      <div className="row">
        {['days', 'hours', 'minutes', 'seconds']
          .filter((field) => fieldsToShow.includes(field))
          .map((field, index, arr) => {
            const Display = displayer[field];
            return (
              <Display
                className={`col-xs-2 ${
                  index === 0
                    ? 'p-r-0'
                    : index === arr.length - 1
                    ? 'p-l-0'
                    : 'p-l-0 p-r-0'
                }`}
              />
            );
          })}
      </div>
      {errorText && (
        <div className="row" style={{ color: 'red', fontSize: 12 }}>
          <div className="col-xs-12 p-t-10">{errorText}</div>
        </div>
      )}
    </div>
  );
};

export default makeReduxFormCompatible({})(BiggerThanOneDayDuration);
