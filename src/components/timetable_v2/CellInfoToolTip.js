import React from 'react';
import Tooltip from 'antd/lib/tooltip';
import { t1 } from 'translate';
import { getTimeName } from './utils/DailyUnixTimestamp';

const CellInfoToolTip = ({ cell, children }) => {
  const { timeslot, scheduled } = cell;

  return (
    <Tooltip
      title={`${t1('room_name')}: ${timeslot &&
        timeslot.room &&
        timeslot.room.name} ${getTimeName(
        scheduled.start_time,
      )} - ${getTimeName(scheduled.end_time)}`}
    >
      {children}
    </Tooltip>
  );
};

export default CellInfoToolTip;
