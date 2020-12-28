import React from 'react';
import CellInfoToolTip from './CellInfoToolTip';
import {
  getTimetableFromCell,
  getEventFromTimetable,
} from './utils/TimetableUtils';
import lodashGet from 'lodash.get';

class EventBox extends React.PureComponent {
  render() {
    const { cell } = this.props;
    const event = getEventFromTimetable(getTimetableFromCell(cell));

    const box = (
      <div className={'timetable-slot-cell event-cell'} style={cell.style}>
        {lodashGet(event, 'name')}
      </div>
    );

    return <CellInfoToolTip cell={cell}>{box}</CellInfoToolTip>;
  }
}

export default EventBox;
