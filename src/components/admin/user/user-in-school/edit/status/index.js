import React, { Component } from 'react';
import { t1 } from 'translate';
import UpdateAccountStatus from './UpdateAccountStatus';
import ChangeStaffStatus from 'components/admin/user/user-in-school/common/UpdateStaffStatus';

class AccountStatus extends Component {
  render() {
    const { node } = this.props;
    return (
      <div>
        {/*<h1>{t1('account_status')}</h1>*/}
        <div className="whitebox border-round col-md-6">
          <div>
            <b>{t1('account_status')}</b>
            <UpdateAccountStatus node={node} />
            <hr />
            <b>{t1('staff_status')}</b>
            <ChangeStaffStatus node={node} />
          </div>
        </div>
      </div>
    );
  }
}

export default AccountStatus;
