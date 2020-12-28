import React, { Component } from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';

class StudentParentInfo extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        {user && user.is_parent === 1
          ? [
              <div>
                {user && user.relationship_of_parent && (
                  <span>
                    {t1('relationship_of_parent')}:{' '}
                    <b>{user.relationship_of_parent}</b>
                  </span>
                )}
              </div>,
              <div>
                {user && user.info_of_children && (
                  <span>{t1('info_of_children')}:</span>
                )}
                {user &&
                  user.info_of_children &&
                  user.info_of_children.map((child, idx) => {
                    return (
                      <span>
                        {' '}
                        {child && child.name}{' '}
                        {child &&
                          child.school &&
                          child.school.grade_name &&
                          `(${child.school.grade_name})`}{' '}
                        {user.info_of_children.length > idx + 1 && ','}
                      </span>
                    );
                  })}
              </div>,
              <div>
                {user && user.description && (
                  <span>
                    {t1('description')}:{' '}
                    <p dangerouslySetInnerHTML={{ __html: user.description }} />
                  </span>
                )}
              </div>,
            ]
          : null}
      </div>
    );
  }
}

export default StudentParentInfo;
