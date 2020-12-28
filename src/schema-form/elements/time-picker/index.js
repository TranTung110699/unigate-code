import { t1 } from 'translate';
import React from 'react';
import moment from 'moment';
import Form from 'antd/lib/form';
import TimePicker from 'antd/lib/time-picker';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import {
  getTimeFromName,
  getTimeName,
} from 'components/timetable_v2/utils/DailyUnixTimestamp';
import './stylesheet.scss';

class AntTimePicker extends React.Component {
  handleOnChange = (time, timeString) => {
    const { onChange, dailyUnix } = this.props;
    const convertedValue = dailyUnix ? getTimeFromName(timeString) : timeString;
    onChange(convertedValue);
  };

  render() {
    const {
      fullWidth,
      floatingLabelText,
      errorText,
      value,
      defaultValue,
      ...props
    } = this.props;

    let { formatTime, className } = this.props;

    formatTime = formatTime || 'HH:mm';
    className = fullWidth ? `full-width ${className}` : className;

    return (
      <div className="ant-time-picker-wrapper">
        <Form.Item
          validateStatus={errorText ? 'error' : ''}
          help={errorText || ''}
        >
          <div className={'time-picker-label'}>
            <label>{floatingLabelText || t1('time_picker')}</label>
          </div>
          <TimePicker
            {...props}
            popupClassName="popup-ant-time-picker"
            format={formatTime}
            className={className}
            onChange={this.handleOnChange}
            defaultValue={
              defaultValue &&
              moment(getTimeName(defaultValue) || null, formatTime)
            }
            value={value && moment(getTimeName(value) || null, formatTime)}
          />
        </Form.Item>
      </div>
    );
  }
}

export default makeReduxFormCompatible({})(AntTimePicker);
