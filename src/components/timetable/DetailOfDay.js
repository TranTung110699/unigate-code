import React from 'react';
import { getCellToDisplay } from './common/timetable';
import { t1 } from 'translate';
import Cell from './search/Cell';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 16/10/2017
 **/
class DetailOfDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTimelines = () => {
    const { rooms, day, timeSlots, items } = this.props;
    const roomsToView = [];
  };

  render() {
    const { rooms, day, timeSlots, items } = this.props;
    const roomsToView = [];
    return (
      <div className="timetable-panel timetable-detail-panel">
        <table className="panel">
          <thead>
            <tr>
              <td className="width200px">Rooms</td>
              {timeSlots &&
                timeSlots.map((timeSlot) => (
                  <td key={`time-frame-${timeSlot.id}`}>
                    <div>{timeSlot.name}</div>
                    <div>{`${timeSlot.time_from} - ${timeSlot.time_to}`}</div>
                  </td>
                ))}
            </tr>
          </thead>
          {rooms.map((room) => {
            roomsToView.push(
              <tr key={`detail-room-${room.id}`}>
                <td className="room_name">
                  <div>{room.name}</div>
                  <div>
                    {`${room.room_seat} ${t1('seat')}`} -{' '}
                    {`${room.room_size} ${t1('m2')}`}
                  </div>
                  <div className="room-type">({room.room_type})</div>
                </td>
                {timeSlots &&
                  timeSlots.map((timeSlot, index) => {
                    let key = `cell-index-detail-${room.id}-${index}`;
                    let cellData = getCellToDisplay(
                      items,
                      room,
                      day.time,
                      timeSlot,
                    );
                    if (
                      !cellData ||
                      (cellData &&
                        cellData.rowSpan !== -1 &&
                        cellData.roomId !== room.id)
                    ) {
                      return <td key={key} />;
                    }

                    if (cellData.rowSpan !== -1) {
                      return (
                        <td
                          rowSpan={cellData.rowSpan}
                          key={`date-cell-detail-${index}-${day.dateAsString}`}
                        >
                          <Cell
                            mode="view"
                            classIid={this.props.classIid}
                            data={cellData}
                            clazz={this.props.clazz}
                          />
                        </td>
                      );
                    }
                  })}
              </tr>,
            );
          })}
          <tbody>{roomsToView.map((item) => item)}</tbody>
        </table>
      </div>
    );
  }
}

export default DetailOfDay;
