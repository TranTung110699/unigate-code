import React, { Component } from 'react';
import SessionList from 'components/admin/session/search/Layout';
import { t1 } from 'translate';

class CourseSessions extends Component {
  render() {
    const { courseIid, questionIid } = this.props;

    const node = {
      iid: courseIid,
      ntype: 'course',
    };

    return (
      <div>
        <SessionList node={node} isStudent={true} />
      </div>
    );
  }
}

export default CourseSessions;
