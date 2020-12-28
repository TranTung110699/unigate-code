import React, { Component } from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import BasicUserInfo from '../BasicUserInfo';
import Widget from 'components/common/Widget';
import UserRoles from '../UserRoles';
import ResetPassword from '../../edit/reset-password';
import { getUrl } from 'routes/links/common';
import DeleteAccount from 'components/admin/user/user-in-school/edit/delete/DeleteAccount';
import UpdateAccountStatus from 'components/admin/user/user-in-school/edit/status/UpdateAccountStatus';
import ChangeStaffStatus from 'components/admin/user/user-in-school/common/UpdateStaffStatus';
import Perm from 'common/utils/Perm';
import lGet from 'lodash.get';

class ViewAccountDashboard extends Component {
  render() {
    const { user, domain, isRoot } = this.props;
    const isTrainer = Perm.hasPerm('staff', domain, user);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Widget title={t1('user_basic_info')}>
              <BasicUserInfo user={user} />
            </Widget>
            {isTrainer ? (
              <Widget title={t1('user_organizational_roles')}>
                <UserRoles user={user} />
              </Widget>
            ) : null}
            <Widget title={t1('reset_password')}>
              <ResetPassword node={user} action={'reset-password'} />
            </Widget>
          </div>
          <div className="col-md-6">
            <Widget title={t1('staff_status')} compact>
              <ChangeStaffStatus node={user} />
            </Widget>
            <Widget title={t1('user_account_status')} compact>
              {isRoot ? <UpdateAccountStatus node={user} /> : user.status}
            </Widget>
            {isRoot ? (
              <Widget title={t1('delete_account')}>
                <DeleteAccount
                  node={user}
                  urlCallback={getUrl('school/nodes')}
                />
              </Widget>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const domainInfo = state.domainInfo;
  return {
    domain: domainInfo && domainInfo.domain,
    isRoot: lGet(state, 'domainInfo.isRoot'),
  };
};
export default connect(mapStateToProps)(ViewAccountDashboard);
