/* eslint-disable jsx-a11y/anchor-is-valid,no-undef,react/prop-types */
import React, { Component } from 'react';
import lGet from 'lodash.get';
import SessionsTable from 'components/admin/session/search/Layout';

class SessionsList extends Component {
  render() {
    const { course } = this.props;

    if (lGet(course, 'counter.sessions') > 0)
      return (
        <div className="session-list">
          <SessionsTable node={course} isStudent={true} />
        </div>
      );
    else return null;
  }
}

export default SessionsList;
