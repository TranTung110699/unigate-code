import React, { Component } from 'react';
import getLodash from 'lodash.get';
import { getTimeName } from '../../../timetable_v2/utils/DailyUnixTimestamp';
import { timestampToDateString } from 'common/utils/Date';

class ScheduledDateTime extends Component {
  render() {
    const { session } = this.props;
    const d = getLodash(session, 'scheduled.date_time');
    return (
      <div>
        <div>{d && timestampToDateString(d)}</div>
        <div>
          <b>
            {getTimeName(getLodash(session, 'scheduled.start_time'))} <br />
            {getTimeName(getLodash(session, 'scheduled.end_time'))}
          </b>
        </div>
      </div>
    );
  }
}

export default ScheduledDateTime;
