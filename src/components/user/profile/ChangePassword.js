import React, { Component } from 'react';
import { t1 } from 'translate';
import './stylesheet.scss';
import ChangePasswordUser from 'components/admin/user/system/change-password/Form';

class ChangePassword extends Component {
  render() {
    const { user } = this.props;
    if (!user) return null;

    return (
      <div className="user-profile-wrapper">
        <div className="col-md-12">
          <h3 className="uppercase" style={{ marginBottom: 0 }}>
            {t1('change_pass')}
          </h3>
        </div>
        <ChangePasswordUser
          formid="edit_user_change_pass"
          ntype="user"
          mode="edit"
          step="change_pass"
          node={user}
        />
      </div>
    );
  }
}

export default ChangePassword;
