import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

class StaffWithRoles extends React.Component {
  render() {
    const { staff } = this.props;
    if (!staff) return <div />;

    const user = staff.user;
    const roles = staff.roles;

    return (
      <div>
        <b>{user.name}</b>
        <div>
          {roles.map((role) => (
            <span key={v4()}>{role.name}</span>
          ))}
        </div>
      </div>
    );
  }
}

export default StaffWithRoles;
