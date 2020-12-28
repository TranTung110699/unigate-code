import React, { Component } from 'react';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import { connect } from 'react-redux';
import Perm from 'common/utils/Perm';
import HeadmasterOverviewContent from './HeadmasterOverviewContent';

class Overview extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    if (Perm.hasPerm('root')) {
      dispatch(
        sagaActions.getDataRequest({
          url: apiUrls.get_school_dashboard_overview_info,
          keyState: 'schoolDashboardOverviewInfo',
        }),
      );
    }
  }

  getDashboardOverviewContent = () => {
    const { schoolDashboardOverviewInfo, hideTitle } = this.props;

    if (Perm.hasPerm('root')) {
      return (
        <HeadmasterOverviewContent
          schoolDashboardOverviewInfo={schoolDashboardOverviewInfo}
          hideTitle={hideTitle}
        />
      );
    }
    return <div />;
  };

  render() {
    return <div>{this.getDashboardOverviewContent()}</div>;
  }
}

const mapStateToProps = (state) => {
  const schoolDashboardOverviewInfo =
    state.dataApiResults.schoolDashboardOverviewInfo;

  return { schoolDashboardOverviewInfo };
};

export default connect(mapStateToProps)(Overview);
