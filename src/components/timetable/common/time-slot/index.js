import { t1, t4 } from 'translate';
import React from 'react';

import OneTimeSlot from './OneTimeSlot';
import daysOfWeek, { getLabelByValue } from './../DayOfWeek';
import timeSlotsData from './../TimeSlotsData';
import './stylesheet.scss';

class TimeSlot extends React.Component {
  isDuplicatedTimeSlot = (
    duplicatedTimeSlotIds,
    daysOfWeekValue,
    timeSlotValue,
  ) => {
    if (
      duplicatedTimeSlotIds.indexOf(`${daysOfWeekValue}:${timeSlotValue}`) !==
      -1
    ) {
      return true;
    }

    return false;
  };

  render() {
    let { itemIid, duplicatedTimeSlotIds } = this.props;

    return (
      <table className="time-slots-wrapper">
        <tbody>
          <tr>
            <td className="td-day-in-week slot-cell">{t1('time_slot')}</td>
            {daysOfWeek.map((item, index) => {
              return (
                <td key={index} className="td-day-in-week">
                  {getLabelByValue(item.value)}
                </td>
              );
            })}
          </tr>
          {timeSlotsData.map((timeSlot, timeSlotIndex) => {
            return (
              <tr key={timeSlotIndex}>
                <td className="td-slot">
                  <p className="strong">{timeSlot.name}</p>
                  <p className="small-text">
                    ({timeSlot.time_from} - {timeSlot.time_to})
                  </p>
                  <p className="small-text">
                    {timeSlot.time} {t4('minute')}
                  </p>
                </td>
                {daysOfWeek.map((daysOfWeek, daysOfWeekIndex) => {
                  return (
                    <td key={daysOfWeekIndex}>
                      <OneTimeSlot
                        daysOfWeek={daysOfWeek.value}
                        timeSlot={timeSlot.id}
                        itemIid={itemIid}
                        isDuplicatedTimeSlot={this.isDuplicatedTimeSlot(
                          duplicatedTimeSlotIds,
                          daysOfWeek.value,
                          timeSlot.id,
                        )}
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
