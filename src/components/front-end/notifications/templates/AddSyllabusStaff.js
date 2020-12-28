import React, { Component } from 'react';
import Link from 'components/common/router/Link';
import Links from 'routes/links';
import getLodash from 'lodash.get';
import Avatar from 'components/common/avatar/index';
import { t1 } from 'translate';

const style = {
  float: 'left',
  marginRight: '10px',
};

const linkStyle = {
  width: '100%',
};

class AddSyllabusStaff extends Component {
  render() {
    const { item } = this.props;

    return (
      <Link
        to={Links.learnCourse(getLodash(item, 'params.syllabus'), null, true)}
        style={linkStyle}
      >
        <span className="profile-icon-panel" style={style}>
          <Avatar user={item.receiver} />
        </span>
        <div className="signined">
          <p className="nav-link">
            {t1('will_have_the_following_permissions:_%s_for_subject_%s', [
              getLodash(item, 'params.roles')
                .map((row) => row.name)
                .join(','),
              getLodash(item, 'params.syllabus.name'),
            ])}
          </p>
        </div>
      </Link>
    );
  }
}

AddSyllabusStaff.propTypes = {};

export default AddSyllabusStaff;
