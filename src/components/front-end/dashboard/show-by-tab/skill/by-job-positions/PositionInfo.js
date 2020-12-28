import React from 'react';
import { t1 } from 'translate';
import {
  timestampToDateString,
  displayDurationSinceEpochTime,
} from 'common/utils/Date';

class PositionInfo extends React.Component {
  render() {
    const { position, userInfo } = this.props;
    return (
      <div>
        <table className="table table-striped table-bordered table-condensed">
          <thead>
            <th>{t1('apply_job_date')}</th>
            <th>{t1('seniority')}</th>
          </thead>
          <tbody>
            <tr>
              <td>
                {userInfo.apply_job_date && userInfo.apply_job_date == 0
                  ? t1('apply_job_date_not_exists')
                  : timestampToDateString(userInfo && userInfo.apply_job_date)}
              </td>
              <td>
                {userInfo.apply_job_date && userInfo.apply_job_date == 0
                  ? ''
                  : displayDurationSinceEpochTime(
                      userInfo && userInfo.apply_job_date,
                    )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PositionInfo;
