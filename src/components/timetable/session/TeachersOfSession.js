import React, { Component } from 'react';
import { t1 } from 'translate';

class RoomsOfSession extends Component {
  render() {
    const { session, handleRemoveTeacher } = this.props;
    return (
      <span>
        {session.teachers &&
          session.teachers.map((teacher, index) => (
            <span key={`date-${session.id}-${teacher.iid}-${index}`}>
              {teacher.name}
              {handleRemoveTeacher && (
                <i
                  onClick={() => {
                    handleRemoveTeacher(session, session.teachers, teacher);
                  }}
                  className="mi mi-delete cursor-pointer"
                />
              )}
              {index !== session.teachers.length - 1 ? ', ' : ''}
            </span>
          ))}
        {(!session.teachers || session.teachers.length === 0) &&
          t1('not_assigned')}
      </span>
    );
  }
}

export default RoomsOfSession;
