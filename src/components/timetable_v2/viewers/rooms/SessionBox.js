import React from 'react';
import { t1 } from 'translate';
import Tooltip from 'antd/lib/tooltip';
import './stylesheet.scss';
import { getTimeName } from '../../utils/DailyUnixTimestamp';
import { getTeacherAvatar } from '../../utils';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 **/
class SessionBox extends React.Component {
  render() {
    const { cell } = this.props;
    const { session, style } = cell;
    const { course, credit_syllabus, teachers, scheduled } = session;
    return (
      <div className="ui-session-box" style={style}>
        <div className="course-name ">
          <Tooltip
            title={
              <div>
                <div>
                  {t1('session_name')}: {session.name}
                </div>
                <div>
                  {t1('syllabus_code')}: {credit_syllabus.code}
                </div>
                <div>
                  {t1('syllabus_name')}: {credit_syllabus.name}
                </div>
              </div>
            }
          >
            <span className="tooltip-data">{`${credit_syllabus.code}`} </span>
          </Tooltip>
          -
          <Tooltip
            title={
              <div>
                <div>
                  {t1('session_name')}: {session.name}
                </div>
                <div>
                  {t1('duration')}: {getTimeName(session.duration)}
                </div>
                <div>
                  {t1('course_code')}: {course.code}
                </div>
                <div>
                  {t1('course_name')}: {course.name}
                </div>
              </div>
            }
          >
            <span className="tooltip-data">{`${course.code}`} </span>
          </Tooltip>
        </div>
        <div>
          {teachers &&
            teachers.map((teacher, i) => {
              const key = `teacher-${teacher.iid}-${i}`;
              let displayName = teacher.mail || teacher.code || teacher.name;
              if (displayName) {
                displayName = displayName.split('@')[0];
              }
              return (
                <span key={key}>
                  {getTeacherAvatar(teacher)} {displayName}{' '}
                </span>
              );
            })}
        </div>
        <div className="footer-box">
          {getTotalStudentAttendent(session)}/{session.total_student} SV (
          {getTimeName(scheduled.start_time)} -{' '}
          {getTimeName(scheduled.end_time)})
        </div>
      </div>
    );
  }
}

export default SessionBox;

const getTotalStudentAttendent = (session) => {
  if (session.status !== 'studied') {
    return '-';
  }

  if (!session.attendance || session.attendance.length === 0) {
    return 0;
  }
  return session.attendance.length;
};
