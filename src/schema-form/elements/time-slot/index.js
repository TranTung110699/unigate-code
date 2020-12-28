import { t1, t4 } from 'translate';
import React from 'react';

import OneTimeSlot from './OneTimeSlot';
import { getLabelByValue } from 'components/timetable/common/DayOfWeek';
import './stylesheet.scss';

class TimeSlot extends React.Component {
  constructor(props) {
    super(props);
  }

  selectAll = (dayOfWeek) => {
    const { input } = this.props;
    let value = input ? input.value : this.props.value;
    value = value ? { ...value } : {};
    const valueOfDay = value[dayOfWeek];
    value[dayOfWeek] = [];
    if (!valueOfDay || valueOfDay.length === 0) {
      let { timeSlots } = this.props;
      value[dayOfWeek] = [];
      if (timeSlots && timeSlots.length > 0) {
        timeSlots.map((slot) => {
          value[dayOfWeek].push(slot.id);
        });
      }
    }
    this.dispatchDataChange({ ...value });
  };
  handleChooseSlot = (daysOfWeek, timeSlotId) => {
    const { input } = this.props;
    let value = input ? input.value : this.props.value;
    value = value ? { ...value } : {};
    let valueOfDay = value[daysOfWeek] ? [...value[daysOfWeek]] : [];
    let newValueOfDay = [];
    let exists = false;
    for (let i = 0; i < valueOfDay.length; i++) {
      if (valueOfDay[i] == timeSlotId) {
        exists = true;
      } else {
        newValueOfDay.push(valueOfDay[i]);
      }
    }
    if (!exists) {
      newValueOfDay.push(timeSlotId);
    }
    value[daysOfWeek] = [...newValueOfDay];
    this.dispatchDataChange({ ...value });
  };

  isSelected = (dayOfWeek, timeSlotId) => {
    const { input } = this.props;
    const value = input ? input.value : this.props.value;
    if (!value || !value[dayOfWeek]) {
      return false;
    }

    for (let i = 0; i < value[dayOfWeek].length; i++) {
      if (value[dayOfWeek][i] == timeSlotId) {
        return true;
      }
    }
    return false;
  };

  dispatchDataChange = (newValue) => {
    const { input, onChange } = this.props;
    if (input) {
      input.onChange(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  render() {
    let { daysOfWeek, timeSlots } = this.props;

    return (
      <table className="time-slots-wrapper">
        <tbody>
          <tr>
            <td className="td-day-in-week slot-cell">{t1('time_slot')}</td>
            {daysOfWeek.map((item, index) => {
              return (
                <td
                  key={index}
                  className="td-day-in-week clickable"
                  onClick={() => {
                    this.selectAll(item.value);
                  }}
                >
                  {getLabelByValue(item.value)}
                </td>
              );
            })}
          </tr>
          {timeSlots.map((timeSlot, timeSlotIndex) => {
            return (
              <tr key={timeSlotIndex}>
                <td className="td-slot ">
                  <p
                    className="strong"
                    title={`${timeSlot.time_from} - ${timeSlot.time_to} ${
                      timeSlot.time
                    } ${t4('minute')}`}
                  >
                    {timeSlot.name}
                  </p>
                </td>
                {daysOfWeek.map((daysOfWeek, daysOfWeekIndex) => {
                  return (
                    <td
                      key={daysOfWeekIndex}
                      title={`${timeSlot.time_from} - ${timeSlot.time_to} ${
                        timeSlot.time
                      } ${t4('minute')}`}
                    >
                      <OneTimeSlot
                        daysOfWeek={daysOfWeek.value}
                        timeSlotId={timeSlot.id}
                        selected={this.isSelected(
                          daysOfWeek.value,
                          timeSlot.id,
                        )}
                        handleChooseSlot={this.handleChooseSlot}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default TimeSlot;
