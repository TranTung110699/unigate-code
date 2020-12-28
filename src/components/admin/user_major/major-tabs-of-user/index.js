import React from 'react';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';
import { createSelector } from 'reselect';
import Tabs from 'components/common/tabs';
import fetchData from 'components/common/fetchData';
import Perm from 'common/utils/Perm';
import apiUrls from 'api-endpoints';
import { userMajorStatus } from 'configs/constants';
import { t1 } from 'translate';

const majorsOfUser = ({
  userIid,
  userMajors,
  labelEmptyTabs,
  renderContentOfTab,
  floatingLabelText,
}) => {
  if (Perm.isGuest()) {
    return <div>{t1('no_user_specified')}</div>;
  }

  if (!Array.isArray(userMajors) || !userMajors.length) {
    return labelEmptyTabs || null;
  }

  return [
    floatingLabelText || null,
    <Tabs
      tabs={userMajors.map((userMajor) =>
        renderContentOfTab(userMajor, userIid),
      )}
    />,
  ];
};

const getUserViewer = (state, props) =>
  props.uiid || lodashGet(state, 'user.info.iid');
const mapStateToProps = createSelector(
  getUserViewer,
  (userIid) => ({
    userIid,
  }),
);

export default connect(mapStateToProps)(
  fetchData((props) => ({
    baseUrl: apiUrls.user_major_search,
    params: {
      status: [userMajorStatus.STUDYING],
      user_iid: props.userIid,
    },
    propKey: 'userMajors',
    fetchCondition: props.userIid && !Perm.isGuest(),
    refetchCondition: (prevProps) =>
      !Perm.isGuest() && props.userIid !== prevProps.userIid,
  }))(majorsOfUser),
);
