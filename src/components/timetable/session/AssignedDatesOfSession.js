/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { normalizeDateAsddmmyyy } from 'common/normalizers';
import { getDayOfWeek } from '../common/DayOfWeek';

class RoomsOfSession extends Component {
  render() {
    const { session, handleRemoveDateOfSession } = this.props;
    return (
      <span>
        {session.assigned_rooms &&
          session.assigned_rooms.map((assignedRoom, index) => {
            const date = new Date(assignedRoom.assigned_date * 1000);
            const dateInfo = getDayOfWeek(date);

            const assignedDates =
              assignedRoom.time_slots &&
              assignedRoom.time_slots.map((timeSlot) => {
                return `${dateInfo.label}(${timeSlot.time_from} - ${
                  timeSlot.time_to
                }) - ${normalizeDateAsddmmyyy(date)}`;
              });

            return (
              <span key={`date-${session.id}-${index}`}>
                {assignedDates.join(',')}
                {handleRemoveDateOfSession && (
                  <i
                    onClick={() => {
                      handleRemoveDateOfSession(
                        session,
                        assignedRoom.assigned_date,
                      );
                    }}
                    className="mi mi-delete cursor-pointer"
                  />
                )}
                {index !== session.assigned_dates.length - 1 ? ', ' : ''}
              </span>
            );
          })}
      </span>
    );
  }
}

export default RoomsOfSession;
