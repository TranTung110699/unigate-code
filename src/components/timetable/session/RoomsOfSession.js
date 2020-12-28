import React, { Component } from 'react';
import { t1 } from 'translate';

class RoomsOfSession extends Component {
  render() {
    const { session } = this.props;
    // when we display session in course outline, it's actually in session.room
    const rooms = session.assigned_rooms || session.room;
    return (
      <span>
        {rooms &&
          Array.isArray(rooms) &&
          rooms.map((room, index) => (
            <span key={`room-${session.id}-${room.id}-${index}`}>
              {room.name} {index !== rooms.length - 1 ? ', ' : ''}
            </span>
          ))}

        {(!rooms || (rooms && rooms.length === 0)) && t1('not_assigned')}
      </span>
    );
  }
}

export default RoomsOfSession;
