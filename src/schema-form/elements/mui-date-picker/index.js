/**
 * Created by hungvo on 06/10/17.
 */
import React, { Component } from 'react';
import MUDatePicker from 'material-ui/DatePicker';
import Icon from 'components/common/Icon';
import moment from 'moment';
import get from 'lodash.get';
// import { normalizeDate } from 'common/normalizers';
import { timestampToDate } from 'common/utils/Date';
import TextField from 'material-ui/TextField';
import './stylesheet.scss';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      defaultValue: '',
    };
  }

  componentWillMount() {
    this.initValue();
  }

  componentWillReceiveProps(nextProps) {
    const value =
      nextProps.value ||
      get(nextProps, 'input.value') ||
      nextProps.defaultValue;
    if (value && this.state.defaultValue !== value) {
      this.initValue(nextProps);
    }
  }

  initValue = (nextProps) => {
    const props = nextProps || this.props;
    let value =
      props.value || get(nextProps, 'input.value') || props.defaultValue;

    if (!value) {
      return;
    }

    this.setState({ defaultValue: value });
    if (typeof value === 'number') {
      value = new Date(value * 1000);
    } else {
      value =
        value &&
        new Date(typeof value === 'object' ? value : Date.parse(value));
    }

    if (value) {
      this.setState({
        value,
      });
      this.handleOnChange('started', value);
    }
  };

  handleOnChange = (e, data) => {
    const {
      input,
      unixTimeStamp,
      onChange,
      getEndDate,
      getStartDate,
    } = this.props;
    let value = data;

    if (getEndDate) {
      value.setHours(23, 59, 59, 999);
    } else if (getStartDate) {
      value.setHours(0, 0, 0, 0);
    }

    if (unixTimeStamp) {
      value = Math.floor(data.getTime() / 1000);
    }
    if (input && input.onChange) {
      input.onChange(value);
    }
    if (onChange && e !== 'started') {
      onChange(value);
    }
    this.setState({
      value: data,
    });
  };

  handleRefresh = () => {
    const { input, onChange } = this.props;
    const value = '';
    if (input && input.onChange) {
      input.onChange(value);
    }
    if (onChange) {
      onChange(value);
    }
    this.setState({
      value,
    });
  };

  handleClick = () => {
    if (this.muDatePicker) {
      this.muDatePicker.focus();
    }
  };

  render() {
    const { styleWrapper, input, meta, className, ...props } = this.props;
    let { minDate, maxDate, unixTimeStamp } = this.props;

    const errorText =
      input && meta && meta.error ? meta.error : this.props.errorText;

    minDate = timestampToDate(minDate, unixTimeStamp);
    maxDate = timestampToDate(maxDate, unixTimeStamp);

    return (
      <div className="ui-date-picker" style={styleWrapper}>
        <Icon
          icon="clear"
          onClick={() => this.handleRefresh()}
          className={`icon-refresh ${errorText ? 'icon-refresh--error' : ''}`}
        />
        <TextField
          {...props}
          fullWidth
          value={
            this.state.value
              ? moment(this.state.value).format('DD/MM/YYYY')
              : ''
          }
          errorText={errorText}
          onClick={this.handleClick}
          className={`text-field ${className}`}
        />
        <MUDatePicker
          {...props}
          minDate={minDate}
          maxDate={maxDate}
          ref={(e) => {
            this.muDatePicker = e;
          }}
          value={this.state.value}
          onChange={(e, val) => this.handleOnChange(e, val)}
          firstDayOfWeek={0}
          className="mu-date-picker"
          errorText={errorText}
        />
      </div>
    );
  }
}

export default DatePicker;
