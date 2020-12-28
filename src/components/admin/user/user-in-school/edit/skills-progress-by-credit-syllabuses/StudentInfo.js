import React from 'react';
// import VarDump from 'components/common/VarDump';
import { t1 } from 'translate';
import { timestampToDateString } from 'common/utils/Date.js';
import lGet from 'lodash.get';

class StudentInfo extends React.Component {
  render() {
    const { userInfo } = this.props;

    const userOrg = lGet(userInfo, '__expand.user_organizations');
    const userPositions = lGet(userInfo, '__expand.positions');

    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-between p-l-20 p-r-20">
          <div>
            <ol style={{ fontSize: 16 }}>
              <li>
                {t1('full_name')}: <strong>{userInfo.name}</strong>
              </li>
              <li>
                {t1('student_code')}: <strong>{userInfo.code}</strong>
              </li>
              <li>
                {t1('job_position')}:{' '}
                <strong>
                  {userPositions && userPositions.length
                    ? userPositions.map((position, index) => {
                        return `${position.name}${
                          index < userPositions.length - 1 ? ', ' : ''
                        }`;
                      })
                    : '-'}
                </strong>
              </li>
              <li>
                {t1('organization')}:{' '}
                <strong>
                  {userOrg && userOrg.length
                    ? userOrg.map((org, index) => {
                        return `${org.name}${
                          index < userOrg.length - 1 ? ', ' : ''
                        }`;
                      })
                    : '-'}
                </strong>
              </li>
              <li>
                {t1('started_date')}:{' '}
                <strong>{timestampToDateString(userInfo.startdate)}</strong>
              </li>
            </ol>
          </div>
          <div>
            {userInfo.avatar && (
              <img
                src={userInfo.avatar}
                className="user-avatar"
                style={{ maxHeight: '200px' }}
                alt
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentInfo;
