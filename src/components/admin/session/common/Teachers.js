import React, { Component } from 'react';
import { t1 } from 'translate/index';
import getLodash from 'lodash.get';
import Tag from 'antd/lib/tag';

class SessionTeachers extends Component {
  render() {
    const { session } = this.props;
    let teachers = getLodash(session, 'scheduled.teachers_info');
    if (teachers) teachers = Object.values(teachers);

    if (teachers && Array.isArray(teachers) && teachers.length) {
      return (
        <div>
          {teachers.map((teacher) => (
            <div>
              <Tag id={`${session.iid}-${teacher.id}`}>{teacher.name}</Tag>
            </div>
          ))}
        </div>
      );
    }
    return <span>{t1('no_instructors')}</span>;
  }
}

export default SessionTeachers;
