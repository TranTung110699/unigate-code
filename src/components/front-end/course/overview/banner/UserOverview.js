import React, { Component } from 'react';
import { t1 } from 'translate/index';

import BasicUserOverview from 'components/admin/user/user-in-school/view/BasicUserInfo';
import getLodash from 'lodash.get';
import fetchData from 'components/common/fetchData';
import Avatar from 'components/admin/user/user-in-school/edit/avatar/index';

class UserOverview extends Component {
  render() {
    const { iid, user } = this.props;
    if (user && user.code)
      return (
        <div className="container-fluid">
          <h1>
            {t1('user_learning_detailed_progress')}: {user.name}
          </h1>
          <div className="row">
            <div className="col-md-3">
              <Avatar user={user} roleUser="student" />
            </div>
            <div className="col-md-9">
              <BasicUserOverview user={user} />
            </div>
          </div>
        </div>
      );

    return null;
  }
}

export default fetchData((props) => ({
  baseUrl: `/user/detail`,
  keyState: `userInfo_${getLodash(props, 'iid')}`,
  params: {
    iid: getLodash(props, 'iid'),
  },
  propKey: 'user',
  fetchCondition: getLodash(props, 'iid'),
  shouldRenderLoading: true,
}))(UserOverview);
