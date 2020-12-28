/**
 * Created by hungvo on 02/08/17.
 */
import { t1, t4 } from 'translate';
import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import IconTimer from 'material-ui/svg-icons/device/access-time';
import TextField from 'material-ui/TextField';
import FlatButton from 'components/common/mui/FlatButton';
import { findDOMNode } from 'react-dom';
import IconCalendar from 'material-ui/svg-icons/action/perm-contact-calendar';
import {
  jsTimestampToDateTimeString,
  timestampToDate,
} from 'common/utils/Date';
import './stylesheet.scss';

class DateTimepicker extends React.Component {
  datePickerUnderlineStyle = { borderColor: 'red' };

  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      dateTime: null,
      date,
      time: date,
      changing: false,
    };
  }

  componentWillMount() {
    const { input, defaultValue } = this.props;
    const value = (input && input.value) || this.props.value || defaultValue;
    if (value) {
      this.setValue(value, true);
      this.setValueEditor(value);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value, input } = this.props;
    if (!nextProps.value && !(nextProps.input && nextProps.input.value)) {
      return;
    }
    if (
      value !== nextProps.value ||
      (input && input.value) != (nextProps.input && nextProps.input.value)
    ) {
      this.setValueEditor(nextProps.value || nextProps.input.value);
    }
  }

  customDiaLogDateTimeEditor = () => {
    setTimeout(() => {
      if (findDOMNode(this.dialogDateTimeEditor)) {
        let buttonEditor = findDOMNode(this.dialogDateTimeEditor).parentNode;
        buttonEditor.className = 'A1';
        buttonEditor = buttonEditor.parentNode;
        buttonEditor.className = 'A2';
        buttonEditor = buttonEditor.parentNode;
        buttonEditor.className = 'A3';
        buttonEditor = buttonEditor.parentNode;
        buttonEditor.className = 'date-time-picker_controller';
      }
    }, 0);
  };

  setValueEditor = (value) => {
    let dateTime = isNaN(value) ? value : value * 1000;
    let date = new Date(dateTime);
    if (isNaN(date.getMonth())) {
      dateTime = value;
      date = new Date();
    } else {
      dateTime =
        !value || isNaN(value)
          ? value
          : jsTimestampToDateTimeString(date.getTime());
    }

    this.state = {
      date,
      time: date,
      dateTime: dateTime || '',
      changing: false,
    };
  };

  setValue = (value, setDefault = false) => {
    const { dispatch, unixTimeStamp, onChange, input } = this.props;

    let dateTime = value;
    const date = new Date(value);

    if (!isNaN(date.getMonth()) && isNaN(dateTime) && unixTimeStamp) {
      dateTime = date.getTime() / 1000;
    }

    dateTime = !value ? '' : dateTime;

    if (input && input.onChange) {
      input.onChange(dateTime);
    } else {
      this.setValueEditor(dateTime);
    }
    if (onChange && !setDefault) {
      onChange(dateTime);
    }
  };

  formatDateTime = (date, time) => {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return `${[month, day, year].join('/')} ${this.formatTime(
      time || new Date(),
    )}`;
  };

  formatTime = (dateTime) => {
    let minutes = dateTime.getMinutes();
    let hours = dateTime.getHours();
    const period = hours > 12 ? 'PM' : 'AM';
    hours = hours > 12 ? hours - 12 : hours;
    hours = hours > 9 ? hours : `0${hours}`;
    minutes = minutes > 9 ? minutes : `0${minutes}`;
    return `${hours}:${minutes} ${period}`;
  };

  handleOnChange = (value, type) => {
    const state = this.state;
    state[type] = value;
    if (state && state.changing) {
      this.setValue(
        this.formatDateTime(state && state.date, state && state.time),
      );
    } else {
      this.state = state;
    }
  };

  handleOnDismissedDialog = (setValue = false) => {
    if (setValue) {
      this.state = { ...this.state, changing: true };
    } else {
      this.setValueEditor(this.state.dateTime);
    }
  };

  handleClick = () => {
    if (this.dateTimePickerStartDate) {
      this.dateTimePickerStartDate.focus();
      this.customDiaLogDateTimeEditor();
    }
  };

  render() {
    const { input, meta, unixTimeStamp } = this.props;
    const { dateTime, date, time } = this.state;
    let { minDate, maxDate } = this.props;

    minDate = timestampToDate(minDate, unixTimeStamp);
    maxDate = timestampToDate(maxDate, unixTimeStamp);

    return (
      <div className="date-time-picker">
        <IconCalendar onClick={this.handleClick} />
        <TextField
          value={dateTime}
          onChange={(event, newValue) => {
            this.setValue(event.target && event.target.value);
          }}
          floatingLabelText={
            this.props.floatingLabelText || t1('date_time_picker')
          }
          fullWidth={this.props.fullWidth}
          errorText={
            input && meta && meta.error ? meta.error : this.state.errorText
          }
          onClick={this.handleClick}
        />
        <DatePicker
          maxDate={maxDate}
          minDate={minDate}
          underlineStyle={this.datePickerUnderlineStyle}
          value={date}
          className="date-picker"
          ref={(e) => {
            this.dateTimePickerStartDate = e;
          }}
          onChange={(e, val) => this.handleOnChange(val, 'date')}
          cancelLabel={
            <span
              className="controller-label"
              ref={(e) => {
                this.dialogDateTimeEditor = e;
              }}
            >
              <FlatButton
                label={t4('cancel')}
                primary
                onClick={() => {
                  this.handleOnDismissedDialog();
                }}
              />
            </span>
          }
          okLabel={
            <span className="controller-label">
              <FlatButton
                primary
                icon={<IconTimer />}
                onClick={() => {
                  if (this.dataTimePickerStartTime)
                    this.dataTimePickerStartTime.focus();
                  this.customDiaLogDateTimeEditor();
                }}
              />
              <FlatButton
                label={t4('ok')}
                primary
                onClick={() => {
                  this.handleOnDismissedDialog(true);
                }}
              />
            </span>
          }
        />
        <TimePicker
          className="time-picker"
          value={time}
          ref={(element) => {
            this.dataTimePickerStartTime = element;
          }}
          onChange={(e, val) => this.handleOnChange(val, 'time')}
          cancelLabel={
            <span
              className="controller-label"
              ref={(e) => {
                this.dialogDateTimeEditor = e;
              }}
            >
              <FlatButton
                label={t4('cancel')}
                primary
                onClick={() => {
                  this.handleOnDismissedDialog();
                }}
              />
            </span>
          }
          okLabel={
            <span className="controller-label">
              <FlatButton
                primary
                icon={<IconCalendar />}
                onClick={() => {
                  if (this.dateTimePickerStartDate) {
                    this.dateTimePickerStartDate.focus();
                    this.customDiaLogDateTimeEditor();
                  }
                }}
              />
              <FlatButton
                label={t4('ok')}
                primary
                onClick={() => {
                  this.handleOnDismissedDialog(true);
                }}
              />
            </span>
          }
        />
      </div>
    );
  }
}

export default DateTimepicker;
